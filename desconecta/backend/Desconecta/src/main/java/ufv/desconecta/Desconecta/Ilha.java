package ufv.desconecta.Desconecta;

import java.util.LinkedList;

public class Ilha {
    private int id;
    private EnumNomeIlhas nomeIlha;
    private LinkedList<Desafio> desafio;
    private boolean foiJogada;

    enum EnumNomeIlhas {
        Dadolandia,
        Ciencias,
        Geografia,
        Matematica,
        Historia
    }

    public Ilha(int id, EnumNomeIlhas nomeIlha, LinkedList<Desafio> desafio) {
        this.id = id;
        this.nomeIlha = nomeIlha;
        this.desafio = desafio;
        this.foiJogada = false;
    }

    public EnumNomeIlhas getNomeIlha() {
        return nomeIlha;
    }

    public boolean getEstadoIlha() {
        return foiJogada;
    }

    public LinkedList<Desafio> getDesafios() {
        return desafio;
    }
}
