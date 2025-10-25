package ufv.desconecta.Desconecta;

public class Desafio {
    private int id;
    private EnumTiposDesafios tipoDesafio;
    private int pontuacaoDesafio;
    private boolean isConcluido;

        private Desafio(int id, EnumTiposDesafios tipoDesafio, int pontuacaoDesafio, boolean isConcluido){
            this.id = id;
            this.tipoDesafio = tipoDesafio;
            this.pontuacaoDesafio = pontuacaoDesafio;
            this.isConcluido = isConcluido;
}

        
    public int getId() {
        return id;
    }

    public EnumTiposDesafios getTipoDesafio() {
        return tipoDesafio;
    }

    public int getPontuacaoDesafio() {
        return pontuacaoDesafio;
    }

    public boolean isConcluido() {
        return isConcluido;
    }


    public void setTipoDesafio(EnumTiposDesafios tipoDesafio) {
        this.tipoDesafio = tipoDesafio;
    }

    public void setPontuacaoDesafio(int pontuacaoDesafio) {
        this.pontuacaoDesafio = pontuacaoDesafio;
    }

    public void setConcluido(boolean concluido) {
        isConcluido = concluido;
    }
}
