public class Conecta{
    private int idConecta;
    private String respostaCerta1;
    private String respostaCerta2;
    private String respostaCerta3;
    private String respostaCerta4;

    public Conecta(int idConecta, String respostaCerta1, String respostaCerta2, String respostaCerta3, String respostaCerta4) {
        this.idConecta = idConecta;
        this.respostaCerta1 = respostaCerta1;
        this.respostaCerta2 = respostaCerta2;
        this.respostaCerta3 = respostaCerta3;
        this.respostaCerta4 = respostaCerta4;
    }

    public int getIdConecta() {
        return idConecta;
    }

    public void setIdConecta(int idConecta) {
        this.idConecta = idConecta;
    }

    public String getRespostaCerta1() {
        return respostaCerta1;
    }

    public void setRespostaCerta1(String respostaCerta1) {
        this.respostaCerta1 = respostaCerta1;
    }

    public String getRespostaCerta2() {
        return respostaCerta2;
    }

    public void setRespostaCerta2(String respostaCerta2) {
        this.respostaCerta2 = respostaCerta2;
    }

    public String getRespostaCerta3() {
        return respostaCerta3;
    }

    public void setRespostaCerta3(String respostaCerta3) {
        this.respostaCerta3 = respostaCerta3;
    }

    public String getRespostaCerta4() {
        return respostaCerta4;
    }

    public void setRespostaCerta4(String respostaCerta4) {
        this.respostaCerta4 = respostaCerta4;
    }

    
    /*public static void main(String[] args) {
        Conecta desafio01 = new Conecta(1, "Brasil", "Argentina", "Uruguai", "Paraguai");

        System.out.println(" DADOS INICIAIS DO DESAFIO ");
        System.out.println("ID do Desafio: " + desafio01.getIdConecta());
        System.out.println("Resposta Certa 1: " + desafio01.getRespostaCerta1());
        System.out.println("Resposta Certa 2: " + desafio01.getRespostaCerta2());
       
        System.out.println();

        System.out.println("Alterando a Resposta Certa 2 ");
        desafio01.setRespostaCerta2("Chile");
        System.out.println();

        System.out.println(" DADOS APOS A ALTERACAO");
        System.out.println("ID do Desafio: " + desafio01.getIdConecta());
        System.out.println("Resposta Certa 1: " + desafio01.getRespostaCerta1());
        System.out.println("Nova Resposta Certa 2: " + desafio01.getRespostaCerta2());
       
    }*/
}