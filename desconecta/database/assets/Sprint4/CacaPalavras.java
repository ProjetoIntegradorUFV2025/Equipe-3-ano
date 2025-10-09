package ufv.desconecta.Desconecta;

import java.util.List;

public class CacaPalavras {
    private int idCacaPalavras;
    List<String> respostaCerta;
    
    public CacaPalavras(int idCacaPalavras, List<String> respostaCerta){
        this.idCacaPalavras = idCacaPalavras;
        this.respostaCerta = respostaCerta;
    }

    public int getIdCacaPalavras() {
        return idCacaPalavras;
    }
    public void setIdCacaPalavras(int idCacaPalavras) {
        this.idCacaPalavras = idCacaPalavras;
    }

    public List<String> getRespostaCerta() {
        return respostaCerta;
    }
    public void setRespostaCerta(List<String> respostaCerta) {
        this.respostaCerta = respostaCerta;
    }

    public static void main(String[] args) {
        //Testa construtor
        CacaPalavras cacaPalavras = new CacaPalavras(1, List.of("JAVA", "HTML", "CSS"));
        System.out.println("ID: " + cacaPalavras.getIdCacaPalavras());
        System.out.println("Respostas Certas: " + cacaPalavras.getRespostaCerta());

        //Testa getters e setters
        cacaPalavras.setIdCacaPalavras(2);
        cacaPalavras.setRespostaCerta(List.of("PYTHON", "JAVASCRIPT"));
        System.out.println("ID: " + cacaPalavras.getIdCacaPalavras());
        System.out.println("Respostas Certas: " + cacaPalavras.getRespostaCerta());
    }
}
