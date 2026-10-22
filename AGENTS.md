# AGENTS.md - Contexto Operativo y Directrices para Agentes de IA

Este documento sirve como **fuente de verdad técnica y operativa** para cualquier agente de Inteligencia Artificial (o desarrollador) que participe en el análisis, refactorización, ampliación o mantenimiento del proyecto **GestionReservas**.

---

## 🎯 1. Contexto del Proyecto y Objetivo Académico

- **Módulo Académico:** Acceso a Datos (2.º curso de Desarrollo de Aplicaciones Multiplataforma - DAM).
- **Unidad de Trabajo:** UT1 / Tarea 1 - Gestión de reservas de aulas de un centro educativo.
- **Autoría del Proyecto Base:** El diseño inicial, la arquitectura base, las entidades JPA, repositorios, configuración y `ProfesorController` han sido **desarrollados manualmente por el alumno**, sin intervención de herramientas de IA. La asistencia de IA comienza a partir de la fase de documentación y futuras refactorizaciones/ampliaciones.
- **Objetivo Principal:** Construir una API REST completa utilizando **Spring Boot**, **Spring Data JPA**, **MariaDB/MySQL** y **Lombok**, complementada con un frontend ligero desarrollado en **HTML5, CSS3 y JavaScript puro (vanilla)** ubicado en `/frontend`.
- **Restricción Clave de Evaluación:** En el examen presencial no se permitirá el uso de IA; por tanto, **todo código generado o modificado debe ser rigurosamente comprensible, didáctico, limpio y justificado**. No se debe introducir código complejo o innecesario que el estudiante no pueda defender.

---

## 🚨 2. Regla Fundamental de Operación para Agentes: Registro Obligatorio en `DOC.md`

> [!IMPORTANT]
> **REGLA OBLIGATORIA EN CADA INTERACCIÓN:**
> En **todas y cada una de las consultas o peticiones** que el usuario envíe al agente, el agente tiene la **obligación inexcusable** de actualizar el archivo [`DOC.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/DOC.md).
>
> Para cada nueva petición, se debe añadir una nueva entrada con la siguiente estructura:
> 1. **Número y Título de la Petición:** Numeración correlativa y nombre descriptivo.
> 2. **Resumen de la Petición del Usuario:** Explicación concisa y fiel de lo que el usuario ha solicitado exactamente.
> 3. **Cambios Efectuados:** Lista detallada y estructurada de los archivos modificados, creados o eliminados, indicando el qué y el porqué.
> 4. **Información Relevante y Decisiones Técnicas:** Dudas resueltas, justificaciones de diseño, avisos técnicos, validaciones aplicadas o problemas detectados.

---

## 📂 3. Inventario Exhaustivo de Archivos del Repositorio

A continuación se detalla la función, responsabilidades y contenido de cada uno de los archivos existentes en el estado actual del repositorio:

### 3.1. Archivos Raíz y Configuración del Entorno
- **[`pom.xml`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/pom.xml):**
  - Define la configuración de Maven.
  - Dependencias activas:
    - `spring-boot-starter-data-jpa`: Persistencia ORM con Hibernate.
    - `spring-boot-starter-webmvc`: Controladores REST y servidor web embebido Tomcat.
    - `spring-boot-devtools`: Recarga en caliente en entorno de desarrollo.
    - `mariadb-java-client`: Driver JDBC para conexión con base de datos MariaDB.
    - `lombok`: Reducción de boilerplate (`@Data`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`).
    - `spring-boot-starter-data-jpa-test` y `spring-boot-starter-webmvc-test`: Soporte para pruebas unitarias y de integración.
  - Propiedad de versión Java: `<java.version>25</java.version>`.
- **[`mvnw`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/mvnw) y [`mvnw.cmd`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/mvnw.cmd):**
  - Scripts Maven Wrapper para sistemas Unix/Linux y Windows respectivamente, permitiendo compilar sin requerir una instalación global de Maven.
- **[`.gitignore`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/.gitignore):**
  - Reglas de exclusión para Git (directorios `target/`, artefactos de IDE `.idea`, archivos temporales `.class`, etc.).
- **[`HELP.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/HELP.md):**
  - Guía genérica de referencia generada por Spring Initializr con enlaces a la documentación oficial.
- **[`Enunciado.odt`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/Enunciado.odt):**
  - Documento de texto OpenDocument original entregado por el profesorado con los requisitos formales de la Tarea 1.
- **[`BBDD.png`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/BBDD.png):**
  - Imagen del diagrama Entidad-Relación original que especifica las entidades (`Profesores`, `Aulas`, `FranjasHorarias`, `Reservas`), sus relaciones y los atributos destacados (`fecha`, `fechaInserción`).
- **[`README.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/README.md):**
  - Documentación de cara al usuario, profesor y evaluador: arquitectura, despliegue, estructura y catálogo de endpoints.
