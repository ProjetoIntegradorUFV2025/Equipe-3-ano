package ufv.desconecta.Desconecta;
import java.util.LinkedList;

public class TestaIlha {
    public static void main(String[] args) {
        Ilha ilha = new Ilha(1, Ilha.EnumNomeIlhas.Dadolandia, new LinkedList<>());

        System.out.println("Nome da Ilha: " + ilha.getNomeIlha());
        System.out.println("Estado da Ilha (foi jogada?): " + ilha.getEstadoIlha());
        System.out.println("Número de Desafios na Ilha: " + ilha.getDesafios().size());
    }
}