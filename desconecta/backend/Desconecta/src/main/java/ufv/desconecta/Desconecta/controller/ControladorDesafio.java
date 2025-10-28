package ufv.desconecta.Desconecta.controller;
//comentario de teste
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.model.Desafio;
import ufv.desconecta.Desconecta.model.Ilha;
import ufv.desconecta.Desconecta.repository.AcessoBDDesafio;
import ufv.desconecta.Desconecta.repository.AcessoBDIlha;
import ufv.desconecta.Desconecta.repository.AcessoBDProgressoAluno;
import ufv.desconecta.Desconecta.repository.RepositorioDesafio;
import ufv.desconecta.Desconecta.service.PontuacaoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/desafio")
@CrossOrigin(origins = "*")
public class ControladorDesafio {

    private final AcessoBDDesafio acessoBDDesafio;
    private final PontuacaoService pontuacaoService;
    private final AcessoBDIlha acessoBDIlha;




    @Autowired
    public ControladorDesafio(AcessoBDDesafio acessoBDDesafio, PontuacaoService pontuacaoService, AcessoBDIlha acessoBDIlha) {
        this.acessoBDDesafio = acessoBDDesafio;
        this.pontuacaoService = pontuacaoService;
        this.acessoBDIlha = acessoBDIlha;
    }

    @PostMapping("/concluir/{idDesafio}")
    public boolean concluirDesafio(@PathVariable int idDesafio) {
        Desafio desafio = new Desafio();
        desafio.setId(idDesafio);
        desafio.setConcluido(true);
        return acessoBDDesafio.alterarEstadoDesafio(desafio);
    }

    @PostMapping("/salvarPontuacao")
    public int salvarPontuacaoDesafio(@RequestParam long pkAluno,
                                      @RequestParam int idIlha,
                                      @RequestParam int tempo,
                                      @RequestParam int numErros) {

        if (pkAluno <= 0 || idIlha <= 0) {
            return -1; // Dados de entrada inválidos
        }



        Desafio desafioASerPontuado = acessoBDDesafio.getDesafioByIlhaId(idIlha);


        if (desafioASerPontuado.isConcluido()) {
            return -2;
        }


        int pontuacao = pontuacaoService.calcularPontuacao(tempo, numErros);
        pontuacaoService.salvarPontuacaoDesafio(pontuacao, desafioASerPontuado);


        concluirDesafio(desafioASerPontuado.getId());


        return pontuacao;
    }

    @GetMapping("/testeBusca/{idAluno}")
    public String testeBusca(@PathVariable long idAluno) { // Mudei para long

        List<Desafio> desafios = acessoBDDesafio.getDesafiosDoAluno(idAluno);


        if (desafios.isEmpty()) {
            System.out.println("Nenhum desafio encontrado para o aluno com ID: " + idAluno);
            return "Nenhum desafio encontrado.";
        }

  
        Desafio primeiroDesafio = desafios.get(0);
        System.out.println("Tipo do primeiro desafio: " + primeiroDesafio.getTipoDesafio());

        // Você também pode iterar por todos os desafios encontrados
        for (Desafio d : desafios) {
            System.out.println("ID do Desafio: " + d.getId() + ", Tipo: " + d.getTipoDesafio());
        }

        return "Busca concluída! Verifique o console.";
    }
}