package ufv.desconecta.Desconecta;
import java.util.List;

public class Ilha {
    private int id;
    private EnumNomeIlhas nomeIlha;
    private boolean estadoIlha;
    private List<Desafio> desafio;
    private boolean foiJogada;

    public enum EnumNomeIlhas {
        Dadolandia,
        Ciencia,
        Geografia,
        Matematica,
        Historia,
    }
    
    //Getters e Setters
    public int getId() {
        return this.id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public EnumNomeIlhas getNomeIlha() {
        return this.nomeIlha;
    }
    public void setNomeIlha(EnumNomeIlhas nomeIlha) {
        this.nomeIlha = nomeIlha;
    }
    public boolean getEstadoIlha() {
        return this.estadoIlha;
    }
    public void setEstadoIlha(boolean estadoIlha) {
        this.estadoIlha = estadoIlha;
    }
    public List<Desafio> getDesafio() {
        return this.desafio;
    }   
    public void setDesafio(List<Desafio> desafio) {
        this.desafio = desafio;
    }
    public boolean getFoiJogada() {
        return this.foiJogada;
    }   
    public void setFoiJogada(boolean foiJogada) {
        this.foiJogada = foiJogada;
    }
    
    //Construtor
    public Ilha(int id, EnumNomeIlhas nomeIlha, boolean estadoIlha, List<Desafio> desafio, boolean foiJogada) {
        this.id = id;
        this.nomeIlha = nomeIlha;
        this.estadoIlha = estadoIlha;
        this.desafio = desafio;
        this.foiJogada = foiJogada;
    }

    /*
    public static void main(String[] args) {
        Ilha ilha = new Ilha(1, EnumNomeIlhas.Dadolandia, true, null, false);
        System.out.println("ID: " + ilha.getId());
        System.out.println("Nome da Ilha: " + ilha.getNomeIlha());
        System.out.println("Estado da Ilha: " + ilha.getEstadoIlha());
        System.out.println("Foi Jogada: " + ilha.getFoiJogada());
        System.out.println("Ilha criada: " + ilha1.getNomeIlha());
    }
    */  
}
