package com.juanbosco.gestionreservas.controller;

import com.juanbosco.gestionreservas.entity.Aula;
import com.juanbosco.gestionreservas.repository.AulaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Todos los Mapping empiezan con esta ruta al principio
@RequestMapping("/aulas")
@RestController()
public class AulaController {

    private final AulaRepository aulaRepository;

    // Inyección de dependencias
    public AulaController(AulaRepository aulaRepository) {
        this.aulaRepository = aulaRepository;
    }

    // GET http://localhost:8080/aulas
    // GET http://localhost:8080/aulas?ordenadores=true
    // GET http://localhost:8080/aulas?capacidad=20 (o ?capacity=20)
    // GET http://localhost:8080/aulas?ordenadores=true&capacidad=20
    @GetMapping
    public ResponseEntity<List<Aula>> findAll(
            @RequestParam(required = false) Boolean ordenadores,
            @RequestParam(required = false) Integer capacidad,
            @RequestParam(required = false) Integer capacity
    ) {
        // Soporte tanto para 'capacidad' (como pide el enunciado) como para 'capacity' (en inglés)
        Integer cap = (capacidad != null) ? capacidad : capacity;

        // Si se puso la URL sin parámetro de consulta, se muestran todas las aulas
        if (ordenadores == null && cap == null) {
            return ResponseEntity.ok(aulaRepository.findAll());
        }

        // Si se puso el parámetro de consulta de ordenadores únicamente
        if (ordenadores != null && cap == null) {
            return ResponseEntity.ok(aulaRepository.findByOrdenadores(ordenadores));
        }

        // Si se puso el parámetro de consulta de capacidad únicamente
        if (ordenadores == null) {
            return ResponseEntity.ok(aulaRepository.findByCapacityGreaterThan(cap));
        }

        // Si se ha llegado hasta aquí, es que se han puesto los dos parámetros de consulta
        return ResponseEntity.ok(aulaRepository.findByOrdenadoresAndCapacityGreaterThan(ordenadores, cap));
    }

    // GET http://localhost:8080/aulas/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Aula> findById(@PathVariable Long id) {
        return aulaRepository.findById(id)
                .map(ResponseEntity::ok) // Si el aula existe: 200 OK + Aula
                .orElseGet(() -> ResponseEntity.notFound().build()); // No existe: 404 Not Found
    }

    // POST http://localhost:8080/aulas --> Crea un aula
    @PostMapping()
    public ResponseEntity<Aula> create(@RequestBody Aula aula) {

        // Comprueba que no exista ya un aula con el mismo id
        if (aula.getId() != null) {
            return ResponseEntity.badRequest().build();
        }

        // Comprueba que los campos requeridos no faltan
        if (aula.getName() == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(aulaRepository.save(aula));
    }

    // PUT http://localhost:8080/aulas/{id} --> Actualización completa de un aula
    @PutMapping("/{id}")
    public ResponseEntity<Aula> update(@PathVariable Long id, @RequestBody Aula aula) {
        // Comprueba si el aula a modificar existe en la base de datos
        if (!aulaRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // No existe: 404 Not Found
        }

        // Se le fija al aula la ID de la URL
        aula.setId(id);
        return ResponseEntity.ok(aulaRepository.save(aula)); // 200 OK + Aula actualizada
    }

    // PATCH http://localhost:8080/aulas/{id} --> Actualización parcial (solo los campos que se envíen)
    @PatchMapping("/{id}")
    public ResponseEntity<Aula> updateParcial(@PathVariable Long id, @RequestBody Aula aula) {
        // Se recuperan los datos actuales del aula existente en la base de datos
        Optional<Aula> optAula = aulaRepository.findById(id);
        if (optAula.isEmpty()) {
            return ResponseEntity.notFound().build(); // Si no existe: 404 Not Found
        }

        Aula aulaExistente = optAula.get();

        // Comprobamos y actualizamos solo los campos que vengan informados en el JSON
        // (Nota: el ID nunca se modifica porque es la clave primaria autoincremental de la entidad)
        if (aula.getName() != null) {
            aulaExistente.setName(aula.getName());
        }
        if (aula.getOrdenadores() != null) {
            aulaExistente.setOrdenadores(aula.getOrdenadores());
        }
        if (aula.getCapacity() > 0) {
            aulaExistente.setCapacity(aula.getCapacity());
        }
        if (aula.getFloor() != null) {
            aulaExistente.setFloor(aula.getFloor());
        }
        if (aula.getDescription() != null) {
            aulaExistente.setDescription(aula.getDescription());
        }

        // Guardamos los cambios en la base de datos y devolvemos 200 OK con el aula modificada
        return ResponseEntity.ok(aulaRepository.save(aulaExistente));
    }

    // DELETE http://localhost:8080/aulas/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        // Primero se comprueba que existe para poder eliminarlo
        if (!aulaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        try {
            aulaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict: tiene reservas asociadas
        }
    }

}
