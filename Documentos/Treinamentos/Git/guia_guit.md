# 🚀 Guia Completo Git - Fluxo de Trabalho 


## 🎯 **Índice Navegável**

| 📖 Seção | 🔗 Link Rápido | 📝 Descrição |
|-----------|----------------|---------------|
| ⚙️ | [**Comandos Essenciais**](#️-comandos-git-essenciais) | Comandos fundamentais do dia a dia |
| 🔄 | [**Fluxo Completo**](#-fluxo-de-trabalho-completo) | Passo a passo do desenvolvimento |
| 🚀 | [**Comandos Avançados**](#-comandos-avançados) | Técnicas para usuários experientes |
| 📋 | [**Boas Práticas**](#-boas-práticas) | Convenções e padrões da equipe |
| 🔥 | [**Resolução de Conflitos**](#-resolução-de-conflitos) | Como resolver problemas comuns |

---

## 🌳 **Estrutura de Branches**


### 📋 **Descrição Detalhada das Branches**

| 🏷️ **Branch** | 🎯 **Propósito** | 📊 **Estabilidade** | 👥 **Acesso** |
|---------------|-------------------|---------------------|----------------|
| 🏠 **main** | Código em produção | ⭐⭐⭐⭐⭐ Alta | 🔒 Só via PR aprovado |
| 📦 **sprint** | Preparação de releases | ⭐⭐⭐⭐ Muito alta | 🔒 Só via PR aprovado |
| 🚨 **hotfix** | Correções críticas | ⭐⭐⭐ Alta | 👨‍💼 Senior/Lead |
| 🔧 **develop** | Integração contínua | ⭐⭐ Média | 🔒 Só via PR aprovado |
| ✨ **feature** | Funcionalidades | ⭐ Baixa/Média | 👥 Toda equipe |
| 💡 **idea** | Propostas de soluções | ⭐ Experimental | 👶 Júniors |

---

## ⚙️ **Comandos Git Essenciais**

### 🛠️ **1. Configuração Inicial**

<details>
<summary>🔧 <strong>git config - Configurações do Git</strong></summary>

**🎯 Para que serve:** Define informações pessoais e preferências que o Git usará em todos os repositórios.

```bash
# 👤 Configurar nome do autor (aparece nos commits)
git config --global user.name "João Silva"
# 🎯 Para que serve: Todo commit precisa ter um autor identificado
# 💡 Exemplo: Quando você fizer commits, aparecerá "Author: João Silva"

# 📧 Configurar email do autor (aparece nos commits e PRs)
git config --global user.email "joao.silva@empresa.com"
# 🎯 Para que serve: Identifica quem fez o commit, usado pelo GitHub/GitLab
# 💡 Exemplo: Commits aparecerão vinculados ao seu perfil no GitHub

# 📝 Configurar editor padrão para mensagens de commit
git config --global core.editor "code --wait"
# 🎯 Para que serve: Define qual editor abre quando Git precisa de texto
# 💡 Exemplo: Ao fazer "git commit" sem -m, abre VS Code

# 📋 Verificar todas as configurações ativas
git config --list
# 🎯 Para que serve: Mostra todas as configurações do Git
# 💡 Exemplo: Debugar problemas ou confirmar configurações

# 🔍 Ver configuração específica
git config user.name
# 🎯 Para que serve: Mostra apenas uma configuração específica
# 💡 Exemplo: Verificar qual nome está configurado

# 🏠 Configuração local (apenas para o projeto atual)
git config user.name "João Dev"
# 🎯 Para que serve: Sobrescreve configuração global neste repo
# 💡 Exemplo: Email pessoal em projeto pessoal, empresa em projeto da empresa
```

**📊 Exemplo prático de como aparece nos commits:**

```diff
❌ Sem configuração:
commit a1b2c3d
Author: unknown <unknown@unknown>
Date: Thu Aug 28 14:30:00 2025 -0300
    feat: adiciona login

✅ Com configuração:
commit a1b2c3d
Author: João Silva <joao.silva@empresa.com>
Date: Thu Aug 28 14:30:00 2025 -0300
    feat: adiciona login OAuth Google
```

</details>

### 🏗️ **2. Inicialização e Clonagem**

<details>
<summary>🆕 <strong>git init - Criar repositório local</strong></summary>

**🎯 Para que serve:** Transforma uma pasta comum em um repositório Git, criando a pasta `.git`.

```bash
# 📁 Inicializar repositório na pasta atual
git init
# 🎯 Para que serve: Cria repositório Git do zero na pasta atual
# 💡 Exemplo: Começar projeto novo do zero
# ✅ Resultado: Cria pasta .git/ com estrutura do repositório

# 📂 Inicializar repositório em pasta específica
git init meu-projeto
# 🎯 Para que serve: Cria pasta "meu-projeto" e inicializa repo dentro
# 💡 Exemplo: Criar projeto novo em pasta separada
# ✅ Resultado: Cria pasta meu-projeto/ com .git/ dentro

# 🖥️ Inicializar repositório bare (servidor)
git init --bare
# 🎯 Para que serve: Cria repositório sem área de trabalho (só pushes)
# 💡 Exemplo: Criar repositório central em servidor
```

</details>

<details>
<summary>📥 <strong>git clone - Copiar repositório remoto</strong></summary>

**🎯 Para que serve:** Baixa uma cópia completa de um repositório remoto para sua máquina.

```bash
# 📦 Clonar repositório completo
git clone https://github.com/empresa/projeto.git
# 🎯 Para que serve: Baixa todo o histórico e arquivos do repositório
# 💡 Exemplo: Começar a trabalhar em projeto existente
# ✅ Resultado: Pasta "projeto/" com todos os arquivos e histórico

# 🏷️ Clonar com nome diferente
git clone https://github.com/empresa/projeto.git meu-projeto
# 🎯 Para que serve: Clona repositório mas renomeia a pasta local
# 💡 Exemplo: Evitar conflito de nomes ou organizar melhor
# ✅ Resultado: Pasta "meu-projeto/" em vez de "projeto/"

# 🌿 Clonar apenas uma branch específica
git clone -b develop https://github.com/empresa/projeto.git
# 🎯 Para que serve: Baixa apenas uma branch, economiza tempo
# 💡 Exemplo: Trabalhar apenas na branch de desenvolvimento
# ✅ Resultado: Repositório local começa na branch "develop"

# ⚡ Clonar apenas commits recentes (shallow clone)
git clone --depth 1 https://github.com/empresa/projeto.git
# 🎯 Para que serve: Baixa apenas o último commit, muito mais rápido
# 💡 Exemplo: Deploy em produção ou análise rápida
# ✅ Resultado: Histórico limitado, repositório menor
```

**📋 Exemplo prático:**
```bash
# 🎬 Cenário: Novo desenvolvedor entrando na equipe
cd ~/projetos
git clone https://github.com/empresa/sistema-vendas.git
cd sistema-vendas

# ✅ Agora você tem:
# 📁 Todos os arquivos do projeto
# 📚 Todo o histórico de commits  
# 🌿 Todas as branches remotas
# 🔗 Conexão automática com origin (remoto)
```

</details>

### 📊 **3. Status e Informações**

<details>
<summary>📋 <strong>git status - Ver estado atual do repositório</strong></summary>

**🎯 Para que serve:** Mostra quais arquivos foram modificados, adicionados ou deletados desde o último commit.

```bash
# 📊 Ver status completo
git status
# 🎯 Para que serve: Mostra estado detalhado de todos os arquivos
# 💡 Exemplo: Verificar o que mudou antes de fazer commit
# ✅ Resultado: Lista arquivos modificados, não rastreados, staged

# 📝 Ver status resumido
git status -s
# 🎯 Para que serve: Versão compacta, uma linha por arquivo
# 💡 Exemplo: Visão rápida do que mudou
# ✅ Resultado: M arquivo.js, ?? novo.txt, D deletado.txt

# 🎯 Ver apenas arquivos rastreados
git status --untracked-files=no
# 🎯 Para que serve: Ignora arquivos novos, mostra apenas modificados
# 💡 Exemplo: Focar apenas em arquivos já conhecidos pelo Git
```

**📋 Exemplo de saída colorida:**
```diff
🌿 On branch feature/login
📦 Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
+       modified:   src/auth.js      # ✅ No staging, pronto para commit

📝 Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes)
~       modified:   src/utils.js     # ⚠️ Modificado mas não staged

❓ Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/new-feature.js          # 🆕 Arquivo novo
```

</details>

<details>
<summary>📚 <strong>git log - Ver histórico de commits</strong></summary>

**🎯 Para que serve:** Mostra o histórico de commits do repositório com detalhes completos.

```bash
# 📖 Log completo (detalhado)
git log
# 🎯 Para que serve: Mostra todos os commits com hash, autor, data
# 💡 Exemplo: Investigar histórico completo do projeto

# 📄 Log compacto (uma linha por commit)
git log --oneline
# 🎯 Para que serve: Versão resumida, apenas hash e primeira linha
# 💡 Exemplo: Visão rápida do que foi feito
# ✅ Resultado: a1b2c3d feat: adiciona login OAuth

# 🌳 Log visual com branches
git log --oneline --graph --all
# 🎯 Para que serve: Mostra histórico com representação visual
# 💡 Exemplo: Entender como branches foram criadas e merged
# ✅ Resultado: Gráfico ASCII mostrando bifurcações

# 🔢 Log de commits específicos
git log -n 5
# 🎯 Para que serve: Limita quantidade de commits
# 💡 Exemplo: Ver apenas os 5 commits mais recentes

# 🌿 Log de uma branch específica
git log develop
# 🎯 Para que serve: Mostra apenas commits da branch
# 💡 Exemplo: Ver histórico da branch de desenvolvimento

# 📊 Log com estatísticas de arquivos
git log --stat
# 🎯 Para que serve: Mostra arquivos modificados em cada commit
# 💡 Exemplo: Entender impacto de cada commit

# 👤 Log de um autor específico
git log --author="João Silva"
# 🎯 Para que serve: Filtra commits por autor
# 💡 Exemplo: Ver contribuições de desenvolvedor específico

# 📅 Log por período
git log --since="2025-01-01" --until="2025-01-31"
# 🎯 Para que serve: Filtra commits por data
# 💡 Exemplo: Relatório mensal
```

</details>

<details>
<summary>🔍 <strong>git diff - Ver diferenças nos arquivos</strong></summary>

**🎯 Para que serve:** Mostra exatamente quais linhas foram alteradas nos arquivos.

```bash
# 📝 Diferenças entre working directory e staging
git diff
# 🎯 Para que serve: Mostra mudanças não adicionadas ao staging
# 💡 Exemplo: Revisar modificações antes do git add

# 📦 Diferenças no staging area (já com git add)
git diff --staged
# 🎯 Para que serve: Mostra mudanças prontas para commit
# 💡 Exemplo: Revisar o que será commitado

# 🌿 Diferenças entre duas branches
git diff develop..feature/login
# 🎯 Para que serve: Compara duas branches
# 💡 Exemplo: Ver o que a feature adiciona

# 📄 Diferenças em arquivo específico
git diff src/auth.js
# 🎯 Para que serve: Mostra mudanças apenas do arquivo
# 💡 Exemplo: Focar em arquivo específico modificado

# 🔀 Diferenças entre commits
git diff a1b2c3d..e4f5g6h
# 🎯 Para que serve: Compara dois commits específicos
# 💡 Exemplo: Ver mudanças entre duas versões
```

**📋 Exemplo visual do git diff:**
```diff
📁 diff --git a/src/auth.js b/src/auth.js
📊 index 1234567..abcdefg 100644
--- a/src/auth.js
+++ b/src/auth.js
@@ -10,7 +10,10 @@ function validateUser(email, password) {
   if (!email) {
-    return false;                    # ❌ Linha removida
+    throw new Error('Email obrigatório');  # ✅ Linha adicionada
   }
   
+  if (password.length < 8) {         # ✅ Nova validação
+    throw new Error('Senha min 8 chars');
+  }
+  
   return checkCredentials(email, password);
 }
```

</details>

### 📁 **4. Trabalhando com Arquivos**

<details>
<summary>➕ <strong>git add - Adicionar arquivos ao staging</strong></summary>

**🎯 Para que serve:** Move arquivos modificados para o "staging area", preparando-os para commit.

```bash
# 📄 Adicionar arquivo específico
git add arquivo.txt
# 🎯 Para que serve: Prepara apenas um arquivo para commit
# 💡 Exemplo: Modificou 5 arquivos mas quer commitar apenas 1
# ✅ Resultado: arquivo.txt fica "staged" (pronto para commit)

# 🌍 Adicionar todos os arquivos
git add .
# 🎯 Para que serve: Prepara TODOS os arquivos da pasta atual
# 💡 Exemplo: Quer commitar todas as mudanças de uma vez
# ⚠️ CUIDADO: Pode adicionar arquivos indesejados!

# 🎯 Adicionar por tipo de arquivo
git add *.js
# 🎯 Para que serve: Adiciona apenas arquivos JavaScript
# 💡 Exemplo: Commitar apenas mudanças de código, ignorar CSS

# 📂 Adicionar arquivos de uma pasta
git add src/
# 🎯 Para que serve: Adiciona apenas arquivos da pasta "src"
# 💡 Exemplo: Separar commits por área (src/, tests/, docs/)

# 🎛️ Adicionar interativamente (escolher partes)
git add -p arquivo.js
# 🎯 Para que serve: Permite escolher partes do arquivo
# 💡 Exemplo: Arquivo tem 2 mudanças, quer commitar só 1
# ✅ Resultado: Git pergunta para cada "chunk" (y/n)

# 🔄 Adicionar apenas arquivos já rastreados
git add -u
# 🎯 Para que serve: Adiciona só arquivos que Git já conhece
# 💡 Exemplo: Ignorar arquivos novos, só modificações
```

**🎛️ Exemplo prático do git add -p:**
```bash
$ git add -p auth.js
📝 diff --git a/auth.js b/auth.js
@@ -1,6 +1,8 @@
 function login(email, password) {
+  // ✅ Validação de email
   if (!email) return false;
   
+  // ✅ Validação de senha  
   if (!password) return false;
   
   return authenticate(email, password);

🎯 Stage this hunk [y,n,q,a,d,s,e,?]? y  # ✅ Escolher esta parte
```

</details>

<details>
<summary>↩️ <strong>git reset - Remover do staging ou desfazer commits</strong></summary>

**🎯 Para que serve:** Remove arquivos do staging area ou desfaz commits, dependendo dos parâmetros.

```bash
# 📄 Remover arquivo do staging (mantém modificações)
git reset arquivo.txt
# 🎯 Para que serve: Remove do staging, volta para "modified"
# 💡 Exemplo: Adicionou arquivo por engano com git add
# ✅ Resultado: Arquivo continua modificado, mas não vai no commit

# 🌍 Remover todos os arquivos do staging
git reset
# 🎯 Para que serve: Remove todos do staging area
# 💡 Exemplo: Mudou de ideia sobre o que commitar
# ✅ Resultado: Volta ao estado antes do git add

# 🕊️ Reset suave - desfaz commit (mantém staged)
git reset --soft HEAD~1
# 🎯 Para que serve: Desfaz commit mas mantém arquivos staged
# 💡 Exemplo: Quer alterar mensagem ou adicionar mais arquivos
# ✅ Resultado: Volta 1 commit, arquivos ficam staged

# 🔄 Reset misto - desfaz commit (volta para modified)
git reset HEAD~1
# 🎯 Para que serve: Desfaz commit, arquivos voltam "modified"
# 💡 Exemplo: Quer refazer commit completamente
# ✅ Resultado: Volta 1 commit, arquivos modified (não staged)

# 💥 Reset hard - desfaz commit (PERDE mudanças)
git reset --hard HEAD~1
# 🎯 Para que serve: Desfaz commit E descarta mudanças
# 💡 Exemplo: Commit foi erro, quer voltar completamente
# ⚠️ PERIGO: Não tem como recuperar as mudanças!

# 🎯 Reset para commit específico
git reset --hard a1b2c3d
# 🎯 Para que serve: Volta repositório para commit específico
# 💡 Exemplo: Voltar para versão estável conhecida
```

</details>

<details>
<summary>🗑️ <strong>git rm - Remover arquivos do repositório</strong></summary>

**🎯 Para que serve:** Remove arquivos do projeto e prepara a remoção para commit.

```bash
# 🗑️ Remover arquivo do projeto e repositório
git rm arquivo.txt
# 🎯 Para que serve: Deleta arquivo do sistema E registra remoção
# 💡 Exemplo: Arquivo não é mais necessário no projeto
# ✅ Resultado: Arquivo deletado e remoção fica staged

# 👻 Remover apenas do repositório (mantém local)
git rm --cached arquivo.txt
# 🎯 Para que serve: Remove do Git mas mantém arquivo local
# 💡 Exemplo: Arquivo commitado por engano (senhas, configs)
# ✅ Resultado: Arquivo vira "untracked" mas fica no disco

# 📂 Remover pasta inteira
git rm -r pasta/
# 🎯 Para que serve: Remove pasta e todo conteúdo
# 💡 Exemplo: Refatoração removeu módulo inteiro
# ✅ Resultado: Pasta e arquivos deletados, remoção staged

# 💪 Forçar remoção (arquivo modificado)
git rm -f arquivo.txt
# 🎯 Para que serve: Remove mesmo com modificações não commitadas
# 💡 Exemplo: Certeza de que quer deletar, mesmo com mudanças
# ⚠️ CUIDADO: Perde modificações não salvas!
```

**💡 Exemplo prático:**
```bash
# 🎬 Cenário: Arquivo de configuração commitado por engano
$ git status
    modified:   config/database.yml  # 🔑 Contém senhas!

# 👻 Remover do Git mas manter local
$ git rm --cached config/database.yml
$ echo "config/database.yml" >> .gitignore
$ git add .gitignore
$ git commit -m " remove config database do repositório"

# ✅ Arquivo existe localmente mas Git não rastreia mais
```

</details>

---

## 🔄 **Fluxo de Trabalho Completo**

### 🚀 **Passo 1: Preparação do Ambiente**

```bash
# 1️⃣ Clonar o repositório
git clone https://github.com/empresa/projeto.git
cd projeto

# 2️⃣ Verificar branch atual  
git branch -a

# 3️⃣ Configurar remote upstream (se necessário)
git remote add upstream https://github.com/empresa/projeto.git
```

### ✨ **Passo 2: Criando uma Nova Feature**

```bash
# 1️⃣ Ir para develop e atualizar
git checkout develop
git pull origin develop

# 2️⃣ Criar branch feature
git checkout -b feature/autenticacao-oauth
git push -u origin feature/autenticacao-oauth

# 3️⃣ Verificar se está na branch correta
git branch
```

### 💡 **Passo 3: Desenvolvedor Júnior - Criando Idea**

```bash
# 1️⃣ A partir da feature, criar branch idea
# É apenas um exemplo, no projeto irá seguir um padrão específico
git checkout feature/autenticacao-oauth
git checkout -b idea/joao-implementacao-google-oauth

# 2️⃣ Fazer o desenvolvimento
# ... 👨‍💻 codificar ...

# 3️⃣ Adicionar e commitear
# Também é possível realizar commit pelo próprio VSCode
git add .
git commit -m " feat: implementa autenticação Google OAuth

-  Adiciona integração com Google OAuth 2.0
- Configura redirect URI  
- Implementa validação de token
-  Adiciona tratamento de erros

Closes #123"

# 4️⃣ Enviar para remoto
git push -u origin idea/joao-implementacao-google-oauth
```

---

## 🚀 **Comandos Avançados**

### 💾 **Commit**

<details>
<summary>📝 <strong>git commit - Salvar alterações</strong></summary>

```bash
# 💬 Commit básico
git commit -m "feat: adiciona login OAuth"
# 🎯 Para que serve: Salva mudanças do staging area no repositório
# 💡 Exemplo: Finalizar uma funcionalidade ou correção

# 📖 Commit com descrição detalhada
git commit -m " feat: adiciona login OAuth" -m " Implementa autenticação via Google OAuth 2.0 com validação de token"
# 🎯 Para que serve: Commit com título e descrição separados
# 💡 Exemplo: Mudanças complexas que precisam de mais explicação

# ✏️ Alterar último commit
git commit --amend -m "nova mensagem"
# 🎯 Para que serve: Corrige mensagem ou adiciona arquivos ao último commit
# 💡 Exemplo: Esqueceu de incluir arquivo ou errou a mensagem

# 🎭 Commit vazio (útil para triggers CI/CD)
git commit --allow-empty -m " trigger: força deploy"
# 🎯 Para que serve: Cria commit sem mudanças para trigger automações
# 💡 Exemplo: Forçar build/deploy sem mudanças de código
```

</details>

### 📤 **Push**

<details>
<summary>🚀 <strong>git push - Enviar para repositório remoto</strong></summary>

```bash
# 📤 Push normal
git push origin branch-name
# 🎯 Para que serve: Envia commits locais para repositório remoto
# 💡 Exemplo: Compartilhar seu trabalho com a equipe

# 💪 Push forçado (cuidado!)
git push --force origin branch-name
# 🎯 Para que serve: Força envio, sobrescreve histórico remoto
# ⚠️ PERIGO: Pode apagar trabalho de outros desenvolvedores!

# 🛡️ Push forçado seguro
git push --force-with-lease origin branch-name
# 🎯 Para que serve: Push forçado mas verifica se não há novos commits
# 💡 Exemplo: Após rebase, enviar de forma mais segura

# 🌍 Push de todas as branches
git push --all origin
# 🎯 Para que serve: Envia todas as branches locais
# 💡 Exemplo: Sincronizar repositório completo

# 🏷️ Push com tags
git push --tags origin
# 🎯 Para que serve: Envia tags (versões) junto com commits
# 💡 Exemplo: Fazer release com versionamento
```

</details>

### 📥 **Pull**

<details>
<summary>📥 <strong>git pull - Baixar atualizações</strong></summary>

```bash
# 📥 Pull normal (fetch + merge)
git pull origin branch-name
# 🎯 Para que serve: Baixa e integra mudanças do repositório remoto
# 💡 Exemplo: Pegar atualizações da equipe

# 📏 Pull com rebase
git pull --rebase origin branch-name
# 🎯 Para que serve: Baixa mudanças e aplica seus commits por cima
# 💡 Exemplo: Manter histórico linear, sem commits de merge

# 🎯 Pull de branch específica
git pull origin develop:develop
# 🎯 Para que serve: Atualiza branch específica sem mudar branch atual
# 💡 Exemplo: Atualizar develop enquanto trabalha em feature

# 📡 Fetch apenas (não faz merge)
git fetch origin
git fetch --all
# 🎯 Para que serve: Baixa informações sem integrar mudanças
# 💡 Exemplo: Ver o que mudou antes de fazer merge
```

</details>

---

## 📋 **Boas Práticas**

### 🎯 **Convenções de Commit**

| 🏷️ **Tipo** | 📝 **Descrição** | 💡 **Exemplo** |
|-------------|------------------|----------------|
| ✨ **feat** | Nova funcionalidade | `feat: implementa login OAuth` |
| 🐛 **fix** | Correção de bug | `fix: corrige validação de CPF` |
| 📚 **docs** | Documentação | `docs: atualiza instruções` |
| 💄 **style** | Formatação | `style: ajusta espaçamento` |
| ♻️ **refactor** | Refatoração | `refactor: simplifica validação` |
| ✅ **test** | Testes | `test: adiciona testes auth` |
| 🔧 **chore** | Manutenção | `chore: atualiza React` |

### 🌿 **Nomenclatura de Branches**

```bash
# ✨ Features
feature/implementacao-oauth
feature/dashboard-analytics  
feature/sistema-notificacoes

# 💡 Ideas (júnior)
idea/joao-oauth-google
idea/maria-dashboard-charts
idea/pedro-push-notifications

# 🚨 Hotfix  
hotfix/corrige-memory-leak
hotfix/seguranca-xss

# 📦 Sprint/Release
sprint/v2.1.0
sprint/release-dezembro
```

---

## 🎯 **Resumo de Comandos por Cenário**

### 🌅 **Início do Trabalho Diário**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/minha-tarefa
```

### 👨‍💻 **Durante o Desenvolvimento**
```bash
git add .
git commit -m "feat: implementa funcionalidade X"
git push origin feature/minha-tarefa
```

### ✅ **Finalização da Feature**
```bash
git checkout develop
git pull origin develop
git checkout feature/minha-tarefa
git rebase develop
git push --force-with-lease origin feature/minha-tarefa
# 📋 Criar PR para develop
```

### 🚨 **Correção Urgente**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/corrige-bug-critico
# 👨‍💻 desenvolver correção
git add .
git commit -m " hotfix: corrige bug crítico"
git push origin hotfix/corrige-bug-critico
# 📋 Criar PR para main
```

---

## 🚀 **Comandos Avançados Detalhados**

### 🔀 **Merge**

<details>
<summary>🔀 <strong>git merge - Integrar branches</strong></summary>

**🎯 Para que serve:** Combina mudanças de uma branch com a branch atual.

```bash
# 🔀 Merge básico
git merge feature-branch
# 🎯 Para que serve: Integra mudanças da feature na branch atual
# 💡 Exemplo: Finalizar feature integrando na develop
# ✅ Resultado: Commits da feature aparecem na branch atual

# 🎯 Merge sem fast-forward (sempre cria commit de merge)
git merge --no-ff feature-branch
# 🎯 Para que serve: Sempre cria commit de merge, mesmo que desnecessário
# 💡 Exemplo: Manter histórico claro de quando features foram integradas
# ✅ Resultado: Commit de merge mesmo em histórico linear

# 🗜️ Merge com squash (todos commits viram um só)
git merge --squash feature-branch
# 🎯 Para que serve: Pega todas mudanças mas cria apenas 1 commit
# 💡 Exemplo: Feature com muitos commits pequenos, quer apenas 1
# ✅ Resultado: Todas mudanças ficam staged para 1 commit final

# ❌ Abortar merge em caso de conflitos
git merge --abort
# 🎯 Para que serve: Cancela merge e volta ao estado anterior
# 💡 Exemplo: Conflitos muito complexos, melhor resolver depois
# ✅ Resultado: Repositório volta ao estado antes do merge
```

**📋 Exemplo prático:**
```bash
# 🎬 Cenário: Integrar feature na develop
git checkout develop
git pull origin develop
git merge --no-ff feature/login-oauth
git push origin develop

# ✅ Histórico fica claro quando feature foi integrada
```

</details>

### 📏 **Rebase**

<details>
<summary>📏 <strong>git rebase - Reorganizar histórico</strong></summary>

**🎯 Para que serve:** Aplica commits de uma branch em cima de outra, mantendo histórico linear.

```bash
# 📏 Rebase básico
git rebase develop
# 🎯 Para que serve: Aplica seus commits em cima da develop atualizada
# 💡 Exemplo: Manter feature atualizada com develop
# ✅ Resultado: Seus commits ficam "em cima" dos commits de develop

# ✏️ Rebase interativo (para editar histórico)
git rebase -i HEAD~3
# 🎯 Para que serve: Editar, combinar ou reordenar últimos 3 commits
# 💡 Exemplo: Limpar histórico antes de fazer PR
# ✅ Resultado: Abre editor para escolher o que fazer com cada commit

# ➡️ Continuar rebase após resolver conflitos
git rebase --continue
# 🎯 Para que serve: Prosseguir após resolver conflitos manualmente
# 💡 Exemplo: Durante rebase teve conflito, resolveu, agora continua

# ❌ Abortar rebase
git rebase --abort
# 🎯 Para que serve: Cancela rebase e volta ao estado original
# 💡 Exemplo: Rebase muito complexo, melhor fazer merge

# 🎯 Rebase de uma branch específica
git rebase develop feature-branch
# 🎯 Para que serve: Aplica feature-branch em cima de develop
# 💡 Exemplo: Rebase sem mudar de branch atual
```

**🛠️ Opções do rebase interativo:**
```bash
# pick = usar commit como está
# reword = usar commit mas editar mensagem  
# edit = usar commit mas parar para alterar
# squash = combinar com commit anterior
# fixup = como squash mas descarta mensagem
# drop = remover commit completamente
```

**📋 Exemplo prático:**
```bash
# 🎬 Cenário: Limpar histórico antes do PR
git rebase -i HEAD~4

# 📝 Editor abre mostrando:
pick a1b2c3d feat: adiciona validação
pick e4f5g6h fix: corrige typo
pick h7i8j9k feat: adiciona testes  
pick l1m2n3o fix: corrige testes

# ✏️ Você edita para:
pick a1b2c3d feat: adiciona validação
fixup e4f5g6h fix: corrige typo          # 🗜️ Combina com anterior
pick h7i8j9k feat: adiciona testes
fixup l1m2n3o fix: corrige testes        # 🗜️ Combina com anterior

# ✅ Resultado: 4 commits viram 2 commits limpos
```

</details>

### 💾 **Stash**

<details>
<summary>💾 <strong>git stash - Salvar trabalho temporário</strong></summary>

**🎯 Para que serve:** Salva modificações temporariamente sem fazer commit, limpando working directory.

```bash
# 💾 Salvar modificações não commitadas
git stash
# 🎯 Para que serve: Salva mudanças atuais e limpa working directory
# 💡 Exemplo: Precisa trocar de branch mas não quer fazer commit
# ✅ Resultado: Working directory fica limpo, mudanças salvas

# 📝 Salvar com mensagem
git stash save "trabalho em progresso na feature X"
# 🎯 Para que serve: Stash com descrição para identificar depois
# 💡 Exemplo: Múltiplos stashes, quer identificar cada um
# ✅ Resultado: Stash nomeado para fácil identificação

# 📋 Listar stashes
git stash list
# 🎯 Para que serve: Ver todos os stashes salvos
# 💡 Exemplo: Verificar o que tem guardado temporariamente
# ✅ Resultado: Lista numerada com mensagens

# ⬆️ Aplicar último stash (e remover da lista)
git stash pop
# 🎯 Para que serve: Recupera último stash e remove da lista
# 💡 Exemplo: Voltar ao trabalho que estava fazendo
# ✅ Resultado: Mudanças voltam, stash é deletado

# 📁 Aplicar stash específico (mantém na lista)
git stash apply stash@{1}
# 🎯 Para que serve: Aplica stash específico mas mantém salvo
# 💡 Exemplo: Quer testar stash sem perdê-lo
# ✅ Resultado: Mudanças aplicadas, stash permanece

# 👀 Ver conteúdo do stash
git stash show -p stash@{0}
# 🎯 Para que serve: Mostra diferenças do stash sem aplicar
# 💡 Exemplo: Revisar o que tem no stash antes de aplicar

# 🗑️ Deletar stash específico
git stash drop stash@{1}
# 🎯 Para que serve: Remove stash específico da lista
# 💡 Exemplo: Stash não é mais necessário

# 🧹 Limpar todos os stashes
git stash clear
# 🎯 Para que serve: Remove todos os stashes salvos
# ⚠️ CUIDADO: Perde todo trabalho temporário salvo!
```

**📋 Exemplo prático:**
```bash
# 🎬 Cenário: Trabalhando em feature, precisa trocar para hotfix urgente
$ git status
modified:   src/feature.js
modified:   src/utils.js

# 💾 Salvar trabalho atual
$ git stash save "feature login - validação em progresso"

# 🚨 Trocar para hotfix
$ git checkout -b hotfix/bug-critico
# ... fazer correção urgente ...
$ git commit -m "🚨 fix: corrige bug crítico"

# 🔙 Voltar para feature
$ git checkout feature/login
$ git stash pop

# ✅ Trabalho recuperado, continuar desenvolvimento
```

</details>

### 🌿 **Branches**

<details>
<summary>🌿 <strong>git branch - Gerenciar branches</strong></summary>

**🎯 Para que serve:** Criar, listar, deletar e gerenciar branches do repositório.

```bash
# 📋 Listar branches locais
git branch
# 🎯 Para que serve: Mostra todas as branches locais
# 💡 Exemplo: Ver em qual branch está e quais existem
# ✅ Resultado: Lista com * na branch atual

# 🌍 Listar branches remotas
git branch -r
# 🎯 Para que serve: Mostra branches do repositório remoto
# 💡 Exemplo: Ver branches que outros criaram

# 🌐 Listar todas as branches (locais e remotas)
git branch -a
# 🎯 Para que serve: Visão completa de todas as branches
# 💡 Exemplo: Overview completo do projeto

# 🆕 Criar branch (sem trocar para ela)
git branch feature-nova
# 🎯 Para que serve: Cria nova branch baseada na atual
# 💡 Exemplo: Preparar branch mas continuar na atual

# 🆕➡️ Criar e trocar para branch
git checkout -b feature-nova
git switch -c feature-nova  # 🆕 Comando mais novo
# 🎯 Para que serve: Cria branch e já muda para ela
# 💡 Exemplo: Começar trabalho em nova feature

# ↔️ Trocar de branch
git checkout branch-name
git switch branch-name     # 🆕 Comando mais novo
# 🎯 Para que serve: Muda working directory para outra branch
# 💡 Exemplo: Alternar entre diferentes funcionalidades

# 🗑️ Deletar branch local (seguro)
git branch -d branch-name
# 🎯 Para que serve: Deleta branch que já foi merged
# 💡 Exemplo: Limpeza após feature ser integrada
# ✅ Git confirma se foi merged antes de deletar

# 💥 Deletar branch local (forçado)
git branch -D branch-name
# 🎯 Para que serve: Força deleção mesmo sem merge
# ⚠️ CUIDADO: Pode perder trabalho não integrado!

# 🌍🗑️ Deletar branch remota
git push origin --delete branch-name
# 🎯 Para que serve: Remove branch do repositório remoto
# 💡 Exemplo: Limpeza após PR ser aceito

# ✏️ Renomear branch atual
git branch -m novo-nome
# 🎯 Para que serve: Muda nome da branch atual
# 💡 Exemplo: Nome inicial não ficou bom
```

**📋 Exemplo prático de limpeza:**
```bash
# 🎬 Cenário: Feature foi integrada, fazer limpeza
$ git checkout develop
$ git pull origin develop

# 🗑️ Deletar branch local
$ git branch -d feature/login-oauth

# 🌍🗑️ Deletar branch remota  
$ git push origin --delete feature/login-oauth

# 🧹 Ver branches que podem ser limpas
$ git branch --merged | grep -v main | grep -v develop
```

</details>

---

## 🛠️ **Comandos de Manutenção e Limpeza**

### ↩️ **Reset Avançado**

<details>
<summary>↩️ <strong>git reset - Voltar no tempo</strong></summary>

```bash
# 🕊️ Reset soft (mantém mudanças no staging)
git reset --soft HEAD~1
# 🎯 Para que serve: Desfaz commit mas mantém arquivos staged
# 💡 Exemplo: Quer refazer mensagem do commit ou adicionar mais arquivos
# ✅ Resultado: Volta 1 commit, arquivos prontos para novo commit

# 🔄 Reset mixed (mantém mudanças no working directory)
git reset HEAD~1
# 🎯 Para que serve: Desfaz commit, arquivos voltam para "modified"
# 💡 Exemplo: Quer refazer commit completamente
# ✅ Resultado: Volta 1 commit, arquivos ficam modified

# 💥 Reset hard (perde todas as mudanças)
git reset --hard HEAD~1
# 🎯 Para que serve: Desfaz commit E descarta todas mudanças
# ⚠️ PERIGO: Perde trabalho permanentemente!
# 💡 Exemplo: Commit foi erro completo, quer voltar estado anterior

# 🎯 Reset para commit específico
git reset --hard a1b2c3d
# 🎯 Para que serve: Volta repositório para commit exato
# 💡 Exemplo: Voltar para versão estável conhecida
# ⚠️ PERIGO: Perde todos commits posteriores!
```

</details>

### 🍒 **Cherry-pick**

<details>
<summary>🍒 <strong>git cherry-pick - Aplicar commits específicos</strong></summary>

```bash
# 🍒 Aplicar commit específico na branch atual
git cherry-pick a1b2c3d
# 🎯 Para que serve: Copia apenas um commit para branch atual
# 💡 Exemplo: Pegar correção específica de outra branch
# ✅ Resultado: Commit é aplicado na branch atual

# 🍒🍒 Cherry-pick múltiplos commits
git cherry-pick a1b2c3d e4f5g6h h7i8j9k
# 🎯 Para que serve: Aplica vários commits específicos
# 💡 Exemplo: Pegar algumas correções de develop

# 📏 Cherry-pick range de commits
git cherry-pick a1b2c3d^..e4f5g6h
# 🎯 Para que serve: Aplica sequência de commits
# 💡 Exemplo: Pegar feature completa de outra branch
```

**📋 Exemplo prático:**
```bash
# 🎬 Cenário: Hotfix precisa ir para develop também
$ git checkout develop
$ git cherry-pick abc123d  # 🍒 Commit do hotfix
$ git push origin develop

# ✅ Correção aplicada em ambas branches
```

</details>

### 🏷️ **Tags**

<details>
<summary>🏷️ <strong>git tag - Marcar versões</strong></summary>

```bash
# 🏷️ Criar tag simples
git tag v1.0.0
# 🎯 Para que serve: Marca ponto específico no histórico
# 💡 Exemplo: Marcar release de produção
# ✅ Resultado: Tag criada no commit atual

# 📝 Criar tag anotada (com mensagem)
git tag -a v1.0.0 -m "🚀 Versão 1.0.0 - Release inicial"
# 🎯 Para que serve: Tag com informações adicionais
# 💡 Exemplo: Release com changelog e descrição
# ✅ Resultado: Tag com metadata completo

# 📋 Listar todas as tags
git tag
# 🎯 Para que serve: Ver todas as versões marcadas
# 💡 Exemplo: Verificar histórico de releases

# 🏷️📤 Push tags para remoto
git push --tags origin
# 🎯 Para que serve: Envia tags para repositório remoto
# 💡 Exemplo: Compartilhar versões com equipe

# 🗑️ Deletar tag local
git tag -d v1.0.0
# 🎯 Para que serve: Remove tag do repositório local
# 💡 Exemplo: Tag criada com erro

# 🌍🗑️ Deletar tag remota
git push origin --delete v1.0.0
# 🎯 Para que serve: Remove tag do repositório remoto
# 💡 Exemplo: Versão teve problema, cancelar release
```

</details>

---

## 🔥 **Resolução de Conflitos**

### 🤝 **Durante Merge**

<details>
<summary>🔀 <strong>Resolver conflitos no merge</strong></summary>

```bash
# 1️⃣ Tentativa de merge que gera conflito
git merge feature-branch
# ❌ Auto-merging file.txt
# ❌ CONFLICT (content): Merge conflict in file.txt  
# ❌ Automatic merge failed; fix conflicts and then commit the result.

# 2️⃣ Ver arquivos em conflito
git status
# 📋 Mostra arquivos com conflitos

# 3️⃣ Abrir arquivo e resolver conflitos manualmente
# 👀 Procurar por marcadores no código:
```

**📝 Formato dos conflitos:**
```diff
function authenticate(user) {
<<<<<<< HEAD
  // 🔵 Código da branch atual (HEAD)
  return validateUser(user) && checkPermissions(user);
=======
  // 🔴 Código da branch sendo merged
  return validateCredentials(user) && hasAccess(user);
>>>>>>> feature-branch
}
```

**✅ Após resolver:**
```bash
# 4️⃣ Adicionar arquivos resolvidos
git add file.txt

# 5️⃣ Finalizar merge
git commit -m "🔀 resolve conflitos entre develop e feature-branch"
```

</details>

### 📏 **Durante Rebase**

<details>
<summary>📏 <strong>Resolver conflitos no rebase</strong></summary>

```bash
# 1️⃣ Iniciar rebase que gera conflito
git rebase develop
# ❌ CONFLICT (content): Merge conflict in file.txt

# 2️⃣ Resolver conflitos (mesmo processo do merge)
# ... editar arquivos ...

# 3️⃣ Adicionar arquivos resolvidos
git add file.txt

# 4️⃣ Continuar rebase
git rebase --continue

# ❌ Ou abortar se necessário
git rebase --abort
```

</details>

### 🛠️ **Ferramentas de Merge Visual**

```bash
# 🎨 Configurar ferramenta de merge visual
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# 🖥️ Usar ferramenta de merge
git mergetool
```

---

## 🚨 **Comandos de Emergência**

### 🔄 **Recuperar Trabalho Perdido**

<details>
<summary>🔍 <strong>git reflog - Histórico de ações</strong></summary>

```bash
# 📚 Ver histórico do HEAD (últimas ações)
git reflog
# 🎯 Para que serve: Mostra todas as mudanças do HEAD
# 💡 Exemplo: Recuperar commits "perdidos" após reset
# ✅ Resultado: Lista cronológica de todas as ações

# 🔄 Recuperar commit perdido
git checkout a1b2c3d
git checkout -b recuperacao-trabalho
# 🎯 Para que serve: Volta para commit específico do reflog
# 💡 Exemplo: Reset --hard apagou trabalho importante

# 🌿 Recuperar branch deletada
git checkout -b branch-recuperada a1b2c3d
# 🎯 Para que serve: Recria branch a partir de commit do reflog
# 💡 Exemplo: Deletou branch por engano
```

</details>

### ↩️ **Desfazer Mudanças**

<details>
<summary>↩️ <strong>Desfazer diferentes tipos de mudanças</strong></summary>

```bash
# 📄 Desfazer modificações não commitadas (arquivo específico)
git checkout -- arquivo.txt
# 🎯 Para que serve: Volta arquivo ao estado do último commit
# 💡 Exemplo: Modificação foi um erro, quer versão original

# 🌍 Desfazer todas modificações não commitadas
git checkout .
# 🎯 Para que serve: Volta todos arquivos ao último commit
# ⚠️ CUIDADO: Perde todo trabalho não commitado!

# ↩️ Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1
# 🎯 Para que serve: Desfaz commit mas mantém arquivos para novo commit
# 💡 Exemplo: Esqueceu de incluir arquivo no commit

# 💥 Desfazer último commit (perde mudanças)
git reset --hard HEAD~1
# ⚠️ PERIGO: Perde trabalho permanentemente!

# 🔄 Reverter commit específico (cria novo commit)
git revert a1b2c3d
# 🎯 Para que serve: Cria commit que desfaz outro commit
# 💡 Exemplo: Commit já foi compartilhado, não pode usar reset
# ✅ Resultado: Histórico preservado, mudanças desfeitas
```

</details>

---

## 🎮 **Comandos Rápidos por Situação**

### 🌅 **Começar o Dia**
```bash
git checkout develop && git pull origin develop
```

### 🚀 **Nova Feature**
```bash
git checkout -b feature/minha-funcionalidade
```

### 💾 **Salvar Progresso**
```bash
git add . && git commit -m "✨ feat: implementa X"
```

### 🔄 **Atualizar Feature**
```bash
git checkout develop && git pull origin develop && git checkout - && git rebase develop
```

### 🚨 **Urgência - Salvar e Trocar**
```bash
git stash save "trabalho em progresso" && git checkout main
```

### 🔙 **Voltar ao Trabalho**
```bash
git checkout feature/minha-funcionalidade && git stash pop
```

### 🧹 **Limpeza Pós-Merge**
```bash
git branch -d feature/funcionalidade-integrada
git push origin --delete feature/funcionalidade-integrada
```

---

## 🎯 **Template de Pull Request**

```markdown
## 📋 **Descrição**
Breve descrição do que foi implementado/corrigido.

## 🔧 **Mudanças Principais**
- [ ] ✨ Implementação da feature X
- [ ] 🐛 Correção do bug Y  
- [ ] 📚 Atualização da documentação
- [ ] 🧪 Adição de testes

## 🧪 **Testes**
- [ ] ✅ Testes unitários passando
- [ ] ✅ Testes de integração passando  
- [ ] 👀 Testado manualmente
- [ ] 📱 Testado em diferentes dispositivos/browsers

## 📸 **Screenshots/Demos**
(Adicionar imagens se houver mudanças visuais)

## ⚠️ **Breaking Changes**
- [ ] ✅ Não há breaking changes
- [ ] 📋 Breaking changes documentados abaixo:

## 🔗 **Issues Relacionadas**
Closes #123
Fixes #456
Related to #789

## 📝 **Notas Adicionais**
Qualquer informação extra para os revisores.
```

