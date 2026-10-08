package ufv.desconecta.Desconecta.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

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

    @Test
    void serializaAlunoEProgressoSemReferenciaCircular() throws Exception {
        Aluno aluno = new Aluno("ana", "segredo123");
        ProgressoAluno progresso = new ProgressoAluno();
        progresso.setAluno(aluno); // tambem liga aluno.progresso ao progresso

        String jsonAluno = mapper.writeValueAsString(aluno);
        String jsonProgresso = mapper.writeValueAsString(progresso);

        assertFalse(mapper.readTree(jsonAluno).has("progresso"), "o aluno nao deve repetir o progresso");
        JsonNode alunoNoProgresso = mapper.readTree(jsonProgresso).get("aluno");
        assertEquals("ana", alunoNoProgresso.get("apelido").asText());
        assertFalse(alunoNoProgresso.has("progresso"), "o aluno dentro do progresso nao deve voltar ao progresso");
        assertFalse(jsonProgresso.contains("segredo123"), "a senha nao deve aparecer no JSON do progresso");
        assertTrue(jsonAluno.length() < 500 && jsonProgresso.length() < 500,
                "JSON inesperadamente grande: " + jsonAluno.length() + " / " + jsonProgresso.length());
    }
}

