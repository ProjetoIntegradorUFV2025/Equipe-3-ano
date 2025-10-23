package ufv.desconecta.Desconecta;

public class Desafio {
    private int id;
    private EnumTipoDesafios tipoDesafio;
    private int pontuacaoDesafio;
    private boolean isConcluido;

    public Desafio(int id, EnumTipoDesafios tipoDesafio, int pontuacaoDesafio){
        this.id = id;
        this.tipoDesafio = tipoDesafio;
        this.pontuacaoDesafio = pontuacaoDesafio;
        this.isConcluido = false;
    }

    public int getId(){
        return this.id;
    }

    public void setId(int id){
        this.id = id;
    }

    public EnumTipoDesafios getTipoDesafio(){
        return this.tipoDesafio;
    }

    public void setTipoDesafio(EnumTipoDesafios tipoDesafio){
        this.tipoDesafio = tipoDesafio;
    }

    public int getPontuacaoDesafio(){
        return this.pontuacaoDesafio;
    }

    public void setPontuacaoDesafio(int pontuacaoDesafio){
        this.pontuacaoDesafio = pontuacaoDesafio;
    }

    public boolean isConcluido(){
        return this.isConcluido;
    }

    public void setConcluido(boolean isConcluido){
        this.isConcluido = isConcluido;
    }

    /*
    public static void main(String[] args){
        Desafio desafio1 = new Desafio(1, EnumTipoDesafios.JogoConecta, 10);
        System.out.println("ID: " + desafio1.getId());
        System.out.println("Tipo de Desafio: " + desafio1.getTipoDesafio());
        System.out.println("Pontuacao: " + desafio1.getPontuacaoDesafio());
        System.out.println("Desafio Concluído: " + desafio1.isConcluido());
    }*/
}
