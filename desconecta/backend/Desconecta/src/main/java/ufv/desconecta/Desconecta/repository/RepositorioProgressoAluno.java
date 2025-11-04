package ufv.desconecta.Desconecta.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ufv.desconecta.Desconecta.dto.ClassificacaoDTO;
import ufv.desconecta.Desconecta.model.ProgressoAluno;

import java.util.List;
@Repository
public interface RepositorioProgressoAluno extends JpaRepository<ProgressoAluno, Long> {
    @Query("SELECT new ufv.desconecta.Desconecta.dto.ClassificacaoDTO(p.aluno.apelido, p.pontuacaoTotalAluno) " +
            "FROM ProgressoAluno p " +
            "ORDER BY p.pontuacaoTotalAluno DESC")
    List<ClassificacaoDTO> findClassificacaoOrdenada();
}
