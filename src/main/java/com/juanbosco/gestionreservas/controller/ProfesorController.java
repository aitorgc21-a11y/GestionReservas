package com.juanbosco.gestionreservas.controller;

import com.juanbosco.gestionreservas.entity.Profesor;
import com.juanbosco.gestionreservas.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class ProfesorController {

    // Inyección de dependencias
    @Autowired
    private ProfesorRepository profesorRepository;

    public ProfesorController(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    // GET http://localhost:8080/profesores
    @GetMapping("/profesores")
    public List<Profesor> profesores() {
        return profesorRepository.findAll();
    }

    // GET http://localhost/8080:profesores/id
    @GetMapping("/profesores/{id}")
    public ResponseEntity<Profesor> findById(@PathVariable Long id) {
        return profesorRepository.findById(id)
                .map(ResponseEntity::ok) // Si el profesor existe: 200 OK + Profesor
                .orElseGet(() -> ResponseEntity.notFound().build()); // No existe: 404 Not Found
    }

    // PUT http://localhost/8080:profesores/id
    @PutMapping("/profesores/{id}")
    public ResponseEntity<Profesor> update(@PathVariable Long id, @RequestBody Profesor profesor) {
        if (!profesorRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // No existe: 404 Not Found
        }

        profesor.setId(id);
        return ResponseEntity.ok(profesorRepository.save(profesor)); // 200 OK + Profesor
    }

    // DELETE http://localhost/8080:profesores/id
    @DeleteMapping("/profesores/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        profesorRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

}
