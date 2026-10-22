package com.juanbosco.gestionreservas.controller;

import com.juanbosco.gestionreservas.entity.Reserva;
import com.juanbosco.gestionreservas.repository.ReservaRepository;
import com.juanbosco.gestionreservas.service.ReservaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// Todos los Mapping empiezan con esta ruta al principio
@RequestMapping("/reservas")
@RestController()
public class ReservaController {

    private final ReservaRepository reservaRepository;
    private final ReservaService reservaService;

    // Inyección de dependencias
    public ReservaController(ReservaRepository reservaRepository, ReservaService reservaService) {
        this.reservaRepository = reservaRepository;
        this.reservaService = reservaService;
    }

    // GET http://localhost:8080/reservas
    @GetMapping()
    public ResponseEntity<List<Reserva>> reservas() {
        return ResponseEntity.ok(reservaRepository.findAll()); // 200 OK + lista Reserva
    }

    // GET http://localhost:8080/reservas/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> findById(@PathVariable Long id) {
        return reservaRepository.findById(id)
                .map(ResponseEntity::ok) // Si la reserva existe: 200 OK + Reserva
                .orElseGet(() -> ResponseEntity.notFound().build()); // No existe: 404 Not Found
    }

    // POST http://localhost:8080/reservas --> Crea una reserva
    @PostMapping()
    public ResponseEntity<Reserva> create(@RequestBody Reserva reserva) {
        // Al crear, el ID no debe venir especificado (se genera automáticamente)
        if (reserva.getId() != null) {
            System.out.println("[ReservaController.create] Rechazado con 400 Bad Request: el ID debe ser nulo al crear.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Si la reserva no cumple las validaciones de negocio, devuelve 400 Bad Request
        if (!reservaService.valida(reserva)) {
            System.out.println("[ReservaController.create] Rechazado con 400 Bad Request por fallo en validación de ReservaService.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Se persiste la reserva (la insertionDate se completa automáticamente en la entidad con @PrePersist)
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaRepository.save(reserva));
    }

    // PUT http://localhost:8080/reservas/{id} --> Actualización completa de una reserva
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> update(@PathVariable Long id, @RequestBody Reserva reserva) {
        // Comprueba si la reserva a modificar existe en la base de datos
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // No existe: 404 Not Found
        }

        // Se le fija a la reserva la ID de la URL
        reserva.setId(id);

        // Si no se envía insertionDate al actualizar, conservamos una fecha o la actual
        if (reserva.getInsertionDate() == null) {
            reserva.setInsertionDate(LocalDateTime.now());
        }

        return ResponseEntity.ok(reservaRepository.save(reserva)); // 200 OK + Reserva actualizada
    }

    // PATCH http://localhost:8080/reservas/{id} --> Actualización parcial (solo los campos que se envíen)
    @PatchMapping("/{id}")
    public ResponseEntity<Reserva> updateParcial(@PathVariable Long id, @RequestBody Reserva reserva) {
        // Se recuperan los datos actuales de la reserva existente en la base de datos
        Optional<Reserva> optReserva = reservaRepository.findById(id);
        if (optReserva.isEmpty()) {
            return ResponseEntity.notFound().build(); // Si no existe: 404 Not Found
        }

        Reserva reservaExistente = optReserva.get();

        // Comprobamos y actualizamos solo los campos que no vengan nulos en el JSON
        // (Nota: el ID nunca se modifica porque es la clave primaria autoincremental de la entidad)
        if (reserva.getDate() != null) {
            reservaExistente.setDate(reserva.getDate());
        }
        if (reserva.getProfesor() != null) {
            reservaExistente.setProfesor(reserva.getProfesor());
        }
        if (reserva.getAula() != null) {
            reservaExistente.setAula(reserva.getAula());
        }
        if (reserva.getFranjasHorarias() != null) {
            reservaExistente.setFranjasHorarias(reserva.getFranjasHorarias());
        }
        if (reserva.getInsertionDate() != null) {
            reservaExistente.setInsertionDate(reserva.getInsertionDate());
        }

        // Guardamos los cambios en la base de datos y devolvemos 200 OK con la reserva modificada
        return ResponseEntity.ok(reservaRepository.save(reservaExistente));
    }

    // DELETE http://localhost:8080/reservas/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        // Primero se comprueba que existe para poder eliminarlo
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        reservaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
