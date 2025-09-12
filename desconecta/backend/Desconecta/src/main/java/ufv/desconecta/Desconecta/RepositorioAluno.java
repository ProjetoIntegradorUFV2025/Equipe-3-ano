package ufv.desconecta.Desconecta;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioAluno extends JpaRepository<Aluno, Long> {
}



