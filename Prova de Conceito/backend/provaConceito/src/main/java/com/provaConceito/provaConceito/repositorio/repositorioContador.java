package com.provaConceito.provaConceito.repositorio;

import com.provaConceito.provaConceito.modelo.modeloContador;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repositorioContador extends JpaRepository<modeloContador, Long> {
}
