package com.provaConceito.provaConceito.servico;

import com.provaConceito.provaConceito.repositorio.repositorioContador;
import com.provaConceito.provaConceito.modelo.modeloContador;

import org.springframework.stereotype.Service;

@Service
public class servicoContador {
  private final repositorioContador repo;

  public servicoContador(repositorioContador repo) {
    this.repo = repo;
  }

  // Buscar o total de cliques (cria registro se não existir)
  public Long getTotalCliques() {
    return repo.findById(1L)
        .map(modeloContador::getTotalCliques)
        .orElseGet(() -> {
          modeloContador contador = new modeloContador();
          contador.setTotalCliques(0L);
          contador = repo.save(contador);
          return contador.getTotalCliques();
        });
  }

  // Alternativa
  // public Long getTotalCliques() {
  // tenta buscar o contador com ID 1
  // modeloContador contador = repo.findById(1L).orElse(null);
  //
  // if (contador != null) {
  // // se encontrou no banco, retorna o totalCliques
  // return contador.getTotalCliques();
  // } else {
  // // se não encontrou, cria um novo contador
  // contador = new modeloContador();
  // contador.setTotalCliques(0L);
  //
  // // salva no banco
  // contador = repo.save(contador);
  //
  // // retorna o valor inicial
  // return contador.getTotalCliques();
  // }
  // }

  // Incrementar cliques
  public Long incrementarCliques() {
    modeloContador contador = repo.findById(1L)
        .orElseGet(() -> {
          modeloContador novo = new modeloContador();
          novo.setTotalCliques(0L);
          return repo.save(novo);
        });

    contador.setTotalCliques(contador.getTotalCliques() + 1);
    repo.save(contador);

    return contador.getTotalCliques();
  }
}
