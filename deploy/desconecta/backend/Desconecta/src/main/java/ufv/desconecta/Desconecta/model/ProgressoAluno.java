package ufv.desconecta.Desconecta.model;

import jakarta.persistence.*;
import lombok.*;

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

    @OneToOne(mappedBy = "progressoAluno", cascade = CascadeType.ALL)
    private Ilha ilha;

    @Builder.Default
    @Column(name = "pontuacao_total_aluno")
    private int pontuacaoTotalAluno = 0;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_Aluno", referencedColumnName = "PK_Aluno")
    private Aluno aluno;

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
        if (aluno != null && aluno.getProgresso() != this) {
            aluno.setProgresso(this);
        }
    }

    public void setIlha(Ilha ilha) {
        this.ilha = ilha;
        if (ilha != null && ilha.getProgressoAluno() != this) {
            ilha.setProgressoAluno(this);
        }
    }
}
