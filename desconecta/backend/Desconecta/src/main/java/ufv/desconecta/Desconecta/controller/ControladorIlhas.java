package ufv.desconecta.Desconecta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.EnumNomeIlha;
import ufv.desconecta.Desconecta.model.Ilha;
import ufv.desconecta.Desconecta.model.ProgressoAluno;
import ufv.desconecta.Desconecta.repository.AcessoBDIlha;
import ufv.desconecta.Desconecta.repository.AcessoBDProgressoAluno;

import java.util.List;

@RestController
@RequestMapping("/api/ilhas") // É uma boa prática versionar a API com "/api"
@CrossOrigin(origins = "*")
public class ControladorIlhas {

    private final AcessoBDIlha acessoBDIlha;
    private final AcessoBDProgressoAluno acessoBDProgressoAluno;


    @Autowired
    public ControladorIlhas(AcessoBDIlha acessoBDIlha, AcessoBDProgressoAluno acessoBDProgressoAluno) {
        this.acessoBDIlha = acessoBDIlha;
        this.acessoBDProgressoAluno = acessoBDProgressoAluno;
    }


    @PostMapping("/desbloquear")
    public boolean desbloquearIlha(@RequestBody Ilha ilha) {
        ilha.setEstado(true);
        return acessoBDIlha.alterarEstadoIlha(ilha);
    }


    @PostMapping("/bloquear")
    public boolean bloquearIlha(@RequestBody Ilha ilha) {
        // Define o estado como false antes de passar para a camada de acesso ao banco.
        ilha.setEstado(false);
        return acessoBDIlha.alterarEstadoIlha(ilha);
    }


    @GetMapping("/recuperar/{idProgressoAluno}")
    public List<Ilha> recuperarIlhas(@PathVariable int idProgressoAluno) {
        return acessoBDIlha.recuperarIlhasPorProgressoId(idProgressoAluno);
    }

    /**
     * Recupera a ilha do aluno através do ID do progresso e retorna a posição do EnumNomeIlha como inteiro
     * @param idProgressoAluno ID do progresso do aluno
     * @return Posição da ilha no enum (0 = DADOLANDIA, 1 = CIENCIAS, etc.) ou -1 se não encontrado
     */
    @GetMapping("/posicao-ilha/{idProgressoAluno}")
    public int recuperarPosicaoIlha(@PathVariable int idProgressoAluno) {
        try {
            // Buscar o progresso do aluno
            ProgressoAluno progresso = acessoBDProgressoAluno.getProgressoAluno(idProgressoAluno);
            
            if (progresso != null && progresso.getIlha() != null) {
                // Obter o enum da ilha
                EnumNomeIlha nomeIlha = progresso.getIlha().getNomeIlha();
                
                if (nomeIlha != null) {
                    // Retornar a posição do enum (ordinal)
                    return nomeIlha.ordinal();
                }
            }
            
            // Retorna -1 se não encontrou o progresso, ilha ou nome da ilha
            return -1;
            
        } catch (Exception e) {
            // Log do erro (você pode usar um logger aqui)
            System.err.println("Erro ao recuperar posição da ilha: " + e.getMessage());
            return -1;
        }
    }

    /**
     * Avança a ilha do aluno para a próxima posição no enum
     * @param idProgressoAluno ID do progresso do aluno
     * @return Nova posição da ilha ou -1 se erro
     */
    @PutMapping("/avancar-ilha/{idProgressoAluno}")
    public int avancarIlha(@PathVariable int idProgressoAluno) {
        try {
            // Buscar o progresso do aluno
            ProgressoAluno progresso = acessoBDProgressoAluno.getProgressoAluno(idProgressoAluno);
            
            if (progresso != null && progresso.getIlha() != null) {
                // Obter o enum atual da ilha
                EnumNomeIlha nomeIlhaAtual = progresso.getIlha().getNomeIlha();
                
                if (nomeIlhaAtual != null) {
                    // Verificar se não é a última ilha
                    EnumNomeIlha[] todasIlhas = EnumNomeIlha.values();
                    int posicaoAtual = nomeIlhaAtual.ordinal();
                    
                    if (posicaoAtual < todasIlhas.length - 1) {
                        // Avançar para a próxima ilha
                        EnumNomeIlha proximaIlha = todasIlhas[posicaoAtual + 1];
                        progresso.getIlha().setNomeIlha(proximaIlha);
                        
                        // Salvar no banco (assumindo que há um método para isso)
                        acessoBDProgressoAluno.salvarProgressoAluno(progresso);
                        
                        return proximaIlha.ordinal();
                    }
                }
            }
            
            return -1;
            
        } catch (Exception e) {
            System.err.println("Erro ao avançar ilha: " + e.getMessage());
            return -1;
        }
    }
}