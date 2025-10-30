SELECT COUNT(PK_aluno)
FROM tb_aluno;

SELECT tb_ilha.nome_ilha AS ilha_desbloqueada
FROM tb_ilha 
NATURAL JOIN (
			  tb_aluno JOIN tb_progresso_aluno
			  ON tb_aluno.pk_aluno = tb_progresso_aluno.fk_aluno
			  )
WHERE tb_aluno.pk_aluno = 1 #alterar essa linha para navegar pelos alunos
AND foi_jogada = false;