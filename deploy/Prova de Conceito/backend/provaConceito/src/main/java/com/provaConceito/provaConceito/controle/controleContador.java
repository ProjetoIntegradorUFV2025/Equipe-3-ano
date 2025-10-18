package com.provaConceito.provaConceito.controle;

import com.provaConceito.provaConceito.modelo.modeloContador;
import com.provaConceito.provaConceito.repositorio.repositorioContador;
import com.provaConceito.provaConceito.servico.servicoContador;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contador")
@CrossOrigin(origins = "*") // permitir requisições do React
public class controleContador {

  private final servicoContador servico;

  public controleContador(servicoContador servico) {
    this.servico = servico;
  }

  @Autowired
  private repositorioContador repo;

  @GetMapping("/totalCliques") // funciona porque só tem um método que faz esse tipo de requisição -> se não
  // @GetMapping(alguma coisa)
  public Long getTotalCliques() {
    return servico.getTotalCliques();
  }

  @PostMapping("/clicar")
  public Long incrementarCliques() {
    return servico.incrementarCliques();
  }

  @GetMapping("/status")
  public Map<String, Object> getStatus() {
    modeloContador clique = repo.findById(1L).orElseGet(() -> {
      modeloContador c = new modeloContador();
      c.setTotalCliques(0L);
      return repo.save(c);
    });
    boolean dezCliques = clique.getTotalCliques() >= 0;
    return Map.of("total", clique.getTotalCliques(), "dezCliques", dezCliques);
  }
}
