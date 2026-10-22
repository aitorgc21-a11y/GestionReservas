package com.juanbosco.gestionreservas.repository;

import com.juanbosco.gestionreservas.entity.Aula;
import com.juanbosco.gestionreservas.entity.FranjaHoraria;
import com.juanbosco.gestionreservas.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Comprueba si ya existe una reserva para la misma aula, misma fecha y alguna de las franjas horarias indicadas
    @Query("SELECT (COUNT(r) > 0) FROM Reserva r JOIN r.franjasHorarias f WHERE r.aula = :aula AND r.date = :date AND f IN :franjasHorarias")
    boolean existsByAulaAndDateAndFranjasHorariasIn(
            @Param("aula") Aula aula,
            @Param("date") LocalDate date,
            @Param("franjasHorarias") Collection<FranjaHoraria> franjasHorarias
    );
}
