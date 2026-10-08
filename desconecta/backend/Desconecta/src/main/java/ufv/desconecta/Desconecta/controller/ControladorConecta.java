package ufv.desconecta.Desconecta.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.repository.AcessoBDConecta;
import ufv.desconecta.Desconecta.service.SolucionarDesafio;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service("JogoConecta")
@CrossOrigin(origins = "*")
public class ControladorConecta implements SolucionarDesafio { // Implemente a interface

    private static final Logger log = LoggerFactory.getLogger(ControladorConecta.class);

    @Autowired
    private AcessoBDConecta acessoBDConecta;


    @Override
    public String verificarAgrupamento(int idDesafio, String respostaAluno) {
        // 1. Pega a lista de respostas do banco
        List<String> respostasCertas = new ArrayList<>(acessoBDConecta.getRespostas(idDesafio));

        log.debug("Resposta do aluno recebida: {}", respostaAluno);

        if (respostasCertas.isEmpty()) {
            return "False"; // ID não encontrado
        }

        // 2. Ordena a lista de respostas em ordem alfabética
        Collections.sort(respostasCertas);

        // 3. Junta a lista ordenada em uma única string (ex: "CachorroGatoPássaroPeixe")
        String respostaCorretaConcatenada = String.join("", respostasCertas);
        log.debug("Resposta correta concatenada: {}", respostaCorretaConcatenada);

        // 4. Compara a resposta correta concatenada com a tentativa do aluno
        if (respostaCorretaConcatenada.contains(respostaAluno)) {
            return "True";
        } else {
            return "False";
        }
    }


    @PutMapping("/atualizar/{id}")
    public Boolean atualizarRespostaCerta(
            @PathVariable("id") int PK_Conecta,
            @RequestParam("novaResposta") String novaResposta,
            @RequestParam("idResposta") int idResposta) {
        log.debug("Atualizar resposta certa: PK_Conecta={}, idResposta={}, novaResposta={}", PK_Conecta, idResposta, novaResposta);
        return acessoBDConecta.atualizarRespostaCerta(PK_Conecta, novaResposta, idResposta);
    }
}
