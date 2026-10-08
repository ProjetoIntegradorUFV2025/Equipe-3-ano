package ufv.desconecta.Desconecta.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ufv.desconecta.Desconecta.model.EnumNomeIlha;
import ufv.desconecta.Desconecta.model.Ilha;

import java.util.List;
import java.util.Optional;

@Repository
public class AcessoBDIlha {
    @Autowired
    private RepositorioIlha repositorioIlha;


    @PersistenceContext
    private EntityManager entityManager;

    // Método para verificar o estado da ilha
    public boolean verificarEstadoIlha(Ilha ilha) {
        Ilha ilhaDoBanco = entityManager.find(Ilha.class, ilha.getPK_Ilha());
        if (ilhaDoBanco != null) {
            return ilhaDoBanco.isEstado();
        } else {
            return false;
        }
    }

    @Transactional
    public boolean alterarEstadoIlha(Ilha ilha) {
        return repositorioIlha.findById(ilha.getPK_Ilha()).map(ilhaDoBanco -> {
            ilhaDoBanco.setEstado(ilha.isEstado());
            repositorioIlha.save(ilhaDoBanco);
            return true;
        }).orElse(false); // Retorna false se a ilha não foi encontrada
    }

    public List<Ilha> recuperarIlhasPorProgressoId(long idProgressoAluno) {
        return repositorioIlha.buscarTodasAsIlhasDeUmProgresso(idProgressoAluno);
    }

    // Método para verificar se uma ilha específica foi jogada
    public Optional<Boolean> verificarSeIlhaFoiJogada(long idProgressoAluno, EnumNomeIlha nomeIlha) {
        Optional<Ilha> ilhaOpt = repositorioIlha.buscarIlhaPorProgressoENome(idProgressoAluno, nomeIlha);
        return ilhaOpt.map(Ilha::isFoiJogada);
    }
}