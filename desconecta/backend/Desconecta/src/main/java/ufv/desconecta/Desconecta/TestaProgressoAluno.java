package ufv.desconecta.Desconecta;

public class TestaProgressoAluno {
    public static void main(String[] args) {
        Ilha ilha = new Ilha(1, Ilha.EnumNomeIlhas.Dadolandia, new java.util.LinkedList<>());

        ProgressoAluno progressoAluno = new ProgressoAluno(1, ilha);

        System.out.println("ID do Progresso do Aluno: " + progressoAluno.getId());
        System.out.println("Nome da Ilha associada: " + progressoAluno.getIlha().getNomeIlha());
        System.out.println("Pontuação Total do Aluno: " + progressoAluno.getPontuacaoTotalAluno());

        progressoAluno.setPontuacaoTotalAluno(150);
        System.out.println("Pontuação Total do Aluno após atualização: " + progressoAluno.getPontuacaoTotalAluno());
    }
}
