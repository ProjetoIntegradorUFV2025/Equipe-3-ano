import java.util.List;

public class Aluno {
    private String apelido;
    private String senha;
    private int pontuacao;
    private List<ProgressoAluno> progresso;

    public String getApelido() {
        return apelido;
    }

    public String getSenha() {
        return senha;
    }

    public int getPontuacao() {
        return pontuacao;
    }

    public List<ProgressoAluno> getProgresso() {
        return progresso;
    }

    public void setPontuacao(int pontuacao) {
        this.pontuacao = pontuacao;
    }

    public void setProgresso(List<ProgressoAluno> progresso) {
        this.progresso = progresso;
    }

    /*
    public static void main(String[] args) {
        Aluno aluno = new Aluno();
        aluno.apelido = "rayanne";
        aluno.senha = "12345678";
        aluno.pontuacao = 10;

        System.out.println("Apelido: " + aluno.getApelido());
        System.out.println("Senha: " + aluno.getSenha());
        System.out.println("Pontuacao: " + aluno.getPontuacao());
    }*/
}
