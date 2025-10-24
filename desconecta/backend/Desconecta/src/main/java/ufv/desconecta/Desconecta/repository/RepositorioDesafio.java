package ufv.desconecta.Desconecta.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ufv.desconecta.Desconecta.model.Desafio;

@Repository
public interface RepositorioDesafio extends JpaRepository<Desafio, Integer> {
}