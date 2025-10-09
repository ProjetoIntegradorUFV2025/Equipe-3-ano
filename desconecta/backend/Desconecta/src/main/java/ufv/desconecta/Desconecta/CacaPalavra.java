package ufv.desconecta.Desconecta;

import java.util.List;
import java.util.ArrayList;

public class CacaPalavra {
    private int idCacaPalavra;
    private List<String> respostaCerta;

    public CacaPalavra(int idCacaPalavra, List<String> respostaCerta) {
        this.idCacaPalavra = idCacaPalavra;
        this.respostaCerta = respostaCerta;
    }

    public int getIdCacaPalavra() {
        return idCacaPalavra;
    }

    public void setIdCacaPalavra(int idCacaPalavra) {
        this.idCacaPalavra = idCacaPalavra;
    }

    public List<String> getRespostaCerta() {
        return respostaCerta;
    }

    public void setRespostaCerta(List<String> respostaCerta) {
        this.respostaCerta = respostaCerta;
    }

    /*public static void main(String[] args) {
        List<String> respostas = new ArrayList<>();
        respostas.add("JAVA");
        respostas.add("PYTHON");
        respostas.add("HTML");
        
        CacaPalavra desafio1 = new CacaPalavra(101, respostas);
        System.out.println("Novo desafio 'Caça-Palavra' criado com ID: " + desafio1.getIdCacaPalavra());

        System.out.println("\nRespostas iniciais: " + desafio1.getRespostaCerta());
        System.out.println("Número de respostas: " + desafio1.getRespostaCerta().size());

        List<String> novasRespostas = new ArrayList<>();
        novasRespostas.add("SQL");
        novasRespostas.add("JAVASCRIPT");
        desafio1.setRespostaCerta(novasRespostas);

        System.out.println("\nRespostas atualizadas: " + desafio1.getRespostaCerta());
    } */
    
}
