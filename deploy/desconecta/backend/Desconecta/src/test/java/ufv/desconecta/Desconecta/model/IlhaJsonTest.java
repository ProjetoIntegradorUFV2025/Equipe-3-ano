package ufv.desconecta.Desconecta.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Garante que a relacao bidirecional Ilha/Desafio nao gera referencia circular
 * na serializacao JSON (o que truncava a resposta de GET /api/ilhas/recuperar/{id}).
 */
class IlhaJsonTest {

    private final ObjectMapper mapper = new ObjectMapper();

    private Ilha criarIlhaComDesafio() {
        Ilha ilha = new Ilha();
        ilha.setNomeIlha(EnumNomeIlha.CIENCIAS);
        ilha.setEstado(true);
        ilha.setFoiJogada(false);
        Desafio desafio = new Desafio(EnumTiposDesafios.JogoConecta, ilha);
        ilha.getDesafios().add(desafio);
        return ilha;
    }

    @Test
    void serializaIlhaComDesafiosSemReferenciaCircular() throws Exception {
        String json = mapper.writeValueAsString(criarIlhaComDesafio());

        JsonNode raiz = mapper.readTree(json);
        JsonNode desafios = raiz.get("desafios");
        assertEquals("CIENCIAS", raiz.get("nomeIlha").asText());
        assertEquals(1, desafios.size());
        assertEquals("JogoConecta", desafios.get(0).get("tipoDesafio").asText());
        assertFalse(desafios.get(0).has("ilha"), "o desafio nao deve repetir a ilha dentro do JSON");
        assertTrue(json.length() < 1000, "JSON inesperadamente grande: " + json.length());
    }

    @Test
    void desserializaIlhaLigandoCadaDesafioASuaIlha() throws Exception {
        String json = mapper.writeValueAsString(criarIlhaComDesafio());

        Ilha lida = mapper.readValue(json, Ilha.class);

        assertEquals(1, lida.getDesafios().size());
        assertSame(lida, lida.getDesafios().get(0).getIlha());
    }
}
