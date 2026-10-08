package ufv.desconecta.Desconecta.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * Garante que a senha do aluno nunca e devolvida nas respostas JSON e que o
 * aluno continua podendo ser lido do corpo das requisicoes de login e cadastro.
 */
class AlunoJsonTest {

    // Mesma configuracao do ObjectMapper usado pelo Spring Boot nos controllers
    private final ObjectMapper mapper = Jackson2ObjectMapperBuilder.json().build();

    @Test
    void naoSerializaASenhaDoAluno() throws Exception {
        String json = mapper.writeValueAsString(new Aluno("ana", "segredo123"));

        JsonNode raiz = mapper.readTree(json);
        assertEquals("ana", raiz.get("apelido").asText());
        assertFalse(raiz.has("senha"), "a senha nao deve aparecer no JSON");
        assertFalse(json.contains("segredo123"), "o valor da senha nao deve aparecer no JSON");
    }

    @Test
    void desserializaApelidoESenhaDoCorpoDaRequisicao() throws Exception {
        Aluno aluno = mapper.readValue("{\"apelido\":\"ana\",\"senha\":\"segredo123\"}", Aluno.class);

        assertEquals("ana", aluno.getApelido());
        assertEquals("segredo123", aluno.getSenha());
    }
}
