package ufv.desconecta.Desconecta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RepositorioAluno extends JpaRepository<Aluno, Long> {
    
    @Query("SELECT a FROM Aluno a WHERE a.apelido = :apelido")
    Optional<Aluno> findByApelido(@Param("apelido") String apelido);
    
    boolean existsByApelido(String apelido);
}



