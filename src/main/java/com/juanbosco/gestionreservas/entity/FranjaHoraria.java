package com.juanbosco.gestionreservas.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FranjaHoraria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalTime desde;

    @Column(nullable = false)
    private LocalTime hasta;

    // Una franja horaria puede tener varias reservas (en distintas aulas)
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties("franjasHorarias")
    private List<Reserva> reservas;

}
