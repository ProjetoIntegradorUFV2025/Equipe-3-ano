package ufv.desconecta.Desconecta.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TB_Aluno")
@NoArgsConstructor
@AllArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long PK_Aluno;

    @Column(nullable = false)
    private String apelido;

    // WRITE_ONLY: a senha pode ser recebida em login/cadastro, mas nunca e devolvida nas respostas
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String senha;

    @OneToOne(mappedBy = "aluno", cascade = CascadeType.ALL)
    private ProgressoAluno progresso;

    public Aluno(String apelido, String senha) {
        this.apelido = apelido;
        this.senha = senha;

    }


    public long getPK_Aluno() {
        return PK_Aluno;
    }

    public String getApelido() {
        return apelido;
    }

    public String getSenha() {
        return senha;
    }

    public void setProgresso(ProgressoAluno progresso) {
        this.progresso = progresso;

    }

    public ProgressoAluno getProgresso() {
        return progresso;
    }
}
