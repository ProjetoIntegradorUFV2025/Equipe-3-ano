package ufv.desconecta.Desconecta;



public class AcessoBDAluno {

    private Boolean conexao;

    private Boolean inserirAluno(Aluno aluno){
        return true;
    }

    private Aluno buscarApelido(String apelido){
        return null;
    }

    private Boolean verificarConexao(){
        return true;
    }

    private Boolean verficarApelidoExistente(String apelido){
        return false;
    }

    private Boolean apagarAluno(String apelido){
        return true;
    }

    private void conectar(){
        this.conexao = true;
    }

    private void desconectar(){
        this.conexao = false;
    }



}
