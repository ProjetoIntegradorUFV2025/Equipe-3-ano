# 📊 Sistema de Coleta de Métricas - Pasta Métricas

Esta pasta contém o sistema automatizado de coleta e análise de métricas do projeto, executado através de GitHub Actions para monitoramento contínuo do desempenho da equipe durante as sprints.

## 📁 O que você encontrará aqui

Nesta pasta serão armazenados automaticamente os seguintes arquivos após cada execução:

- **📄 CSV Equipe**: `metricas_equipe_sprint_X.csv` - Métricas consolidadas da equipe
- **📄 CSV Individual**: `metricas_individuais_sprint_X.csv` - Métricas por colaborador  
- **📝 Relatório**: `relatorio_sprint_X.md` - Relatório completo em Markdown

## 📈 Métricas Coletadas

### 🎯 Métricas Definidas pelos Monitores do Projeto Integrador

**Métrica 2.5 - Taxa de Resolução de Issues**
- Issues aceitos vs Issues resolvidos
- Percentual de conclusão das tarefas aprovadas

**Métrica 2.7 - Tempo Médio de Resolução**
- Tempo total e médio para resolver issues
- Medido em horas desde criação até fechamento

**Métrica 2.9 - Tempo Médio de Aprovação de PRs**
- Tempo total e médio para aprovar Pull Requests
- Medido em horas desde criação até merge

### 🔧 Métricas Definidas pelo Gerente de Processo e Analistas de Qualidade

**Incidência de Commits Rejeitados/Refatoração**
- PRs que necessitaram refatoração ou correções
- Percentual de trabalho refeito na equipe

**Número Médio de Comentários por Revisão**
- Quantidade de feedback por Pull Request
- Indicador de colaboração e qualidade do code review

### 👥 Métricas Individuais

Para cada colaborador são coletadas:
- **PRs Criadas**: Quantidade de Pull Requests submetidos
- **PRs Aceitas**: PRs que foram merged com sucesso  
- **PRs Revisadas**: Quantidade de code reviews realizados
- **Issues Identificadas**: Issues reportadas pelo usuário
- **Issues Aceitas**: Issues aprovadas (com label "accepted")
- **Produtividade PRs**: Percentual de PRs aceitas
- **Taxa Aceitação Issues**: Percentual de issues aprovadas

## ⚙️ Como Funciona

### 🔄 Execução Automática
- **Agendamento**: Todo domingo às 00:00 (cron: '0 0 * * 1')
- **Manual**: Pode ser executado manualmente via GitHub Actions

### 🎛️ Parâmetros de Entrada
- **Número da Sprint**: Identificador numérico
- **Data de Início**: Formato YYYY-MM-DD
- **Data de Fim**: Formato YYYY-MM-DD

### 📊 Processo de Coleta
1. **Identificação Automática**: Detecta repositório e colaboradores
2. **Coleta de Dados**: Issues, PRs, reviews, comentários e commits
3. **Cálculo de Métricas**: Processa dados conforme definições
4. **Geração de Relatórios**: Cria arquivos CSV e Markdown
5. **Commit Automático**: Salva resultados na pasta métricas/

---

## 🔧 Configuração Técnica

O sistema utiliza Python com bibliotecas `requests` e `pandas` para interação com a API do GitHub e processamento de dados.

### Dependências
```bash
pip install requests pandas
```

### Variáveis de Ambiente
- `GITHUB_TOKEN`: Token de acesso ao GitHub (configurado automaticamente no Actions)

## 🚀 Execução Manual

Para executar o script manualmente:

```bash
python coletar_metricas.py --sprint-number 5 --sprint-start 2024-03-01 --sprint-end 2024-03-15
```

### Parâmetros Obrigatórios:
- `--sprint-number`: Número da sprint (ex: 5)
- `--sprint-start`: Data início no formato YYYY-MM-DD
- `--sprint-end`: Data fim no formato YYYY-MM-DD

### Configuração Local
Para execução local, configure manualmente no script:
```python
# Linha ~20 do arquivo coletar_metricas.py
return 'seu-username', 'seu-repositorio'
```