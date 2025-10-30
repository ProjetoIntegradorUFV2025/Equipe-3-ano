SELECT
    a.apelido AS aluno,
    i.nome_ilha AS ilha,
    i.estado AS desbloqueada 
FROM
    tb_ilha i
JOIN
    tb_progresso_aluno pa ON i.pk_progresso_aluno = pa.pk_progresso_aluno
JOIN
    tb_aluno a ON pa.fk_aluno = a.pk_aluno
WHERE
    a.pk_aluno = 1; 
    