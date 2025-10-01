package ufv.desconecta.Desconecta.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class AcessoBDConecta {

    @Autowired
    private RepositorioConecta repositorioConecta;

    public List<String> getRespostas(int PK_Conecta) {
        return repositorioConecta.findByIdConecta(PK_Conecta)
                .map(c -> List.of(
                        c.getRespostaCerta1(),
                        c.getRespostaCerta2(),
                        c.getRespostaCerta3(),
                        c.getRespostaCerta4()))
                .orElse(Collections.emptyList());
    }
}