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

    public List<String> getRespostaCerta() {
        return respostaCerta;
    }

    public void setIdCacaPalavras(int idCacaPalavras) {
        this.idCacaPalavras = idCacaPalavras;
    }

    public void setRespostaCerta(List<String> respostaCerta) {
        this.respostaCerta = respostaCerta;
    }

    /*
    public static void main(String[] args) {
        List<String> respostas = new ArrayList<>();
        respostas.add("JAVA");
        respostas.add("PYTHON");
        respostas.add("C++");

        CacaPalavras caca = new CacaPalavras(1, respostas);

        System.out.println("ID inicial: " + caca.getIdCacaPalavras());
        caca.setIdCacaPalavras(99);
        System.out.println("ID alterado: " + caca.getIdCacaPalavras());

        System.out.println("Lista atribuída corretamente? " + 
                           (caca.getRespostaCerta() != null ? "SIM" : "NÃO"));

        List<String> novasRespostas = new ArrayList<>();
        novasRespostas.add("RUBY");
        caca.setRespostaCerta(novasRespostas);

        System.out.println("Nova lista atribuída corretamente? " + 
                           (caca.getRespostaCerta() != null ? "SIM" : "NÃO"));
    } */
}
