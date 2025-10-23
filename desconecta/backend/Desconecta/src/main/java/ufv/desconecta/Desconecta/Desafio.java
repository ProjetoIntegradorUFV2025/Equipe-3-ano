package ufv.desconecta.Desconecta;

public class Desafio {

    public static enum EnumTiposDesafios {
        JogoConecta,
        JogoPalavras
    }

    private int id;
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
    
    /*
    public static void main(String[] args) {

        System.out.println("Teste");
        
        Desafio desafioConecta = new Desafio(
            1, 
            EnumTiposDesafios.JogoConecta, 
            150, 
            false
        );

        System.out.println("ID: " + desafioConecta.getId());
        System.out.println("Tipo: " + desafioConecta.getTipoDesafio());
        System.out.println("Pontuação: " + desafioConecta.getPontuacaoDesafio());
        System.out.println("Concluído? " + desafioConecta.isConcluido());

        System.out.println("\nTeste 2");

        Desafio desafioPalavras = new Desafio();

        desafioPalavras.setId(2);
        desafioPalavras.setTipoDesafio(EnumTiposDesafios.JogoPalavras);
        desafioPalavras.setPontuacaoDesafio(100);
        desafioPalavras.setConcluido(true); 

        System.out.println("ID: " + desafioPalavras.getId());
        System.out.println("Tipo: " + desafioPalavras.getTipoDesafio());
        System.out.println("Pontuação: " + desafioPalavras.getPontuacaoDesafio());
        
        System.out.println("Concluído? " + desafioPalavras.isConcluido());
    }
    */
}