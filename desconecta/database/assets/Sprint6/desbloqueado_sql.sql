SELECT
    i.nome_ilha,
    i.estado
FROM
    tb_ilha i
WHERE
    i.pk_progresso_aluno = (SELECT pk_progresso_aluno
							FROM tb_progresso_aluno
							WHERE fk_aluno = 4
    );