- **[`DOC.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/DOC.md):**
  - Bitácora de trabajo asistido por IA: registro estructurado de cada petición recibida, cambios efectuados e información técnica relevante.
- **[`AGENTS.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/AGENTS.md):**
  - Este mismo documento: manual técnico exhaustivo para agentes.

### 3.2. Archivos del Frontend Ligero (`/frontend`)
- **[`frontend/index.html`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/frontend/index.html):**
  - Estructura semántica en HTML5: navegación por pestañas (Reservas, Aulas & Filtros, Profesores, Franjas Horarias, Inspector API), tabla interactiva de reservas, tarjetas de aulas con filtros de capacidad y ordenadores, modales de creación y contenedor de notificaciones toast.
- **[`frontend/css/styles.css`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/frontend/css/styles.css):**
  - Diseño moderno responsive en CSS3 puro utilizando variables CSS (`--bg-primary`, `--primary`, `--success`, etc.), sistema de rejilla (CSS Grid), Flexbox, animaciones de transición, soporte para badges de estado HTTP y estilo tipo panel de control / devtools.
- **[`frontend/js/app.js`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/frontend/js/app.js):**
  - Lógica en JavaScript vanilla (sin frameworks): cliente HTTP con interceptor para auditar tráfico en tiempo real, gestión de peticiones asíncronas (`async/await`), validaciones de negocio en cliente y captura de códigos HTTP (`200`, `201`, `204`, `400`), filtrado dinámico de aulas (`@RequestParam`) y función seeder para insertar datos de prueba con un solo clic.

### 3.3. Recursos de Configuración Spring Boot
- **[`src/main/resources/application.properties`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/resources/application.properties):**
  - Conexión JDBC a MariaDB: `jdbc:mariadb://localhost:3306/app_db`.
  - Credenciales: usuario `aitor`, contraseña `aitor123`.
  - Hibernate DDL: `spring.jpa.hibernate.ddl-auto=update` (mantiene y actualiza automáticamente el esquema de tablas).
  - Dialecto: `org.hibernate.dialect.MariaDBDialect`.
  - Logging SQL: `spring.jpa.show-sql=true`.

---

### 3.3. Código Fuente Java (`src/main/java/com/juanbosco/gestionreservas/`)

#### Paquete Raíz
- **[`GestionReservasApplication.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/GestionReservasApplication.java):**
  - Clase principal anotada con `@SpringBootApplication`. Inicia el contexto de Spring Boot mediante `SpringApplication.run`.
- **[`CorsConfig.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/CorsConfig.java):**
  - Implementa `WebMvcConfigurer`.
  - Configura el mapeo de CORS para permitir peticiones desde cualquier origen (`allowedOriginPatterns("*")`), incluyendo llamadas con `Origin: null` (como cuando se abre un archivo HTML localmente mediante `file://`).
  - Métodos permitidos: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

#### Paquete Entidades (`entity/`)
- **[`Profesor.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Profesor.java):**
  - `@Entity`, `@Table`, `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder`.
  - Atributos:
    - `id` (Long, `@Id`, `@GeneratedValue(IDENTITY)`).
    - `name` (String, length=40, nullable=false).
    - `surname` (String, length=40, nullable=false).
    - `email` (String, length=50, nullable=false).
    - `birthDate` (LocalDate).
    - `dni` (String, length=9, nullable=false, unique=true).
    - `telefono` (String, length=15, nullable=false).
    - `reserva` (List<Reserva>, relación `@OneToMany(cascade = CascadeType.PERSIST)`).
- **[`Aula.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Aula.java):**
  - `@Entity`, `@Table`, `@Data`, `@Builder`, `@AllArgsConstructor`, `@NoArgsConstructor`.
  - Atributos:
    - `id` (Long, `@Id`, `@GeneratedValue(IDENTITY)`).
    - `name` (String, length=40).
    - `ordenadores` (boolean, nullable=false).
    - `capacity` (int, nullable=false).
    - `floor` (int).
    - `description` (String, length=100).
    - `reservas` (List<Reserva>, relación `@OneToMany(cascade = CascadeType.PERSIST)`).
