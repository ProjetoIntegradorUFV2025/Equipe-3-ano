#UFV #PI 
# Descrição do ambiente:

>[!info] O ambiente consiste em uma aplicação web que utiliza tecnologias:
>- **Docker**
>	- *Padronização do ambiente de desenvolvimento*
>- **Spring boot**
>	- *Back-end*
>- **React+Vite+Tailwind**
>	- *Front-end*
>- **MySQL**
>	- *Banco de dados relacional*

>Ademais, a proposta é obedecer o padrão arquitetural MVC e boas práticas usuais em projetos dessa natureza. Por fim, a codificação deve obedecer os padrões definidos pelos papéis ligados ao processo.

>[!hint] O ciclo de desenvolvimento será igual a como se tudo estivesse instalado na máquina local
# Utilização do ambiente:
>Para facilitar o uso dessas tecnologias ao longo dos estágios de desenvolvimento foi elaborado um *Makefile* com os comandos para preparação, verificação e execução do ambiente

>[!important] Comandos mais importantes:
>- make up:
>	- Inicia o compose -> substituto para <span style="color:rgb(0, 176, 240)">docker compose up</span> 
>- make down:
>	- "Desliga" o compose e preserva os mounts (itens a serem persistidos dentro do container nesse caso) -> substituto para <span style="color:rgb(0, 176, 240)">docker compose down</span> 
>- make tailwind-install:
>	- Instala o tailwind no front-end -> substituto para <span style="color:rgb(0, 176, 240)">docker compose run --rm frontend npm install -D tailwindcss postcss autoprefixer</span>
>- make npm-list:
>	- Confere os node modules do container frontend -> substituto para <span style="color:rgb(0, 176, 240)">docker compose exec -it frontend npm list</span> 
>- make spring-boot-run:
>	- Executa o back-end -> substituto para <span style="color:rgb(0, 176, 240)">docker compose exec -it backend mvn spring-boot:run</span> 
>- make maven-dependencies-list:
>	- Exibe as dependências do back-end em formato de lista -> substituto para <span style="color:rgb(0, 176, 240)">docker compose exec -it backend mvn dependency:list</span>
>- make maven-dependencies-tree
>	- Similar ao make maven-dependencies-list, mas em formato de árvore -> substituto para <span style="color:rgb(0, 176, 240)">docker compose exec -it mvn dependency:tree</span> 

>[!hint] Dúvidas ou adição de novos comandos, avise o arquiteto!
## Comandos úteis fora do Makefile:
>[!info] Caso queira apagar os dados persistidos dentro do container, use <span style="color:rgb(0, 176, 240)">docker compose down -v</span>
>Será necessário iniciar o compose novamente e reinstalar as dependências dos containers

>[!info] Para acessar ao banco, use: <span style="color:rgb(0, 176, 240)">docker run --rm mysql:8.1 -h host:3306 -u desconecta -p</span>
>Use o endereço (host) e a senha (quando solicitado) listadas no .env
>**Obrigatório usar rede da faculdade ou VPN**



