package ufv.desconecta.Desconecta;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aluno")
@CrossOrigin(origins = "*") // permitir requisições do React
@AllArgsConstructor
@NoArgsConstructor
public class ControladorAluno {
    
    @Autowired
    private AcessoBDAluno acessoBDAluno;

    public Boolean validarDadosAluno(String apelido, String senha){
        if(apelido == null || apelido.isEmpty() || senha == null || senha.isEmpty()){
            return false;
        }
        return true;
    }

    @PostMapping("/cadastro")
    public Boolean realizarCadastro(@RequestParam String apelido, @RequestParam String senha){
        if(validarDadosAluno(apelido, senha)){
            Aluno aluno = new Aluno(apelido, senha);
            return acessoBDAluno.inserirAluno(aluno);
        } else {
            return false;
        }
    }

    @PostMapping("/login")
    public Boolean autenticarAluno(@RequestParam String apelido, @RequestParam String senha){
        if(validarDadosAluno(apelido, senha)){
            Aluno aluno = acessoBDAluno.buscarApelido(apelido);
            return (aluno != null && aluno.getSenha().equals(senha));
        }
        return false;
    }

    @GetMapping("/buscar/{apelido}")
    public Aluno buscarAluno(@PathVariable String apelido){
        return acessoBDAluno.buscarApelido(apelido);
    }

    @GetMapping("/verificar/{apelido}")
    public Boolean verificarApelidoExistente(@PathVariable String apelido){
        return acessoBDAluno.verificarApelidoExistente(apelido);
    }

    @DeleteMapping("/deletar/{apelido}")
    public Boolean deletarAluno(@PathVariable String apelido){
        return acessoBDAluno.apagarAluno(apelido);
    }


}