- **[`FranjaHoraria.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/FranjaHoraria.java):**
  - `@Entity`, `@Table`, `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder`.
  - Atributos:
    - `id` (Long, `@Id`, `@GeneratedValue(IDENTITY)`).
    - `from` (LocalTime, nullable=false). *Advertencia: `from` es palabra reservada SQL.*
    - `to` (LocalTime, nullable=false).
    - `reservas` (List<Reserva>, relación `@ManyToMany(cascade = CascadeType.PERSIST)`).
- **[`Reserva.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Reserva.java):**
  - `@Entity`, `@Table`, `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder`.
  - Atributos:
    - `id` (Long, `@Id`, `@GeneratedValue(IDENTITY)`).
    - `insertionDate` (LocalDateTime, nullable=false).
    - `date` (LocalDate, nullable=false).
    - `profesor` (Profesor, `@ManyToOne(cascade = CascadeType.PERSIST)`).
    - `aula` (Aula, `@ManyToOne(cascade = CascadeType.PERSIST)`).
    - `franjasHorarias` (List<FranjaHoraria>, `@ManyToMany(cascade = CascadeType.PERSIST)`).

#### Paquete Repositorios (`repository/`)
- **[`ProfesorRepository.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/repository/ProfesorRepository.java):**
  - Extiende `JpaRepository<Profesor, Long>`.
- **[`AulaRepository.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/repository/AulaRepository.java):**
  - Extiende `JpaRepository<Aula, Long>`.
- **[`FranjaHorariaRepository.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/repository/FranjaHorariaRepository.java):**
  - Extiende `JpaRepository<FranjaHoraria, Long>`.
- **[`ReservaRepository.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/repository/ReservaRepository.java):**
  - Extiende `JpaRepository<Reserva, Long>`.

#### Paquete Controladores (`controller/`)
- **[`ProfesorController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/ProfesorController.java):**
  - Endpoints implementados:
    - `GET /profesores` -> Devuelve lista completa (`200 OK`).
    - `GET /profesores/{id}` -> Devuelve profesor si existe (`200 OK`) o `404 Not Found`.
    - `POST /profesores` -> Crea un nuevo profesor con validación de campos obligatorios (`201 Created` o `400 Bad Request`).
    - `PUT /profesores/{id}` -> Modifica un profesor por completo (`200 OK` o `404 Not Found`).
    - `PATCH /profesores/{id}` -> Modificación parcial de campos no nulos (`200 OK` o `404 Not Found`).
    - `DELETE /profesores/{id}` -> Elimina un profesor (`204 No Content` o `404 Not Found`).
- **[`AulaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/AulaController.java):**
  - Endpoints implementados:
    - `GET /aulas` -> Devuelve lista completa de aulas (`200 OK`).
    - `GET /aulas/{id}` -> Devuelve aula si existe (`200 OK`) o `404 Not Found`.
    - `POST /aulas` -> Crea un aula validando `id == null` y `name != null` (`201 Created` o `400 Bad Request`).
    - `PUT /aulas/{id}` -> Modificación total (`200 OK` o `404 Not Found`).
    - `PATCH /aulas/{id}` -> Modificación parcial (`200 OK` o `404 Not Found`).
    - `DELETE /aulas/{id}` -> Elimina un aula (`204 No Content` o `404 Not Found`).
- **[`FranjaHorariaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/FranjaHorariaController.java):**
  - Endpoints implementados (mapeado en `/franjas-horarias` y `/franjas`):
    - `GET /franjas-horarias` -> Devuelve lista completa (`200 OK`).
    - `GET /franjas-horarias/{id}` -> Devuelve franja si existe (`200 OK`) o `404 Not Found`.
    - `POST /franjas-horarias` -> Crea franja validando `from` y `to` (`201 Created` o `400 Bad Request`).
    - `PUT /franjas-horarias/{id}` -> Modificación total (`200 OK` o `404 Not Found`).
    - `PATCH /franjas-horarias/{id}` -> Modificación parcial (`200 OK` o `404 Not Found`).
    - `DELETE /franjas-horarias/{id}` -> Elimina una franja (`204 No Content` o `404 Not Found`).
- **[`ReservaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/ReservaController.java):**
  - Endpoints implementados:
    - `GET /reservas` -> Devuelve lista completa de reservas (`200 OK`).
    - `GET /reservas/{id}` -> Devuelve reserva si existe (`200 OK`) o `404 Not Found`.
    - `POST /reservas` -> Crea reserva validando `date != null` y autocompletando `insertionDate` si es nula (`201 Created` o `400 Bad Request`).
    - `PUT /reservas/{id}` -> Modificación total (`200 OK` o `404 Not Found`).
    - `PATCH /reservas/{id}` -> Modificación parcial (`200 OK` o `404 Not Found`).
    - `DELETE /reservas/{id}` -> Elimina una reserva (`204 No Content` o `404 Not Found`).

---

## 📋 4. Especificaciones y Requisitos Técnicos Obligatorios

Cualquier cambio o desarrollo que realice un agente debe ajustarse estrictamente a estos 5 bloques del enunciado:

