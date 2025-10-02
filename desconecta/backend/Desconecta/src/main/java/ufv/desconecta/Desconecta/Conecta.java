public class Conecta {
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

    /*
    public static void main(String[] args) {
        Conecta desafioConecta1 = new Conecta(347, "Gato", "Miau", "Felino", "Rabo");
        System.out.println("Novo desafio 'Conecta' criado com ID: " + desafioConecta1.getIdConecta());

        System.out.println("\nRespostas iniciais:");
        System.out.println("    - Resposta 1: " + desafioConecta1.getRespostaCerta1());
        System.out.println("    - Resposta 2: " + desafioConecta1.getRespostaCerta2());
        System.out.println("    - Resposta 3: " + desafioConecta1.getRespostaCerta3());
        System.out.println("    - Resposta 4: " + desafioConecta1.getRespostaCerta4());

        System.out.println("Modificando a resposta 4...");
        desafioConecta1.setRespostaCerta4("Bola de pelo");

        System.out.println("Resposta 4 atualizada: " + desafioConecta1.getRespostaCerta4());
    }
    */
}
