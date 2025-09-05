import requests
import pandas as pd
from datetime import datetime, timedelta
import os
import argparse
from typing import List, Dict, Any, Set

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
    """Obtém apenas colaboradores DIRECTOS do repositório"""
    print("👥 Buscando colaboradores diretos do repositório...")
    
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/collaborators'
    collaborators = set()
    page = 1
    
    while True:
        response = requests.get(url, headers=HEADERS, params={'page': page, 'per_page': 100, 'affiliation': 'direct'})
        
        if response.status_code != 200:
            print(f"❌ Erro ao obter colaboradores: {response.status_code}")
            break
            
        page_collaborators = response.json()
        if not page_collaborators:
            break
            
        for collab in page_collaborators:
            if 'login' in collab:
                collaborators.add(collab['login'])
        
        if 'next' not in response.links:
            break
            
        page += 1
    
    # Sempre incluir o owner
    collaborators.add(REPO_OWNER)
    
    print(f"✅ Colaboradores encontrados: {list(collaborators)}")
    return list(collaborators)

def get_issues(sprint_start: str, sprint_end: str) -> List[Dict]:
    """Coleta todas as issues dentro do período da sprint"""
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues'
    issues = []
    page = 1
    
    sprint_start_dt = datetime.strptime(sprint_start, '%Y-%m-%d')
    sprint_end_dt = datetime.strptime(sprint_end, '%Y-%m-%d') + timedelta(days=1)
    
    print(f"📋 Buscando issues entre {sprint_start} e {sprint_end}")
    
    while True:
        params = {
            'state': 'all',
            'since': sprint_start,
            'per_page': 100,
            'page': page,
            'sort': 'updated',
            'direction': 'desc'
        }
        
        response = requests.get(url, headers=HEADERS, params=params)
        if response.status_code != 200:
            print(f"❌ Erro ao obter issues: {response.status_code}")
            break
            
        page_issues = response.json()
        if not page_issues:
            break
            
        for issue in page_issues:
            if 'pull_request' not in issue:
                created_at = datetime.strptime(issue['created_at'], '%Y-%m-%dT%H:%M:%SZ')
                updated_at = datetime.strptime(issue['updated_at'], '%Y-%m-%dT%H:%M:%SZ')
                
                # Incluir issues criadas OU atualizadas durante a sprint
                if (sprint_start_dt <= created_at <= sprint_end_dt or 
                    sprint_start_dt <= updated_at <= sprint_end_dt):
                    issues.append(issue)
        
        # Parar se chegarmos em issues muito antigas
        oldest_issue = page_issues[-1] if page_issues else None
        if oldest_issue and 'pull_request' not in oldest_issue:
            oldest_updated = datetime.strptime(oldest_issue['updated_at'], '%Y-%m-%dT%H:%M:%SZ')
            if oldest_updated < sprint_start_dt:
                break
        
        if 'next' not in response.links:
            break
            
        page += 1
    
    print(f"✅ Total de issues no período: {len(issues)}")
    return issues

