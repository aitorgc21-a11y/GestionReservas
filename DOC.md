# DOC.md - Registro de Peticiones y Cambios Asistidos por IA

Este documento sirve como **bitácora estructurada de desarrollo asistido por IA**, dando cumplimiento al requisito de documentación de la práctica. En él se registran cronológicamente todas las peticiones realizadas al asistente de IA, los cambios efectuados en el repositorio y la información técnica relevante de cada intervención.

> **Nota de autoría:** La arquitectura base del proyecto, las entidades JPA, los repositorios, la configuración del entorno y `ProfesorController` fueron desarrollados manualmente por el alumno sin intervención de IA. La asistencia de IA comienza a partir de la fase de documentación y tareas posteriores.

---

## 📌 Petición 1: Análisis del Proyecto y Generación de Documentación (README, AGENTS, DOC)

- **Fecha:** 21 de octubre de 2026
- **Resumen de la Petición:**
  - Analizar el proyecto en su estado actual, incluyendo el enunciado oficial (`Enunciado.odt`) y el esquema de base de datos (`BBDD.png`).
  - Crear el archivo `README.md` con la documentación general del proyecto.
  - Crear el archivo `AGENTS.md` con el contexto técnico completo para agentes de IA, detallando todos los archivos del repositorio y las especificaciones de la práctica.
  - Crear un archivo de documentación (`DOC.md`) para registrar las peticiones del usuario, los cambios efectuados y la información técnica relevante, incluyendo esta misma petición inicial.
