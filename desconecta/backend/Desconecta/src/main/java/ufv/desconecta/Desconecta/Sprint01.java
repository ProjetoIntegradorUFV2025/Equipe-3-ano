package ufv.desconecta.Desconecta;
import java.util.List;
class Aluno {
    private String Apelido;
    private String Senha;
    private int Pontuacao;
    private List<ProgressoAluno> progresso;

    // Construtor
    public Aluno(String apelido, String senha, int pontuacao, List<ProgressoAluno> progresso) {
        this.Apelido = apelido;
        this.Senha = senha;
        this.Pontuacao = pontuacao;
        this.progresso = progresso;
    }
    // Getters e Setters

    public String getApelido() {
        return Apelido;
    }
    public String getSenha() {
        return Senha;
    }
    public int getPontuacao() {
        return Pontuacao;
    }
    public void setPontuacao(int pontuacao) {
        this.Pontuacao = pontuacao;
    }
    public List<ProgressoAluno> getProgresso() {
        return progresso;
    }
    public void setProgresso(List<ProgressoAluno> progresso) {
        this.progresso = progresso;
    }

class ProgressoAluno {
}
}
