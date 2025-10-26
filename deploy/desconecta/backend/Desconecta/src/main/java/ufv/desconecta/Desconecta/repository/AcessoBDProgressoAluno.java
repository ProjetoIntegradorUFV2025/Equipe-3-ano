package ufv.desconecta.Desconecta.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import ufv.desconecta.Desconecta.model.Aluno;
import ufv.desconecta.Desconecta.model.ProgressoAluno;

@Repository
public class AcessoBDProgressoAluno {


    // Método para armazenar a pontuação
    @Transactional
    public boolean armazenarPontuacaoAluno(int idProgressoAluno, int pontuacao) {
        ProgressoAluno progresso = entityManager.find(ProgressoAluno.class, idProgressoAluno);
        if (progresso != null) {
            progresso.setPontuacaoTotalAluno(pontuacao); // supondo que ProgressoAluno tenha o atributo pontuacao
            entityManager.merge(progresso); // atualiza o registro no banco
            return true;
        } else {
            return false; // não encontrou o aluno
        }
    }

    //Método para recuperar o progresso de um aluno
    public ProgressoAluno getProgressoAluno(int idProgressoAluno) {
        return entityManager.find(ProgressoAluno.class, idProgressoAluno);
    }


    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void criarProgressoParaAluno(Aluno aluno) {
        ProgressoAluno progresso = new ProgressoAluno();
        progresso.setAluno(aluno); // vincula o aluno

        progresso.setPontuacaoTotalAluno(0);
        progresso.setIlha(null); // será definida posteriormente quando necessário

        // Persiste no banco
        entityManager.persist(progresso);

    }

    // Método para salvar/atualizar o progresso do aluno
    @Transactional
    public ProgressoAluno salvarProgressoAluno(ProgressoAluno progresso) {
        return entityManager.merge(progresso);
    }

}