- **Cambios Efectuados:**
  - **[`README.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/README.md):** Creado con la descripción del sistema de gestión de reservas, diagrama entidad-relación en Mermaid, estructura de archivos, requisitos de despliegue en MariaDB (`app_db`), catálogo de endpoints implementados y pendientes, y enlaces a la documentación complementaria.
  - **[`AGENTS.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/AGENTS.md):** Creado con el contexto académico de 2.º DAM (Acceso a Datos), inventario detallado de todos los archivos del proyecto, desglose de requisitos obligatorios (códigos HTTP, `@PrePersist` en reservas, filtros de aulas, validaciones temporales y frontend vanilla en `/frontend`).
  - **[`DOC.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/DOC.md):** Creado como bitácora de seguimiento.
- **Información Relevante y Observaciones Técnicas:**
  - Se identificó que en `FranjaHoraria.java` el atributo `from` coincide con la palabra reservada `FROM` en SQL, por lo que conviene escapar la columna o mapearla con `@Column(name = "hora_inicio")`.
  - Se identificó que la entidad `Reserva.java` requerirá la anotación `@PrePersist` para asignar `insertionDate = LocalDateTime.now()` de forma automática según pide el enunciado.
  - Se constató que para el frontend se exige estrictamente HTML5, CSS3 y JavaScript vanilla en la carpeta `/frontend` sin librerías externas.

---

## 📌 Petición 2: Regla de Registro Obligatorio en AGENTS.md y Reformulación de DOC.md

- **Fecha:** 21 de octubre de 2026
- **Resumen de la Petición:**
  - Establecer de forma explícita en `AGENTS.md` la directriz obligatoria de que **cada consulta que el usuario formule a la IA debe quedar registrada en `DOC.md`**, de forma resumida, junto con los cambios realizados y la información relevante.
  - Reformular `DOC.md` para que contenga única y exclusivamente el registro estructurado de las peticiones del usuario con sus cambios e información relevante, aclarando que el estado actual del proyecto fue desarrollado íntegramente por el alumno de forma manual, sin intervención previa de IA.
- **Cambios Efectuados:**
  - **[`AGENTS.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/AGENTS.md):**
    - Se añadió una sección prioritaria destacada (*Sección 2: Regla Fundamental de Operación para Agentes: Registro Obligatorio en DOC.md*) donde se estipula que en cada petición el agente debe registrar la entrada correspondiente en `DOC.md`.
    - Se aclaró explícitamente en la Sección 1 la autoría del alumno sobre el código base existente sin IA.
  - **[`DOC.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/DOC.md):**
    - Se reescribió por completo para ajustarse estrictamente al formato solicitado: registro limpio y correlativo de peticiones, cambios efectuados e información técnica relevante.
    - Se eliminaron las referencias erróneas a "errores cometidos por la IA" sobre el código base original del usuario.
- **Información Relevante:**
  - Esta estructura garantiza que cualquier agente o modelo de IA que trabaje en las siguientes fases mantendrá actualizado el archivo `DOC.md` como registro continuo de trabajo.

---

## 📌 Petición 3: Análisis y Creación de Métodos de Actualización en ProfesorController

- **Fecha:** 21 de octubre de 2026
- **Razón de la petición:**
  - Quería saber simplemente cómo sería un método para actualizar simplemente un campo en específico.
- **Resumen de la Petición:**
  - Analizar el proyecto y `ProfesorController`.
  - Crear uno o dos métodos (si no es suficiente con uno) para actualizar los datos de un profesor ya existente, respondiendo a si es posible actualizar su ID.
  - Implementar de la forma más sencilla posible, con comentarios explicativos y siguiendo el formato de respuestas (`ResponseEntity`) ya utilizado en la clase.
- **Cambios Efectuados:**
  - **[`ProfesorController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/ProfesorController.java):**
    - Se mantuvo y perfeccionó el método existente `PUT /{id}` (`update`) para la **actualización completa** (reemplazo total de la entidad), asegurando comentarios didácticos y la asignación `profesor.setId(id)`.
    - Se añadió el método `PATCH /{id}` (`updateParcial`) para la **actualización parcial**: busca la entidad existente en la base de datos con `profesorRepository.findById(id)` y actualiza únicamente los campos no nulos recibidos en el JSON de la petición sin machacar el resto con valores nulos.
    - Se importó `java.util.Optional` para la gestión limpia de existencia.
  - **[`README.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/README.md):**
    - Se añadió el endpoint `PATCH /profesores/{id}` en el catálogo de endpoints implementados.
- **Información Relevante y Decisiones Técnicas:**
  - **Imposibilidad e inconveniencia de modificar el `id`:** Se analizó técnicamente por qué el `id` no se puede (ni se debe) actualizar:
    1. Está anotado con `@GeneratedValue(strategy = GenerationType.IDENTITY)`, lo que delega la clave primaria autoincremental al motor MariaDB.
    2. Hibernate considera inmutable el identificador de una entidad gestionada; alterar el `@Id` provoca excepciones de persistencia (`HibernateException: identifier of an instance was altered`).
    3. Rompe la integridad referencial con las reservas asociadas (clave foránea `profesor_id`).
    4. En la arquitectura REST, la URL `/profesores/{id}` representa la identidad del recurso; por tanto, el método fija forzosamente `profesor.setId(id)`.
  - **Diferencia entre `PUT` y `PATCH`:** En un examen de 2.º DAM es clave distinguir que `PUT` sustituye todo el recurso (si un campo no viene informado, se guardaría como null o fallaría la restricción `nullable = false`), mientras que `PATCH` comprueba campo por campo con `if (campo != null)` para modificar solo lo deseado. Ambos devuelven `200 OK` con el profesor actualizado o `404 Not Found` si no existe.

---

## 📌 Petición 4: Creación de Controladores REST para Aula, FranjaHoraria y Reserva

- **Fecha:** 21 de octubre de 2026
- **Razón de la petición:**
  - El alumno solicita delegar en la IA la creación de los controladores de las tres entidades restantes (`Aula`, `FranjaHoraria` y `Reserva`) dado que se trata de una tarea repetitiva y mecánica cuya estructura y funcionamiento ya domina completamente (tras haber desarrollado manualmente `ProfesorController`).
- **Resumen de la Petición:**
  - Analizar el estado actual del proyecto.
  - Generar los controladores REST para `Aula`, `FranjaHoraria` y `Reserva`.
  - Mantener con total exactitud la misma estructura, nombres de métodos y lógica de respuestas (`ResponseEntity`, `GET`, `POST`, `PUT`, `PATCH`, `DELETE`) de `ProfesorController`, adaptados a los atributos de cada entidad.
  - **Exclusión explícita:** No implementar ni añadir lo estipulado en el **apartado 2 del enunciado** (filtros de aulas por `ordenadores` y `capacidad` mediante `@RequestParam`), ya que el alumno lo desarrollará manualmente por su cuenta sin asistencia de IA.
  - Registrar en `DOC.md` el motivo explícito de la delegación conforme a lo realizado en la Petición 3.
- **Cambios Efectuados:**
  - **[`AulaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/AulaController.java):**
    - Creado en `com.juanbosco.gestionreservas.controller` con `@RequestMapping("/aulas")`.
    - Endpoints implementados:
      - `GET /aulas` (`aulas()`): Retorna lista completa (`200 OK`). Se dejó exento de parámetros de filtro a petición del usuario.
      - `GET /aulas/{id}` (`findById`): Retorna aula (`200 OK`) o `404 Not Found`.
      - `POST /aulas` (`create`): Valida que `id == null` y `name != null`, retornando `201 Created` con el aula guardada o `400 Bad Request`.
      - `PUT /aulas/{id}` (`update`): Actualización completa, asignando el id de la URL (`200 OK` o `404 Not Found`).
      - `PATCH /aulas/{id}` (`updateParcial`): Actualización de atributos enviados sin sobreescribir el resto con nulos.
      - `DELETE /aulas/{id}` (`deleteById`): Eliminación con verificación previa de existencia (`204 No Content` o `404 Not Found`).
  - **[`FranjaHorariaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/FranjaHorariaController.java):**
    - Creado con `@RequestMapping({"/franjas-horarias", "/franjas"})` para dar soporte a ambas variantes de ruta.
    - Endpoints implementados:
      - `GET /franjas-horarias` (`franjasHorarias()`): Lista todas las franjas horarias (`200 OK`).
      - `GET /franjas-horarias/{id}` (`findById`): Consulta por ID (`200 OK` o `404 Not Found`).
      - `POST /franjas-horarias` (`create`): Valida `id == null` y campos no nulos `from` y `to` (`201 Created` o `400 Bad Request`).
      - `PUT /franjas-horarias/{id}` (`update`): Modificación total fijando el ID (`200 OK` o `404 Not Found`).
      - `PATCH /franjas-horarias/{id}` (`updateParcial`): Modificación selectiva de `from` y/o `to` (`200 OK` o `404 Not Found`).
      - `DELETE /franjas-horarias/{id}` (`deleteById`): Eliminación (`204 No Content` o `404 Not Found`).
  - **[`ReservaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/ReservaController.java):**
    - Creado con `@RequestMapping("/reservas")`.
    - Endpoints implementados:
      - `GET /reservas` (`reservas()`): Lista de reservas registradas (`200 OK`).
      - `GET /reservas/{id}` (`findById`): Consulta por ID (`200 OK` o `404 Not Found`).
      - `POST /reservas` (`create`): Valida `id == null`, `date != null` y autocompleta `insertionDate = LocalDateTime.now()` en caso de venir vacía (`201 Created` o `400 Bad Request`).
      - `PUT /reservas/{id}` (`update`): Modificación total asegurando `id` y preservando o inicializando `insertionDate` (`200 OK` o `404 Not Found`).
      - `PATCH /reservas/{id}` (`updateParcial`): Modificación selectiva de `date`, `profesor`, `aula`, `franjasHorarias` o `insertionDate` (`200 OK` o `404 Not Found`).
      - `DELETE /reservas/{id}` (`deleteById`): Eliminación (`204 No Content` o `404 Not Found`).
  - **[`README.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/README.md):**
    - Actualizado el árbol de archivos con los 3 nuevos controladores.
    - Actualizada la tabla de endpoints implementados con las rutas de Aulas, Franjas Horarias y Reservas.
- **Información Relevante y Decisiones Técnicas:**
  - **Apartado 2 excluido intacto:** No se implementó ningún filtro por query params (`ordenadores` ni `capacidad`) en `AulaController`. De este modo, el alumno tiene la base limpia para aplicar su propia lógica de consultas especiales y anotaciones `@RequestParam`.
  - **Consistencia metodológica:** Los tres controladores siguen idéntico patrón de inyección por constructor, estructura de respuestas `ResponseEntity`, manejo funcional con `.map().orElseGet()`, comprobación de ID en creación y actualización parcial campo a campo con `PATCH`.
  - **Manejo de `insertionDate` en Reservas:** Para garantizar que `POST /reservas` no falle por restricción de columna `nullable = false` en la base de datos mientras el alumno implementa `@PrePersist` en la entidad `Reserva`, el controlador asigna `LocalDateTime.now()` por defecto si el payload no incluye `insertionDate`.

---

## 📌 Petición 5: Verificación y Optimización de Consultas Especiales en Aula (Apartado 2)

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - Analizar el proyecto y los cambios no commiteados realizados manualmente por el alumno en `Aula.java`, `AulaRepository.java` y `AulaController.java`.
  - Verificar si la documentación de los endpoints en comentarios y la implementación del método `findAll` con parámetros de consulta (`@RequestParam`) son correctas.
  - Explicar aciertos, posibles fallos y aplicar los ajustes necesarios manteniendo el enfoque y estilo del alumno.
- **Cambios Efectuados:**
  - **[`AulaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/AulaController.java):**
    - Se homogeneizó el tipo de retorno a `ResponseEntity<List<Aula>>` devolviendo `ResponseEntity.ok(...)` para mantener la consistencia con el resto del proyecto y cumplir formalmente con la especificación 1.
    - Se añadió soporte dual tanto para el parámetro `capacidad` (indicado textualmente en el enunciado oficial de la práctica) como para `capacity` (nombre en inglés del atributo en la entidad), asignando `Integer cap = (capacidad != null) ? capacidad : capacity;`.
    - Se actualizaron los comentarios explicativos superiores del endpoint reflejando ambas posibilidades de consulta.
  - **[`README.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/README.md):**
    - Se actualizó la tabla de endpoints y la sección de Aulas, documentando formalmente los parámetros de consulta `?ordenadores=true`, `?capacidad=20` y su uso combinado.
- **Información Relevante y Decisiones Técnicas:**
  - **Validación del trabajo manual del alumno:**
    1. **Entidad (`Aula.java`):** El cambio del tipo de dato `int` a `Integer` en `capacity` es una excelente decisión técnica, ya que permite valores nulos en Hibernate y en peticiones parciales.
    2. **Repositorio (`AulaRepository.java`):** La definición de `findByOrdenadores(Boolean)`, `findByCapacityGreaterThan(Integer)` y `findByOrdenadoresAndCapacityGreaterThan(Boolean, Integer)` es 100% correcta y sigue a la perfección la convención de *Derived Query Methods* de Spring Data JPA.
    3. **Lógica condicional:** La estructura de bifurcaciones `if` para filtrar según qué parámetros vengan informados era impecable.
  - **Detección de discrepancia de nomenclatura:** El enunciado solicita explícitamente `?capacidad=20` (en español), mientras que en Java el atributo se llama `capacity`. Si un evaluador lanza peticiones con `?capacidad=20`, Spring no habría detectado el parámetro si solo se declaraba `Integer capacity`. Con el soporte dual se garantiza compatibilidad total tanto con las pruebas automáticas o manuales del profesor como con llamadas usando el nombre del atributo.
  - **Aclaración sobre la errata del enunciado:** En el enunciado se menciona como ejemplo `/aulas/21?ordenadores=true` y `/aulas/21?capacidad=20`. Se constata que el `/21` se trata de un desliz tipográfico del redactor del enunciado, ya que consultar una colección de aulas mediante filtros sobre un recurso individual carece de sentido semántico en REST. La implementación sobre `/aulas` con `@RequestParam` realizada por el alumno es la correcta según los estándares de la arquitectura REST.

---

## 📌 Petición 6: Auditoría Global del Proyecto frente al Enunciado y Reestructuración del README

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - Analizar el estado global del proyecto y cotejarlo contra todas las especificaciones del enunciado oficial (`Enunciado.odt`).
  - Indicar al alumno qué requisitos están completados y qué elementos faltan por implementar.
  - Corregir discrepancias o fallos técnicos detectados en la lógica de validación de reservas.
  - Documentar en `README.md` la información técnica, estructurada, clara y legible por humanos, incluyendo las secciones requeridas por el enunciado (decisiones tomadas con IA, problemas encontrados, prompts y errores corregidos).
- **Cambios Efectuados:**
  - **[`Reserva.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Reserva.java):**
    - Se añadió el método `@PrePersist` para inicializar automáticamente `insertionDate = LocalDateTime.now()` en la propia entidad, dando cumplimiento literal al requisito de la Especificación 1.
  - **[`ReservaRepository.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/repository/ReservaRepository.java):**
    - Se sustituyó la consulta con `id` y colección de listas por `existsByAulaAndDateAndFranjasHorariasIn(Aula aula, LocalDate date, Collection<FranjaHoraria> franjasHorarias)`, permitiendo a JPA comprobar solapamientos reales en el aula y fecha seleccionadas.
  - **[`ReservaService.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/service/ReservaService.java):**
    - Se limpió la comprobación de fecha nula, fecha anterior a `LocalDate.now()` y solapamiento de franjas horarias sobre el repositorio.
  - **[`ReservaController.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/ReservaController.java):**
    - Se corrigió el condicional invertido en `POST /reservas` (`if (!reservaService.valida(reserva))` en lugar de `if (reservaService.valida(reserva))`).
    - Se eliminó la asignación manual de `insertionDate` delegándola en el hook `@PrePersist` de la entidad.
  - **[`README.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/README.md):**
    - Se reescribió y sintetizó para ofrecer una documentación limpia, legible por humanos y completa: arquitectura Mermaid, puesta en marcha local, catálogo integral de endpoints con sus códigos HTTP, descripción de las reglas de validación de reservas y la sección obligatoria del apartado 5 (decisiones adoptadas, problemas/errores corregidos y prompts de ejemplo).
