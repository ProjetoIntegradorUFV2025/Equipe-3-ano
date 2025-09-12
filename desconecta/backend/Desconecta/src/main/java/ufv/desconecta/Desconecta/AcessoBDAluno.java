package ufv.desconecta.Desconecta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TB_Aluno")
@NoArgsConstructor
@AllArgsConstructor
public class AcessoBDAluno {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long PK_Aluno;

    @Column(nullable = false)
    private String apelido;

    @Column(nullable = false)   
    private String senha;

    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String progresso;





    public Boolean inserirAluno(Aluno aluno){
        return true;
    }

    public Aluno buscarApelido(String apelido){

        
    }

    public Boolean verificarConexao(){
        return true;
    }

    public Boolean verficarApelidoExistente(String apelido){
        return false;
    }

    public Boolean apagarAluno(String apelido){
        return true;
    }




}
