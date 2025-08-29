import requests
import pandas as pd
from datetime import datetime, timedelta
import os
import argparse
from typing import List, Dict, Any

# Configurações
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
HEADERS = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.v3+json'
}

def get_repo_owner_and_name():
    """Obtém owner e nome do repositório automaticamente do ambiente do GitHub Actions"""
    if os.getenv('GITHUB_REPOSITORY'):
        owner, repo = os.getenv('GITHUB_REPOSITORY').split('/')
        return owner, repo
    else:
        # Para execução local, você pode configurar manualmente
        return 'seu-username', 'seu-repositorio'

REPO_OWNER, REPO_NAME = get_repo_owner_and_name()

def get_collaborators():
    """Obtém todos os colaboradores do repositório incluindo o owner"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/collaborators'
    collaborators = []
    page = 1
    
    while True:
        response = requests.get(url, headers=HEADERS, params={'page': page, 'per_page': 100})
        if response.status_code != 200:
            print(f"Erro ao obter colaboradores: {response.status_code}")
            break
            
        page_collaborators = response.json()
        if not page_collaborators:
            break
            
        for collab in page_collaborators:
            collaborators.append(collab['login'])
        
        if 'next' not in response.links:
            break
            
        page += 1
    
    return collaborators

def get_issues(sprint_start: str, sprint_end: str) -> List[Dict]:
    """Coleta todas as issues dentro do período da sprint"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues'
    issues = []
    page = 1
    
    sprint_start_dt = datetime.strptime(sprint_start, '%Y-%m-%d')
    sprint_end_dt = datetime.strptime(sprint_end, '%Y-%m-%d')
    
    print(f"Buscando issues entre {sprint_start} e {sprint_end}")
    
    while True:
        params = {
            'state': 'all',
            'since': sprint_start,
            'per_page': 100,
            'page': page
        }
        
        response = requests.get(url, headers=HEADERS, params=params)
        if response.status_code != 200:
            print(f"Erro ao obter issues: {response.status_code}")
            break
            
        page_issues = response.json()
        if not page_issues:
            break
            
        for issue in page_issues:
            if 'pull_request' not in issue:
                created_at = datetime.strptime(issue['created_at'], '%Y-%m-%dT%H:%M:%SZ')
                
                if sprint_start_dt <= created_at <= sprint_end_dt:
                    issues.append(issue)
        
        if 'next' not in response.links:
            break
            
        page += 1
    
    print(f"Total de issues no período: {len(issues)}")
    return issues

def get_pulls(sprint_start: str, sprint_end: str) -> List[Dict]:
    """Coleta todos os PRs dentro do período da sprint"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls'
    pulls = []
    page = 1
    
    sprint_start_dt = datetime.strptime(sprint_start, '%Y-%m-%d')
    sprint_end_dt = datetime.strptime(sprint_end, '%Y-%m-%d')
    
    print(f"Buscando PRs entre {sprint_start} e {sprint_end}")
    
    while True:
        params = {
            'state': 'all',
            'since': sprint_start,
            'per_page': 100,
            'page': page
        }
        
        response = requests.get(url, headers=HEADERS, params=params)
        if response.status_code != 200:
            print(f"Erro ao obter PRs: {response.status_code}")
            break
            
        page_pulls = response.json()
        if not page_pulls:
            break
            
        for pull in page_pulls:
            created_at = datetime.strptime(pull['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            
            if sprint_start_dt <= created_at <= sprint_end_dt:
                pulls.append(pull)
        
        if 'next' not in response.links:
            break
            
        page += 1
    
    print(f"Total de PRs no período: {len(pulls)}")
    return pulls

def get_issue_events(issue_number: int) -> List[Dict]:
    """Coleta eventos de uma issue específica"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues/{issue_number}/events'
    response = requests.get(url, headers=HEADERS)
    return response.json() if response.status_code == 200 else []

