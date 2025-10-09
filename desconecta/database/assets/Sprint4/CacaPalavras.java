import java.util.List;

public class CacaPalavras {
    private int idCacaPalavras;
    private List<String> respostaCerta;

    public CacaPalavras(int idCacaPalavras, List<String> respostaCerta) {
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
    /*
    public static void main(String[] args) {

        CacaPalavras jogo = new CacaPalavras(1, Arrays.asList("JAVA", "CLASSE", "OBJETO"));

        System.out.println("ID inicial: " + jogo.getIdCacaPalavras());
        jogo.setIdCacaPalavras(2);
        System.out.println("ID alterado: " + jogo.getIdCacaPalavras());

        System.out.println("Lista de respostas atribuida: " + 
                           (jogo.getRespostaCerta() != null ? "OK" : "NULA"));

        jogo.setRespostaCerta(Arrays.asList("TESTE"));
        System.out.println("Nova lista atribuida: " + 
                           (jogo.getRespostaCerta() != null ? "OK" : "NULA"));
    }
    */
}
