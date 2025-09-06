CREATE TABLE IF NOT EXISTS modelo_contador (
    id BIGINT NOT NULL AUTO_INCREMENT,
    total_cliques BIGINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO modelo_contador (id, total_cliques)
SELECT 1, 0
WHERE NOT EXISTS (SELECT 1 FROM modelo_contador WHERE id = 1);