- **Información Relevante y Decisiones Técnicas:**
  - **Diagnóstico del estado del proyecto frente al enunciado:**
    - *Especificación 1 (CRUD y códigos HTTP):* Completo. La asignación automática de `insertionDate` ya opera desde la entidad.
    - *Especificación 2 (Consultas de aulas):* Completo con soporte para `ordenadores` y `capacidad` / `capacity`.
    - *Especificación 3 (Validaciones de reservas):* Completo y corregido tras solucionar la condición invertida y la consulta de solapamiento.
    - *Especificación 4 (Frontend):* **Pendiente**. No existe la carpeta `/frontend` en el repositorio; el alumno debe desarrollarla con HTML, CSS y JS vanilla.
    - *Especificación 5 (Documentación):* Completo (`AGENTS.md`, `README.md` actualizado y `DOC.md` al día).

---

## 📌 Petición 7: Implementación del Frontend Ligero y Optimización de la Serialización JSON

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - Analizar el estado global del proyecto.
  - Crear el frontend ligero solicitado en el Apartado 4 del enunciado, ubicado en la carpeta `/frontend`.
  - Diseñar una interfaz moderna, visualmente atractiva y 100% funcional, construida exclusivamente con HTML5, CSS3 y JavaScript vanilla (sin frameworks ni librerías externas).
  - Incorporar herramientas didácticas para entender el funcionamiento interno de la aplicación (inspector de tráfico HTTP en vivo, visualización de respuestas JSON, control de reglas de negocio y carga rápida de datos de demostración).