def get_pull_reviews(pull_number: int) -> List[Dict]:
    """Coleta reviews de um PR específico"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls/{pull_number}/reviews'
    response = requests.get(url, headers=HEADERS)
    return response.json() if response.status_code == 200 else []

def get_pull_comments(pull_number: int) -> List[Dict]:
    """Coleta comentários de um PR específico"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls/{pull_number}/comments'
    response = requests.get(url, headers=HEADERS)
    return response.json() if response.status_code == 200 else []

def get_commits(pull_number: int) -> List[Dict]:
    """Coleta commits de um PR específico"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls/{pull_number}/commits'
    response = requests.get(url, headers=HEADERS)
    return response.json() if response.status_code == 200 else []

def calcular_metricas_individuais(sprint_start: str, sprint_end: str, usuario: str) -> Dict:
    """Calcula métricas individuais para um usuário específico"""
    
    issues = get_issues(sprint_start, sprint_end)
    pulls = get_pulls(sprint_start, sprint_end)
    
    # PRs criadas pelo usuário
    prs_criadas = [pr for pr in pulls if pr['user']['login'].lower() == usuario.lower()]
    prs_aceitas = [pr for pr in prs_criadas if pr['state'] == 'closed' and pr.get('merged_at')]
    
    # PRs revisadas pelo usuário
    prs_revisadas = 0
    for pr in pulls:
        reviews = get_pull_reviews(pr['number'])
        for review in reviews:
            if review['user']['login'].lower() == usuario.lower():
                prs_revisadas += 1
                break
    
    # Issues do usuário
    issues_identificadas = [issue for issue in issues if issue['user']['login'].lower() == usuario.lower()]
    issues_aceitas = [issue for issue in issues_identificadas if any(
        label['name'].lower() == 'accepted' for label in issue.get('labels', [])
    )]
    
    return {
        'Usuario': usuario,
        'Inicio_Sprint': sprint_start,
        'Fim_Sprint': sprint_end,
        'PRs Criadas': len(prs_criadas),
        'PRs Aceitas': len(prs_aceitas),
        'PRs Revisadas': prs_revisadas,
        'Issues Identificadas': len(issues_identificadas),
        'Issues Aceitas': len(issues_aceitas),
        'Produtividade PRs Percentual': round(len(prs_aceitas) / len(prs_criadas) * 100, 2) if prs_criadas else 0,
        'Taxa Aceitacao Issues Percentual': round(len(issues_aceitas) / len(issues_identificadas) * 100, 2) if issues_identificadas else 0
    }

def calcular_metricas_equipe(sprint_start: str, sprint_end: str) -> Dict:
    """Calcula métricas de equipe e processo com valores separados"""
    
    issues = get_issues(sprint_start, sprint_end)
    pulls = get_pulls(sprint_start, sprint_end)
    
    # Issues aceitas (com label accepted)
    issues_aceitas = [issue for issue in issues if any(
        label['name'].lower() == 'accepted' for label in issue.get('labels', [])
    )]
    
    # Issues resolvidas (aceitas E fechadas)
    issues_resolvidas = [issue for issue in issues_aceitas if issue['state'] == 'closed']
    
    # PRs aprovadas (merged)
    prs_aprovadas = [pr for pr in pulls if pr['state'] == 'closed' and pr.get('merged_at')]
    
    # PRs revisadas mas sem merge (apenas code review)
    prs_revisadas_sem_merge = [pr for pr in pulls if pr['state'] == 'closed' and not pr.get('merged_at')]
    
    # PRs abertas (ainda em revisão)
    prs_abertas = [pr for pr in pulls if pr['state'] == 'open']
    
    # Cálculo de tempos
    tempo_total_resolucao = timedelta()
    for issue in issues_resolvidas:
        if issue.get('closed_at'):
            created_at = datetime.strptime(issue['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            closed_at = datetime.strptime(issue['closed_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total_resolucao += (closed_at - created_at)
    
    tempo_total_revisao = timedelta()
    for pr in prs_aprovadas:
        if pr.get('merged_at'):
            created_at = datetime.strptime(pr['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            merged_at = datetime.strptime(pr['merged_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total_revisao += (merged_at - created_at)
    
    # Novas métricas: Comentários e commits para refatoração
    total_comentarios = 0
    total_commits_submetidos = 0
    prs_com_refatoracao = 0
    prs_com_revisao = 0  # PRs que tiveram pelo menos uma revisão
    
    for pr in pulls:
        # Contar comentários (só se tiver revisão)
        comments = get_pull_comments(pr['number'])
        reviews = get_pull_reviews(pr['number'])
        
        # PR tem revisão se tiver comments OU reviews
        if len(comments) > 0 or len(reviews) > 0:
            prs_com_revisao += 1
            total_comentarios += len(comments)
        
        # Contar commits apenas para PRs que foram mergeados ou fechados
        if pr['state'] == 'closed':
            commits = get_commits(pr['number'])
            total_commits_submetidos += len(commits)
        
        # Verificar se PR precisou de refatoração (apenas para PRs fechados)
        if pr['state'] == 'closed':
            commits = get_commits(pr['number'])
            commit_messages = [commit['commit']['message'].lower() for commit in commits]
            comments = get_pull_comments(pr['number'])
            
            # Indicadores de commits de refatoração/rejeição
            indicadores_refatoracao = [
                'fix', 'revert', 'corrige', 'correct', 'adjust', 'ajusta',
                'refactor', 'refatora', 'change', 'altera', 'update', 'atualiza'
            ]
            
            commits_de_refatoracao = any(
                any(indicator in msg for indicator in indicadores_refatoracao)
                for msg in commit_messages
            )
            
            # Verificar comentários que pedem refatoração
            comentarios_refatoracao = any(
                any(word in comment['body'].lower() for word in ['refactor', 'refatora', 'rework', 'melhora', 'melhorar', 'corrige', 'fix'])
                for comment in comments
            )
            
            if commits_de_refatoracao or comentarios_refatoracao:
                prs_com_refatoracao += 1
    
    # Cálculos das métricas
    return {
        'Inicio_Sprint': sprint_start,
        'Fim_Sprint': sprint_end,
        
        # Métrica 2.5: Taxa de resolução de Issues
        'Issues Aceitos': len(issues_aceitas),
        'Issues Resolvidos': len(issues_resolvidas),
        '2.5 Taxa Resolucao Issues Percentual': round((len(issues_resolvidas) / len(issues_aceitas) * 100) if issues_aceitas else 0, 2),
        
        # Métrica 2.7: Tempo médio de resolução
        '2.7 Tempo Total Resolucao Horas': round(tempo_total_resolucao.total_seconds() / 3600, 2),
        '2.7 Tempo Medio Resolucao Horas': round((tempo_total_resolucao.total_seconds() / 3600 / len(issues_resolvidas)) if issues_resolvidas else 0, 2),
        
        # Métrica 2.9: Tempo médio de aprovação de PRs
        '2.9 Tempo Total Revisao Horas': round(tempo_total_revisao.total_seconds() / 3600, 2),
        '2.9 Tempo Medio Aprovacao Horas': round((tempo_total_revisao.total_seconds() / 3600 / len(prs_aprovadas)) if prs_aprovadas else 0, 2),
        
        # Nova Métrica: Incidência de commits rejeitados/refatoração
        'Commits Submetidos': total_commits_submetidos,
        'PRs Com Refatoracao': prs_com_refatoracao,
        'Incidencia Commits Rejeitados Percentual': round((prs_com_refatoracao / len(pulls) * 100) if pulls else 0, 2),
        
        # Nova Métrica: Número médio de comentários por revisão
        'Total Comentarios PRs': total_comentarios,
        'Total PRs Com Revisao': prs_com_revisao,
        'Media Comentarios Por Revisao': round(total_comentarios / prs_com_revisao if prs_com_revisao else 0, 2),
        
        # Valores totais para referência
        'Total PRs Aprovadas': len(prs_aprovadas),
        'Total PRs Revisadas Sem Merge': len(prs_revisadas_sem_merge),
        'Total PRs Abertas': len(prs_abertas),
        'Total PRs Analisados': len(pulls)
    }

def gerar_relatorio_markdown(sprint_number, sprint_start, sprint_end, metricas_equipe, metricas_individuais):
    """Gera relatório em formato Markdown com TODAS as métricas"""
    
    md_content = f"""# 📊 Relatório de Métricas - Sprint {sprint_number}

