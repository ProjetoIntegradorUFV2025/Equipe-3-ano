package ufv.desconecta.Desconecta.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ufv.desconecta.Desconecta.model.Ilha;

import java.util.List;

public interface RepositorioIlha extends JpaRepository<Ilha, Integer> {
    @Query("SELECT i FROM Ilha i WHERE i.progressoAluno.PK_ProgressoAluno = :id")
    List<Ilha> buscarTodasAsIlhasDeUmProgresso(@Param("id") Long id);

}
