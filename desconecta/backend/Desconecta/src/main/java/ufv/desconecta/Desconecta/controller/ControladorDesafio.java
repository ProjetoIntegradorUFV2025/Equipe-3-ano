package ufv.desconecta.Desconecta.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.model.EnumNomeIlha;
import ufv.desconecta.Desconecta.model.EnumTiposDesafios;
import ufv.desconecta.Desconecta.model.Desafio;
import ufv.desconecta.Desconecta.model.Ilha;
import ufv.desconecta.Desconecta.model.ProgressoAluno;
import ufv.desconecta.Desconecta.repository.AcessoBDDesafio;
import ufv.desconecta.Desconecta.repository.AcessoBDIlha;
import ufv.desconecta.Desconecta.repository.AcessoBDProgressoAluno;
import ufv.desconecta.Desconecta.service.PontuacaoService;
import ufv.desconecta.Desconecta.service.SolucionarDesafio; // Importe a nova interface

import java.util.List;
import java.util.Map; // Importe a classe Map

@RestController
@RequestMapping("/api/desafio")
@CrossOrigin(origins = "*")
public class ControladorDesafio {

    private static final Logger log = LoggerFactory.getLogger(ControladorDesafio.class);

    private final AcessoBDDesafio acessoBDDesafio;
    private final PontuacaoService pontuacaoService;
    private final AcessoBDIlha acessoBDIlha;
    private final AcessoBDProgressoAluno acessoBDProgressoAluno;


    private final Map<String, SolucionarDesafio> solucionarDesafioMap;

    @Autowired
    public ControladorDesafio(AcessoBDDesafio acessoBDDesafio, PontuacaoService pontuacaoService,
                              AcessoBDIlha acessoBDIlha, AcessoBDProgressoAluno acessoBDProgressoAluno,
                              Map<String, SolucionarDesafio> solucionarDesafioMap) {
        this.acessoBDDesafio = acessoBDDesafio;
        this.pontuacaoService = pontuacaoService;
        this.acessoBDIlha = acessoBDIlha;
        this.acessoBDProgressoAluno = acessoBDProgressoAluno;
        this.solucionarDesafioMap = solucionarDesafioMap;
    }


    @PostMapping("/verificar")
    public String verificar(@RequestParam("tipoDesafio") EnumTiposDesafios tipoDesafio,
                            @RequestParam("id") int id,
                            @RequestParam("tentativa") String tentativa) {

        // Converte o nome do Enum (ex: JogoConecta) para String para usar como chave do mapa
        String chaveDoServico = tipoDesafio.name();

        // Pega o serviço (ControladorConecta ou ControladorCacaPalavra) do mapa
        SolucionarDesafio servico = solucionarDesafioMap.get(chaveDoServico);

        if (servico != null) {
            // Chama o método verificarAgrupamento do serviço encontrado
            return servico.verificarAgrupamento(id, tentativa);
        } else {
            // Se nenhum serviço for encontrado para aquele tipo de desafio, retorna um erro.
            return "Tipo de desafio inválido ou não implementado.";
        }
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
                                      @RequestParam String nomeIlha,
                                      @RequestParam int tempo,
                                      @RequestParam int numErros) {

        log.debug("Salvar pontuação: pkAluno={}, ilha={}, tempo={}s, erros={}", pkAluno, nomeIlha, tempo, numErros);

        if (pkAluno <= 0 || nomeIlha == null || nomeIlha.isEmpty()) {
            log.warn("Salvar pontuação: dados de entrada inválidos");
            return -1; // Dados de entrada inválidos
        }

        try {
            // Converter nome da ilha para enum
            EnumNomeIlha enumIlha = EnumNomeIlha.valueOf(nomeIlha.toUpperCase());

            // Buscar o progresso do aluno
            ProgressoAluno progressoAluno = acessoBDProgressoAluno.getProgressoAluno(pkAluno);

            if (progressoAluno == null) {
                log.warn("Salvar pontuação: progresso do aluno não encontrado");
                return -3; // Progresso não encontrado
            }

            log.debug("ID do progresso: {}", progressoAluno.getPK_ProgressoAluno());

            // Buscar todas as ilhas do progresso do aluno
            List<Ilha> ilhas = acessoBDIlha.recuperarIlhasPorProgressoId(progressoAluno.getPK_ProgressoAluno());
            log.debug("Total de ilhas encontradas: {}", ilhas.size());

            // Encontrar a ilha específica pelo enum
            Ilha ilhaEncontrada = null;
            for (Ilha ilha : ilhas) {
                if (ilha.getNomeIlha() == enumIlha) {
                    ilhaEncontrada = ilha;
                    break;
                }
            }

            if (ilhaEncontrada == null) {
                log.warn("Salvar pontuação: ilha não encontrada: {}", nomeIlha);
                return -4; // Ilha não encontrada
            }

            int idIlha = ilhaEncontrada.getPK_Ilha();
            log.debug("ID da ilha encontrada: {}", idIlha);

            // Buscar desafio da ilha
            Desafio desafioASerPontuado = acessoBDDesafio.getDesafioByIlhaId(idIlha);

            if (desafioASerPontuado == null) {
                log.warn("Salvar pontuação: desafio não encontrado para a ilha");
                return -5; // Desafio não encontrado
            }

            if (desafioASerPontuado.isConcluido()) {
                log.debug("Desafio já foi concluído");
                return -2; // Desafio já concluído
            }

            // Calcular pontuação
            int pontuacao = pontuacaoService.calcularPontuacao(tempo, numErros);
            log.debug("Pontuação calculada: {}", pontuacao);

            // Salvar pontuação
            pontuacaoService.salvarPontuacaoDesafio(pontuacao, desafioASerPontuado);

            // Somar com a pontuação total do aluno
            int novaPontuacaoTotal = progressoAluno.getPontuacaoTotalAluno() + pontuacao;
            progressoAluno.setPontuacaoTotalAluno(novaPontuacaoTotal);
            acessoBDProgressoAluno.salvarProgressoAluno(progressoAluno);
            log.debug("Nova pontuação total do aluno: {}", novaPontuacaoTotal);

            // Marcar desafio como concluído
            concluirDesafio(desafioASerPontuado.getId());

            log.debug("Pontuação salva com sucesso");
            return pontuacao;

        } catch (IllegalArgumentException e) {
            log.warn("Salvar pontuação: nome de ilha inválido: {}", nomeIlha);
            return -6; // Nome de ilha inválido
        } catch (DataAccessException e) {
            log.error("Erro de banco ao salvar pontuação", e);
            return -7; // Erro genérico
        } catch (RuntimeException e) {
            log.error("Erro inesperado ao salvar pontuação", e);
            return -7; // Erro genérico
        }
    }

