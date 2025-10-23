package ufv.desconecta.Desconecta;

public class Desafio {
    //atributos privados
    
    private int id;
    private EnumTiposDesafios tipoDesafio;
    private int pontuacaoDesafio;
    private boolean isConcluido;

    // construtores 
    public Desafio() {
        //construtor vazio
    }

    public Desafio(int id, EnumTiposDesafios tipoDesafio, int pontuacaoDesafio) {
        this.id = id;
        this.tipoDesafio = tipoDesafio;
        this.pontuacaoDesafio = pontuacaoDesafio;
        this.isConcluido = false; // Valor inicial padrão
    }

    //getters e setters

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

    /* 
    public static void main(String[] args) {
        
        Desafio desafio1 = new Desafio(1, EnumTiposDesafios.JogoPalavras, 150);

        System.out.println("ID: " + desafio1.getId());
        System.out.println("Tipo: " + desafio1.getTipoDesafio());
        System.out.println("Pontuação: " + desafio1.getPontuacaoDesafio());
        System.out.println("Está concluído? " + desafio1.isConcluido());

        System.out.println("\n modificando o desafio");
        
        desafio1.setConcluido(true);
        System.out.println("Desafio marcado como concluído.");

        System.out.println("Está concluído? " + desafio1.isConcluido());
    } */
}