**Período:** {sprint_start} até {sprint_end}  
**Data de geração:** {datetime.now().strftime('%d/%m/%Y %H:%M')}

## 📈 Métricas de Equipe

### 🎯 Métricas Principais
| Métrica | Valor |
|---------|-------|
| **Inicio_Sprint** | {metricas_equipe['Inicio_Sprint']} |
| **Fim_Sprint** | {metricas_equipe['Fim_Sprint']} |
| **Issues Aceitos** | {metricas_equipe['Issues Aceitos']} |
| **Issues Resolvidos** | {metricas_equipe['Issues Resolvidos']} |
| **2.5 Taxa Resolucao Issues Percentual** | **{metricas_equipe['2.5 Taxa Resolucao Issues Percentual']}%** |

### ⏱️ Métricas de Tempo
| Métrica | Valor |
|---------|-------|
| **2.7 Tempo Total Resolucao Horas** | {metricas_equipe['2.7 Tempo Total Resolucao Horas']} |
| **2.7 Tempo Medio Resolucao Horas** | {metricas_equipe['2.7 Tempo Medio Resolucao Horas']} |
| **2.9 Tempo Total Revisao Horas** | {metricas_equipe['2.9 Tempo Total Revisao Horas']} |
| **2.9 Tempo Medio Aprovacao Horas** | {metricas_equipe['2.9 Tempo Medio Aprovacao Horas']} |

