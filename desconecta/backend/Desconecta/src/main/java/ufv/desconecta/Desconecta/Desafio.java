package ufv.desconecta.Desconecta;

public class Desafio {
    private int id;
    private EnumTiposDesafios tipoDesafio;
    private int pontuacaoDesafio;
    private boolean isConcluido;

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

        // 1. Criando um novo Desafio
        Desafio desafio1 = new Desafio(610, EnumTiposDesafios.JogoPalavras, 40, false);

        // 2. Verificando valores iniciais com os getters
        System.out.println("   - ID: " + desafio1.getId());
        System.out.println("   - Tipo: " + desafio1.getTipoDesafio());
        System.out.println("   - Pontuação: " + desafio1.getPontuacaoDesafio());
        System.out.println("   - Concluído? " + desafio1.isConcluido());

        // 3. Modificando valores com os setters
        System.out.println("\nModificando desafio: marcando como concluído e alterando pontuação...");
        desafio1.setConcluido(true);
        desafio1.setPontuacaoDesafio(150);

        // 4. Verificando valores finais
        System.out.println("   - Pontuação: " + desafio1.getPontuacaoDesafio());
        System.out.println("   - Concluído? " + desafio1.isConcluido());
    }
    */
}