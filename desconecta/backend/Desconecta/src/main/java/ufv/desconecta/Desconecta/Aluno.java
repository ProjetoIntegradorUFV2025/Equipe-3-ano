package ufv.desconecta.Desconecta;

import java.util.List;
import java.util.ArrayList;


public class Aluno {
    private String apelido;
    private String senha;
    private int pontuacao;
    private List<ProgressoAluno> progresso;

    public Aluno(String apelido, String senha) {
        this.apelido = apelido;
        this.senha = senha;
        this.pontuacao = 0; 
        this.progresso = new ArrayList<>();
    }

    public String getApelido() {
        return this.apelido;
    }

    public String getSenha() {
        return this.senha;
    }

    public int getPontuacao() {
        return this.pontuacao;
    }

    public List<ProgressoAluno> getProgresso() {
        return this.progresso;
    }

    public void setPontuacao(int pontuacao) {
        this.pontuacao = pontuacao;
    }

    public void setProgresso(List<ProgressoAluno> progresso) {
        this.progresso = progresso;
    }

    public static void main(String[] args) {

        //vou testar se está criando novos alunos
        System.out.println("\n1. Criando um novo aluno com apelido 'Player1'...");
        Aluno alunoTeste = new Aluno("Player1", "senha123");
            
        // teste dos getters)
        System.out.println("2. Verificando valores iniciais:");
        System.out.println("   - Apelido: " + alunoTeste.getApelido());
        System.out.println("   - Senha: " + alunoTeste.getSenha());
        System.out.println("   - Pontuação: " + alunoTeste.getPontuacao()); // Esperado: 0
        System.out.println("   - Progresso (Tamanho da lista): " + alunoTeste.getProgresso().size()); // Esperado: 0

        // teste dos setters)
        System.out.println("\n3. Modificando pontuação e progresso...");
        alunoTeste.setPontuacao(250);

            
        // verificacao dos valores finais
        System.out.println("4. Verificando valores finais:");
        System.out.println("   - Pontuação alterada: " + alunoTeste.getPontuacao()); // Esperado: 250
        System.out.println("   - Progresso alterado (Tamanho da lista): " + alunoTeste.getProgresso().size()); // Esperado: 1
    }
}