### 🔄 Métricas de Code Review
| Métrica | Valor |
|---------|-------|
| **Commits Submetidos** | {metricas_equipe['Commits Submetidos']} |
| **PRs Com Refatoracao** | {metricas_equipe['PRs Com Refatoracao']} |
| **Incidencia Commits Rejeitados Percentual** | {metricas_equipe['Incidencia Commits Rejeitados Percentual']}% |
| **Total Comentarios PRs** | {metricas_equipe['Total Comentarios PRs']} |
| **Total PRs Com Revisao** | {metricas_equipe['Total PRs Com Revisao']} |
| **Media Comentarios Por Revisao** | {metricas_equipe['Media Comentarios Por Revisao']} |

### 📊 Estatísticas de PRs
| Métrica | Valor |
|---------|-------|
| **Total PRs Aprovadas** | {metricas_equipe['Total PRs Aprovadas']} |
| **Total PRs Revisadas Sem Merge** | {metricas_equipe['Total PRs Revisadas Sem Merge']} |
| **Total PRs Abertas** | {metricas_equipe['Total PRs Abertas']} |
| **Total PRs Analisados** | {metricas_equipe['Total PRs Analisados']} |

## 👥 Métricas Individuais

| Usuário | PRs Criadas | PRs Aceitas | PRs Revisadas | Issues Identificadas | Issues Aceitas | Produtividade PRs | Taxa Aceitação Issues |
|---------|------------|------------|--------------|---------------------|---------------|------------------|---------------------|
"""
    
    for user in metricas_individuais:
        produtividade = user['Produtividade PRs Percentual']
        taxa_issues = user['Taxa Aceitacao Issues Percentual']
        
        md_content += f"| {user['Usuario']} | {user['PRs Criadas']} | {user['PRs Aceitas']} | {user['PRs Revisadas']} | {user['Issues Identificadas']} | {user['Issues Aceitas']} | {produtividade}% | {taxa_issues}% |\n"
    
    md_content += """

## 📋 Legenda das Métricas

