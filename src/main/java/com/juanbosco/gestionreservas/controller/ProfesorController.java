package com.juanbosco.gestionreservas.controller;

import com.juanbosco.gestionreservas.entity.Profesor;
import com.juanbosco.gestionreservas.repository.ProfesorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Todos los Mapping empiezas con esta ruta al principio
@RequestMapping("/profesores")
@RestController()
public class ProfesorController {

    private final ProfesorRepository profesorRepository;

    // Inyección de dependencias
    public ProfesorController(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    // GET http://localhost:8080/profesores
    @GetMapping()
    public ResponseEntity<List<Profesor>> profesores() {
        return ResponseEntity.ok(profesorRepository.findAll()); // 200 OK + lista Profesor
    }

    // GET http://localhost/8080:profesores/id
    @GetMapping("/{id}")
    public ResponseEntity<Profesor> findById(@PathVariable Long id) {
        return profesorRepository.findById(id)
                .map(ResponseEntity::ok) // Si el profesor existe: 200 OK + Profesor
                .orElseGet(() -> ResponseEntity.notFound().build()); // No existe: 404 Not Found
    }

    // POST http://localhost/8080:profesores --> Crea un profesor
    @PostMapping()
    public ResponseEntity<Profesor> create(@RequestBody Profesor profesor) {

        // Comprueba que no exista ya un profesor con el mismo id
        if (profesor.getId() != null) {
            return ResponseEntity.badRequest().build();
        }

        // Comprueba que los campos requeridos no faltan
        if (profesor.getName() == null || profesor.getSurname() == null ||
                profesor.getEmail() == null || profesor.getTelefono() == null ||
                profesor.getDni() == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(profesorRepository.save(profesor));
    }

    // PUT http://localhost:8080/profesores/{id} --> Actualización completa de un profesor
    @PutMapping("/{id}")
    public ResponseEntity<Profesor> update(@PathVariable Long id, @RequestBody Profesor profesor) {
        // Comprueba si el profesor a modificar existe en la base de datos
        if (!profesorRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // No existe: 404 Not Found
        }

        // Se le fija al profesor la ID de la URL
        profesor.setId(id);
        return ResponseEntity.ok(profesorRepository.save(profesor)); // 200 OK + Profesor actualizado
    }

    // PATCH http://localhost:8080/profesores/{id} --> Actualización parcial (solo los campos que se envíen)
    @PatchMapping("/{id}")
    public ResponseEntity<Profesor> updateParcial(@PathVariable Long id, @RequestBody Profesor profesor) {
        // Se reucperan los datos actuales del profesor existente en la base de datos
        Optional<Profesor> optProfesor = profesorRepository.findById(id);
        if (optProfesor.isEmpty()) {
            return ResponseEntity.notFound().build(); // Si no existe: 404 Not Found
        }

        Profesor profesorExistente = optProfesor.get();

        // Comprobamos y actualizamos solo los campos que no vengan nulos en el JSON
        // (Nota: el ID nunca se modifica porque es la clave primaria autoincremental de la entidad)
        if (profesor.getName() != null) {
            profesorExistente.setName(profesor.getName());
        }
        if (profesor.getSurname() != null) {
            profesorExistente.setSurname(profesor.getSurname());
        }
        if (profesor.getEmail() != null) {
            profesorExistente.setEmail(profesor.getEmail());
        }
        if (profesor.getBirthDate() != null) {
            profesorExistente.setBirthDate(profesor.getBirthDate());
        }
        if (profesor.getDni() != null) {
            profesorExistente.setDni(profesor.getDni());
        }
        if (profesor.getTelefono() != null) {
            profesorExistente.setTelefono(profesor.getTelefono());
        }

        // Guardamos los cambios en la base de datos y devolvemos 200 OK con el profesor modificado
        return ResponseEntity.ok(profesorRepository.save(profesorExistente));
    }

    // DELETE http://localhost:8080/profesores/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        // Primero se comprueba que existe para poder eliminarlo
        if (!profesorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        profesorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
