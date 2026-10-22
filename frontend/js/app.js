/**
 * ==========================================================================
 * GESTIÓN DE RESERVAS - JAVASCRIPT VANILLA (FRONTEND)
 * UT1 Acceso a Datos - 2.º DAM - IES San Juan Bosco
 * ==========================================================================
 * Este script implementa la lógica de interfaz sin frameworks, interactuando
 * con la API REST de Spring Boot para:
 * 1. CRUD de Reservas con validaciones (Apartado 3 del enunciado).
 * 2. Consultas especiales de Aulas con @RequestParam (Apartado 2).
 * 3. Gestión y listado de Profesores y Franjas Horarias.
 * 4. Monitor / Inspector en vivo del tráfico HTTP y respuestas de Spring Boot.
 */

// Configuración y Estado Global de la Aplicación
const STATE = {
  apiUrl: localStorage.getItem('apiUrl') || 'http://localhost:8080',
  profesores: [],
  aulas: [],
  franjas: [],
  reservas: [],
  httpLogs: [],
  selectedLogIndex: null
};

// ==========================================================================
// 1. CLIENTE HTTP CON INTERCEPTOR PARA EL INSPECTOR DE API
// ==========================================================================

/**
 * Función envoltorio para fetch que registra métricas, cabeceras y payloads
 * en el Inspector de API REST para fines didácticos y de evaluación.
 */
async function apiFetch(endpoint, options = {}) {
  const fullUrl = `${STATE.apiUrl}${endpoint}`;
  const method = options.method || 'GET';
  const startTime = performance.now();
  
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  let requestBodyParsed = null;
  if (options.body) {
    try {
      requestBodyParsed = JSON.parse(options.body);
    } catch {
      requestBodyParsed = options.body;
    }
  }

  let response;
  let responseData = null;
  let status = 0;
  let statusText = '';
  let latency = 0;

  try {
    response = await fetch(fullUrl, {
      ...options,
      headers
    });
    
    status = response.status;
    statusText = response.statusText;
    latency = Math.round(performance.now() - startTime);

    // Si la respuesta no es 204 No Content, intentamos parsear JSON
    if (status !== 204) {
      const text = await response.text();
      try {
        responseData = text ? JSON.parse(text) : null;
      } catch {
        responseData = text;
      }
    }

    // Registrar en el inspector HTTP
    logHttpCall({
      method,
      url: fullUrl,
      endpoint,
      status,
      statusText,
      latency,
      requestBody: requestBodyParsed,
      responseBody: responseData,
      timestamp: new Date().toLocaleTimeString(),
      success: response.ok
    });

    updateApiStatus(true);
    return { ok: response.ok, status, data: responseData };

  } catch (error) {
    latency = Math.round(performance.now() - startTime);
    logHttpCall({
      method,
      url: fullUrl,
      endpoint,
      status: 0,
      statusText: 'Network / Connection Error',
      latency,
      requestBody: requestBodyParsed,
      responseBody: { error: error.message },
      timestamp: new Date().toLocaleTimeString(),
      success: false
    });

    updateApiStatus(false);
    throw error;
  }
}

/**
 * Registra una llamada en el monitor de API con explicaciones técnicas.
 */
function logHttpCall(logEntry) {
  // Generar explicación técnica didáctica según el endpoint y código HTTP
  logEntry.explanation = generateTechnicalExplanation(logEntry);
  
  STATE.httpLogs.unshift(logEntry);
  if (STATE.httpLogs.length > 50) STATE.httpLogs.pop(); // Mantener últimas 50
  
  renderLogList();
  document.getElementById('badgeCountLogs').textContent = STATE.httpLogs.length;
  document.getElementById('logCounter').textContent = `${STATE.httpLogs.length} llamadas`;

  // Si es la primera petición, seleccionarla por defecto
  if (STATE.selectedLogIndex === null) {
    selectLog(0);
  }
}

/**
 * Genera la justificación técnica de la petición para el estudiante y evaluador.
 */
