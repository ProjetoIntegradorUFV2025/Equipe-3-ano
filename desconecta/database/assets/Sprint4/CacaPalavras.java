public class CacaPalavras {
    
    private int idCacaPalavras;
    private String[] respostaCerta; 

    public CacaPalavras(int idCacaPalavras, String[] respostaCerta){
        this.idCacaPalavras = idCacaPalavras;
        this.respostaCerta = respostaCerta;
    }

    public int getIdCacaPalavras() {
        return idCacaPalavras;
    }

    public void setIdCacaPalavras(int idCacaPalavras) {
        this.idCacaPalavras = idCacaPalavras;
    }

    public String[] getRespostaCerta() {
        return respostaCerta;
    }

    public void setRespostaCerta(String[] respostaCerta) {
        this.respostaCerta = respostaCerta;
    }
}