- **Cambios Efectuados:**
  - **[`frontend/index.html`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/frontend/index.html):**
    - Creada la estructura semántica de la aplicación web con navegación por pestañas (Reservas, Aulas & Filtros, Profesores, Franjas Horarias e Inspector de API).
    - Incorporada tabla interactiva de reservas con columna dedicada para `insertionDate` (`@PrePersist`).
    - Diseñado panel interactivo para el Apartado 2 con previsualización en tiempo real de la URL con query params (`/aulas?ordenadores=true&capacidad=20`).
    - Formularios modales para el alta de reservas, aulas, profesores y franjas horarias.
    - Contenedor de notificaciones toast y modal de configuración de URL del backend.
  - **[`frontend/css/styles.css`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/frontend/css/styles.css):**
    - Creado tema visual moderno basado en tonos slate oscuros (`#0b1120`, `#1e293b`), contrastes cuidados, transiciones suaves y acentos de color (índigo, esmeralda, ámbar, rojo).
    - Maquetación completamente adaptable (*responsive*) con CSS Grid y Flexbox.
    - Estilos específicos para visualización de código JSON, chips de métodos HTTP (`GET`, `POST`, `DELETE`), interruptores tipo toggle y tarjetas informativas.
  - **[`frontend/js/app.js`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/frontend/js/app.js):**
    - Implementado cliente REST asíncrono con `fetch` que intercepta llamadas, mide latencias y captura payloads de petición y respuesta.
    - Lógica de negocio de creación de reservas con validación de fecha no pasada y captura de error `400 Bad Request` en caso de franja horaria ocupada.
    - Gestión de filtros dinámicos de aulas enviando `@RequestParam` según los controles de la UI.
    - Monitor e Inspector de API en vivo que traduce cada respuesta del backend en una explicación didáctica en español sobre la regla de negocio aplicada.
    - Seeder automático ("⚡ Cargar Datos Demo") que inserta datos coherentes para facilitar la grabación del vídeo evaluativo.
  - **[`Reserva.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Reserva.java), [`Profesor.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Profesor.java), [`Aula.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Aula.java), [`FranjaHoraria.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/FranjaHoraria.java):**
    - Incorporada la anotación `@JsonIgnoreProperties` en las relaciones bidireccionales para evitar la recursión infinita en Jackson (`Infinite recursion / StackOverflowError`) al consultar reservas o entidades relacionadas desde el frontend.
  - **[`README.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/README.md) y [`AGENTS.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/AGENTS.md):**
    - Actualizado el catálogo de archivos, marcada la Especificación 4 como completada y añadido el apartado de documentación del frontend.