### Requisito 1: Gestión de Entidades y Endpoints
- Implementar los endpoints CRUD para todas las entidades (`Profesor`, `Aula`, `FranjaHoraria`, `Reserva`).
- Utilizar respuestas HTTP semánticamente correctas:
  - `200 OK` en consultas exitosas (`GET`) y modificaciones (`PUT`).
  - `201 Created` en creaciones exitosas (`POST`), preferiblemente con el objeto creado en el cuerpo.
  - `204 No Content` en eliminaciones exitosas (`DELETE`).
  - `400 Bad Request` ante datos mal formateados, campos requeridos ausentes o violaciones lógicas.
  - `404 Not Found` cuando el recurso por ID solicitado no exista.
  - `409 Conflict` (o `400`) cuando exista conflicto en reservas o claves duplicadas.
- **Entidad Reserva:**
  - Debe guardar obligatoriamente `date` (fecha de reserva) e `insertionDate` (fecha y hora en que se registró).
  - `insertionDate` **debe generarse automáticamente en la propia entidad** (usar `@PrePersist` con `LocalDateTime.now()` o ciclo de vida JPA).

### Requisito 2: Consultas Especiales en Aulas
Implementar endpoints con parámetros de consulta (`@RequestParam`):
1. **Filtro por ordenadores:**
   - Ejemplo: `/aulas?ordenadores=true` (devuelve aulas que tienen ordenadores).
2. **Filtro por capacidad mínima:**
   - Ejemplo: `/aulas?capacidad=20` (devuelve aulas cuya capacidad sea superior al valor indicado).
3. Posibilidad de combinar o gestionar rutas REST estándar de forma coherente.

### Requisito 3: Validaciones Críticas en las Reservas
Al crear o guardar una reserva (`POST /reservas`):
1. **Comprobar disponibilidad de franja horaria:** La franja horaria seleccionada debe estar libre para el aula en la fecha indicada (evitar solapamiento doble de la misma aula en la misma franja y fecha).
2. **Validación de fecha futura:** La fecha de la reserva (`date`) **no puede ser anterior a la fecha actual** (`date.isBefore(LocalDate.now())`).
3. Si alguna condición no se cumple, impedir la persistencia y responder con un código adecuado (`400 Bad Request` o `409 Conflict`) y un mensaje informativo.

### Requisito 4: Frontend (`/frontend`)
- Carpeta obligatoria: `/frontend` en la raíz del proyecto.
- **Tecnologías permitidas:** Exclusivamente **HTML5, CSS3 y JavaScript vanilla** (sin frameworks: ni React, ni Angular, ni Vue, ni jQuery).
- Funcionalidad mínima:
  - Listado de aulas y profesores.
  - Formulario para crear una reserva seleccionando profesor, aula, fecha y franja horaria.
  - Visualización del listado de reservas con opción de eliminar/actualizar.

### Requisito 5: Documentación y Entrega
- Mantener actualizados `README.md`, `AGENTS.md` y `DOC.md`.
- El estudiante grabará un vídeo de entre 5 y 10 minutos demostrando el código, el frontend y peticiones Postman para verificar los endpoints.

---

## 🔍 5. Aspectos Técnicos a Tener en Cuenta para Futuras Tareas

1. **Ajuste en `ProfesorController.create` (`POST /profesores`):**
   - En una creación estándar con ID autogenerado, el cliente habitualmente no aporta el ID inicial. Conviene verificar que la validación no rechace peticiones con `id == null` ni intente comprobar la existencia previa de dicho ID antes de persistir.
2. **Palabra reservada SQL en `FranjaHoraria`:**
   - El atributo `from` coincide con la palabra reservada SQL (`FROM`). Conviene mapear `@Column(name = "hora_inicio", nullable = false)` o utilizar backticks de escape para evitar problemas de compatibilidad en ciertas consultas.
3. **Asignación automática en `Reserva`:**
   - Implementar el hook `@PrePersist` para inicializar automáticamente `insertionDate = LocalDateTime.now()`.
4. **Recursión cíclica en serialización JSON:**
   - Debido a las relaciones bidireccionales (`Profesor.reserva`, `Aula.reservas`, `FranjaHoraria.reservas`), Jackson puede lanzar `StackOverflowError`. Se debe gestionar mediante `@JsonIgnoreProperties` o DTOs.

---

## 🛠️ 6. Reglas de Conducta para Agentes

1. **Cumplimiento estricto del registro en `DOC.md`:** Tras procesar cualquier petición del usuario, actualizar [`DOC.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/DOC.md) con el resumen de la petición, cambios realizados e información relevante.
2. **Conservar comentarios y estilo del alumno:** Respetar los comentarios existentes y no sobrecomplicar la arquitectura.
3. **Claridad para DAM:** Escribir código Java comprensible y defendible en un examen presencial de Grado Superior DAM.
