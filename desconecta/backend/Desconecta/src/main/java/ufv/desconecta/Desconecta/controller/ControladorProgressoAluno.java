package ufv.desconecta.Desconecta.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.model.Aluno;
import ufv.desconecta.Desconecta.model.Desafio;
import ufv.desconecta.Desconecta.model.Ilha;
import ufv.desconecta.Desconecta.repository.AcessoBDAluno;
import ufv.desconecta.Desconecta.repository.AcessoBDDesafio;
import ufv.desconecta.Desconecta.repository.AcessoBDProgressoAluno;

import ufv.desconecta.Desconecta.model.ProgressoAluno;

import java.util.List;

@RestController
@RequestMapping("/api/progresso-aluno")
@CrossOrigin(origins = "*")
public class ControladorProgressoAluno {

    private static final Logger log = LoggerFactory.getLogger(ControladorProgressoAluno.class);

    private final AcessoBDProgressoAluno acessoBDProgressoAluno;

    private final AcessoBDAluno acessoBDAluno;

    private final AcessoBDDesafio acessoBDDesafio;

    @Autowired
    public ControladorProgressoAluno(AcessoBDProgressoAluno acessoBDProgressoAluno, AcessoBDAluno acessoBDAluno, AcessoBDDesafio acessoBDDesafio) {
        this.acessoBDDesafio = acessoBDDesafio;
        this.acessoBDProgressoAluno = acessoBDProgressoAluno;
        this.acessoBDAluno = acessoBDAluno;
    }



    @GetMapping("/{idAluno}")
    public ProgressoAluno recuperarProgressoAluno(@PathVariable long idAluno){
        return acessoBDProgressoAluno.getProgressoAluno(idAluno);
    }

    @GetMapping("/id/{idAluno}")
    public Long recuperarIdProgressoAluno(@PathVariable long idAluno){
        ProgressoAluno progresso = acessoBDProgressoAluno.getProgressoAluno(idAluno);
        return progresso != null ? progresso.getPK_ProgressoAluno() : null;
    }




    @PostMapping("/calcularPontuacaoTotal")
    public int calcularPontuacaoTotal(@RequestParam String apelidoAluno) {
        Aluno aluno = acessoBDAluno.buscarApelido(apelidoAluno);
        if (aluno == null) {
            log.warn("Calcular pontuação: aluno não encontrado");
            return 0;
        }

        ProgressoAluno progresso = acessoBDProgressoAluno.getProgressoPeloAlunoId(aluno.getPK_Aluno());
        if (progresso == null) {
            log.warn("Calcular pontuação: progresso não encontrado para o aluno");
            return -1;
        }


        List<Desafio> desafiosDoAluno = acessoBDDesafio.getDesafiosDoAluno(aluno.getPK_Aluno());

        int pontuacaoTotal = desafiosDoAluno.stream()
                .filter(Desafio::isConcluido)
                .mapToInt(Desafio::getPontuacaoDesafio)
                .sum();


        progresso.setPontuacaoTotalAluno(pontuacaoTotal);
        acessoBDProgressoAluno.salvarProgressoAluno(progresso);

        log.debug("Nova pontuação total para '{}': {}", apelidoAluno, pontuacaoTotal);

        return 1;
    }

}
