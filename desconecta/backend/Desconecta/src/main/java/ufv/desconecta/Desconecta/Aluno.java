package ufv.desconecta.Desconecta;
//TODO: Importar classe que implementa ProgressoAluno

public class Aluno {
    private String apelido;
    private String senha;
    private int pontuacao;
    private ProgressoAluno progresso;

    public String getApelido() {
        return apelido;
    }

    public String getSenha() {
        return senha;
    }

    public int getPontuacao() {
        return pontuacao;
    }

    public ProgressoAluno getProgresso() {
        return progresso;
    }

    public void setPontuacao(int pontos) {
        this.pontuacao += pontos;
    }

    public void setProgresso(ProgressoAluno progresso) {
        this.progresso = progresso;
    }
}