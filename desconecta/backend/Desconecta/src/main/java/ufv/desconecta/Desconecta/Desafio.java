package ufv.desconecta.Desconecta;

public class Desafio {
    private int id;
    private EnumTiposDesafios tipoDesafio;
    private int pontuacaoDesafio;
    private boolean isConcluido;

    public Desafio(int id, EnumTiposDesafios tipoDesafio, int pontuacaoDesafio) {
        this.id = id;
        this.tipoDesafio = tipoDesafio;
        this.pontuacaoDesafio = pontuacaoDesafio;
        this.isConcluido = false;
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

    public static void main(String[] args) {
        Desafio d1 = new Desafio(1, EnumTiposDesafios.JogoConecta, 100);

        System.out.println("Desafio 1 - id: " + d1.getId());
        System.out.println("Tipo: " + d1.getTipoDesafio());
        System.out.println("Pontuação: " + d1.getPontuacaoDesafio());
        System.out.println("Concluído: " + d1.isConcluido());

        d1.setPontuacaoDesafio(150);
        d1.setConcluido(true);
        d1.setTipoDesafio(EnumTiposDesafios.JogoPalavras);

        System.out.println("\nApós alterações:");
        System.out.println("Tipo: " + d1.getTipoDesafio());
        System.out.println("Pontuação: " + d1.getPontuacaoDesafio());
        System.out.println("Concluído: " + d1.isConcluido());

        Desafio d2 = new Desafio(2, EnumTiposDesafios.JogoPalavras, 50);
        System.out.println("\nDesafio 2 - id: " + d2.getId() + ", Tipo: " + d2.getTipoDesafio() + ", Pontuação: " + d2.getPontuacaoDesafio() + ", Concluído: " + d2.isConcluido());
    }
}
