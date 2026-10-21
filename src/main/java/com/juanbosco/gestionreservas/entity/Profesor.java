package com.juanbosco.gestionreservas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profesor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 40, nullable = false)
    private String name;

    @Column(length = 40, nullable = false)
    private String surname;

    @Column(length = 50, nullable = false)
    private String email;

    private LocalDate birthDate;

    @Column(length = 9, nullable = false, unique = true)
    private String dni;

    @Column(length = 15, nullable = false)
    private String telefono;

    // Un profesor puede hacer varias reservas
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Reserva> reserva;

}
