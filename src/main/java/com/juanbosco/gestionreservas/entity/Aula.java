package com.juanbosco.gestionreservas.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Aula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 40)
    private String name;

    @Column(nullable = false)
    private Boolean ordenadores;

    @Column(nullable = false)
    private Integer capacity;

    private Integer floor;

    @Column(length = 100)
    private String description;

    // Un aula puede tener muchas reservas
    @OneToMany(cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties("aula")
    private List<Reserva> reservas;

}