- **Información Relevante y Decisiones Técnicas:**
  - **Sin dependencias externas:** El frontend no requiere conexión a Internet (no usa CDNs de fuentes, Tailwind ni Bootstrap), lo cual garantiza máxima rapidez, compatibilidad en entornos de examen cerrados y cumplimiento estricto del enunciado ("únicamente HTML, CSS y JavaScript, sin frameworks").
  - **Compatibilidad con `file://`:** Al estar configurado `CorsConfig.java` con `allowedOriginPatterns("*")`, el alumno puede abrir `frontend/index.html` haciendo doble clic en el explorador de archivos sin necesidad de levantar un servidor web estático auxiliar.
  - **Soporte para grabación del vídeo de entrega (5-10 minutos):** El Inspector de API en vivo y el botón de carga de datos demo proporcionan una herramienta visual para que el estudiante muestre en pantalla qué petición envía el navegador, qué código HTTP devuelve Spring Boot y cómo se reflejan las validaciones de negocio exigidas en la práctica.

---

# ═══════════════════════════════════════════════════════════════════════════════
# 🛑 CORTE DE FASE: DEPURACIÓN INTEGRAL DE BACKEND, PERSISTENCIA Y RESOLUCIÓN DE ERRORES
# ═══════════════════════════════════════════════════════════════════════════════
> ### ⚠️ AVISO DE TRANSICIÓN METODOLÓGICA:
> **A partir de este punto exacto (Petición 8 en adelante), las peticiones del usuario han sido completamente sobre el BACKEND, la persistencia relacional con Spring Data JPA / Hibernate, el comportamiento de la base de datos MariaDB y la resolución de incidencias y errores que han ido surgiendo durante las pruebas de integración en tiempo de ejecución.**
>
> **Hito previo consolidado (Peticiones 1 a 7 - Fase I):**
> Quedaron formalmente implementados y auditados todos los requisitos funcionales del enunciado oficial de la práctica:
> 1. Especificación 1: Entidades JPA y controladores CRUD completos.
> 2. Especificación 2: Consultas filtradas de aulas con `@RequestParam`.
> 3. Especificación 3: Validaciones de reservas (fechas no pasadas y franjas libres).
> 4. Especificación 4: Frontend ligero e interactivo en `/frontend` (HTML5, CSS3 y JS vanilla).
> 5. Especificación 5: Documentación técnica completa.
>
> **Fase iniciada a partir de aquí (Peticiones 8 a 13 - Fase II):**
> Las consultas se centran en el análisis profundo del servidor, depuración de logs en consola, resolución de códigos de estado HTTP anómalos (`500 Internal Server Error`, `400 Bad Request`, `409 Conflict`), restricciones de claves foráneas (*Foreign Keys*) e interceptación de tráfico de red.
# ═══════════════════════════════════════════════════════════════════════════════

---

## 📌 Petición 8: Diagnóstico y Resolución del Error 500 al Crear Reservas

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - El usuario reporta que al crear una reserva con datos válidos desde la aplicación, el servidor responde con un código de error HTTP `500 Internal Server Error`.
  - Investigar la causa raíz de dicho fallo, corregirlo y explicar por qué se producía.
  - Asegurar la compatibilidad con el entorno de inspección de IntelliJ IDEA sin generar advertencias estáticas ni excepciones en tiempo de ejecución.