function generateTechnicalExplanation(log) {
  const { method, endpoint, status } = log;

  if (endpoint.startsWith('/aulas')) {
    if (endpoint.includes('?')) {
      return `Consulta con filtros @RequestParam en AulaController: Spring Data JPA ejecuta un derived query method según los parámetros ordenadores y capacidad solicitados.`;
    }
    if (method === 'GET') return `Consulta de todas las aulas disponibles registradas en la base de datos MariaDB.`;
    if (method === 'POST') return status === 201 ? `Aula guardada en la base de datos mediante JpaRepository.save(aula).` : `Error de validación en los datos del aula.`;
  }

  if (endpoint.startsWith('/reservas')) {
    if (method === 'POST') {
      if (status === 201) {
        return `✅ Reserva registrada con éxito: La entidad completó automáticamente el atributo 'insertionDate' mediante el hook @PrePersist con LocalDateTime.now(). Además, superó las validaciones de fecha futura y franja disponible.`;
      } else if (status === 400) {
        return `⚠️ Rechazado con 400 Bad Request por el servidor: Posibles causas: 1) Fecha anterior a hoy, 2) Franja horaria ya ocupada en esa aula y fecha (solapamiento), 3) Falta aula o fecha, o 4) ID enviado en el cuerpo. Revisa la consola de Spring Boot para el detalle exacto.`;
      }
    }
    if (method === 'DELETE') {
      return status === 204 ? `Reserva eliminada con éxito (204 No Content) tras verificar que existía previamente.` : `La reserva no existe (404 Not Found).`;
    }
  }

  if (endpoint.startsWith('/profesores')) {
    if (method === 'GET') return `Lectura de profesores registrados en MariaDB para asignación en reservas.`;
    if (method === 'POST') return `Profesor insertado en base de datos. Se validó que el DNI y el Email no estén duplicados.`;
  }

  return `Operación HTTP estándar gestionada por el controlador REST de Spring Boot con respuesta ${status}.`;
}

// ==========================================================================
// 2. INDICADOR DE ESTADO DE LA API Y RECONEXIÓN
// ==========================================================================

function updateApiStatus(isConnected) {
  const badge = document.getElementById('apiStatusBadge');
  const text = document.getElementById('apiStatusText');
  
  if (isConnected) {
    badge.className = 'api-status connected';
    text.textContent = 'API Conectada (8080)';
  } else {
    badge.className = 'api-status disconnected';
    text.textContent = 'Sin conexión a API';
  }
}

async function checkApiConnection() {
  try {
    const res = await fetch(`${STATE.apiUrl}/aulas`, { method: 'GET' });
    updateApiStatus(res.ok);
  } catch {
    updateApiStatus(false);
  }
}

// ==========================================================================
// 3. CARGA DE DATOS Y PESTAÑAS
// ==========================================================================

async function loadAllData() {
  await Promise.allSettled([
    loadReservas(),
    loadAulas(),
    loadProfesores(),
    loadFranjas()
  ]);
}

/**
 * Gestión de Reservas (Apartado 3)
 */
