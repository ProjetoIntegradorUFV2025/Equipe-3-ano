CREATE SCHEMA desconecta;

-- 1) Consultar quantos alunos estão cadastrados no sistema.
USE desconecta;

SELECT COUNT(*) AS total_de_alunos
FROM tb_aluno;

--2) Escolher 1 desses alunos, e verificar quais ilhas estão desbloqueadas
USE desconecta;

SELECT 
    aluno.apelido,
    ilha.nome_ilha,
    ilha.estado,
    ilha.foi_jogada
FROM 
    tb_aluno AS aluno
JOIN 
    tb_progresso_aluno AS progresso ON aluno.pk_aluno = progresso.fk_aluno
JOIN 
    tb_ilha AS ilha ON progresso.pk_progresso_aluno = ilha.pk_progresso_aluno
WHERE 
    aluno.apelido = 'Pedrinho';