package com.juanbosco.gestionreservas.service;

import com.juanbosco.gestionreservas.entity.Reserva;
import com.juanbosco.gestionreservas.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public boolean valida(Reserva reserva) {

        // Si no tiene fecha o no tiene aula asignada, no es válida
        if (reserva.getDate() == null || reserva.getAula() == null) {
            return false;
        }

        // Si la fecha de la reserva es anterior a la fecha actual, no es válida
        if (reserva.getDate().isBefore(LocalDate.now())) {
            return false;
        }

        // Comprobación de disponibilidad de franja horaria para el aula y fecha indicadas
        if (reserva.getFranjasHorarias() != null && !reserva.getFranjasHorarias().isEmpty()) {
            boolean ocupada = reservaRepository.existsByAulaAndDateAndFranjasHorariasIn(
                    reserva.getAula(),
                    reserva.getDate(),
                    reserva.getFranjasHorarias()
            );
            return !ocupada; // La franja ya está ocupada
        }

        return true;
    }

}