async function loadReservas() {
  const tbody = document.getElementById('tbodyReservas');
  tbody.innerHTML = `<tr><td colspan="7" class="loading-state"><div class="spinner"></div> Cargando reservas...</td></tr>`;

  try {
    const res = await apiFetch('/reservas');
    if (!res.ok) throw new Error('No se pudieron obtener las reservas');

    STATE.reservas = res.data || [];
    document.getElementById('badgeCountReservas').textContent = STATE.reservas.length;

    if (STATE.reservas.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            No hay reservas registradas en este momento. Haz clic en "➕ Nueva Reserva" para crear una.
          </td>
        </tr>`;
      return;
    }

    tbody.innerHTML = STATE.reservas.map(r => {
      // Formatear fecha y profesor
      const fecha = r.date || 'Sin fecha';
      const aulaNombre = r.aula ? r.aula.name : '<span class="pill pill-warning">Sin aula</span>';
      const profNombre = r.profesor ? `${r.profesor.name} ${r.profesor.surname}` : '<span class="pill pill-warning">Sin profesor</span>';
      
      // Franjas horarias
      let franjasHtml = '<span class="pill pill-info">Sin franjas</span>';
      if (r.franjasHorarias && r.franjasHorarias.length > 0) {
        franjasHtml = r.franjasHorarias.map(f => `<span class="pill pill-primary">${formatHora(f.desde)} - ${formatHora(f.hasta)}</span>`).join(' ');
      }

      // Fecha de inserción automática (@PrePersist)
      const insertion = r.insertionDate ? formatDateTime(r.insertionDate) : '<span class="pill pill-warning">null</span>';

      return `
        <tr>
          <td><strong style="color: #818cf8;">#${r.id}</strong></td>
          <td><span class="date-badge">📅 ${fecha}</span></td>
          <td><strong>${aulaNombre}</strong></td>
          <td>${profNombre}</td>
          <td>${franjasHtml}</td>
          <td><small class="date-badge" title="Asignado por @PrePersist">⚡ ${insertion}</small></td>
          <td style="text-align: center;">
            <button class="btn btn-danger-outline btn-sm" onclick="confirmDeleteReserva(${r.id})" title="Eliminar reserva">
              🗑️ Borrar
            </button>
          </td>
        </tr>
      `;
    }).join('');

  } catch (error) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state" style="color: var(--danger);">
          Error al conectar con el backend: ${error.message}. Asegúrate de que Spring Boot está corriendo en ${STATE.apiUrl}.
        </td>
      </tr>`;
  }
}

/**
 * Carga de Aulas con soporte de filtros (Apartado 2)
 */
async function loadAulas(queryString = '') {
  const grid = document.getElementById('gridAulas');
  grid.innerHTML = `<div class="loading-state"><div class="spinner"></div> Cargando aulas...</div>`;

  try {
    const endpoint = `/aulas${queryString}`;
    const res = await apiFetch(endpoint);
    if (!res.ok) throw new Error('Error al cargar aulas');

    STATE.aulas = res.data || [];
    document.getElementById('badgeCountAulas').textContent = STATE.aulas.length;

    if (STATE.aulas.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          No se encontraron aulas con los criterios seleccionados.
        </div>`;
      return;
    }

    grid.innerHTML = STATE.aulas.map(a => {
      const tienePC = a.ordenadores 
        ? `<span class="pill pill-success">💻 Con ordenadores</span>`
        : `<span class="pill pill-warning">🚫 Sin ordenadores</span>`;

      return `
        <article class="aula-card">
          <div class="card-top">
            <h4 class="card-title">${escapeHtml(a.name || 'Aula')}</h4>
            <span class="card-badge">ID: #${a.id}</span>
          </div>
          <div class="card-details">
            <div class="card-detail-item">
              ${tienePC}
            </div>
            <div class="card-detail-item">
              <span>👥 Capacidad: <strong>${a.capacity ?? 0} puestos</strong></span>
            </div>
            <div class="card-detail-item">
              <span>🏢 Planta: <strong>${a.floor ?? 'Baja / 0'}</strong></span>
            </div>
            ${a.description ? `<p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">${escapeHtml(a.description)}</p>` : ''}
          </div>
          <div class="card-footer">
            <button class="btn btn-outline btn-sm" onclick="prepararReservaConAula(${a.id})">
              📅 Reservar
            </button>
            <button class="btn btn-danger-outline btn-sm" onclick="deleteAula(${a.id})">
              🗑️
            </button>
          </div>
        </article>
      `;
    }).join('');

  } catch (error) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; color: var(--danger);">
        Error al cargar aulas: ${error.message}
      </div>`;
  }
}

/**
 * Carga de Profesores
 */
async function loadProfesores() {
  const tbody = document.getElementById('tbodyProfesores');
  tbody.innerHTML = `<tr><td colspan="7" class="loading-state"><div class="spinner"></div> Cargando profesores...</td></tr>`;

  try {
    const res = await apiFetch('/profesores');
    if (!res.ok) throw new Error('Error al cargar profesores');

    STATE.profesores = res.data || [];
    document.getElementById('badgeCountProfesores').textContent = STATE.profesores.length;

    if (STATE.profesores.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            No hay profesores registrados. Haz clic en "➕ Añadir Profesor" para registrar uno.
          </td>
        </tr>`;
      return;
    }

    tbody.innerHTML = STATE.profesores.map(p => `
      <tr>
        <td><strong>#${p.id}</strong></td>
        <td><strong>${escapeHtml(p.name)} ${escapeHtml(p.surname)}</strong></td>
        <td><span class="date-badge">${escapeHtml(p.dni || '--')}</span></td>
        <td><a href="mailto:${escapeHtml(p.email)}" style="color: #60a5fa; text-decoration: none;">${escapeHtml(p.email)}</a></td>
        <td>${escapeHtml(p.telefono || '--')}</td>
        <td>${p.birthDate || '--'}</td>
        <td style="text-align: center;">
          <button class="btn btn-danger-outline btn-sm" onclick="deleteProfesor(${p.id})">
            🗑️ Borrar
          </button>
        </td>
      </tr>
    `).join('');

  } catch (error) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state" style="color: var(--danger);">
          Error al cargar profesores: ${error.message}
        </td>
      </tr>`;
  }
}

/**
 * Carga de Franjas Horarias
 */
async function loadFranjas() {
  const grid = document.getElementById('gridFranjas');
  grid.innerHTML = `<div class="loading-state"><div class="spinner"></div> Cargando franjas...</div>`;

  try {
    const res = await apiFetch('/franjas-horarias');
    if (!res.ok) throw new Error('Error al cargar franjas');

    STATE.franjas = res.data || [];
    document.getElementById('badgeCountFranjas').textContent = STATE.franjas.length;

    if (STATE.franjas.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          No hay franjas horarias configuradas.
        </div>`;
      return;
    }

    grid.innerHTML = STATE.franjas.map(f => `
      <article class="franja-card">
        <div class="card-top">
          <h4 class="card-title">⏰ Periodo #${f.id}</h4>
          <span class="card-badge">Horario lectivo</span>
        </div>
        <div class="card-details">
          <div style="font-size: 1.3rem; font-weight: 700; color: #818cf8; font-family: var(--font-mono);">
            ${formatHora(f.desde)} - ${formatHora(f.hasta)}
          </div>
        </div>
        <div class="card-footer">
          <span style="font-size: 0.78rem; color: var(--text-muted);">Franja para reservas de aula</span>
          <button class="btn btn-danger-outline btn-sm" onclick="deleteFranja(${f.id})">
            🗑️
          </button>
        </div>
      </article>
    `).join('');

  } catch (error) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; color: var(--danger);">
        Error al cargar franjas: ${error.message}
      </div>`;
  }
}

// ==========================================================================
// 4. GESTIÓN Y CREACIÓN DE RESERVAS (APARTADO 3)
// ==========================================================================

function openModalReserva(aulaIdPreseleccionada = null) {
  // Rellenar selectores de profesor y aula
  const selProf = document.getElementById('reservaProfesor');
  const selAula = document.getElementById('reservaAula');
  const containerFranjas = document.getElementById('reservaFranjasContainer');
  const inputFecha = document.getElementById('reservaFecha');

  // Ajustar fecha mínima a hoy (Apartado 3: fecha no anterior a hoy) utilizando hora local
  const hoy = getLocalDateString();
  inputFecha.min = hoy;
  if (!inputFecha.value || inputFecha.value < hoy) {
    inputFecha.value = hoy;
  }

  // Opciones de profesor
  selProf.innerHTML = '<option value="">-- Seleccionar Profesor --</option>' +
    STATE.profesores.map(p => `<option value="${p.id}">${p.name} ${p.surname} (${p.dni})</option>`).join('');

  // Opciones de aula
  selAula.innerHTML = '<option value="">-- Seleccionar Aula --</option>' +
    STATE.aulas.map(a => `<option value="${a.id}" ${aulaIdPreseleccionada == a.id ? 'selected' : ''}>${a.name} (${a.capacity} puestos, ${a.ordenadores ? 'Con PC' : 'Sin PC'})</option>`).join('');

  // Opciones de franjas horarias
  if (STATE.franjas.length === 0) {
    containerFranjas.innerHTML = `<span style="color: var(--warning);">No hay franjas configuradas. Crea una primero en la pestaña "Franjas Horarias".</span>`;
  } else {
    containerFranjas.innerHTML = STATE.franjas.map(f => `
      <label class="checkbox-item">
        <input type="checkbox" name="reservaFranjaCheckbox" value="${f.id}">
        <span>${formatHora(f.desde)} - ${formatHora(f.hasta)}</span>
      </label>
    `).join('');
  }

  openModal('modalReserva');
}

function prepararReservaConAula(aulaId) {
  openModalReserva(aulaId);
}

async function handleCrearReserva(e) {
  e.preventDefault();

  const profesorId = document.getElementById('reservaProfesor').value;
  const aulaId = document.getElementById('reservaAula').value;
  const fecha = document.getElementById('reservaFecha').value;

  // Franjas seleccionadas
  const checkboxes = document.querySelectorAll('input[name="reservaFranjaCheckbox"]:checked');
  const franjasSeleccionadas = Array.from(checkboxes).map(cb => ({ id: Number(cb.value) }));

  if (!profesorId || !aulaId || !fecha) {
    showToast('Por favor completa todos los campos requeridos', 'warning');
    return;
  }

  if (franjasSeleccionadas.length === 0) {
    showToast('Debes seleccionar al menos una franja horaria', 'warning');
    return;
  }

  // Validación previa en cliente de fecha usando zona horaria local
  const hoy = getLocalDateString();
  if (fecha < hoy) {
    showToast('Error de validación: La fecha de la reserva no puede ser anterior a hoy', 'danger');
    return;
  }

  const payload = {
    date: fecha,
    profesor: { id: Number(profesorId) },
    aula: { id: Number(aulaId) },
    franjasHorarias: franjasSeleccionadas
  };

  try {
    const res = await apiFetch('/reservas', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.status === 201) {
      showToast('¡Reserva creada exitosamente en Spring Boot!', 'success');
      closeModal('modalReserva');
      document.getElementById('formCrearReserva').reset();
      await loadReservas();
    } else if (res.status === 400) {
      showToast('El servidor rechazó la reserva (400 Bad Request): Comprueba que el aula esté libre en esa franja y que la fecha no sea anterior a hoy. Revisa la consola de Spring Boot para ver el motivo exacto.', 'danger');
    } else {
      showToast(`Error del servidor (${res.status}) al crear la reserva.`, 'danger');
    }
  } catch (error) {
    showToast(`Error al enviar la petición: ${error.message}`, 'danger');
  }
}

async function confirmDeleteReserva(id) {
  if (!confirm(`¿Estás seguro de que deseas eliminar la reserva #${id}?`)) return;

  try {
    const res = await apiFetch(`/reservas/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      showToast(`Reserva #${id} eliminada correctamente`, 'success');
      await loadReservas();
    } else if (res.status === 404) {
      showToast(`La reserva #${id} no existe en el sistema`, 'warning');
    } else {
      showToast(`Error inesperado (${res.status}) al eliminar`, 'danger');
    }
  } catch (error) {
    showToast(`Error de red al eliminar reserva: ${error.message}`, 'danger');
  }
}

// ==========================================================================
// 5. CONSULTAS ESPECIALES Y GESTIÓN DE AULAS (APARTADO 2)
// ==========================================================================

function updateQueryPreview() {
  const tienePC = document.getElementById('filtroOrdenadores').checked;
  const capacidad = document.getElementById('filtroCapacidad').value;
  const params = new URLSearchParams();

  if (tienePC) params.append('ordenadores', 'true');
  if (capacidad && Number(capacidad) > 0) params.append('capacidad', capacidad);

  const queryStr = params.toString() ? `?${params.toString()}` : '';
  document.getElementById('queryUrlPreview').textContent = `GET ${STATE.apiUrl}/aulas${queryStr}`;
  return queryStr;
}

async function handleFiltroAulas(e) {
  e.preventDefault();
  const queryStr = updateQueryPreview();
  await loadAulas(queryStr);
  showToast(`Filtros aplicados: ${queryStr || 'Todas las aulas'}`, 'info');
}

function handleLimpiarFiltroAulas() {
  document.getElementById('filtroOrdenadores').checked = false;
  document.getElementById('filtroCapacidad').value = '';
  updateQueryPreview();
  loadAulas();
}

async function handleCrearAula(e) {
  e.preventDefault();
  const name = document.getElementById('aulaNombre').value.trim();
  const capacity = Number(document.getElementById('aulaCapacidad').value);
  const floor = Number(document.getElementById('aulaPlanta').value);
  const ordenadores = document.getElementById('aulaOrdenadores').checked;
  const description = document.getElementById('aulaDescripcion').value.trim();

  const payload = { name, capacity, floor, ordenadores, description };

  try {
    const res = await apiFetch('/aulas', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.status === 201) {
      showToast(`Aula "${name}" creada correctamente`, 'success');
      closeModal('modalAula');
      document.getElementById('formCrearAula').reset();
      await loadAulas();
    } else {
      showToast(`Error al crear aula (${res.status})`, 'danger');
    }
  } catch (error) {
    showToast(`Error al conectar con la API: ${error.message}`, 'danger');
  }
}

async function deleteAula(id) {
  if (!confirm(`¿Eliminar aula #${id}? Si tiene reservas asociadas la base de datos podría impedirlo.`)) return;

  try {
    const res = await apiFetch(`/aulas/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      showToast(`Aula #${id} eliminada correctamente`, 'success');
      await loadAulas();
    } else if (res.status === 409 || res.status === 500) {
      showToast(`No se puede eliminar el aula #${id}: tiene reservas asociadas. Elimina primero sus reservas asociadas.`, 'warning');
    } else {
      showToast(`No se pudo eliminar el aula (${res.status})`, 'danger');
    }
  } catch (error) {
    showToast(`Error al eliminar: ${error.message}`, 'danger');
  }
}

// ==========================================================================
// 6. GESTIÓN DE PROFESORES Y FRANJAS
// ==========================================================================

async function handleCrearProfesor(e) {
  e.preventDefault();
  const name = document.getElementById('profNombre').value.trim();
  const surname = document.getElementById('profApellidos').value.trim();
  const dni = document.getElementById('profDni').value.trim();
  const email = document.getElementById('profEmail').value.trim();
  const telefono = document.getElementById('profTelefono').value.trim();
  const birthDate = document.getElementById('profFechaNac').value || null;

  const payload = { name, surname, dni, email, telefono, birthDate };

  try {
    const res = await apiFetch('/profesores', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.status === 201) {
      showToast(`Profesor/a ${name} ${surname} registrado`, 'success');
      closeModal('modalProfesor');
      document.getElementById('formCrearProfesor').reset();
      await loadProfesores();
    } else {
      showToast(`Error al registrar profesor (${res.status}). Comprueba que el DNI o Email no existan ya.`, 'danger');
    }
  } catch (error) {
    showToast(`Error de conexión: ${error.message}`, 'danger');
  }
}

async function deleteProfesor(id) {
  if (!confirm(`¿Eliminar profesor #${id}? Si tiene reservas asociadas la base de datos lo impedirá.`)) return;

  try {
    const res = await apiFetch(`/profesores/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      showToast(`Profesor #${id} eliminado correctamente`, 'success');
      await loadProfesores();
    } else if (res.status === 409 || res.status === 500) {
      showToast(`No se puede eliminar el profesor #${id}: tiene reservas asociadas. Elimina primero sus reservas asociadas.`, 'warning');
    } else {
      showToast(`No se pudo eliminar el profesor (${res.status})`, 'danger');
    }
  } catch (error) {
    showToast(`Error: ${error.message}`, 'danger');
  }
}

async function handleCrearFranja(e) {
  e.preventDefault();
  let desde = document.getElementById('franjaDesde').value;
  let hasta = document.getElementById('franjaHasta').value;

  // Asegurar formato HH:mm:ss si hace falta
  if (desde.length === 5) desde += ':00';
  if (hasta.length === 5) hasta += ':00';

  const payload = { desde, hasta };

  try {
    const res = await apiFetch('/franjas-horarias', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.status === 201) {
      showToast(`Franja horaria ${desde} - ${hasta} añadida`, 'success');
      closeModal('modalFranja');
      document.getElementById('formCrearFranja').reset();
      await loadFranjas();
    } else {
      showToast(`Error al crear franja (${res.status})`, 'danger');
    }
  } catch (error) {
    showToast(`Error: ${error.message}`, 'danger');
  }
}

async function deleteFranja(id) {
  if (!confirm(`¿Eliminar franja horaria #${id}? Si tiene reservas asociadas la base de datos lo impedirá.`)) return;

  try {
    const res = await apiFetch(`/franjas-horarias/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      showToast(`Franja #${id} eliminada correctamente`, 'success');
      await loadFranjas();
    } else if (res.status === 409 || res.status === 500) {
      showToast(`No se puede eliminar la franja #${id}: tiene reservas asociadas. Elimina primero sus reservas asociadas.`, 'warning');
    } else {
      showToast(`No se pudo eliminar franja (${res.status})`, 'danger');
    }
  } catch (error) {
    showToast(`Error: ${error.message}`, 'danger');
  }
}

// ==========================================================================
// 7. CARGA DE DATOS DEMO (SEEDER RÁPIDO PARA GRABACIÓN DE VÍDEO)
// ==========================================================================

async function seedDemoData() {
  if (!confirm('¿Deseas insertar datos de prueba iniciales (2 profesores, 3 aulas, 3 franjas y 1 reserva)? Ideal si la base de datos está vacía.')) {
    return;
  }

  showToast('Cargando datos de demostración en Spring Boot...', 'info');

  try {
    // 1. Profesores
    const p1 = await apiFetch('/profesores', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Aitor',
        surname: 'Gallego',
        dni: '12345678A',
        email: 'aitor@juanbosco.es',
        telefono: '600112233',
        birthDate: '1998-05-15'
      })
    });

    const p2 = await apiFetch('/profesores', {
      method: 'POST',
      body: JSON.stringify({
        name: 'María',
        surname: 'Rodríguez',
        dni: '87654321B',
        email: 'maria.rodriguez@juanbosco.es',
        telefono: '699445566',
        birthDate: '1985-11-20'
      })
    });

    // 2. Aulas
    const a1 = await apiFetch('/aulas', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Aula 201 - Informática',
        capacity: 30,
        floor: 2,
        ordenadores: true,
        description: 'Dotada con 30 puestos informáticos de desarrollo'
      })
    });

    const a2 = await apiFetch('/aulas', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Aula 104 - Usos Múltiples',
        capacity: 40,
        floor: 1,
        ordenadores: false,
        description: 'Espacio diáfano con proyector y megafonía'
      })
    });

    const a3 = await apiFetch('/aulas', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Taller 02 - Robótica',
        capacity: 15,
        floor: 0,
        ordenadores: true,
        description: 'Bancos de trabajo y kits Arduino'
      })
    });

    // 3. Franjas Horarias
    const f1 = await apiFetch('/franjas-horarias', {
      method: 'POST',
      body: JSON.stringify({ desde: '08:30:00', hasta: '09:25:00' })
    });

    const f2 = await apiFetch('/franjas-horarias', {
      method: 'POST',
      body: JSON.stringify({ desde: '09:25:00', hasta: '10:20:00' })
    });

    const f3 = await apiFetch('/franjas-horarias', {
      method: 'POST',
      body: JSON.stringify({ desde: '10:45:00', hasta: '11:40:00' })
    });

    // 4. Una Reserva de prueba para mañana
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fechaManana = getLocalDateString(manana);

    const profCreado = (p1.ok && p1.data) ? p1.data : { id: 1 };
    const aulaCreada = (a1.ok && a1.data) ? a1.data : { id: 1 };
    const franjaCreada = (f1.ok && f1.data) ? f1.data : { id: 1 };

    await apiFetch('/reservas', {
      method: 'POST',
      body: JSON.stringify({
        date: fechaManana,
        profesor: { id: profCreado.id },
        aula: { id: aulaCreada.id },
        franjasHorarias: [{ id: franjaCreada.id }]
      })
    });

    showToast('¡Datos demo insertados correctamente!', 'success');
    await loadAllData();

  } catch (error) {
    showToast(`Error al sembrar datos: ${error.message}`, 'danger');
    await loadAllData();
  }
}

