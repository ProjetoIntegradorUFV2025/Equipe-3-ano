package ufv.desconecta.Desconecta.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TB_ProgressoAluno")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressoAluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PK_ProgressoAluno;

    @OneToMany(mappedBy = "progressoAluno", cascade = CascadeType.ALL)
    private List<Ilha> ilhas = new ArrayList<>();

    private int pontuacaoTotalAluno = 0;


    @OneToOne(mappedBy = "progresso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@JoinColumn(name = "PK_Aluno", referencedColumnName = "PK_Aluno")
    private Aluno aluno;

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
        if (aluno != null && aluno.getProgresso() != this) {
            aluno.setProgresso(this);
        }
    }

    public void addIlha(Ilha ilha) {
        this.ilhas.add(ilha);
        ilha.setProgressoAluno(this);
    }
}
