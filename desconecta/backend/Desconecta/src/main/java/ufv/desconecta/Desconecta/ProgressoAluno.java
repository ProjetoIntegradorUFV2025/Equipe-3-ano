package ufv.desconecta.Desconecta;

import java.util.List;

public class ProgressoAluno {
    private int id;
    private List<Ilha> ilha;
    private int pontuacaoTotalAluno;

    //Getters e Setters

    public int getId() {
        return this.id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public List<Ilha> getIlha() {
        return this.ilha;
    }
    public void setIlha(List<Ilha> ilha) {
        this.ilha = ilha;
    }
    public int getPontuacaoTotalAluno() {
        return this.pontuacaoTotalAluno;
    }
    public void setPontuacaoTotalAluno(int pontuacaoTotalAluno) {
        this.pontuacaoTotalAluno = pontuacaoTotalAluno;
    }

    //Construtor
    public ProgressoAluno(int id, List<Ilha> ilha, int pontuacaoTotalAluno) {
        this.id = id;
        this.ilha = ilha;
        this.pontuacaoTotalAluno = pontuacaoTotalAluno;
    }

    /*public static void main(String[] args) {
        Ilha ilha = new Ilha(1, Ilha.EnumNomeIlhas.Dadolandia, true, null, false);
        ProgressoAluno progressoAluno = new ProgressoAluno(1, null, 100);

        System.out.println("ID do Progresso do Aluno: " + progressoAluno.getId());
        System.out.println("Ilha do Progresso do Aluno: " + progressoAluno.getIlha());
        System.out.println("Pontuacao Total do Aluno: " + progressoAluno.getPontuacaoTotalAluno());

        progressoAluno.setIlha(List.of(ilha1));
        System.out.println("ID do Progresso do Aluno: " + progressoAluno.getId());
        System.out.println("Ilha do Progresso do Aluno: " + progressoAluno.getIlha());
        System.out.println("Pontuacao Total do Aluno: " + progressoAluno.getPontuacaoTotalAluno());
    }*/
}
