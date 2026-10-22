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

