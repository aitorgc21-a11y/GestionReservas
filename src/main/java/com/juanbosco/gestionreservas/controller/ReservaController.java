package com.juanbosco.gestionreservas.controller;

import com.juanbosco.gestionreservas.entity.Reserva;
import com.juanbosco.gestionreservas.repository.ReservaRepository;
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

    // Inyección de dependencias
    public ReservaController(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    // GET http://localhost:8080/reservas
    @GetMapping()
    public List<Reserva> reservas() {
        return reservaRepository.findAll();
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

        // Comprueba que no exista ya una reserva con el mismo id
        if (reserva.getId() != null) {
            return ResponseEntity.badRequest().build();
        }

        // Comprueba que los campos requeridos no falten
        if (reserva.getDate() == null) {
            return ResponseEntity.badRequest().build();
        }

        // Si no se especifica fecha de inserción, se asigna automáticamente la fecha y hora del sistema
        if (reserva.getInsertionDate() == null) {
            reserva.setInsertionDate(LocalDateTime.now());
        }

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
