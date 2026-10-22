package com.juanbosco.gestionreservas.service;

import com.juanbosco.gestionreservas.entity.Reserva;
import com.juanbosco.gestionreservas.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public boolean valida(Reserva reserva) {

        // Si no tiene fecha, no es válida
        if (reserva.getDate() == null) return false;

        // Si la fecha que tiene es anterior a la fecha actual, no es válida
        if (reserva.getDate().isBefore(LocalDate.now())) return false;

        // Si ya existe alguna reserva para ese id, aula, fecha y franjas, devuelve false (no válida)
        return !reservaRepository.existsByIdAndAulaAndDateAndFranjasHorariasIn(
                reserva.getId(),
                reserva.getAula(),
                reserva.getDate(),
                Collections.singleton(reserva.getFranjasHorarias())
        );
    }

}
