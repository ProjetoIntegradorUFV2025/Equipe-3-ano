package ufv.desconecta.Desconecta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aluno")
@CrossOrigin(origins = "*") // permitir requisições do React
public class ControladorAluno {
    
    private final AcessoBDAluno acessoBDAluno;
    
    @Autowired
    public ControladorAluno(AcessoBDAluno acessoBDAluno) {
        this.acessoBDAluno = acessoBDAluno;
    }

    public Boolean validarDadosAluno(String apelido, String senha){
        if(apelido == null || apelido.isEmpty() || senha == null || senha.isEmpty()){
            return false;
        }
        return true;
    }

    @PostMapping("/cadastro")
    public Boolean realizarCadastro(@RequestBody Aluno aluno){
        if(validarDadosAluno(aluno.getApelido(), aluno.getSenha())){
            return acessoBDAluno.inserirAluno(aluno);
        } else {
            return false;
        }
    }

    @PostMapping("/login")
    public Boolean autenticarAluno(@RequestBody Aluno loginData){
        if(validarDadosAluno(loginData.getApelido(), loginData.getSenha())){
            Aluno aluno = acessoBDAluno.buscarApelido(loginData.getApelido());
            return (aluno != null && aluno.getSenha().equals(loginData.getSenha()));
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
