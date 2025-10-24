package ufv.desconecta.Desconecta.controller;
//comentario de teste
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.model.Desafio;
import ufv.desconecta.Desconecta.repository.AcessoBDDesafio;
import ufv.desconecta.Desconecta.service.PontuacaoService;

@RestController
@RequestMapping("/api/desafio")
@CrossOrigin(origins = "*")
public class ControladorDesafio {

    private final AcessoBDDesafio acessoBDDesafio;
    private final PontuacaoService pontuacaoService;

    @Autowired
    public ControladorDesafio(AcessoBDDesafio acessoBDDesafio, PontuacaoService pontuacaoService) {
        this.acessoBDDesafio = acessoBDDesafio;
        this.pontuacaoService = pontuacaoService;
    }

    @PostMapping("/concluir/{idDesafio}")
    public boolean concluirDesafio(@PathVariable int idDesafio) {
        Desafio desafio = new Desafio();
        desafio.setId(idDesafio);
        desafio.setConcluido(true);
        return acessoBDDesafio.alterarEstadoDesafio(desafio);
    }

    @PostMapping("/salvarPontuacao")
    public int salvarPontuacaoDesafio(@RequestParam String apelidoAluno,
                                      @RequestParam String nomeIlha,
                                      @RequestParam int tempo,
                                      @RequestParam int numErros,
                                      @RequestBody Desafio desafio) {

        if (apelidoAluno.isEmpty() || nomeIlha.isEmpty()) {
            // Lidar com erro de dados inválidos
            return -1;
        }

        int pontuacao = pontuacaoService.calcularPontuacao(apelidoAluno, nomeIlha, tempo, numErros);
        pontuacaoService.salvarPontuacaoDesafio(pontuacao, desafio);
        concluirDesafio(desafio.getId());

        return pontuacao;
    }
}