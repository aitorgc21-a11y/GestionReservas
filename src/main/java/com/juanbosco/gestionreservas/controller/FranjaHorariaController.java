package com.juanbosco.gestionreservas.controller;

import com.juanbosco.gestionreservas.entity.FranjaHoraria;
import com.juanbosco.gestionreservas.repository.FranjaHorariaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Permite acceder tanto por /franjas-horarias como por /franjas
@RequestMapping({"/franjas-horarias", "/franjas"})
@RestController()
public class FranjaHorariaController {

    private final FranjaHorariaRepository franjaHorariaRepository;

    // Inyección de dependencias
    public FranjaHorariaController(FranjaHorariaRepository franjaHorariaRepository) {
        this.franjaHorariaRepository = franjaHorariaRepository;
    }

    // GET http://localhost:8080/franjas-horarias
    @GetMapping()
    public ResponseEntity<List<FranjaHoraria>> franjasHorarias() {
        return ResponseEntity.ok(franjaHorariaRepository.findAll()); // 200 OK + list aFranjaHorarias
    }

    // GET http://localhost:8080/franjas-horarias/{id}
    @GetMapping("/{id}")
    public ResponseEntity<FranjaHoraria> findById(@PathVariable Long id) {
        return franjaHorariaRepository.findById(id)
                .map(ResponseEntity::ok) // Si la franja existe: 200 OK + FranjaHoraria
                .orElseGet(() -> ResponseEntity.notFound().build()); // No existe: 404 Not Found
    }

    // POST http://localhost:8080/franjas-horarias --> Crea una franja horaria
    @PostMapping()
    public ResponseEntity<FranjaHoraria> create(@RequestBody FranjaHoraria franjaHoraria) {

        // Comprueba que no exista ya una franja con el mismo id
        if (franjaHoraria.getId() != null) {
            return ResponseEntity.badRequest().build();
        }

        // Comprueba que los campos requeridos no faltan
        if (franjaHoraria.getDesde() == null || franjaHoraria.getHasta() == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(franjaHorariaRepository.save(franjaHoraria));
    }

    // PUT http://localhost:8080/franjas-horarias/{id} --> Actualización completa de una franja horaria
    @PutMapping("/{id}")
    public ResponseEntity<FranjaHoraria> update(@PathVariable Long id, @RequestBody FranjaHoraria franjaHoraria) {
        // Comprueba si la franja a modificar existe en la base de datos
        if (!franjaHorariaRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // No existe: 404 Not Found
        }

        // Se le fija a la franja la ID de la URL
        franjaHoraria.setId(id);
        return ResponseEntity.ok(franjaHorariaRepository.save(franjaHoraria)); // 200 OK + Franja actualizada
    }

    // PATCH http://localhost:8080/franjas-horarias/{id} --> Actualización parcial (solo los campos que se envíen)
    @PatchMapping("/{id}")
    public ResponseEntity<FranjaHoraria> updateParcial(@PathVariable Long id, @RequestBody FranjaHoraria franjaHoraria) {
        // Se recuperan los datos actuales de la franja existente en la base de datos
        Optional<FranjaHoraria> optFranja = franjaHorariaRepository.findById(id);
        if (optFranja.isEmpty()) {
            return ResponseEntity.notFound().build(); // Si no existe: 404 Not Found
        }

        FranjaHoraria franjaExistente = optFranja.get();

        // Comprobamos y actualizamos solo los campos que no vengan nulos en el JSON
        // (Nota: el ID nunca se modifica porque es la clave primaria autoincremental de la entidad)
        if (franjaHoraria.getDesde() != null) {
            franjaExistente.setDesde(franjaHoraria.getDesde());
        }
        if (franjaHoraria.getHasta() != null) {
            franjaExistente.setHasta(franjaHoraria.getHasta());
        }

        // Guardamos los cambios en la base de datos y devolvemos 200 OK con la franja modificada
        return ResponseEntity.ok(franjaHorariaRepository.save(franjaExistente));
    }

    // DELETE http://localhost:8080/franjas-horarias/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        // Primero se comprueba que existe para poder eliminarlo
        if (!franjaHorariaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        try {
            franjaHorariaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict: tiene reservas asociadas
        }
    }

}
