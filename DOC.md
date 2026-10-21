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
