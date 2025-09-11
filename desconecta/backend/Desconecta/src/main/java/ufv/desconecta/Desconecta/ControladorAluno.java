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
        
    }

    Boolean autenticarAluno(String apelido, String senha){
        
        return true;
    }


}
