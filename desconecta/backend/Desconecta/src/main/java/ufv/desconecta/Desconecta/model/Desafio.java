package ufv.desconecta.Desconecta.model;


import jakarta.persistence.*;
import ufv.desconecta.Desconecta.EnumTiposDesafios;

@Entity
@Table(name = "TB_Desafio")
public class Desafio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private EnumTiposDesafios tipoDesafio;
    private int pontuacaoDesafio;
    private boolean isConcluido;

    public Desafio() {
    }

    public Desafio(int id, EnumTiposDesafios tipoDesafio, int pontuacaoDesafio, boolean isConcluido) {
        this.id = id;
        this.tipoDesafio = tipoDesafio;
        this.pontuacaoDesafio = pontuacaoDesafio;
        this.isConcluido = isConcluido;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public EnumTiposDesafios getTipoDesafio() {
        return tipoDesafio;
    }

    public void setTipoDesafio(EnumTiposDesafios tipoDesafio) {
        this.tipoDesafio = tipoDesafio;
    }

    public int getPontuacaoDesafio() {
        return pontuacaoDesafio;
    }

    public void setPontuacaoDesafio(int pontuacaoDesafio) {
        this.pontuacaoDesafio = pontuacaoDesafio;
    }

    public boolean isConcluido() {
        return isConcluido;
    }

    public void setConcluido(boolean isConcluido) {
        this.isConcluido = isConcluido;
    }

}