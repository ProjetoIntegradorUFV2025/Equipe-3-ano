package ufv.desconecta.Desconecta;
import java.util.List;
import java.util.ArrayList;

enum EnumNomeIlhas {
    Dadolandia,
    Ciencias,
    Geografia,
    Matematica,
    HISTORIA
}

class Desafio {
    // pra depois
}

public class Ilha {

    private int id;
    private EnumNomeIlhas nomeIlha;
    private boolean estadoIlha;
    private List<Desafio> desafios;
    private boolean foiJogada;

    public Ilha(int id, EnumNomeIlhas nomeIlha, boolean estadoIlha, List<Desafio> desafios, boolean foiJogada) {
        this.id = id;
        this.nomeIlha = nomeIlha;
        this.estadoIlha = estadoIlha;
        this.desafios = desafios;
        this.foiJogada = foiJogada;
    }

    public int getId() {
        return id;
    }
    public EnumNomeIlhas getNomeIlha() {
        return nomeIlha;
    }
    public boolean isEstadoIlha() {
        return estadoIlha;
    }
    public boolean getEstadoIlha() {
        return estadoIlha;
    }
    public List<Desafio> getDesafios() {
        return desafios;
    }
    public boolean getFoiJogada() {
        return foiJogada;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setNomeIlha(EnumNomeIlhas nomeIlha) {
        this.nomeIlha = nomeIlha;
    }
    public void setEstadoIlha(boolean estadoIlha) {
        this.estadoIlha = estadoIlha;
    }
    public void setDesafios(List<Desafio> desafios) {
        this.desafios = desafios;
    }
    public void setFoiJogada(boolean foiJogada) {
        this.foiJogada = foiJogada;
    }

    /*
    public static void main(String[] args) {
        
        List<Desafio> listaDesafios = new ArrayList<>();

        Ilha ilha = new Ilha(1, EnumNomeIlhas.Matematica, true, listaDesafios, false);

        System.out.println("Nome da Ilha: " + ilha.getNomeIlha());
        System.out.println("Estado da Ilha " + ilha.getEstadoIlha());
        System.out.println("Lista de Desafios: " + ilha.getDesafios());
    }
    */
}

class ProgressoAluno {

    private int id;
    private List<Ilha> ilhas;
    private int pontuacaoTotalAluno;

    public ProgressoAluno(int id, List<Ilha> ilhas, int pontuacaoTotalAluno) {
        this.id = id;
        this.ilhas = ilhas;
        this.pontuacaoTotalAluno = pontuacaoTotalAluno;
    }

    public int getId() {
        return id;
    }
    public List<Ilha> getIlhas() {
        return ilhas;
    }
    public int getPontuacaoTotalAluno() {
        return pontuacaoTotalAluno;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setIlhas(List<Ilha> ilhas) {
        this.ilhas = ilhas;
    }
    public void setPontuacaoTotalAluno(int pontuacaoTotalAluno) {
        this.pontuacaoTotalAluno = pontuacaoTotalAluno;
    }
}