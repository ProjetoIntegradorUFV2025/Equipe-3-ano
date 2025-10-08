package ufv.desconecta.Desconecta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ufv.desconecta.Desconecta.repository.AcessoBDCacaPalavras;

import java.util.List;

@RestController
@RequestMapping("/api/cacaPalavras")
@CrossOrigin("*")
public class ControladorCacaPalavra {

    @Autowired
    private AcessoBDCacaPalavras acessoBDCacaPalavras;

    @GetMapping("/verificarAgrupamento/{id}")
    public String verificarAgrupamento(@PathVariable("id") int Pk_CacaPalavras,
                                       @RequestParam String tentativa){
        List<String> respostas = acessoBDCacaPalavras.getRespostas(Pk_CacaPalavras);
        System.out.println(tentativa);
        System.out.println(respostas);

        if(respostas.isEmpty()){
            return "False";
        } else if (respostas.contains(tentativa)) {
            return  "True";
        }
        return "False";
    }

    @GetMapping("/getList/{id}")
    public List<String> getListaRespostas(@PathVariable("id") int PK_CacaPalavras){
        List<String> respostas = acessoBDCacaPalavras.getRespostas(PK_CacaPalavras);
        System.out.println(respostas);
        return respostas;
    }

}