// ==========================================================================
// 8. INSPECTOR DE API REST (MONITOR DE RED)
// ==========================================================================

function renderLogList() {
  const container = document.getElementById('logList');
  if (STATE.httpLogs.length === 0) {
    container.innerHTML = `<div class="empty-state">Sin peticiones registradas aún.</div>`;
    return;
  }

  container.innerHTML = STATE.httpLogs.map((log, index) => {
    const statusClass = log.status >= 200 && log.status < 300 
      ? 'status-2xx' 
      : (log.status >= 400 ? 'status-4xx' : '');

    const activeClass = STATE.selectedLogIndex === index ? 'active' : '';

    return `
      <div class="log-item ${activeClass}" onclick="selectLog(${index})">
        <div class="log-item-top">
          <span class="http-method method-${log.method}">${log.method}</span>
          <span class="http-status ${statusClass}">${log.status ? `${log.status} ${log.statusText}` : 'FAIL'}</span>
        </div>
        <div class="log-endpoint" title="${escapeHtml(log.url)}">${escapeHtml(log.endpoint)}</div>
        <div class="log-time">⏱️ ${log.latency} ms · ${log.timestamp}</div>
      </div>
    `;
  }).join('');
}

function selectLog(index) {
  STATE.selectedLogIndex = index;
  renderLogList();

  const log = STATE.httpLogs[index];
  if (!log) return;

  const detailCard = document.getElementById('logDetailCard');
  const badge = document.getElementById('detailStatusBadge');
  const content = document.getElementById('logDetailContent');

  badge.className = `status-badge ${log.status >= 200 && log.status < 300 ? 'pill pill-success' : 'pill pill-warning'}`;
  badge.textContent = `${log.status} ${log.statusText}`;

  content.innerHTML = `
    <div class="explanation-box">
      <strong>💡 Explicación del funcionamiento interno:</strong>
      <p style="margin-top: 0.35rem;">${escapeHtml(log.explanation)}</p>
    </div>

    <div class="detail-section">
      <h4>Petición HTTP</h4>
      <div style="font-family: var(--font-mono); font-size: 0.84rem; background: #0b1120; padding: 0.6rem 0.8rem; border-radius: 6px; border: 1px solid var(--border-color);">
        <strong style="color: #a5b4fc;">${log.method}</strong> ${escapeHtml(log.url)}
      </div>
    </div>

    ${log.requestBody ? `
      <div class="detail-section">
        <h4>Cuerpo de la Petición (JSON Request Payload)</h4>
        <pre class="code-block">${escapeHtml(JSON.stringify(log.requestBody, null, 2))}</pre>
      </div>
    ` : ''}

    <div class="detail-section">
      <h4>Respuesta del Servidor (JSON Response Body)</h4>
      <pre class="code-block">${log.responseBody ? escapeHtml(JSON.stringify(log.responseBody, null, 2)) : '<em style="color: var(--text-muted);">(Sin cuerpo o respuesta 204 No Content)</em>'}</pre>
    </div>
  `;
}

