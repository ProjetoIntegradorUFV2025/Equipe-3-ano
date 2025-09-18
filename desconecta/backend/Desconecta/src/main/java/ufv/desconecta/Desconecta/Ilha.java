package ufv.desconecta.Desconecta;

import java.util.List;
import java.util.ArrayList;

enum EnumNomeIlhas {
    Dadolandia,
    Ciencias,
    Geografia,
    Matematica,
    Historia
}

public class Ilha {
    private int id;
    private EnumNomeIlhas nomeIlha;
    private boolean estadoIlha;
    private List<Desafio> desafio;
    private boolean foiJogada;
    
    public class Desafio {
    	//vazio
    }

    // Getters
    public int getId() {
        return id;
    }

    public EnumNomeIlhas getNomeIlha() {
        return nomeIlha;
    }

    public boolean getEstadoIlha() {
        return estadoIlha;
    }

    public List<Desafio> getDesafio() {
        return desafio;
    }

    public boolean getFoiJogada() {
        return foiJogada;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setNomeIlha(EnumNomeIlhas nomeIlha) {
        this.nomeIlha = nomeIlha;
    }

    public void setEstadoIlha(boolean estadoIlha) {
        this.estadoIlha = estadoIlha;
    }

    public void setDesafio(List<Desafio> desafio) {
        this.desafio = desafio;
    }

    public void setFoiJogada(boolean foiJogada) {
        this.foiJogada = foiJogada;
    }

    // Construtor
    public Ilha(int id, EnumNomeIlhas nomeIlha, boolean estadoIlha, List<Desafio> desafio, boolean foiJogada) {
        this.id = id;
        this.nomeIlha = nomeIlha;
        this.estadoIlha = estadoIlha;
        this.desafio = desafio;
        this.foiJogada = foiJogada;
    }
}

class ProgressoAluno {
    private int id;
    private List<Ilha> ilha;
    private int pontuacaoTotalAluno;

    // Getters
    public int getId() {
        return id;
    }

    public List<Ilha> getIlha() {
        return ilha;
    }

    public int getPontuacaoTotalAluno() {
        return pontuacaoTotalAluno;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setIlha(List<Ilha> ilha) {
        this.ilha = ilha;
    }

    public void setPontuacaoTotalAluno(int pontuacaoTotalAluno) {
        this.pontuacaoTotalAluno = pontuacaoTotalAluno;
    }

    // Construtor
    public ProgressoAluno(int id, List<Ilha> ilha, int pontuacaoTotalAluno) {
        this.id = id;
        this.ilha = ilha;
        this.pontuacaoTotalAluno = pontuacaoTotalAluno;
    }
}

/*
class Main {
    public static void main(String[] args) {
        
        List<Ilha.Desafio> desafiosVazios = new ArrayList<>();

        Ilha ilha1 = new Ilha(1, EnumNomeIlhas.Dadolandia, true, desafiosVazios, false);
        Ilha ilha2 = new Ilha(2, EnumNomeIlhas.Ciencias, false, desafiosVazios, true);

        List<Ilha> ilhasAluno = new ArrayList<>();
        ilhasAluno.add(ilha1);
        ilhasAluno.add(ilha2);

        ProgressoAluno aluno = new ProgressoAluno(101, ilhasAluno, 0);

        for (Ilha ilha : ilhasAluno) {
            System.out.println("Ilha: " + ilha.getNomeIlha());
            System.out.println("Estado da Ilha: " + ilha.getEstadoIlha());
            System.out.println("Número de desafios: " + ilha.getDesafio().size());
        }
    }
}*/