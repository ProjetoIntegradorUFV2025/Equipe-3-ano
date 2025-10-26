
-- =================================================================
-- PASSO 1: INSERIR OS ALUNOS NA TABELA tb_aluno
-- =================================================================
INSERT INTO tb_aluno (apelido, senha) VALUES
('Soldadinho', 'senha123'), -- ID esperado: 1
('Aninha', 'senha456'),     -- ID esperado: 2
('Pedrinho', 'senha789'),   -- ID esperado: 3
('Sofia', 'senha101');      -- ID esperado: 4

-- =================================================================
-- PASSO 2: CRIAR O REGISTRO DE PROGRESSO PARA CADA ALUNO
-- =================================================================
-- Mantendo a chave primária (pk_progresso_aluno) igual à do aluno.
INSERT INTO tb_progresso_aluno (pk_progresso_aluno, fk_aluno, pontuacao_total_aluno) VALUES
(1, 1, 1500), -- Progresso para Soldadinho
(2, 2, 500),  -- Progresso para Aninha
(3, 3, 1000), -- Progresso para Pedrinho
(4, 4, 200);  -- Progresso para Sofia

-- =================================================================
-- PASSO 3: INSERIR APENAS A ILHA ATUAL DE CADA ALUNO
-- =================================================================
-- 'Soldadinho' (ID 1) está na ilha de Matemática (a 3ª).
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('MATEMATICA', 1, 0, 1);

-- 'Aninha' (ID 2) está na ilha inicial, que ela já jogou.
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('DADOLANDIA', 1, 1, 2);

-- 'Pedrinho' (ID 3) está na ilha de Ciências (a 2ª).
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('CIENCIAS', 1, 0, 3);

-- 'Sofia' (ID 4) está na ilha inicial, que ela ainda não jogou.
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('DADOLANDIA', 1, 0, 4);