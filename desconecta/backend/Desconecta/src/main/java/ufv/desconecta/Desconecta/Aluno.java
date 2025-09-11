package ufv.desconecta.Desconecta;
import java.util.List;

public class Aluno {
    private String apelido;
    private String senha;
    private int pontuacao;
    private List<ProgressoAluno>progresso;

    public class ProgressoAluno{
        //vazio
    }

    public Aluno(String apelido, String senha, int pontuacao, List<ProgressoAluno> progresso) {
        this.apelido = apelido;
        this.senha = senha;
        this.pontuacao = pontuacao;
        this.progresso = progresso;
    }
    
    public String getApelido(){
        return this.apelido;
    }
    
    public String getSenha(){
        return this.senha;
    }
    
    public int getPontuacao(){
        return this.pontuacao;
    }
    
    public List<ProgressoAluno>getProgresso(){
        return this.progresso;
    }
    
    public void setPontuacao(int pontuacao){
        this.pontuacao = pontuacao;
    }
    
    public void setProgresso(List<ProgressoAluno>progresso){
        this.progresso = progresso;
    }

    /* 
    public static void main(String[] args) {
        Aluno aluno = new Aluno("James", "0357", 85, null);

        System.out.println("Apelido: " + aluno.getApelido());  
        System.out.println("Senha: " + aluno.getSenha());      
        System.out.println("Pontuação: " + aluno.getPontuacao());
    }
    */
}

