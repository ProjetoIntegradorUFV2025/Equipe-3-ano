package ufv.desconecta.Desconecta;

public class ProgressoAluno {
    private int id;
    private Ilha ilha;
    private int pontuacaoTotalAluno;

    public ProgressoAluno(int id, Ilha ilha) {
        this.id = id;
        this.ilha = ilha;
        this.pontuacaoTotalAluno = 0;
    }

    public void setId(int id) {
        this.id = id;
    }
    public int getId() {
        return id;
    }

    public void setIlha(Ilha ilha) {
        this.ilha = ilha;
    }
    public Ilha getIlha() {
        return ilha;
    }

    public void setPontuacaoTotalAluno(int pontuacaoTotalAluno) {
        this.pontuacaoTotalAluno = pontuacaoTotalAluno;
    }
    public int getPontuacaoTotalAluno() {
        return pontuacaoTotalAluno;
    }
}
