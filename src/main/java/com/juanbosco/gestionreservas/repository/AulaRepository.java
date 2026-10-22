package com.juanbosco.gestionreservas.repository;

import com.juanbosco.gestionreservas.entity.Aula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AulaRepository extends JpaRepository<Aula, Long> {
    List<Aula> findByOrdenadores(Boolean ordenadores);
    List<Aula> findByCapacityGreaterThan(Integer capacity);
    List<Aula> findByOrdenadoresAndCapacityGreaterThan(Boolean ordenadores, Integer capacity);
}
