package ufv.desconecta.Desconecta;
import java.util.List;

public class CacaPalavras {
    private int idCacaPalavras;
    private List<String> respostaCerta;

    public CacaPalavras(int idCacaPalavras, List<String> respostaCerta) {
        this.idCacaPalavras = idCacaPalavras;
        this.respostaCerta = respostaCerta;
    }

    public int getIdCacaPalavras() {
        return this.idCacaPalavras;
    }

    public void setIdCacaPalavras(int idCacaPalavras) {
        this.idCacaPalavras = idCacaPalavras;
    }

    public List<String> getRespostaCerta() {
        return this.respostaCerta;
    }

    public void setRespostaCerta(List<String> respostaCerta) {
        this.respostaCerta = respostaCerta;
    }

    public static void main(String[] args) {
        // Exemplo de uso da classe CacaPalavras
        List<String> respostas = List.of("A", "B", "A", "E");
        CacaPalavras cacaPalavras = new CacaPalavras(1, respostas);

        System.out.println("ID do Caça-Palavras: " + cacaPalavras.getIdCacaPalavras());
        System.out.println("Respostas Certas: " + cacaPalavras.getRespostaCerta());
    }
}
