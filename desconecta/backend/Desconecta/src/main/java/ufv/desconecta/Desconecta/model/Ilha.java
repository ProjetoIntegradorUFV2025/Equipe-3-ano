package ufv.desconecta.Desconecta.model;

import jakarta.persistence.*;
import lombok.*;
import ufv.desconecta.Desconecta.EnumNomeIlha;

@Entity
@Table(name = "TB_Ilha")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ilha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int PK_Ilha; // chave primária

    @Enumerated(EnumType.STRING)
    private EnumNomeIlha nomeIlha;       // nome da ilha
    private boolean estado;    // true se desbloqueada
    private boolean foiJogada; // true se o aluno já jogou

//    private List<Desafio> desafios;
    //Lista de desafios

    public EnumNomeIlha buscaIlha(int idIlha) {
        if(idIlha < 0 ||idIlha > 4) {
            throw new IllegalArgumentException("Índice inválido para EnumNomeIlha: " + idIlha);
        }
        return EnumNomeIlha.values()[idIlha];
    }

    // várias ilhas para um progressoAluno
    @ManyToOne
    @JoinColumn(name = "PK_ProgressoAluno") // FK para ProgressoAluno
    private ProgressoAluno progressoAluno;
}
