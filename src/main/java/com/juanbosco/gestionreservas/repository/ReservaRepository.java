package com.juanbosco.gestionreservas.repository;

import com.juanbosco.gestionreservas.entity.Aula;
import com.juanbosco.gestionreservas.entity.FranjaHoraria;
import com.juanbosco.gestionreservas.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Comprueba si ya existe una reserva para la misma aula, misma fecha y alguna de las franjas horarias indicadas
    boolean existsByAulaAndDateAndFranjasHorariasIn(
            Aula aula,
            LocalDate date,
            Collection<FranjaHoraria> franjasHorarias
    );
}
