
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
INSERT INTO tb_progresso_aluno (pk_progresso_aluno, fk_aluno, pontuacao_total_aluno) VALUES
(1, 1, 1500), -- Progresso para Soldadinho (PK e FK são 1)
(2, 2, 500),  -- Progresso para Aninha (PK e FK são 2)
(3, 3, 1000), -- Progresso para Pedrinho (PK e FK são 3)
(4, 4, 200);  -- Progresso para Sofia (PK e FK são 4)

-- =================================================================
-- PASSO 3: INSERIR AS ILHAS PARA CADA ALUNO, COM SEUS ESTADOS
-- =================================================================
-- Inserindo ilhas para 'Soldadinho' (pk_progresso_aluno = 1)
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('DADOLANDIA', 1, 1, 1),
('CIENCIAS',   1, 1, 1);

-- Inserindo ilhas para 'Aninha' (pk_progresso_aluno = 2)
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('DADOLANDIA', 1, 1, 2);

-- Inserindo ilhas para 'Pedrinho' (pk_progresso_aluno = 3)
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('DADOLANDIA', 1, 1, 3),
('CIENCIAS',   1, 0, 3);

-- Inserindo ilhas para 'Sofia' (pk_progresso_aluno = 4)
INSERT INTO tb_ilha (nome_ilha, estado, foi_jogada, pk_progresso_aluno) VALUES
('DADOLANDIA', 1, 0, 4);