    @GetMapping("/verificarConcluido")
    public boolean verificarDesafioConcluido(@RequestParam long pkAluno,
                                             @RequestParam String nomeIlha) {

        log.debug("Verificar desafio concluído: pkAluno={}, ilha={}", pkAluno, nomeIlha);

        if (pkAluno <= 0 || nomeIlha == null || nomeIlha.isEmpty()) {
            log.warn("Verificar desafio concluído: dados de entrada inválidos");
            return false;
        }

        try {
            // Converter nome da ilha para enum
            EnumNomeIlha enumIlha = EnumNomeIlha.valueOf(nomeIlha.toUpperCase());

            // Buscar o progresso do aluno
            ProgressoAluno progressoAluno = acessoBDProgressoAluno.getProgressoAluno(pkAluno);

            if (progressoAluno == null) {
                log.warn("Verificar desafio concluído: progresso do aluno não encontrado");
                return false;
            }

            // Buscar todas as ilhas do progresso do aluno
            List<Ilha> ilhas = acessoBDIlha.recuperarIlhasPorProgressoId(progressoAluno.getPK_ProgressoAluno());

            // Encontrar a ilha específica pelo enum
            Ilha ilhaEncontrada = null;
            for (Ilha ilha : ilhas) {
                if (ilha.getNomeIlha() == enumIlha) {
                    ilhaEncontrada = ilha;
                    break;
                }
            }

            if (ilhaEncontrada == null) {
                log.warn("Verificar desafio concluído: ilha não encontrada: {}", nomeIlha);
                return false;
            }

            int idIlha = ilhaEncontrada.getPK_Ilha();

            // Buscar desafio da ilha
            Desafio desafio = acessoBDDesafio.getDesafioByIlhaId(idIlha);

            if (desafio == null) {
                log.warn("Verificar desafio concluído: desafio não encontrado para a ilha");
                return false;
            }

            boolean concluido = desafio.isConcluido();
            log.debug("Status do desafio: {}", concluido ? "concluído" : "não concluído");

            return concluido;

        } catch (IllegalArgumentException e) {
            log.warn("Verificar desafio concluído: nome de ilha inválido: {}", nomeIlha);
            return false;
        } catch (DataAccessException e) {
            log.error("Erro de banco ao verificar desafio", e);
            return false;
        } catch (RuntimeException e) {
            log.error("Erro inesperado ao verificar desafio", e);
            return false;
        }
    }


}