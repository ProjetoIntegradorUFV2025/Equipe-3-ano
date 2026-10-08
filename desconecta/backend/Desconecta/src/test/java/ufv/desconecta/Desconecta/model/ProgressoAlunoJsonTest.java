package ufv.desconecta.Desconecta.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * Garante que o progresso pode ser serializado quando o aluno vem de um proxy
 * LAZY do Hibernate (o que causava erro 500 em GET /api/progresso-aluno/{id}).
 */
class ProgressoAlunoJsonTest {

    private final ObjectMapper mapper = Jackson2ObjectMapperBuilder.json().build();

    /** Imita o proxy do Hibernate, que expoe propriedades internas nao serializaveis. */
    static class AlunoProxy extends Aluno {
        AlunoProxy(String apelido, String senha) {
            super(apelido, senha);
        }

        public Object getHibernateLazyInitializer() {
            return new Object(); // sem propriedades: o Jackson falha ao serializar
        }

        public Object getHandler() {
            return new Object();
        }
    }

    @Test
    void serializaProgressoCujoAlunoEUmProxyDoHibernate() throws Exception {
        ProgressoAluno progresso = new ProgressoAluno();
        progresso.setAluno(new AlunoProxy("ana", "segredo123"));

        String json = mapper.writeValueAsString(progresso);

        JsonNode aluno = mapper.readTree(json).get("aluno");
        assertEquals("ana", aluno.get("apelido").asText());
        assertFalse(aluno.has("hibernateLazyInitializer"));
        assertFalse(aluno.has("handler"));
        assertFalse(json.contains("segredo123"), "a senha nao deve aparecer no JSON");
    }
}
