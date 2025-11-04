package ufv.desconecta.Desconecta.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ufv.desconecta.Desconecta.dto.ClassificacaoDTO;
import ufv.desconecta.Desconecta.model.ProgressoAluno;
import ufv.desconecta.Desconecta.repository.AcessoBDProgressoAluno;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("/api/classificacao")
@CrossOrigin(origins = "*")
public class ControladorClassificacao {

    private AcessoBDProgressoAluno acessoBDProgressoAluno;
    public ControladorClassificacao(AcessoBDProgressoAluno acessoBDProgressoAluno) {
        this.acessoBDProgressoAluno = acessoBDProgressoAluno;
    }
    @GetMapping("/classificacaoGeral")
        public List<ClassificacaoDTO> buscarClassificacaoGeral() {
        List<ClassificacaoDTO> listaClassificacaoGeral  = acessoBDProgressoAluno.obterClassificacaoGeralOrdenada();
        for (ClassificacaoDTO progresso : listaClassificacaoGeral) {
            System.out.println( "Nome: " + progresso.getNomeAluno()+
                    " Pontuação: " + progresso.getPontuacaoTotalAluno());
        }
        return listaClassificacaoGeral;
    }
}
