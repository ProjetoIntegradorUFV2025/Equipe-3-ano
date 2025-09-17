package ufv.desconecta.Desconecta;

import java.util.List;
import java.util.ArrayList;

public class ProgressoAluno {
    private int id;
    private List<Ilha> ilha;
    private int pontuacaoTotalAluno;

    public ProgressoAluno(int id) {
        this.id = id;
        this.ilha = new ArrayList<>();
        this.pontuacaoTotalAluno = 0;
    }

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

    public static void main(String[] args) {
        // Testando a criação de um ProgressoAluno
        ProgressoAluno progresso = new ProgressoAluno(5908);
        System.out.println("ID do ProgressoAluno: " + progresso.getId());

        // Verificando valores iniciais
        System.out.println("Pontuação Inicial: " + progresso.getPontuacaoTotalAluno()); // Esperado: 0
        System.out.println("Número de Ilhas Inicial: " + progresso.getIlha().size()); // Esperado: 0

        // Modificando valores
        progresso.setPontuacaoTotalAluno(150);
        List<Ilha> ilhaConcluidas = new ArrayList<>();

        // Adicionando uma ilha de exemplo
        ilhaConcluidas.add(new Ilha(1, EnumNomeIlhas.MATEMATICA, true, true));
        progresso.setIlha(ilhaConcluidas);  

        // Verificando valores após modificações
        System.out.println("Pontuação após modificação: " + progresso.getPontuacaoTotalAluno()); // Esperado: 150
        System.out.println("Número de ilhas após modificação: " + progresso.getIlha().size()); // Esperado: 1
        if (!progresso.getIlha().isEmpty()) {
            System.out.println("Nome da primeira ilha: " + progresso.getIlha().get(0).getNomeIlha()); // Esperado: MATEMATICA
        }
    }
}

