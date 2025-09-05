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
    seen_pr_numbers = set()  # 🔥 Conjunto para evitar duplicatas
    
    # 🔥 Buscar apenas PRs com state='all' para evitar duplicação
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls'
    page = 1
    
    while True:
        params = {
            'state': 'all',  # 🔥 Apenas 'all' para evitar duplicação
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
            
            # 🔥 Evitar duplicatas
            if pr_number in seen_pr_numbers:
                continue
                
            seen_pr_numbers.add(pr_number)
            
            created_at = datetime.strptime(pull['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            updated_at = datetime.strptime(pull['updated_at'], '%Y-%m-%dT%H:%M:%SZ')
            
            # Incluir PRs criados OU atualizados durante a sprint
            if (sprint_start_dt <= created_at <= sprint_end_dt or 
                sprint_start_dt <= updated_at <= sprint_end_dt):
                all_pulls.append(pull)
        
        # Parar se chegarmos em PRs muito antigos
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

def calcular_tempo_medio_resolucao(issues_fechadas):
    """Calcula tempo médio de resolução de issues"""
    if not issues_fechadas:
        return 0
    
    tempo_total = timedelta()
    for issue in issues_fechadas:
        if issue.get('closed_at'):
            created_at = datetime.strptime(issue['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            closed_at = datetime.strptime(issue['closed_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total += (closed_at - created_at)
    
    return round((tempo_total.total_seconds() / 3600) / len(issues_fechadas), 2)

def calcular_tempo_medio_aprovacao(prs_mergeados):
    """Calcula tempo médio de aprovação de PRs"""
    if not prs_mergeados:
        return 0
    
    tempo_total = timedelta()
    for pr in prs_mergeados:
        if pr.get('merged_at'):
            created_at = datetime.strptime(pr['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            merged_at = datetime.strptime(pr['merged_at'], '%Y-%m-%dT%H:%M:%SZ')
            tempo_total += (merged_at - created_at)
    
    return round((tempo_total.total_seconds() / 3600) / len(prs_mergeados), 2)

def calcular_metricas_individuais(sprint_start: str, sprint_end: str, usuario: str) -> Dict:
    """Calcula métricas individuais - VERSÃO CORRIGIDA SEM DUPLICAÇÃO"""
    
    issues = get_issues(sprint_start, sprint_end)
    pulls = get_pulls(sprint_start, sprint_end)
    
    # PRs criadas pelo usuário
    prs_criadas = [pr for pr in pulls if pr['user']['login'].lower() == usuario.lower()]
    prs_mergeadas = [pr for pr in prs_criadas if pr.get('merged_at')]
    
    # PRs revisadas pelo usuário - CONTAGEM CORRETA SEM DUPLICAÇÃO
    prs_revisadas_set = set()  # 🔥 Usar conjunto para evitar duplicação
    for pr in pulls:
        reviews = get_pull_reviews(pr['number'])
        for review in reviews:
            if review['user']['login'].lower() == usuario.lower():
                prs_revisadas_set.add(pr['number'])  # 🔥 Usar número do PR para evitar duplicação
                break
    
    # Issues do usuário
    issues_criadas = [issue for issue in issues if issue['user']['login'].lower() == usuario.lower()]
    issues_fechadas = [issue for issue in issues_criadas if issue['state'] == 'closed']
    
    return {
        'Usuario': usuario,
        'PRs_Criadas': len(prs_criadas),
        'PRs_Mergeadas': len(prs_mergeadas),
        'PRs_Revisadas': len(prs_revisadas_set),  # 🔥 Contagem correta sem duplicação
        'Issues_Criadas': len(issues_criadas),
        'Issues_Fechadas': len(issues_fechadas),
        'Produtividade_PRs_Percentual': round(len(prs_mergeadas) / len(prs_criadas) * 100, 2) if prs_criadas else 0,
        'Taxa_Conclusao_Issues_Percentual': round(len(issues_fechadas) / len(issues_criadas) * 100, 2) if issues_criadas else 0
    }

def calcular_metricas_equipe(sprint_start: str, sprint_end: str) -> Dict:
    """Calcula métricas de equipe - VERSÃO CORRIGIDA SEM DUPLICAÇÃO"""
    
    issues = get_issues(sprint_start, sprint_end)
    pulls = get_pulls(sprint_start, sprint_end)  # 🔥 Já sem duplicação
    
    # Simplificar: Issues fechadas durante a sprint
    issues_fechadas = [issue for issue in issues if issue['state'] == 'closed']
    
    # Simplificar: PRs mergeados durante a sprint
    prs_mergeados = [pr for pr in pulls if pr.get('merged_at')]
    
    # Métricas de comentários - CONTAGEM CORRETA
    total_comentarios = 0
    prs_com_revisao = 0
    
    for pr in pulls:
        # Contar comentários de review
        comments = get_pull_comments(pr['number'])
        reviews = get_pull_reviews(pr['number'])
        
        total_comentarios_pr = len(comments) + len(reviews)
        
        if total_comentarios_pr > 0:
            prs_com_revisao += 1
            total_comentarios += total_comentarios_pr
    
    # Métricas de refatoração SIMPLIFICADAS
    prs_com_refatoracao = 0
    
    for pr in prs_mergeados:
        # Buscar commits do PR mergeado
        commits = get_commits(pr['number'])
        
        # Verificar se há commits de fix/refactor após o PR aberto
        if commits and len(commits) > 1:
            # Se tem mais de 1 commit, provavelmente teve refatoração
            prs_com_refatoracao += 1
    
    # Cálculo de tempos simplificado
    tempo_medio_resolucao = calcular_tempo_medio_resolucao(issues_fechadas)
    tempo_medio_aprovacao = calcular_tempo_medio_aprovacao(prs_mergeados)
    
    # Cálculos das métricas
    return {
        'Inicio_Sprint': sprint_start,
        'Fim_Sprint': sprint_end,
        
        # Métricas básicas
        'Total_Issues': len(issues),
        'Issues_Fechadas': len(issues_fechadas),
        'Total_PRs': len(pulls),
        'PRs_Mergeados': len(prs_mergeados),
        
        # Métricas de taxa
        'Taxa_Resolucao_Issues_Percentual': round((len(issues_fechadas) / len(issues) * 100) if issues else 0, 2),
        'Taxa_Aprovacao_PRs_Percentual': round((len(prs_mergeados) / len(pulls) * 100) if pulls else 0, 2),
        
        # Métricas de tempo
        'Tempo_Medio_Resolucao_Horas': tempo_medio_resolucao,
        'Tempo_Medio_Aprovacao_Horas': tempo_medio_aprovacao,
        
        # Métricas de code review CORRIGIDAS
        'Total_Comentarios_PRs': total_comentarios,
        'PRs_Com_Revisao': prs_com_revisao,
        'Media_Comentarios_Por_Revisao': round(total_comentarios / prs_com_revisao if prs_com_revisao else 0, 2),
        
        # Métricas de refatoração SIMPLIFICADAS
        'PRs_Com_Refatoracao': prs_com_refatoracao,
        'Taxa_Refatoracao_Percentual': round((prs_com_refatoracao / len(prs_mergeados) * 100) if prs_mergeados else 0, 2)
    }

def gerar_relatorio_markdown(sprint_number, sprint_start, sprint_end, metricas_equipe, metricas_individuais):
    """Gera relatório em formato Markdown - VERSÃO ATUALIZADA"""
    
    md_content = f"""# 📊 Relatório de Métricas - Sprint {sprint_number}

**Período:** {sprint_start} até {sprint_end}  
**Data de geração:** {datetime.now().strftime('%d/%m/%Y %H:%M')}

## 📈 Métricas de Equipe

### 📋 Visão Geral
| Métrica | Valor |
|---------|-------|
| **Inicio Sprint** | {metricas_equipe['Inicio_Sprint']} |
| **Fim Sprint** | {metricas_equipe['Fim_Sprint']} |
| **Total Issues** | {metricas_equipe['Total_Issues']} |
| **Issues Fechadas** | {metricas_equipe['Issues_Fechadas']} |
| **Total PRs** | {metricas_equipe['Total_PRs']} |
| **PRs Mergeados** | {metricas_equipe['PRs_Mergeados']} |

### 📊 Taxas de Sucesso
| Métrica | Valor |
|---------|-------|
| **Taxa Resolução Issues** | **{metricas_equipe['Taxa_Resolucao_Issues_Percentual']}%** |
| **Taxa Aprovação PRs** | **{metricas_equipe['Taxa_Aprovacao_PRs_Percentual']}%** |

### ⏱️ Métricas de Tempo
| Métrica | Valor |
|---------|-------|
| **Tempo Médio Resolução** | {metricas_equipe['Tempo_Medio_Resolucao_Horas']}h |
| **Tempo Médio Aprovação** | {metricas_equipe['Tempo_Medio_Aprovacao_Horas']}h |

### 💬 Métricas de Code Review
| Métrica | Valor |
|---------|-------|
| **Total Comentários** | {metricas_equipe['Total_Comentarios_PRs']} |
| **PRs com Revisão** | {metricas_equipe['PRs_Com_Revisao']} |
| **Média Comentários/Revisão** | {metricas_equipe['Media_Comentarios_Por_Revisao']} |

### 🔄 Métricas de Qualidade
| Métrica | Valor |
|---------|-------|
| **PRs com Refatoração** | {metricas_equipe['PRs_Com_Refatoracao']} |
| **Taxa Refatoração** | {metricas_equipe['Taxa_Refatoracao_Percentual']}% |

## 👥 Métricas Individuais

| Usuário | PRs Criadas | PRs Mergeadas | PRs Revisadas | Issues Criadas | Issues Fechadas | Produtividade PRs | Taxa Conclusão Issues |
|---------|------------|--------------|--------------|---------------|----------------|------------------|---------------------|
"""
    
    for user in metricas_individuais:
        md_content += f"| {user['Usuario']} | {user['PRs_Criadas']} | {user['PRs_Mergeadas']} | {user['PRs_Revisadas']} | {user['Issues_Criadas']} | {user['Issues_Fechadas']} | {user['Produtividade_PRs_Percentual']}% | {user['Taxa_Conclusao_Issues_Percentual']}% |\n"
    
    md_content += """

## 📋 Legenda das Métricas

- **PRs Criadas**: Pull Requests criadas pelo usuário 📝
- **PRs Mergeadas**: Pull Requests que foram aceitos e mergeados ✅
- **PRs Revisadas**: Pull Requests que o usuário revisou 👀  
- **Produtividade PRs**: Percentual de PRs criadas que foram mergeadas 📈
- **Taxa Conclusão Issues**: Percentual de issues criadas que foram fechadas ✅
- **PRs com Refatoração**: PRs que tiveram mais de 1 commit (indicando ajustes) 🔄
- **Taxa Refatoração**: Percentual de PRs mergeados que precisaram de ajustes 📊
"""

    # Salvar arquivo Markdown
    os.makedirs('metricas', exist_ok=True)
    with open(f'metricas/relatorio_sprint_{sprint_number}.md', 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    return md_content

def calcular_datas_sprint_automatico():
    """Calcula automaticamente as datas da sprint (segunda a segunda)"""
    hoje = datetime.now()
    
    # Encontrar a última segunda-feira
    dias_desde_segunda = hoje.weekday()  # 0=seg, 1=ter, 2=qua, etc
    fim_sprint = hoje - timedelta(days=dias_desde_segunda)
    
    # Se executado depois da segunda, ajusta para sprint anterior
    if dias_desde_segunda > 0:
        fim_sprint = fim_sprint - timedelta(days=7)  # Sprint anterior
    
    inicio_sprint = fim_sprint - timedelta(days=6)
    
    # Número da sprint baseado na data de fim
    sprint_number = fim_sprint.isocalendar()[1]  # Número da semana
    
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
    
    # Calcular automaticamente se não fornecido
    if not args.sprint_start or not args.sprint_end:
        print("Calculando datas automaticamente (segunda a segunda)...")
        sprint_start, sprint_end, sprint_number = calcular_datas_sprint_automatico()
        
        args.sprint_start = sprint_start
        args.sprint_end = sprint_end
        args.sprint_number = args.sprint_number or sprint_number
    
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
    
    print("="*60)
    print("📊 RESUMO DAS MÉTRICAS:")
    print("="*60)
    print(f"📋 Issues: {metricas_equipe['Total_Issues']} total, {metricas_equipe['Issues_Fechadas']} fechadas")
    print(f"🔀 PRs: {metricas_equipe['Total_PRs']} total, {metricas_equipe['PRs_Mergeados']} mergeados")
    print(f"📈 Taxa Resolução: {metricas_equipe['Taxa_Resolucao_Issues_Percentual']}%")
    print(f"📈 Taxa Aprovação: {metricas_equipe['Taxa_Aprovacao_PRs_Percentual']}%")
    print(f"💬 Comentários: {metricas_equipe['Total_Comentarios_PRs']} em {metricas_equipe['PRs_Com_Revisao']} PRs")
    print(f"🔄 Refatoração: {metricas_equipe['PRs_Com_Refatoracao']} PRs ({metricas_equipe['Taxa_Refatoracao_Percentual']}%)")
    
    print(f"\n📁 Arquivos gerados:")
    print(f"📄 CSV: metricas/metricas_equipe_sprint_{args.sprint_number}.csv")
    print(f"📄 CSV: metricas/metricas_individuais_sprint_{args.sprint_number}.csv")
    print(f"📝 Markdown: metricas/relatorio_sprint_{args.sprint_number}.md")
    
    print(f"\n✅ Métricas salvas com sucesso!")

if __name__ == "__main__":
    main()