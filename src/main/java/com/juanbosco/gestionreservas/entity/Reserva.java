package com.juanbosco.gestionreservas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime insertionDate;

    @Column(nullable = false)
    private LocalDate date;

    // Varias Reservas pueden ser hechas por un profesor
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Profesor profesor;

    // Varias reservas pueden ser de un Aula
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Aula aula;

    // Varias reservas pueden tener varias franjas horarias
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<FranjaHoraria> franjasHorarias;

}
