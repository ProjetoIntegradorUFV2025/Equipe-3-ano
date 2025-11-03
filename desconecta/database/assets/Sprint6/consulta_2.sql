SELECT 
    a.apelido,
    i.nome_ilha
FROM 
    tb_aluno a
JOIN 
    tb_progresso_aluno pa ON a.pk_aluno = pa.fk_aluno  
JOIN 
    tb_ilha i ON pa.pk_progresso_aluno = i.pk_progresso_aluno  
WHERE 
    a.pk_aluno = 1  
    AND i.estado = 1; 