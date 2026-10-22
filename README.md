# Sistema de Gestión de Reservas de Aulas

[![Java](https://img.shields.io/badge/Java-21%2B%20%2F%2025-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x%20%2F%204.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Database](https://img.shields.io/badge/Database-MariaDB%20%2F%20MySQL-blue.svg)](https://mariadb.org/)
[![Lombok](https://img.shields.io/badge/Lombok-Enabled-red.svg)](https://projectlombok.org/)

Proyecto desarrollado para el módulo de **Acceso a Datos** de 2.º curso de **Desarrollo de Aplicaciones Multiplataforma (DAM)**.

---

## 📌 1. Descripción del Proyecto

API RESTful orientada a gestionar la asignación, disponibilidad y reserva de espacios en un centro educativo.

El sistema administra:
- **Profesores:** Docentes autorizados para realizar reservas.
- **Aulas:** Espacios físicos con información de capacidad, planta y dotación de equipos informáticos.
- **Franjas Horarias:** Intervalos de horas lectivas predefinidas (`desde` y `hasta`).
- **Reservas:** Asignaciones de un aula a un profesor en una fecha y franja horaria determinada, impidiendo solapamientos.

---

## 🏗️ 2. Modelo de Datos y Arquitectura

```mermaid
erDiagram
    PROFESOR ||--o{ RESERVA : "realiza (1:N)"
    AULA ||--o{ RESERVA : "alberga (1:N)"
    RESERVA }|--|{ FRANJA_HORARIA : "ocupa (N:M)"

    PROFESOR {
        Long id PK
        String name
        String surname
        String email UK
        LocalDate birthDate
        String dni UK
        String telefono
    }

    AULA {
        Long id PK
        String name
        Boolean ordenadores
        Integer capacity
        Integer floor
        String description
    }

    FRANJA_HORARIA {
        Long id PK
        LocalTime desde
        LocalTime hasta
    }

    RESERVA {
        Long id PK
        LocalDateTime insertionDate
        LocalDate date
        Long profesor_id FK
        Long aula_id FK
    }
```

---

## ⚙️ 3. Puesta en Marcha Local

### Prerrequisitos
- **Java:** JDK 21 o 25 instalado.
- **Base de datos:** MariaDB o MySQL escuchando en `localhost:3306`.
- **Maven:** Incluido en el repositorio mediante `./mvnw`.

### Configuración de Base de Datos
En `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/app_db
spring.datasource.username=aitor
spring.datasource.password=aitor123
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
```

### Ejecución
```bash
./mvnw clean spring-boot:run
```
Servidor disponible en `http://localhost:8080`.

---

## 🔌 4. Catálogo de Endpoints REST

Todas las respuestas utilizan códigos de estado HTTP semánticos (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`).

### 1. Profesores (`/profesores`)
| Método | Endpoint | Descripción | Códigos HTTP |
|---|---|---|---|
| `GET` | `/profesores` | Lista todos los profesores | `200` |
| `GET` | `/profesores/{id}` | Obtiene profesor por ID | `200`, `404` |
| `POST` | `/profesores` | Crea un profesor | `201`, `400` |
| `PUT` | `/profesores/{id}` | Actualización completa de profesor | `200`, `404` |
| `PATCH` | `/profesores/{id}` | Actualización parcial de campos | `200`, `404` |
| `DELETE` | `/profesores/{id}` | Elimina profesor por ID | `204`, `404` |

### 2. Aulas (`/aulas`) - Filtros y Consultas Especiales
| Método | Endpoint | Descripción | Códigos HTTP |
|---|---|---|---|
| `GET` | `/aulas` | Lista aulas (admite filtros por query param) | `200` |
| `GET` | `/aulas/{id}` | Obtiene aula por ID | `200`, `404` |
| `POST` | `/aulas` | Crea un aula | `201`, `400` |
| `PUT` | `/aulas/{id}` | Actualización completa de aula | `200`, `404` |
| `PATCH` | `/aulas/{id}` | Actualización parcial de aula | `200`, `404` |
| `DELETE` | `/aulas/{id}` | Elimina aula por ID | `204`, `404` |

**Filtros mediante parámetros de consulta (`@RequestParam`):**
- `/aulas?ordenadores=true`: Filtra aulas que tienen ordenadores.
- `/aulas?capacidad=20` (o `?capacity=20`): Aulas con capacidad estrictamente superior al número indicado.
- `/aulas?ordenadores=true&capacidad=20`: Combinación simultánea de ambos filtros.

### 3. Franjas Horarias (`/franjas-horarias` / `/franjas`)
| Método | Endpoint | Descripción | Códigos HTTP |
|---|---|---|---|
| `GET` | `/franjas-horarias` | Lista franjas horarias | `200` |
| `GET` | `/franjas-horarias/{id}` | Obtiene franja por ID | `200`, `404` |
| `POST` | `/franjas-horarias` | Crea una franja horaria (`desde`, `hasta`) | `201`, `400` |
| `PUT` | `/franjas-horarias/{id}` | Modificación total | `200`, `404` |
| `PATCH` | `/franjas-horarias/{id}` | Modificación parcial | `200`, `404` |
| `DELETE` | `/franjas-horarias/{id}` | Elimina franja por ID | `204`, `404` |

### 4. Reservas (`/reservas`) - Reglas de Negocio
| Método | Endpoint | Descripción | Códigos HTTP |
|---|---|---|---|
| `GET` | `/reservas` | Lista reservas registradas | `200` |
| `GET` | `/reservas/{id}` | Obtiene reserva por ID | `200`, `404` |
| `POST` | `/reservas` | Inserta reserva validando disponibilidad y fecha | `201`, `400` |
| `PUT` | `/reservas/{id}` | Modificación total de reserva | `200`, `404` |
| `PATCH` | `/reservas/{id}` | Modificación parcial de reserva | `200`, `404` |
| `DELETE` | `/reservas/{id}` | Elimina reserva por ID | `204`, `404` |

---

## 🛡️ 5. Reglas de Validación de Reservas Implementadas

En cumplimiento del apartado 3 del enunciado, al crear una reserva (`POST /reservas`):
1. **Comprobación de solapamiento:** Mediante `ReservaService` y el método derivado `existsByAulaAndDateAndFranjasHorariasIn`, se verifica que ninguna de las franjas horarias seleccionadas esté ya reservada para la misma aula en la misma fecha.
2. **Fecha futura:** La fecha de reserva no puede ser anterior a la fecha actual (`!date.isBefore(LocalDate.now())`).
3. **Generación automática de auditoría:** El campo `insertionDate` se genera de forma transparente en la propia entidad `Reserva` mediante el hook `@PrePersist` (`LocalDateTime.now()`).

---

## 🤖 6. Desarrollo Asistido por Inteligencia Artificial (Apartado 5)

### Decisiones tomadas a partir de propuestas de la IA
- **Soporte dual de parámetros en Aulas:** Se adaptó `AulaController` para aceptar tanto `capacidad` (del enunciado) como `capacity` (del modelo), garantizando compatibilidad con pruebas de evaluación y clientes externos.
- **Arquitectura de Servicios:** Se desacopló la validación de negocio de reservas en `ReservaService` en lugar de sobrecargar el controlador.
- **Inmutabilidad de identificadores:** Se estableció la regla de no permitir modificación del `id` en `PUT` y `PATCH`, preservando la integridad de clave primaria de la base de datos.

### Problemas encontrados y errores corregidos
- **Recursión cíclica en serialización JSON (StackOverflowError):** Las relaciones bidireccionales (`@OneToMany` y `@ManyToOne` entre Reserva, Profesor, Aula y FranjaHoraria) provocaban bucles infinitos en Jackson al serializar respuestas REST. Se solucionó incorporando `@JsonIgnoreProperties` en las entidades correspondientes.
- **Tipado en consulta derivada de solapamiento:** En `ReservaRepository`, el parámetro de la franja horaria tenía anidamiento `Collection<List<FranjaHoraria>>`. Se ajustó a `Collection<FranjaHoraria>` y se limpió el método en `ReservaService` para trabajar con colecciones nativas de entidades.
- **Condición invertida en controlador de reservas:** En una versión previa, la llamada `if (reservaService.valida(reserva))` rechazaba peticiones válidas. Se corrigió a `if (!reservaService.valida(reserva))`.
- **Comprobación de ID nulo en repositorio:** La consulta inicial de solapamiento comprobaba `id == null`, lo que impedía detectar colisiones con reservas ya guardadas en la base de datos. Se simplificó a `existsByAulaAndDateAndFranjasHorariasIn(Aula, LocalDate, Collection<FranjaHoraria>)`.
- **Ciclo de vida JPA en `Reserva`:** Se movió la inicialización de `insertionDate` del controlador al método `@PrePersist` de la entidad para dar cumplimiento literal al requisito de completarse en la propia entidad.

### Prompts de ejemplo utilizados
- *"Analiza el proyecto y la clase Aula con los cambios sin commitear todavía. Lo he intentado hacer sin IA y no sé si es correcto la documentación con los endpoints ni el método de findAll con las consultas puestas. ¿Puedes verificar si es correcto o explicarme si es que lo he hecho mal y arreglarlo?"*
- *"Quiero que analices el estado final del proyecto, me comentes si falta algo por aplicar del enunciado y que si todo es correcto, documentes en el README la información correcta y legible por humanos para este proyecto."*
- *"Analiza el proyecto. Luego, crea el frontend sencillo que pide en enunciado. Hazlo moderno, visualmente bonito y funcional. Si quieres añadir detalles para entender mejor qué está haciendo el programa por dentro y tal mejor. Que quede lo mejor posible adaptado a la práctica."*

---

## 🎨 7. Frontend Ligero (`/frontend`) - Especificación 4

En cumplimiento de la Especificación 4, se ha desarrollado una interfaz web moderna, intuitiva y funcional utilizando **exclusivamente HTML5, CSS3 y JavaScript vanilla** (sin dependencias ni frameworks externos como React, Vue, Angular o jQuery).

### Características Principales:
1. **Gestión de Reservas:**
   - Tabla interactiva con todas las reservas registradas.
   - Formulario modal para crear reservas seleccionando profesor, aula, fecha (validada para no permitir días pasados) y una o múltiples franjas horarias.
   - Muestra de forma transparente la fecha de auditoría `insertionDate` autogenerada mediante `@PrePersist`.
   - Eliminación de reservas con confirmación previa (`DELETE /reservas/{id}`).
2. **Consultas Especiales de Aulas (Apartado 2):**
   - Filtros interactivos con switch de "Solo con ordenadores" (`?ordenadores=true`) y capacidad mínima (`?capacidad=X`).
   - Muestra en tiempo real la URL REST generada que se envía a Spring Boot.
3. **Catálogo de Profesores y Franjas Horarias:**
   - Visualización y alta de profesores y franjas horarias lectivas.
4. **Inspector de API REST en Tiempo Real (Detalle Didáctico):**
   - Monitor que captura cada llamada HTTP (`GET`, `POST`, `DELETE`, etc.), mostrando el método, endpoint, código de respuesta HTTP (`200`, `201`, `400`, `204`), latencia, JSON enviado/recibido y una **explicación técnica en español de la regla de negocio ejecutada**.
5. **Carga de Datos Demo en 1 Clic:**
   - Botón *"⚡ Cargar Datos Demo"* para sembrar instantáneamente en la base de datos profesores, aulas y franjas horarias de prueba, ideal para la grabación del vídeo demostrativo.

### Puesta en Marcha del Frontend:
- Basta con abrir el archivo [`src/main/resources/static/index.html`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/frontend/index.html) directamente en cualquier navegador web moderno (doble clic o mediante Live Server). Gracias a la configuración en [`CorsConfig.java`](file:///run/media/aitorgallegoo_cr/CORSAIR%201TB/Formaci%C3%B3n/Grado%20Superior%20Desarrollo%20de%20Aplicaciones%20Multiplataforma/2%C2%BA%20A%C3%B1o/PDAU/UT1/Practicas/GestionReservas/src/main/java/com/juanbosco/gestionreservas/CorsConfig.java), funciona directamente incluso mediante el protocolo `file://`.

---

## 📋 8. Estado del Proyecto y Requisitos

- [x] **Especificación 1:** Entidades JPA, repositorios, controladores CRUD y `@PrePersist` en `Reserva`.
- [x] **Especificación 2:** Filtros de aulas por `ordenadores` y `capacidad` (`@RequestParam`).
- [x] **Especificación 3:** Validaciones de franjas horarias libres y fechas no pasadas en reservas.
- [x] **Especificación 4:** Frontend ligero en `/frontend` desarrollado con HTML5, CSS3 y JavaScript vanilla.
- [x] **Especificación 5:** Documentación en `AGENTS.md`, `README.md` y bitácora en `DOC.md`.
- [ ] **Entrega:** Grabación del vídeo explicativo (5-10 minutos) mostrando Postman y frontend.
