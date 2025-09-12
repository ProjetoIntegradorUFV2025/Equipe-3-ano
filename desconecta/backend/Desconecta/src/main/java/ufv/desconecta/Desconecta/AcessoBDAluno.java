package ufv.desconecta.Desconecta;

import org.springframework.stereotype.Service;


@Service
public class AcessoBDAluno {
    private final RepositorioAluno repositorioAluno;

    public AcessoBDAluno(RepositorioAluno repo) {
        this.repositorioAluno = repo;
    }





    public Boolean inserirAluno(Aluno aluno){
        try {
            // Verifica se já existe um aluno com o mesmo apelido
            if (verificarApelidoExistente(aluno.getApelido())) {
                return false; // Não pode inserir - apelido já existe
            }
            
            // Salva o aluno no banco de dados
            repositorioAluno.save(aluno);
            return true; // Inserção bem-sucedida
            
        } catch (Exception e) {
            // Em caso de erro na inserção
            return false;
        }
    }

    public Aluno buscarApelido(String apelido){
        try {
            // Busca o aluno pelo apelido
            return repositorioAluno.findAll().stream()
                    .filter(aluno -> aluno.getApelido().equals(apelido))
                    .findFirst()
                    .orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public Boolean verificarApelidoExistente(String apelido){
        try {
            // Busca todos os alunos e verifica se algum tem o apelido informado
            return repositorioAluno.findAll().stream()
                    .anyMatch(aluno -> aluno.getApelido().equals(apelido));
        } catch (Exception e) {
            // Em caso de erro, assume que não existe
            return false;
        }
    }

    public Boolean apagarAluno(String apelido){
        try {
            // Busca o aluno pelo apelido
            Aluno aluno = buscarApelido(apelido);
            
            if (aluno != null) {
                // Remove o aluno do banco de dados
                repositorioAluno.delete(aluno);
                return true;
            }
            
            return false; // Aluno não encontrado
            
        } catch (Exception e) {
            return false;
        }
    }




}
