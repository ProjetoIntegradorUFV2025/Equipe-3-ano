package ufv.desconecta.Desconecta;
import java.util.List;

public class Aluno {
    private String apelido;
    private String senha;
    private int pontuacao;
    private List<ProgressoAluno> progresso;

    public class ProgressoAluno {
    //vazia por enquanto 
    }

    public Aluno(String apelido, String senha, int pontuacao, List<ProgressoAluno>progresso){
        this.apelido = apelido;
        this.senha = senha;
        this.pontuacao = pontuacao;
        this.progresso = progresso;
    }

    public String getApelido(){
        return apelido;
    }
    public String getSenha(){
        return senha;
    }
    public int getPontuacao(){
        return pontuacao;
    }
    public List<ProgressoAluno> getProgresso(){
        return progresso;
    }

    public void setPontuacao(int pontuacao){
        this.pontuacao = pontuacao;
    }
    public void setProgresso(List<ProgressoAluno>progresso){
        this.progresso = progresso;
    }

    /*
    public static void main(String[] args) {
        Aluno aluno = new Aluno("Papoula", "12345", 80, null);

        System.out.println("Apelido: " + aluno.getApelido());
        System.out.println("Senha: " + aluno.getSenha());
        System.out.println("Pontuacao: " + aluno.getPontuacao());

        aluno.setPontuacao(95);

        System.out.println("\nDepois de mudar o pontuacao:");
        System.out.println("Apelido: " + aluno.getApelido());
        System.out.println("Senha: " + aluno.getSenha());
        System.out.println("Pontuacao: " + aluno.getPontuacao());
    }
    */
}