- **Cambios Efectuados:**
  - **[`Reserva.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/entity/Reserva.java):**
    - Se eliminó `cascade = CascadeType.PERSIST` de las relaciones `@ManyToOne` (`profesor`, `aula`) y `@ManyToMany` (`franjasHorarias`).
  - **[`ReservaRepository.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/repository/ReservaRepository.java):**
    - Se definió de forma explícita la consulta con `@Query("SELECT (COUNT(r) > 0) FROM Reserva r JOIN r.franjasHorarias f WHERE r.aula = :aula AND r.date = :date AND f IN :franjasHorarias")` con parámetros nombrados `@Param`, garantizando compatibilidad simultánea con el analizador de IntelliJ IDEA y con el motor Hibernate ORM.
  - **[`ReservaService.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/service/ReservaService.java):**
    - Se mantuvo el paso directo de la colección `reserva.getFranjasHorarias()` a la consulta de disponibilidad.
- **Información Relevante y Decisiones Técnicas:**
  - **Causa Raíz 1 - Excepción de cascada persistente en entidad desasociada (`PersistentObjectException / InvalidDataAccessApiUsageException`):**
    - Al enviar una reserva vía JSON con `{ "profesor": { "id": 1 }, "aula": { "id": 1 } }`, Jackson instancia objetos desasociados (*detached*) con su identificador ya poblado.
    - Debido a `cascade = CascadeType.PERSIST`, al invocar `reservaRepository.save(reserva)`, Hibernate interpretaba que debía propagar la operación de inserción (`persist()`) a dichas entidades existentes.
    - Según la especificación JPA, invocar `persist()` sobre una entidad desasociada que ya cuenta con clave primaria autoincremental genera `PersistentObjectException: Detached entity passed to persist: Aula/Profesor`, lo cual derivaba en el `HTTP 500`.
    - En el modelo relacional, las reservas son entidades dependientes (*hijas*) que referencian recursos ya existentes (*padres*); por tanto, no procede aplicar cascada de persistencia hacia el aula o el profesor.
  - **Causa Raíz 2 - Discrepancia de tipos en la consulta de solapamiento (`ClassCastException`):**
    - El plugin de Spring Data JPA en IntelliJ evaluaba estáticamente la propiedad `List<FranjaHoraria> franjasHorarias` esperando un contenedor `Collection<List<FranjaHoraria>>`. Al empaquetarlo con `Collections.singleton()`, Hibernate en ejecución intentaba castear la lista interna como si fuera una entidad individual `FranjaHoraria`, lanzando `java.lang.ClassCastException: Cannot cast to entity type 'FranjaHoraria'`.
    - La incorporación de `@Query` resuelve este dilema limpiamente: IntelliJ valida el tipo basándose en el alias del `JOIN` (que es `FranjaHoraria`), y Hibernate ejecuta la cláusula `f IN :franjasHorarias` sin fallos de casteo, respondiendo correctamente con `201 Created`.

---

## 📌 Petición 9: Seguimiento y Subida de Archivos JavaScript en Git e IntelliJ IDEA

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - El usuario consulta por qué Git no detecta el archivo `frontend/js/app.js` para ser subido a GitHub ni permite incluirlo en los commits.
  - Diagnosticar el estado de seguimiento del archivo en Git y en el IDE IntelliJ IDEA, y proporcionar las instrucciones exactas para subirlo al repositorio remoto.
- **Cambios Efectuados:**
  - **[`DOC.md`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/DOC.md):**
    - Se registró la consulta técnica sobre la gestión de archivos *untracked* / *unversioned* en Git e IntelliJ IDEA.
- **Información Relevante y Decisiones Técnicas:**
  - **Diagnóstico del archivo en Git:**
    1. Se verificó con `git check-ignore -v frontend/js/app.js` que el archivo **no** está ignorado por `.gitignore` ni por ninguna regla del sistema.
    2. El archivo existe en disco con permisos de lectura correctos (`-rw-r--r--`).
    3. `git status` muestra `frontend/js/` en estado *untracked* (sin seguimiento), ya que al haberse creado el subdirectorio y el archivo por una herramienta externa al IDE, Git no los versiona automáticamente hasta que se realiza un `git add`.
  - **Causa en IntelliJ IDEA:**
    - En IntelliJ, los archivos nuevos creados externamente aparecen agrupados en la sección **"Unversioned Files"** (Archivos no versionados, con color rojo o beige), separada de "Changes" (archivos ya rastreados modificados).
    - Si al hacer el commit en IntelliJ la casilla de "Unversioned Files" permanece desmarcada (comportamiento por defecto en muchos perfiles de IntelliJ), el archivo se omite del commit y por tanto no sube a GitHub.
  - **Solución provista:**
    - Hacer clic derecho sobre `frontend/js/app.js` en IntelliJ -> **Git -> Add** (o `Ctrl + Alt + A`), o marcar la casilla correspondiente en la ventana de Commit.
    - Alternativamente, ejecutar `git add frontend/js/app.js` en terminal para dejarlo preparado para commit y push.





---

## 📌 Petición 10: Diagnóstico de Errores al Eliminar Datos (Integridad Referencial y Configuración CORS)

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - El usuario reporta que no le permite eliminar ningún dato en la aplicación y pregunta por qué.
  - Analizar las causas del fallo en las operaciones `DELETE` tanto a nivel de protocolo HTTP/CORS como en la persistencia de base de datos relacional.
- **Cambios Efectuados:**
  - **[`CorsConfig.java`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/CorsConfig.java):**
    - Se añadió `.allowedHeaders("*")` y el método `OPTIONS` a la configuración CORS de Spring Boot para autorizar sin restricciones las peticiones *preflight* que los navegadores web emiten antes de ejecutar métodos destructivos como `DELETE`.
  - **[`frontend/js/app.js`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/frontend/js/app.js):**
    - Se optimizó `apiFetch` para no adjuntar cabecera `Content-Type: application/json` en peticiones que no tienen cuerpo (`DELETE` y `GET`), evitando disparar preflights innecesarios.
    - Se mejoraron las funciones `deleteAula`, `deleteProfesor` y `deleteFranja` para capturar respuestas `409 Conflict` o `500` e informar didácticamente al usuario de que la eliminación está impedida por existir reservas asociadas.
  - **[`AulaController.java`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/AulaController.java), [`ProfesorController.java`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/ProfesorController.java), [`FranjaHorariaController.java`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/FranjaHorariaController.java):**
    - Se incorporó bloque `try-catch` capturando `DataIntegrityViolationException` en los endpoints `DELETE /{id}` para devolver el código HTTP semántico `409 Conflict` en lugar de una excepción no controlada con código `500`.
- **Información Relevante y Decisiones Técnicas:**
  - **Concepto clave de Acceso a Datos: Integridad Referencial (Foreign Keys):**
    - En MariaDB / MySQL, las reservas actúan como registros dependientes (*hijos*) que tienen claves foráneas (`profesor_id`, `aula_id`, tabla intermedia `reserva_franjas_horarias`).
    - El motor relacional **prohíbe estrictamente** eliminar una fila padre si existen filas hijas que dependen de ella (`Cannot delete or update a parent row: a foreign key constraint fails`).
    - Por tanto, para eliminar un aula, un profesor o una franja horaria que esté en uso, es obligatorio eliminar previamente sus reservas asociadas en la pestaña de Reservas.
    - Las reservas individuales sí pueden eliminarse libremente en cualquier momento (`DELETE /reservas/{id}` $\rightarrow$ `204 No Content`).

---

## 📌 Petición 11: Diagnóstico Exhaustivo del Código HTTP 400 Bad Request en Creación de Reservas y Sincronización Horaria

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - El usuario reporta que al intentar crear una nueva reserva el servidor responde con un código HTTP `400 Bad Request`.
  - El inspector del frontend muestra el mensaje indicando que *"la fecha es anterior a la actual o ya está ocupada ese aula para esa franja"*, pero el usuario asegura que ninguna de las dos condiciones es cierta (la fecha seleccionada no es pasada y el aula no estaba ocupada).
  - Solicita analizar detalladamente qué está ocurriendo internamente y dónde se origina el problema.
- **Cambios Efectuados:**
  - **[`ReservaService.java`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/service/ReservaService.java):**
    - Se incorporaron trazas de depuración informativas por consola (`System.out.println`) en cada una de las condiciones de guarda del método `valida()`:
      1. Fecha o aula nulas.
      2. Fecha anterior a `LocalDate.now()`.
      3. Aula ocupada en la franja y fecha solicitadas según la consulta del repositorio.
    - Se mantuvo intacta la firma y los parámetros originales exigidos por las comprobaciones de IntelliJ IDEA.
  - **[`ReservaController.java`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/controller/ReservaController.java):**
    - Se añadió traza de depuración cuando la petición `POST /reservas` incluye un `id` en el cuerpo del JSON (causa habitual de 400 en pruebas con Postman).
  - **[`frontend/js/app.js`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/frontend/js/app.js):**
    - Se sustituyó el uso de `new Date().toISOString().split('T')[0]` por una función local `getLocalDateString()` que utiliza la fecha del sistema local del usuario (`getFullYear()`, `getMonth()`, `getDate()`). Esto previene el clásico desfase de zona horaria UTC que en horarios nocturnos en España (CEST / UTC+2) genera la fecha de ayer y provoca el rechazo de `date.isBefore(now)`.
    - Se actualizó el texto explicativo didáctico del inspector de red para el código 400, desglosando todas las causas posibles en lugar de atribuirlo exclusivamente a fecha o solapamiento.
    - Se mejoró el mensaje Toast de error 400 indicando al usuario que revise la consola de ejecución de Spring Boot en IntelliJ.
  - **[`GestionReservasApplicationTests.java`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/src/test/java/com/juanbosco/gestionreservas/GestionReservasApplicationTests.java):**
    - Se verificó mediante prueba unitaria la persistencia y la detección de reservas duplicadas contra la base de datos MariaDB activa, restaurando el archivo a su estado limpio (`contextLoads`).
- **Información Relevante y Decisiones Técnicas:**
  - **Causa 1: Origen del mensaje mostrado en pantalla:**
    - El controlador `ReservaController.create()` responde `ResponseEntity.status(HttpStatus.BAD_REQUEST).build()`, es decir, un HTTP 400 **con el cuerpo totalmente vacío**.
    - El mensaje *"la fecha es anterior a la actual o ya está ocupada ese aula para esa franja"* no provenía de Spring Boot ni de MariaDB, sino que era una deducción predefinida en el cliente JavaScript del inspector al detectar el código 400.
  - **Causa 2: Desfase UTC vs Zona Local en navegadores (`toISOString`):**
    - En JavaScript, `toISOString()` convierte la fecha a UTC (meridiano 0). En la franja horaria de España (UTC+2 en verano CEST o UTC+1 en invierno CET), si un usuario abre la aplicación en las primeras horas del día, `toISOString()` calcula las horas del día anterior, enviando `2026-10-21` en vez de `2026-10-22`. Al comparar en el servidor contra `LocalDate.now()`, la condición `isBefore` resulta verdadera y deniega la reserva.
  - **Causa 3: Estructura del JSON en pruebas manuales (Postman):**
    - Si la prueba se efectúa desde Postman, enviar campos planos como `"aula": 1`, `"aulaId": 1` o `"fecha": "..."` provoca que Jackson asigne `null` o lance `HttpMessageNotReadableException`, retornando 400. Igualmente, enviar `"id": ...` activa la comprobación `if (reserva.getId() != null) return 400`.
  - **Causa 4: Reservas preexistentes de pruebas anteriores o demo:**
    - La consulta de solapamiento comprueba franjas horarias a nivel de base de datos. Si el aula y la franja horaria elegidas coincidían con una reserva insertada previamente en la tabla `reserva_franjas_horarias`, la validación retorna `ocupada = true`.
  - Con las trazas añadidas en `ReservaService` y `ReservaController`, el alumno puede observar en la consola de IntelliJ el motivo exacto por el que se rechaza cualquier reserva.

---

## 📌 Petición 12: Corrección del Error de Eliminación en Frontend y Sustitución de Diálogos Nativos por Modal de Confirmación

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - El usuario reporta un fallo en el frontend: al pulsar el icono o botón de eliminar en cualquier registro (reservas, aulas, profesores o franjas horarias), la aplicación no elimina el dato ni muestra ningún tipo de mensaje, incluso en registros que no tienen reservas asociadas (como un profesor recién creado).
  - Analizar las causas del fallo en la interfaz de usuario y solventarlo de forma limpia y moderna.
- **Cambios Efectuados:**
  - **[`frontend/index.html`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/frontend/index.html):**
    - Se incorporó el nuevo modal de confirmación `modalConfirmDelete` (`#modalConfirmDeleteTitle`, `#modalConfirmDeleteMessage`, `#modalConfirmDeleteWarning` y `#btnConfirmDeleteAction`), eliminando la dependencia de la función nativa y síncrona `window.confirm()`.
  - **[`frontend/css/styles.css`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/frontend/css/styles.css):**
    - Se definieron las clases `.btn-danger` y `.btn-danger:hover` para estilizar coherentemente los botones de confirmación de borrado en tonos carmesí/rojo con soporte de sombreado y transición suave.
  - **[`frontend/js/app.js`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/frontend/js/app.js):**
    - Se implementó la función gestora `requestConfirmAction({ title, message, warning, btnText, onConfirm })` que muestra el modal personalizado sin bloquear el hilo principal de JavaScript ni depender del navegador.
    - Se adaptaron las funciones de eliminación (`confirmDeleteReserva`, `deleteAula`, `deleteProfesor`, `deleteFranja`) y la carga de datos de prueba (`seedDemoData`) para invocar el nuevo modal visual.
    - Se añadió `type="button"` a todos los botones de borrado generados dinámicamente en tablas y tarjetas para evitar comportamientos accidentales de envío de formulario.
    - Se expusieron explícitamente en el objeto global `window` todas las funciones de acción de la interfaz (`window.deleteProfesor = deleteProfesor`, etc.) para asegurar compatibilidad total con los manejadores inline `onclick`.
- **Información Relevante y Decisiones Técnicas:**
  - **Causa Raíz del Bloqueo Silencioso (`window.confirm`):**
    - Las implementaciones anteriores utilizaban `if (!confirm(...)) return;` como paso previo a emitir la llamada `apiFetch(..., { method: 'DELETE' })`.
    - En entornos de previsualización integrados como el **Built-in Preview de IntelliJ IDEA** (basado en JCEF / Java Chromium Embedded Framework) o en navegadores donde el usuario ha marcado la casilla de suprimir diálogos emergentes, la llamada a `window.confirm()` devuelve de forma inmediata `false` sin pintar ninguna ventana en pantalla.
    - Como consecuencia, la condición de retorno se cumplía inmediatamente: la función finalizaba en la primera línea sin emitir la petición HTTP, sin mostrar notificaciones toast y sin añadir trazas al inspector, dando la impresión de que el botón no respondía.
    - La sustitución por un modal propio en HTML/CSS garantiza que la confirmación se muestre siempre con el mismo estilo visual oscuro del proyecto, independientemente del navegador o motor de renderizado utilizado.

---

## 📌 Petición 13: Delimitación Estructural de Fases en DOC.md (Transición a Depuración del Backend)

- **Fecha:** 22 de octubre de 2026
- **Resumen de la Petición:**
  - Realizar una delimitación (*corte*) visible y formal en el archivo `DOC.md` en el punto exacto que indique que, a partir de ese momento, las peticiones del usuario han sido completamente sobre el backend y los errores que han ido surgiendo.
- **Cambios Efectuados:**
  - **[`DOC.md`](file:///media/usumaniana/CORSAIR%201TB/Formación/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2º%20Año/PDAU/UT1/Practicas/GestionReservas/DOC.md):**
    - Se insertó un bloque destacado de separación entre la **Petición 7** (donde se culminó el desarrollo funcional exigido por el enunciado, incluyendo el frontend ligero en `/frontend`) y la **Petición 8** (donde comenzaron las pruebas de integración en vivo y surgieron los errores de backend).
    - Se detalló en dicho bloque el hito previo consolidado (Fase I: implementación de las 5 especificaciones) y la naturaleza de la fase posterior (Fase II: depuración profunda del backend, persistencia con Hibernate/MariaDB, claves foráneas y resolución de incidencias en códigos HTTP 500, 400 y 409).
- **Información Relevante y Decisiones Técnicas:**
  - **Ubicación exacta del corte:**
    - El punto cronológico y técnico de transición es inmediatamente posterior a la **Petición 7**. Hasta esa petición, las tareas consistieron en la construcción y estructuración de los requisitos de la práctica (controladores, endpoints, consultas `@RequestParam` y la creación de la interfaz web en `/frontend`).
    - A partir de la **Petición 8**, el usuario comenzó a ejecutar el proyecto en su conjunto, interactuando con la API y detectando los problemas reales de persistencia y lógica (cascada de entidades desasociadas, formato de consultas JPQL, desfase horario UTC/local y restricciones de clave foránea en la base de datos). El corte señaliza con precisión este cambio de enfoque para el profesor y el evaluador.
