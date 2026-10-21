package com.juanbosco.gestionreservas.repository;

import com.juanbosco.gestionreservas.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}
