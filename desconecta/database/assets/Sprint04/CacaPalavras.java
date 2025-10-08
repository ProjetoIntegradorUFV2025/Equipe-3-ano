import java.util.List;
public class CacaPalavras {
    private int idCacaPalavras;
    private List<String> respostaCerta;

    public CacaPalavras(int idCacaPalavras, List<String> respostaCerta) {
        this.idCacaPalavras = idCacaPalavras;
        this.respostaCerta = respostaCerta;
    }
}

// Getters e Setters

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

