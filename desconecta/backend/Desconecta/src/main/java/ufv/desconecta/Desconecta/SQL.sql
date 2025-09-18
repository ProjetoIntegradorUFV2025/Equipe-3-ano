CREATE DATABASE IF NOT EXISTS jogo_ilhas;
USE jogo_ilhas;

CREATE TABLE TB_ilha (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_ilha ENUM('Dadolandia', 'Ciencias', 'Geografia', 'Matematica', 'Historia') NOT NULL,
    estado_ilha BOOLEAN NOT NULL,
    foi_jogada BOOLEAN NOT NULL
);

CREATE TABLE TB_desafio (
    id INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE TB_ilha_desafio (
    ilha_id INT NOT NULL,
    desafio_id INT NOT NULL,
    PRIMARY KEY (ilha_id, desafio_id),
    FOREIGN KEY (ilha_id) REFERENCES TB_ilha(id) ON DELETE CASCADE,
    FOREIGN KEY (desafio_id) REFERENCES TB_desafio(id) ON DELETE CASCADE
);

CREATE TABLE TB_progresso_aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao_total_aluno INT NOT NULL
);

CREATE TABLE TB_progresso_aluno_ilha (
    progresso_aluno_id INT NOT NULL,
    ilha_id INT NOT NULL,
    PRIMARY KEY (progresso_aluno_id, ilha_id),
    FOREIGN KEY (progresso_aluno_id) REFERENCES TB_progresso_aluno(id) ON DELETE CASCADE,
    FOREIGN KEY (ilha_id) REFERENCES TB_ilha(id) ON DELETE CASCADE
);
INSERT INTO TB_ilha (nome_ilha, estado_ilha, foi_jogada)
VALUES ('Dadolandia', TRUE, FALSE);

INSERT INTO TB_ilha (nome_ilha, estado_ilha, foi_jogada)
VALUES ('Ciencias', FALSE, TRUE);
