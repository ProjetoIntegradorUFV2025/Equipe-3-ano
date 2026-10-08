package ufv.desconecta.Desconecta.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; // Adicione esta importação
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.repository.AcessoBDCacaPalavras;
import ufv.desconecta.Desconecta.service.SolucionarDesafio; // Adicione esta importação

import java.util.List;

@Service("JogoPalavras")
@RequestMapping("/api/cacaPalavras")
@CrossOrigin("*")
public class ControladorCacaPalavra implements SolucionarDesafio { // Implemente a interface

    private static final Logger log = LoggerFactory.getLogger(ControladorCacaPalavra.class);

    @Autowired
    private AcessoBDCacaPalavras acessoBDCacaPalavras;

    // Dentro da classe ControladorCacaPalavra

    @Override
    public String verificarAgrupamento(int id, String tentativa) {
        log.debug("Tentativa recebida: {}", tentativa);

        // 1. Pega a lista de respostas do banco
        List<String> respostas = acessoBDCacaPalavras.getRespostas(id);
        log.debug("Respostas corretas do banco: {}", respostas);

        // 2. Verifica se a tentativa do jogador (a string de índices) está na lista
        if (respostas != null && respostas.contains(tentativa)) {
            return "True";
        }

        // 3. Se não, a resposta está incorreta
        return "False";
    }

    @GetMapping("/getList/{id}")
    public List<String> getListaRespostas(@PathVariable("id") int PK_CacaPalavras){
        List<String> respostas = acessoBDCacaPalavras.getRespostas(PK_CacaPalavras);
        log.debug("Respostas corretas: {}", respostas);
        return respostas;
    }
}