package ufv.desconecta.Desconecta;

import java.util.List;

public class Ilha {
    
    private int id;
    private EnumNomeIlha nomeIlha;
    private boolean estadoIlha;
    private List<Desafio> desafio;
    private boolean foiJogada;

        public EnumNomeIlha getNomeIlha(){
            return nomeIlha;
        }

        public boolean getEstadoIlha(){
            return estadoIlha;
        }

        public List<Desafio> getDesafio(){
            return desafio;
        }

        public int getId(){
            return id;
        }

        public boolean getfoiJogada(){
            return foiJogada;
        }

        //Implementei os setters para fazer o caso de teste.
        public void setId(int id){
            this.id = id;
        }

        public void setfoiJogada(boolean foiJogada){
            this.foiJogada = foiJogada;
        }

            public static void main(String[] args) {
        
                Ilha ilha1 = new Ilha();

                ilha1.setId(1);
                ilha1.setfoiJogada(true);

                System.out.println("ID da ilha: " + ilha1.getId());
                System.out.println("A ilha foi jogada? " + ilha1.getfoiJogada());

                System.out.println("Nome da ilha: " + ilha1.getNomeIlha());
                System.out.println("Estado da ilha: " + ilha1.getEstadoIlha());
                System.out.println("Lista de desafios da ilha: " + ilha1.getDesafio());
            }
}
