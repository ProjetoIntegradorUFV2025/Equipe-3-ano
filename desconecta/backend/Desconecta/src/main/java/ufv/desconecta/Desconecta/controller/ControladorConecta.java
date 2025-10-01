package ufv.desconecta.Desconecta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.repository.AcessoBDConecta;

@RestController
@RequestMapping("/api/conecta")
@CrossOrigin(origins = "*")
public class ControladorConecta {

    @Autowired
    private AcessoBDConecta acessoBDConecta;

    // Endpoint para verificar a resposta do aluno
    @GetMapping("/verificar/{id}")
    public String verificarAgrupamento(
            @PathVariable("id") int PK_Conecta,
            @RequestParam("resposta") String respostaAluno) {

        var respostasCertas = acessoBDConecta.getRespostas(PK_Conecta);

        if (respostasCertas.isEmpty()) {
            // ID não encontrado
            return "Conecta não encontrado";
        }

        if (respostasCertas.contains(respostaAluno)) {
            return "Resposta correta!";
        } else {
            return "Resposta incorreta. Tente novamente.";
        }
    }
    @PutMapping("/atualizar/{id}")
    public Boolean atualizarRespostaCerta(
            @PathVariable("id") int PK_Conecta,
            @RequestParam("novaResposta") String novaResposta,
            @RequestParam("idResposta") int idResposta) {
        System.out.println("ID Resposta: " + idResposta);
        System.out.println("Nova Resposta: " + novaResposta);
        System.out.println("PK_Conecta: " + PK_Conecta);
        return acessoBDConecta.atualizarRespostaCerta(PK_Conecta, novaResposta, idResposta);
    }



}
