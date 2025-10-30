SELECT COUNT(*) AS numeroAlunos
FROM tb_aluno;

SELECT a.pk_aluno, i.nome_ilha AS ilha_desbloqueada
FROM (tb_ilha i JOIN tb_progresso_aluno p ON i.pk_progresso_aluno = p.pk_progresso_aluno)
JOIN tb_aluno a ON p.fk_aluno = a.pk_aluno
WHERE a.apelido = 'Pedrinho' AND i.estado = 1;

