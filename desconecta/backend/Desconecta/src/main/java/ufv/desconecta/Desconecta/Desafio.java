package ufv.desconecta.Desconecta;

public class Desafio {
    private int id;
    private EnumTiposDesafios tipoDesafio;
    private int pontuaçaoDesafio;
    private boolean isConcluido;

    public Desafio(int id, EnumTiposDesafios tipoDesafio, int pontuaçaoDesafio) {
        this.id = id;
        this.tipoDesafio = tipoDesafio;
        this.pontuaçaoDesafio = pontuaçaoDesafio;
        this.isConcluido = false;
    }

    // Getters e Setters
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
    public int getPontuaçaoDesafio() {
        return pontuaçaoDesafio;
    }
    public void setPontuaçaoDesafio(int pontuaçaoDesafio) {
        this.pontuaçaoDesafio = pontuaçaoDesafio;
    }
    public boolean getisConcluido() {
        return isConcluido;
    }
    public void setisConcluido() {
        this.isConcluido = true;
    }
    


// Main para teste
    public static void main(String[] args) {
        Desafio desafio1 = new Desafio(1, EnumTiposDesafios.JogoConecta, 150);
        Desafio desafio2 = new Desafio(2, EnumTiposDesafios.JogoPalavras, 300);

        System.out.println("Desafios Criados");
        exibirDesafio(desafio1);
        exibirDesafio(desafio2);

        desafio2.setisConcluido();

        System.out.println("\nApós Concluir um Desafio");
        exibirDesafio(desafio1);
        exibirDesafio(desafio2);
    }

    private static void exibirDesafio(Desafio d) {
        System.out.println("ID: " + d.getId());
        System.out.println("Tipo: " + d.getTipoDesafio());
        System.out.println("Pontuação: " + d.getPontuaçaoDesafio());
        System.out.println("Concluído: " + d.getisConcluido());
    }
}