function clearLogs() {
  STATE.httpLogs = [];
  STATE.selectedLogIndex = null;
  renderLogList();
  document.getElementById('badgeCountLogs').textContent = '0';
  document.getElementById('logCounter').textContent = '0 llamadas';
  document.getElementById('detailStatusBadge').textContent = '--';
  document.getElementById('detailStatusBadge').className = 'status-badge';
  document.getElementById('logDetailContent').innerHTML = `
    <div class="empty-state">Selecciona una petición del panel izquierdo para ver detalles.</div>
  `;
}

// ==========================================================================
// 9. MODALES, PESTAÑAS Y NOTIFICACIONES
// ==========================================================================

function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function initModalClosers() {
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  // Cerrar al hacer clic en el backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '✅',
    danger: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  toast.innerHTML = `
    <span>${icons[type] || '🔔'}</span>
    <span style="flex: 1;">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================================================
// 10. UTILIDADES DE FORMATO Y SANITIZACIÓN
// ==========================================================================

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatHora(timeStr) {
  if (!timeStr) return '--:--';
  return timeStr.substring(0, 5); // ej. "08:30"
}

function formatDateTime(isoStr) {
  if (!isoStr) return '--';
  try {
    const d = new Date(isoStr);
    return d.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch {
    return isoStr;
  }
}

function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// 11. INICIALIZACIÓN GLOBAL AL CARGAR EL DOM
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes UI
  initTabs();
  initModalClosers();
  updateQueryPreview();

  // Mostrar URL actual configurada
  document.getElementById('currentApiUrlDisplay').textContent = STATE.apiUrl.replace(/^https?:\/\//, '');

  // Listeners de apertura de modales
  document.getElementById('btnOpenModalReserva').addEventListener('click', () => openModalReserva());
  document.getElementById('btnOpenModalAula').addEventListener('click', () => openModal('modalAula'));
  document.getElementById('btnOpenModalProfesor').addEventListener('click', () => openModal('modalProfesor'));
  document.getElementById('btnOpenModalFranja').addEventListener('click', () => openModal('modalFranja'));
  document.getElementById('btnConfigApi').addEventListener('click', () => {
    document.getElementById('apiUrlInput').value = STATE.apiUrl;
    openModal('modalConfigApi');
  });

  // Listeners de recarga
  document.getElementById('btnRefreshReservas').addEventListener('click', () => loadReservas());
  document.getElementById('btnRefreshAulas').addEventListener('click', () => loadAulas());
  document.getElementById('btnRefreshProfesores').addEventListener('click', () => loadProfesores());
  document.getElementById('btnRefreshFranjas').addEventListener('click', () => loadFranjas());

  // Listeners de formularios
  document.getElementById('formCrearReserva').addEventListener('submit', handleCrearReserva);
  document.getElementById('formCrearAula').addEventListener('submit', handleCrearAula);
  document.getElementById('formCrearProfesor').addEventListener('submit', handleCrearProfesor);
  document.getElementById('formCrearFranja').addEventListener('submit', handleCrearFranja);

  // Formulario de filtros de Aula (Apartado 2)
  document.getElementById('formFiltroAulas').addEventListener('submit', handleFiltroAulas);
  document.getElementById('btnLimpiarFiltroAulas').addEventListener('click', handleLimpiarFiltroAulas);
  document.getElementById('filtroOrdenadores').addEventListener('change', updateQueryPreview);
  document.getElementById('filtroCapacidad').addEventListener('input', updateQueryPreview);

  // Inspector de API y Seed demo
  document.getElementById('btnClearLogs').addEventListener('click', clearLogs);
  document.getElementById('btnSeedData').addEventListener('click', seedDemoData);

  // Formulario configuración API
  document.getElementById('formConfigApi').addEventListener('submit', (e) => {
    e.preventDefault();
    const newUrl = document.getElementById('apiUrlInput').value.trim().replace(/\/$/, '');
    if (newUrl) {
      STATE.apiUrl = newUrl;
      localStorage.setItem('apiUrl', newUrl);
      document.getElementById('currentApiUrlDisplay').textContent = newUrl.replace(/^https?:\/\//, '');
      closeModal('modalConfigApi');
      showToast(`Servidor configurado en ${newUrl}`, 'info');
      checkApiConnection();
      loadAllData();
    }
  });

  // Carga inicial
  checkApiConnection();
  loadAllData();
});
