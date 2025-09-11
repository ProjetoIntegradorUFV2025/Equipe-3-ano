package ufv.desconecta.Desconecta;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ControladorAluno {
    private AcessoBDAluno acessoBDAluno;

    private Boolean validarDadosAluno(String apelido, String senha){
        if(apelido == null || apelido.isEmpty() || senha == null || senha.isEmpty()){
            return false;
        }
        return true;
    }

    private Boolean realizarCadastro(String apelido, String senha){
        if(validarDadosAluno(apelido, senha)){
            if(!acessoBDAluno.verficarApelidoExistente(apelido)){
                Aluno aluno = new Aluno(apelido, senha);
                return acessoBDAluno.inserirAluno(aluno);
            } else {
                return false;
            }
        } else {
            return false;

        }
        
    }

    Boolean autenticarAluno(String apelido, String senha){
        if(validarDadosAluno(apelido, senha)){
            Aluno aluno = acessoBDAluno.buscarApelido(apelido);
            if(aluno != null && aluno.getSenha().equals(senha)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


}
