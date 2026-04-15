# Sistema de Gerenciamento de Ativos de TI (UNICEPLAC)

Este projeto foi desenvolvido como parte do teste técnico para a vaga de Desenvolvedor Full-Stack. O sistema consiste em uma plataforma para gerenciamento de equipamentos de TI, permitindo o controle completo de inventário com persistência em banco de dados real.

## Tecnologias Utilizadas

- **Frontend:** React (Vite), React Router Dom, Axios.
- **Backend:** Node.js (Express).
- **Banco de Dados:** PostgreSQL.
- **Infraestrutura:** Docker e Docker Compose.

## Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

## Como executar o projeto localmente

Antes de tudo, após ter clonado o repositório, certifiques-se que seu terminal se encontra na raiz do projeto.
```bash
pwd
```

O primeiro diretório retornado pelo comando `pwd` deveria ser o do projeto (ex: `OUTROS/DIRETORIOS/ativos-ti-teste-tecnico`)

### 1. Iniciar o Banco de Dados (Docker)
Na raiz do projeto, execute o comando para subir o container do banco:
```bash
docker-compose up -d
```

### 2. Configurar o Backend
Abra um terminal e navegue até a pasta do servidor:
```bash
cd backend
```

Após isso, instale as dependências com:
```bash
npm install
```

#### 2.1 Variáveis de Ambiente:
O sistema utiliza um arquivo `.env` para a conexão. Existe um arquivo de exemplo chamado `.env.example`. Para configurar, execute:
```bash
cp .env.example .env
```

> [!NOTE] 
> Certifique-se de que a `DATABASE_URL` no arquivo `.env` coincide com as credenciais definidas no seu `docker-compose.yml`.

#### 2.2 Inicializando o banco de dados
Executa o script para criar as tabelas necessárias
```bash
node src/init-db.js
```

#### 2.3 Iniciar o servidor
Execute no diretório `backend`:
```bash
node src/server.js
```

### 3. Configurar o Frontend
Abra um **novo terminal**, navegue até a pasta do cliente:
```bash
cd frontend
```

Após isso, instale as dependências com:
```bash
npm install
```

Depois inicialize a interface executando:
```bash
npm run dev
```

Acesse o link exibido no terminal (ex: http://localhost:5173/) e teste o programa.

## Diferenciais

- CRUD Completo: Cadastro, listagem, edição e exclusão de equipamentos.

- Filtros Inteligentes: Busca combinada em tempo real por ID, Nome, Tipo e Status.

- Interface Visual: Uso de Badges coloridos para identificar o estado do equipamento (Ativo/Manutenção).

- Persistência Real: Integração com PostgreSQL via Docker.

- Responsividade: Layout adaptável para dispositivos móveis e desktop.

- Clean Code: Organização de pastas seguindo separação de responsabilidades.