def get_pulls(sprint_start: str, sprint_end: str) -> List[Dict]:
    """Coleta todos os PRs dentro do período da sprint - SEM DUPLICAÇÃO"""
    print(f"🔀 Buscando PRs entre {sprint_start} e {sprint_end}")
    
    sprint_start_dt = datetime.strptime(sprint_start, '%Y-%m-%d')
    sprint_end_dt = datetime.strptime(sprint_end, '%Y-%m-%d') + timedelta(days=1)
    
    all_pulls = []
    seen_pr_numbers = set()
    
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls'
    page = 1
    
    while True:
        params = {
            'state': 'all',
            'per_page': 100,
            'page': page,
            'sort': 'updated',
            'direction': 'desc'
        }
        
        response = requests.get(url, headers=HEADERS, params=params)
        
        if response.status_code != 200:
            print(f"❌ Erro ao obter PRs: {response.status_code}")
            break
            
        page_pulls = response.json()
        if not page_pulls:
            break
            
        for pull in page_pulls:
            pr_number = pull['number']
            
            if pr_number in seen_pr_numbers:
                continue
                
            seen_pr_numbers.add(pr_number)
            
            created_at = datetime.strptime(pull['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            updated_at = datetime.strptime(pull['updated_at'], '%Y-%m-%dT%H:%M:%SZ')
            
            if (sprint_start_dt <= created_at <= sprint_end_dt or 
                sprint_start_dt <= updated_at <= sprint_end_dt):
                all_pulls.append(pull)
        
        oldest_pull = page_pulls[-1] if page_pulls else None
        if oldest_pull:
            oldest_updated = datetime.strptime(oldest_pull['updated_at'], '%Y-%m-%dT%H:%M:%SZ')
            if oldest_updated < sprint_start_dt:
                break
        
        if 'next' not in response.links:
            break
            
        page += 1
    
    print(f"✅ Total de PRs no período (sem duplicação): {len(all_pulls)}")
    return all_pulls

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

def get_issues_com_label_accepted(issues: List[Dict]) -> List[Dict]:
    """Filtra issues com label 'accepted'"""
    issues_aceitas = []
    for issue in issues:
        labels = [label['name'].lower() for label in issue.get('labels', [])]
        if 'accepted' in labels:
            issues_aceitas.append(issue)
    return issues_aceitas

def get_issues_resolvidas(issues_aceitas: List[Dict]) -> List[Dict]:
    """Filtra issues aceitas que foram resolvidas (fechadas)"""
    return [issue for issue in issues_aceitas if issue['state'] == 'closed']

def calcular_tempo_medio_resolucao(issues):
    """Calcula tempo médio de resolução de issues"""
    if not issues:
        return 0
    
    tempo_total = timedelta()
    for issue in issues:
        if issue.get('closed_at'):
            created_at = datetime.strptime(issue['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            closed_at = datetime.strptime(issue['closed_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total += (closed_at - created_at)
    
    return round((tempo_total.total_seconds() / 3600) / len(issues), 2)

def calcular_tempo_medio_aprovacao(prs):
    """Calcula tempo médio de aprovação de PRs"""
    if not prs:
        return 0
    
    tempo_total = timedelta()
    for pr in prs:
        if pr.get('merged_at'):
            created_at = datetime.strptime(pr['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            merged_at = datetime.strptime(pr['merged_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total += (merged_at - created_at)
    
    return round((tempo_total.total_seconds() / 3600) / len(prs), 2)

def calcular_metricas_individuais(sprint_start: str, sprint_end: str, usuario: str) -> Dict:
    """Calcula métricas individuais - COM AS MÉTRICAS 1.3, 1.4, 1.5"""
    
    issues = get_issues(sprint_start, sprint_end)
    pulls = get_pulls(sprint_start, sprint_end)
    
    # PRs criadas pelo usuário
    prs_criadas = [pr for pr in pulls if pr['user']['login'].lower() == usuario.lower()]
    prs_mergeadas = [pr for pr in prs_criadas if pr.get('merged_at')]
    
    # PRs revisadas pelo usuário (1.4)
    prs_revisadas_set = set()
    for pr in pulls:
        reviews = get_pull_reviews(pr['number'])
        for review in reviews:
            if review['user']['login'].lower() == usuario.lower():
                prs_revisadas_set.add(pr['number'])
                break
    
    # Issues do usuário
    issues_criadas = [issue for issue in issues if issue['user']['login'].lower() == usuario.lower()]
    issues_fechadas = [issue for issue in issues_criadas if issue['state'] == 'closed']
    
    # Issues accepted do usuário (1.5)
    issues_aceitas = [issue for issue in issues_criadas if any(
        label['name'].lower() == 'accepted' for label in issue.get('labels', [])
    )]
    
    # Cálculo das métricas específicas
    produtividade_prs = round(len(prs_mergeadas) / len(prs_criadas) * 100, 2) if prs_criadas else 0  # 1.3
    taxa_aceitacao_issues = round(len(issues_aceitas) / len(issues_criadas) * 100, 2) if issues_criadas else 0  # 1.5
    
    return {
        'Usuario': usuario,
        # Métricas 1.3, 1.4, 1.5
        'PRs_Criadas': len(prs_criadas),  # 1.3 denominador
        'PRs_Aceitas': len(prs_mergeadas),  # 1.3 numerador
        'PRs_Revisadas': len(prs_revisadas_set),  # 1.4
        'Issues_Identificadas': len(issues_criadas),  # 1.5 denominador
        'Issues_Aceitas': len(issues_aceitas),  # 1.5 numerador
        
        # Métricas calculadas
        '1.3_Produtividade_PRs_Percentual': produtividade_prs,  # 1.3
        '1.4_PRs_Revisadas_Count': len(prs_revisadas_set),  # 1.4
        '1.5_Taxa_Aceitacao_Issues_Percentual': taxa_aceitacao_issues,  # 1.5
        
        # Métricas adicionais
        'Issues_Fechadas': len(issues_fechadas),
        'Taxa_Conclusao_Issues_Percentual': round(len(issues_fechadas) / len(issues_criadas) * 100, 2) if issues_criadas else 0
    }

def calcular_metricas_equipe(sprint_start: str, sprint_end: str) -> Dict:
    """Calcula métricas de equipe - COM AS MÉTRICAS 2.5, 2.7, 2.9"""
    
    issues = get_issues(sprint_start, sprint_end)
    pulls = get_pulls(sprint_start, sprint_end)
    
    # 📊 MÉTRICAS DE ISSUES
    issues_aceitas = get_issues_com_label_accepted(issues)
    issues_resolvidas = get_issues_resolvidas(issues_aceitas)
    issues_fechadas = [issue for issue in issues if issue['state'] == 'closed']
    
    # 📊 MÉTRICAS DE PRs
    prs_mergeados = [pr for pr in pulls if pr.get('merged_at')]
    prs_abertas = [pr for pr in pulls if pr['state'] == 'open']
    prs_fechados_sem_merge = [pr for pr in pulls if pr['state'] == 'closed' and not pr.get('merged_at')]
    
    # 📊 MÉTRICAS DE CODE REVIEW
    total_comentarios = 0
    prs_com_revisao = 0
    total_commits_submetidos = 0
    commits_rejeitados = 0  # Para taxa de retrabalho
    
    for pr in pulls:
        # Comentários de review
        comments = get_pull_comments(pr['number'])
        reviews = get_pull_reviews(pr['number'])
        
        total_comentarios_pr = len(comments) + len(reviews)
        
        if total_comentarios_pr > 0:
            prs_com_revisao += 1
            total_comentarios += total_comentarios_pr
        
        # Commits submetidos e rejeitados
        commits = get_commits(pr['number'])
        total_commits_submetidos += len(commits)
        
        # Verificar se PR foi rejeitado/refatorado (para taxa de retrabalho)
        if pr['state'] == 'closed' and not pr.get('merged_at'):
            # PR fechado sem merge - considerado rejeitado
            commits_rejeitados += len(commits)
        elif pr.get('merged_at'):
            # PR mergeado, verificar se teve refatoração
            if commits and len(commits) > 1:
                commits_rejeitados += (len(commits) - 1)  # Considera commits além do primeiro como rejeitados
    
    # 📊 MÉTRICAS DE REFATORAÇÃO
    prs_com_refatoracao = 0
    for pr in prs_mergeados:
        commits = get_commits(pr['number'])
        if commits and len(commits) > 1:
            prs_com_refatoracao += 1
    
    # ⏱️ CÁLCULO DE TEMPOS
    tempo_total_resolucao = timedelta()
    for issue in issues_resolvidas:
        if issue.get('closed_at'):
            created_at = datetime.strptime(issue['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            closed_at = datetime.strptime(issue['closed_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total_resolucao += (closed_at - created_at)
    
    tempo_total_aprovacao = timedelta()
    for pr in prs_mergeados:
        if pr.get('merged_at'):
            created_at = datetime.strptime(pr['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            merged_at = datetime.strptime(pr['merged_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total_aprovacao += (merged_at - created_at)
    
    # 📈 CÁLCULOS DAS MÉTRICAS ESPECÍFICAS
    taxa_retrabalho = round((commits_rejeitados / total_commits_submetidos * 100), 2) if total_commits_submetidos else 0  # Taxa de retrabalho
    media_comentarios_revisao = round(total_comentarios / len(pulls), 2) if pulls else 0  # 2.9 parte do code review
    
    # Métricas 2.5, 2.7, 2.9
    taxa_resolucao_issues = round((len(issues_resolvidas) / len(issues_aceitas) * 100), 2) if issues_aceitas else 0  # 2.5
    tempo_medio_resolucao = round((tempo_total_resolucao.total_seconds() / 3600) / len(issues_resolvidas), 2) if issues_resolvidas else 0  # 2.7
    tempo_medio_aprovacao = round((tempo_total_aprovacao.total_seconds() / 3600) / len(prs_mergeados), 2) if prs_mergeados else 0  # 2.9
    
    return {
        'Inicio_Sprint': sprint_start,
        'Fim_Sprint': sprint_end,
        
        # ========== 📊 MÉTRICAS DE ISSUES ==========
        'Total_Issues': len(issues),
        'Issues_Fechadas': len(issues_fechadas),
        'Issues_Aceitos': len(issues_aceitas),  # 2.5 denominador
        'Issues_Resolvidos': len(issues_resolvidas),  # 2.5 numerador
        
        # ========== 🔀 MÉTRICAS DE PRs ==========
        'Total_PRs': len(pulls),
        'PRs_Aprovadas': len(prs_mergeados),  # 2.9 denominador
        'PRs_Abertas': len(prs_abertas),
        'PRs_Fechados_Sem_Merge': len(prs_fechados_sem_merge),
        
        # ========== 💬 MÉTRICAS DE CODE REVIEW ==========
        'Total_Comentarios_PRs': total_comentarios,
        'PRs_Com_Revisao': prs_com_revisao,
        'Media_Comentarios_Por_Revisao': media_comentarios_revisao,  # 2.9 parte
        'Commits_Submetidos': total_commits_submetidos,
        'Commits_Rejeitados': commits_rejeitados,
        
        # ========== 🔄 MÉTRICAS DE QUALIDADE/REFATORAÇÃO ==========
        'PRs_Com_Refatoracao': prs_com_refatoracao,
        'Taxa_Retrabalho_Percentual': taxa_retrabalho,  # Taxa de retrabalho
        
        # ========== ⏱️ MÉTRICAS DE TEMPO ==========
        'Tempo_Total_Resolucao_Horas': round(tempo_total_resolucao.total_seconds() / 3600, 2),  # 2.7 numerador
        'Tempo_Total_Aprovacao_Horas': round(tempo_total_aprovacao.total_seconds() / 3600, 2),  # 2.9 numerador
        
        # ========== 🎯 MÉTRICAS ESPECÍFICAS SOLICITADAS ==========
        '2.5_Taxa_Resolucao_Issues_Percentual': taxa_resolucao_issues,  # 2.5
        '2.7_Tempo_Medio_Resolucao_Horas': tempo_medio_resolucao,  # 2.7
        '2.9_Tempo_Medio_Aprovacao_Horas': tempo_medio_aprovacao  # 2.9
    }

def gerar_relatorio_markdown(sprint_number, sprint_start, sprint_end, metricas_equipe, metricas_individuais):
    """Gera relatório em formato Markdown - COM MÉTRICAS ESPECÍFICAS"""
    
    md_content = f"""# 📊 Relatório de Métricas - Sprint {sprint_number}

**Período:** {sprint_start} até {sprint_end}  
**Data de geração:** {datetime.now().strftime('%d/%m/%Y %H:%M')}

## 🎯 MÉTRICAS INDIVIDUAIS SOLICITADAS

### 📊 1.3 - Produtividade de PRs
| Métrica | Valor |
|---------|-------|
| **PRs Criadas** | {sum([u['PRs_Criadas'] for u in metricas_individuais])} |
| **PRs Aceitas** | {sum([u['PRs_Aceitas'] for u in metricas_individuais])} |
| **1.3 - Taxa Produtividade PRs** | **{round(sum([u['PRs_Aceitas'] for u in metricas_individuais]) / sum([u['PRs_Criadas'] for u in metricas_individuais]) * 100, 2) if sum([u['PRs_Criadas'] for u in metricas_individuais]) > 0 else 0}%** |

### 👀 1.4 - PRs Revisadas
| Métrica | Valor |
|---------|-------|
| **1.4 - Total PRs Revisadas** | **{sum([u['PRs_Revisadas'] for u in metricas_individuais])}** |

### ✅ 1.5 - Taxa Aceitação Issues
| Métrica | Valor |
|---------|-------|
| **Issues Identificadas** | {sum([u['Issues_Identificadas'] for u in metricas_individuais])} |
| **Issues Aceitas** | {sum([u['Issues_Aceitas'] for u in metricas_individuais])} |
| **1.5 - Taxa Aceitação Issues** | **{round(sum([u['Issues_Aceitas'] for u in metricas_individuais]) / sum([u['Issues_Identificadas'] for u in metricas_individuais]) * 100, 2) if sum([u['Issues_Identificadas'] for u in metricas_individuais]) > 0 else 0}%** |

## 🏢 MÉTRICAS DE EQUIPE SOLICITADAS

### ✅ 2.5 - Taxa Resolução Issues
| Métrica | Valor |
|---------|-------|
| **Issues Aceitos** | {metricas_equipe['Issues_Aceitos']} |
| **Issues Resolvidos** | {metricas_equipe['Issues_Resolvidos']} |
| **2.5 - Taxa Resolução Issues** | **{metricas_equipe['2.5_Taxa_Resolucao_Issues_Percentual']}%** |

### ⏱️ 2.7 - Tempo Médio Resolução Issues
| Métrica | Valor |
|---------|-------|
| **Tempo Total Resolução** | {metricas_equipe['Tempo_Total_Resolucao_Horas']}h |
| **Issues Resolvidos** | {metricas_equipe['Issues_Resolvidos']} |
| **2.7 - Tempo Médio Resolução** | **{metricas_equipe['2.7_Tempo_Medio_Resolucao_Horas']}h** |

### ⏱️ 2.9 - Tempo Médio Aprovação PRs
| Métrica | Valor |
|---------|-------|
| **Tempo Total Aprovação** | {metricas_equipe['Tempo_Total_Aprovacao_Horas']}h |
| **PRs Aprovadas** | {metricas_equipe['PRs_Aprovadas']} |
| **2.9 - Tempo Médio Aprovação** | **{metricas_equipe['2.9_Tempo_Medio_Aprovacao_Horas']}h** |

## 🔄 MÉTRICAS DE QUALIDADE

### 📊 Taxa de Retrabalho
| Métrica | Valor |
|---------|-------|
| **Commits Submetidos** | {metricas_equipe['Commits_Submetidos']} |
| **Commits Rejeitados** | {metricas_equipe['Commits_Rejeitados']} |
| **Taxa de Retrabalho** | **{metricas_equipe['Taxa_Retrabalho_Percentual']}%** |

### 💬 Code Review
| Métrica | Valor |
|---------|-------|
| **Total Comentários** | {metricas_equipe['Total_Comentarios_PRs']} |
| **PRs Analisados** | {metricas_equipe['Total_PRs']} |
| **Nº Médio Comentários/Revisão** | **{metricas_equipe['Media_Comentarios_Por_Revisao']}** |

## 👥 MÉTRICAS INDIVIDUAIS DETALHADAS

| Usuário | 1.3 PRs Criadas | 1.3 PRs Aceitas | 1.3 Produtividade | 1.4 PRs Revisadas | 1.5 Issues Identificadas | 1.5 Issues Aceitas | 1.5 Taxa Aceitação |
|---------|----------------|----------------|------------------|------------------|-------------------------|-------------------|-------------------|
"""
    
    for user in metricas_individuais:
        md_content += f"| {user['Usuario']} | {user['PRs_Criadas']} | {user['PRs_Aceitas']} | {user['1.3_Produtividade_PRs_Percentual']}% | {user['PRs_Revisadas']} | {user['Issues_Identificadas']} | {user['Issues_Aceitas']} | {user['1.5_Taxa_Aceitacao_Issues_Percentual']}% |\n"
    
    md_content += """

## 📋 Legenda das Métricas

### 🎯 Métricas Individuais
- **1.3 - Produtividade PRs**: Nº de PRs aceitas / Nº de PRs criadas pelo aluno
- **1.4 - PRs Revisadas**: Nº de PRs revisadas pelo aluno  
- **1.5 - Taxa Aceitação Issues**: Issues aceitos do aluno / Issues identificados pelo aluno

### 🏢 Métricas de Equipe
- **2.5 - Taxa Resolução Issues**: Issues resolvidos / Issues Aceitos
- **2.7 - Tempo Médio Resolução**: Tempo total resolução / Issues resolvidos
- **2.9 - Tempo Médio Aprovação**: Tempo total revisão / PRs aprovadas

### 🔄 Qualidade
- **Taxa de Retrabalho**: Commits rejeitados / Commits submetidos × 100
- **Nº Médio Comentários/Revisão**: Total comentários / Total PRs analisados
"""

    # Salvar arquivo Markdown
    os.makedirs('metricas', exist_ok=True)
    with open(f'metricas/relatorio_sprint_{sprint_number}.md', 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    return md_content

def calcular_datas_sprint_automatico():
    """Calcula automaticamente as datas da sprint (segunda a segunda)"""
    hoje = datetime.now()
    
    dias_desde_segunda = hoje.weekday()
    fim_sprint = hoje - timedelta(days=dias_desde_segunda)
    
    if dias_desde_segunda > 0:
        fim_sprint = fim_sprint - timedelta(days=7)
    
    inicio_sprint = fim_sprint - timedelta(days=6)
    sprint_number = fim_sprint.isocalendar()[1]
    
    return (
        inicio_sprint.strftime('%Y-%m-%d'),
        fim_sprint.strftime('%Y-%m-%d'),
        sprint_number
    )

def main():
    parser = argparse.ArgumentParser(description='Coletar métricas do GitHub')
    parser.add_argument('--sprint-start', nargs='?', help='Data de início da sprint (YYYY-MM-DD)')
    parser.add_argument('--sprint-end', nargs='?', help='Data de fim da sprint (YYYY-MM-DD)')
    parser.add_argument('--sprint-number', type=int, nargs='?', help='Número da sprint')
    
    args = parser.parse_args()
    
    if not args.sprint_start or not args.sprint_end:
        print("Calculando datas automaticamente (segunda a segunda)...")
        sprint_start, sprint_end, sprint_number = calcular_datas_sprint_automatico()
        args.sprint_start = sprint_start
        args.sprint_end = sprint_end
        args.sprint_number = args.sprint_number or sprint_number
    
    print(f"Coletando métricas para Sprint {args.sprint_number} ({args.sprint_start} a {args.sprint_end})")
    
    colaboradores = get_collaborators()
    print(f"Colaboradores encontrados: {colaboradores}")
    
    print("Calculando métricas de equipe...")
    metricas_equipe = calcular_metricas_equipe(args.sprint_start, args.sprint_end)
    
    print("Calculando métricas individuais...")
    metricas_individuais = []
    for usuario in colaboradores:
        print(f"Processando usuário: {usuario}")
        metricas = calcular_metricas_individuais(args.sprint_start, args.sprint_end, usuario)
        metricas_individuais.append(metricas)
    
    os.makedirs('metricas', exist_ok=True)
    
    df_equipe = pd.DataFrame([metricas_equipe])
    df_individuais = pd.DataFrame(metricas_individuais)
    
    df_equipe.to_csv(f'metricas/metricas_equipe_sprint_{args.sprint_number}.csv', index=False)
    df_individuais.to_csv(f'metricas/metricas_individuais_sprint_{args.sprint_number}.csv', index=False)
    
    print("Gerando relatório em Markdown...")
    gerar_relatorio_markdown(args.sprint_number, args.sprint_start, args.sprint_end, metricas_equipe, metricas_individuais)
    
    print("="*60)
    print("📊 MÉTRICAS PRINCIPAIS:")
    print("="*60)
    
    print(f"\n🎯 INDIVIDUAIS:")
    print(f"   1.3 - Produtividade PRs: {round(sum([u['PRs_Aceitas'] for u in metricas_individuais]) / sum([u['PRs_Criadas'] for u in metricas_individuais]) * 100, 2) if sum([u['PRs_Criadas'] for u in metricas_individuais]) > 0 else 0}%")
    print(f"   1.4 - PRs Revisadas: {sum([u['PRs_Revisadas'] for u in metricas_individuais])}")
    print(f"   1.5 - Taxa Aceitação Issues: {round(sum([u['Issues_Aceitas'] for u in metricas_individuais]) / sum([u['Issues_Identificadas'] for u in metricas_individuais]) * 100, 2) if sum([u['Issues_Identificadas'] for u in metricas_individuais]) > 0 else 0}%")
    
    print(f"\n🏢 EQUIPE:")
    print(f"   2.5 - Taxa Resolução Issues: {metricas_equipe['2.5_Taxa_Resolucao_Issues_Percentual']}%")
    print(f"   2.7 - Tempo Médio Resolução: {metricas_equipe['2.7_Tempo_Medio_Resolucao_Horas']}h")
    print(f"   2.9 - Tempo Médio Aprovação: {metricas_equipe['2.9_Tempo_Medio_Aprovacao_Horas']}h")
    
    print(f"\n🔄 QUALIDADE:")
    print(f"   Taxa de Retrabalho: {metricas_equipe['Taxa_Retrabalho_Percentual']}%")
    print(f"   Média Comentários/Revisão: {metricas_equipe['Media_Comentarios_Por_Revisao']}")
    
    print(f"\n📁 Arquivos gerados:")
    print(f"📄 CSV: metricas/metricas_equipe_sprint_{args.sprint_number}.csv")
    print(f"📄 CSV: metricas/metricas_individuais_sprint_{args.sprint_number}.csv")
    print(f"📝 Markdown: metricas/relatorio_sprint_{args.sprint_number}.md")
    
    print(f"\n✅ Métricas salvas com sucesso!")

if __name__ == "__main__":
    main()