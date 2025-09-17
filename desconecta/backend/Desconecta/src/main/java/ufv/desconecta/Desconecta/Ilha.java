package ufv.desconecta.Desconecta;

import java.util.List;
import java.util.ArrayList;

public class Ilha {
    private int id;
    private EnumNomeIlhas nomeIlha;
    private boolean estadoIlha;
    private List<Desafio> desafio;
    private boolean foiJogada;

    public Ilha(int id, EnumNomeIlhas nomeIlha, boolean estadoIlha, boolean foiJogada) {
        this.id = id;
        this.nomeIlha = nomeIlha;
        this.estadoIlha = estadoIlha;
        this.desafio = new ArrayList<>();
        this.foiJogada = foiJogada;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public EnumNomeIlhas getNomeIlha() {
        return this.nomeIlha;
    }

    public void setNomeIlha(EnumNomeIlhas nomeIlha) {
        this.nomeIlha = nomeIlha;
    }

    public boolean isEstadoIlha() {
        return this.estadoIlha;
    }

    public void setEstadoIlha(boolean estadoIlha) {
        this.estadoIlha = estadoIlha;
    }

    public List<Desafio> getDesafio() {
        return this.desafio;
    }

    public void setDesafio(List<Desafio> desafio) {
        this.desafio = desafio;
    }

    public boolean isFoiJogada() {
        return this.foiJogada;
    }

    public void setFoiJogada(boolean foiJogada) {
        this.foiJogada = foiJogada;
    }

    /*public static void main(String[] args) {
        // Testando a criação de uma ilha
        Ilha ilhaTeste = new Ilha(1, EnumNomeIlhas.DADOLANDIA, true, false);
        System.out.println("Ilha criada: " + ilhaTeste.getNomeIlha());

        // Verificando os valores iniciais com os getters
        System.out.println("Estado inicial da ilha: " + ilhaTeste.isEstadoIlha());
        System.out.println("A ilha foi jogada? " + ilhaTeste.isFoiJogada());
        System.out.println("Número de desafios na ilha: " + ilhaTeste.getDesafio().size());

        // Modificando os valores com os setters
        ilhaTeste.setFoiJogada(true);
        List<Desafio> novosDesafios = new ArrayList<>();
        novosDesafios.add(new Desafio());
        ilhaTeste.setDesafio(novosDesafios);

        // Verificando os valores após as modificações
        System.out.println("A ilha foi jogada? " + ilhaTeste.isFoiJogada());
        System.out.println("Número de desafios na ilha após adição: " + ilhaTeste.getDesafio().size());
    } */
}