package ufv.desconecta.Desconecta;

public class Conecta{
    private int idConecta;
    private String respostaCerta1;
    private String respostaCerta2;
    private String respostaCerta3;
    private String respostaCerta4;

    Conecta(int idConecta, String respostaCerta1, String respostaCerta2, String respostaCerta3, String respostaCerta4){
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

    
    public static void main(String[] args) {
        // Cria um objeto Conecta
        Conecta conecta = new Conecta(1, "Resposta 1", "Resposta 2", "Resposta 3", "Resposta 4");

        // Testa os getters
        System.out.println("ID: " + conecta.getIdConecta());
        System.out.println("Resposta 1: " + conecta.getRespostaCerta1());
        System.out.println("Resposta 2: " + conecta.getRespostaCerta2());
        System.out.println("Resposta 3: " + conecta.getRespostaCerta3());
        System.out.println("Resposta 4: " + conecta.getRespostaCerta4());

        // Testa os setters
        conecta.setIdConecta(2);
        conecta.setRespostaCerta1("Nova Resposta testa 1");
        conecta.setRespostaCerta2("Nova Resposta testa 2");
        conecta.setRespostaCerta3("Nova Resposta testa 3");
        conecta.setRespostaCerta4("Nova Resposta testa 4");

        // Exibe os valores atualizados
        System.out.println("\nApós alteração:");
        System.out.println("ID: " + conecta.getIdConecta());
        System.out.println("Resposta 1: " + conecta.getRespostaCerta1());
        System.out.println("Resposta 2: " + conecta.getRespostaCerta2());
        System.out.println("Resposta 3: " + conecta.getRespostaCerta3());
        System.out.println("Resposta 4: " + conecta.getRespostaCerta4());
    }

}