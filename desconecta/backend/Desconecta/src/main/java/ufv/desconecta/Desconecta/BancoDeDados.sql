CREATE TABLE TB_ilha (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_ilha VARCHAR(50) NOT NULL,
    estado_ilha BOOLEAN NOT NULL,
    foi_jogada BOOLEAN NOT NULL
);

CREATE TABLE TB_desafio (
    id INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE TB_progresso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao_total_aluno INT NOT NULL
);

CREATE TABLE TB_ilha_desafio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ilha_id INT NOT NULL,
    desafio_id INT NOT NULL,
    FOREIGN KEY (ilha_id) REFERENCES ilha(id),
    FOREIGN KEY (desafio_id) REFERENCES desafio(id)
);

CREATE TABLE TB_progresso_aluno_ilha (
    id INT PRIMARY KEY AUTO_INCREMENT,
    progresso_aluno_id INT NOT NULL,
    ilha_id INT NOT NULL,
    FOREIGN KEY (progresso_aluno_id) REFERENCES progresso_aluno(id),
    FOREIGN KEY (ilha_id) REFERENCES ilha(id)
);