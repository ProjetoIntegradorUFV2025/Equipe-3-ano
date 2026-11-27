# 🚀 Deploy gratuito do (Des)conecta

Arquitetura:

| Parte | Serviço (grátis) | O que roda |
|---|---|---|
| Frontend | **Vercel** | build do Vite (`desconecta/frontend`) |
| Backend | **Render** (Docker) | Spring Boot (`desconecta/Dockerfile.render`) |
| Banco | **Aiven for MySQL** (plano Free) | MySQL com os dados copiados do banco atual |

> O Render gratuito "dorme" após ~15 min sem acesso: a 1ª requisição depois disso leva 30–60 s.

---

## 1) Banco de dados (Aiven)

1. Crie conta em https://aiven.io → **Create service** → **MySQL** → plano **Free**.
2. Quando estiver "Running", copie da aba *Overview*: **Host**, **Port**, **User** (`avnadmin`), **Password**.
3. Copie os dados do banco atual para o novo (precisa só do Docker):

```bash
# Exporta o banco atual (HOST_ATUAL/USUARIO_ATUAL = os do seu .env; vai pedir a senha)
docker run --rm -i mysql:8.0 mysqldump -h HOST_ATUAL -u USUARIO_ATUAL -p \
  --single-transaction --routines --triggers --set-gtid-purged=OFF --no-tablespaces \
  desconecta > desconecta.sql

# Cria o banco e importa no Aiven (troque HOST/PORTA; vai pedir a senha do Aiven)
docker run --rm -i mysql:8.0 mysql -h HOST -P PORTA -u avnadmin -p --ssl-mode=REQUIRED \
  -e "CREATE DATABASE IF NOT EXISTS desconecta"
docker run --rm -i mysql:8.0 mysql -h HOST -P PORTA -u avnadmin -p --ssl-mode=REQUIRED \
  desconecta < desconecta.sql
```

> ⚠️ Não faça commit do `desconecta.sql` (contém dados dos alunos). Apague após importar.

## 2) Backend (Render)

1. Faça push deste código para o GitHub.
2. Em https://render.com → **New** → **Blueprint** → escolha o repositório. O arquivo `render.yaml` (na raiz) já configura tudo.
3. Preencha as variáveis pedidas:
   - `SPRING_DATASOURCE_URL` = `jdbc:mysql://HOST:PORTA/desconecta?sslMode=REQUIRED&serverTimezone=UTC`
   - `SPRING_DATASOURCE_USERNAME` = `avnadmin`
   - `SPRING_DATASOURCE_PASSWORD` = senha do Aiven
4. Ao terminar, anote a URL (ex.: `https://desconecta.onrender.com`).
   Teste: `https://desconecta.onrender.com/api/classificacao/classificacaoGeral` deve devolver JSON.

## 3) Frontend (Vercel)

```bash
vercel login                     # uma vez
cd desconecta/frontend
vercel link                      # cria/vincula o projeto
vercel env add VITE_API_URL production   # cole a URL do Render, SEM barra no final
vercel deploy --prod
```

Ou pelo painel: **Add New → Project** → repositório → **Root Directory** = `desconecta/frontend` → variável `VITE_API_URL` = URL do Render → Deploy.

> Sempre que mudar `VITE_API_URL`, refaça o deploy (a variável entra no build).

---

## Desenvolvimento local

Nada muda: sem `VITE_API_URL`, o frontend usa `http://localhost:8080` (veja `frontend/src/config/api.js`).

Testar a imagem de produção localmente:

```bash
cd desconecta
docker build -f Dockerfile.render -t desconecta .
docker run --rm -p 8080:8080 --env-file .env desconecta
```
