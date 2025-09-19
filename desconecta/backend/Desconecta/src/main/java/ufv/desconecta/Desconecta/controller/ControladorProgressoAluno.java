package ufv.desconecta.Desconecta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.repository.AcessoBDAluno;
import ufv.desconecta.Desconecta.repository.AcessoBDProgressoAluno;

import ufv.desconecta.Desconecta.model.ProgressoAluno;

@RestController
@RequestMapping("/api/progresso-aluno")
@CrossOrigin(origins = "*")
public class ControladorProgressoAluno {

    private final AcessoBDProgressoAluno acessoBDProgressoAluno;

    private final AcessoBDAluno acessoBDAluno;

    @Autowired
    public ControladorProgressoAluno(AcessoBDProgressoAluno acessoBDProgressoAluno, AcessoBDAluno acessoBDAluno) {
        this.acessoBDProgressoAluno = acessoBDProgressoAluno;
        this.acessoBDAluno = acessoBDAluno;
    }



    @GetMapping("/{idAluno}")
    public ProgressoAluno recuperarProgressoAluno(@PathVariable  int idAluno){
        return acessoBDProgressoAluno.getProgressoAluno(idAluno);
    }

    @GetMapping("/id/{idAluno}")
    public Long recuperarIdProgressoAluno(@PathVariable int idAluno){
        ProgressoAluno progresso = acessoBDProgressoAluno.getProgressoAluno(idAluno);
        return progresso != null ? progresso.getPK_ProgressoAluno() : null;
    }



    @PostMapping("/calcular/{idAluno}")
    public int calcularPontuacao(int idAluno){
        acessoBDProgressoAluno.armazenarPontuacaoAluno(idAluno, 100); // Exemplo de pontuação implentar depois
        return 0;
    }

}