- **Issues Aceitos**: Issues com label 'accepted' ✅
- **Issues Resolvidos**: Issues aceitas que foram fechadas ✅✅
- **2.5 Taxa Resolução**: Percentual de issues resolvidas 📈
- **2.7 Tempo Médio Resolução**: Tempo médio por issue ⏱️
- **2.9 Tempo Médio Aprovação**: Tempo médio por PR ⏱️
- **Incidência Commits Rejeitados**: Percentual de PRs que precisaram de refatoração 🔄
- **Média Comentários/Revisão**: Comentários médios por PR revisado 💬
"""

    # Salvar arquivo Markdown
    os.makedirs('metricas', exist_ok=True)
    with open(f'metricas/relatorio_sprint_{sprint_number}.md', 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    return md_content

def main():
    parser = argparse.ArgumentParser(description='Coletar métricas do GitHub')
    parser.add_argument('--sprint-start', required=True, help='Data de início da sprint (YYYY-MM-DD)')
    parser.add_argument('--sprint-end', required=True, help='Data de fim da sprint (YYYY-MM-DD)')
    parser.add_argument('--sprint-number', type=int, required=True, help='Número da sprint')
    
    args = parser.parse_args()
    
    print(f"Coletando métricas para Sprint {args.sprint_number} ({args.sprint_start} a {args.sprint_end})")
    
    # Obter todos os colaboradores automaticamente
    colaboradores = get_collaborators()
    print(f"Colaboradores encontrados: {colaboradores}")
    
    # Métricas de equipe
    print("Calculando métricas de equipe...")
    metricas_equipe = calcular_metricas_equipe(args.sprint_start, args.sprint_end)
    
    # Métricas individuais
    print("Calculando métricas individuais...")
    metricas_individuais = []
    for usuario in colaboradores:
        print(f"Processando usuário: {usuario}")
        metricas = calcular_metricas_individuais(args.sprint_start, args.sprint_end, usuario)
        metricas_individuais.append(metricas)
    
    # Criar diretório para métricas se não existir
    os.makedirs('metricas', exist_ok=True)
    
    # Salvar resultados em CSV
    df_equipe = pd.DataFrame([metricas_equipe])
    df_individuais = pd.DataFrame(metricas_individuais)
    
    df_equipe.to_csv(f'metricas/metricas_equipe_sprint_{args.sprint_number}.csv', index=False)
    df_individuais.to_csv(f'metricas/metricas_individuais_sprint_{args.sprint_number}.csv', index=False)
    
    # Gerar relatório Markdown
    print("Gerando relatório em Markdown...")
    gerar_relatorio_markdown(args.sprint_number, args.sprint_start, args.sprint_end, metricas_equipe, metricas_individuais)
    
    print("="*50)
    print("RESUMO DAS MÉTRICAS:")
    print("="*50)
    print(f"Issues Aceitos: {metricas_equipe['Issues Aceitos']}")
    print(f"Issues Resolvidos: {metricas_equipe['Issues Resolvidos']}")
    print(f"Taxa Resolução: {metricas_equipe['2.5 Taxa Resolucao Issues Percentual']}%")
    print(f"Tempo Médio Resolução: {metricas_equipe['2.7 Tempo Medio Resolucao Horas']}h")
    print(f"Tempo Médio Aprovação: {metricas_equipe['2.9 Tempo Medio Aprovacao Horas']}h")
    print(f"Comentários/Revisão: {metricas_equipe['Media Comentarios Por Revisao']}")
    
    print(f"\n📁 Arquivos gerados:")
    print(f"📄 CSV: metricas/metricas_equipe_sprint_{args.sprint_number}.csv")
    print(f"📄 CSV: metricas/metricas_individuais_sprint_{args.sprint_number}.csv")
    print(f"📝 Markdown: metricas/relatorio_sprint_{args.sprint_number}.md")
    
    print(f"\n✅ Métricas salvas com sucesso!")

if __name__ == "__main__":
    main()