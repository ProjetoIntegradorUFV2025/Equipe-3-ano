package ufv.desconecta;

import java.util.List;

public class Aluno {
    
    private String apelido;
    private String senha;
    private int pontuacao;


    public Aluno(String apelido, String senha, int pontuacao) {
        this.apelido = apelido;
        this.senha = senha;
        this.pontuacao = pontuacao;
    }
    
    public String getApelido() {
        return apelido;
    }

    public String getSenha() {
        return senha;
    }

    public int getPontuacao() {
        return pontuacao;
    }

    public void setPontuacao(int pontuacao) {
        this.pontuacao = pontuacao;
    }


        public static void main(String[] args) {
            Aluno aluno = new Aluno("Daniel", "3984", 10);
            System.out.println("Apelido: " + aluno.getApelido());
            System.out.println("Senha: " + aluno.getSenha());
            System.out.println("Pontuacao " + aluno.getPontuacao());
        }

}



