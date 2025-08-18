# user-post-comment-system

## Descrição

API Node.js com autenticação JWT, CRUD de usuários, posts e comentários, usando Express, Sequelize e PostgreSQL.

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- (Opcional) Docker e Docker Compose

## Instalação

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/gabrielheifel/user-post-comment-system.git
   cd user-post-comment-system
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Configure o banco de dados:**

   - Crie um banco PostgreSQL local.
   - Copie o arquivo `.env.example` para `.env` e preencha com seus dados:
     ```env
     DB_NAME=seu_banco
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_HOST=localhost
     DB_PORT=5432
     JWT_SECRET=sua_chave_secreta
     ```

4. **Configure o Sequelize CLI (opcional):**
   - Ajuste o arquivo `src/config/config.json` conforme seu ambiente.
   - Rode as migrations:
     ```sh
     npx sequelize-cli db:migrate
     ```

## Rodando o projeto em dev

```sh
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## Principais rotas

- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login (retorna JWT)
- `POST /posts` — Criar post (autenticado)
- `GET /posts` — Listar posts
- `PUT /posts/:id` — Atualizar post (autenticado e dono)
- `DELETE /posts/:id` — Deletar post (autenticado e dono)
- `POST /comments` — Criar comentário (autenticado)
- `GET /comments/:postId` — Listar comentários de um post
- `DELETE /comments/:comentsId` — Deleta comentário de um post

## Observações

- Use o token JWT no header: `Authorization: Bearer <token>`
- O projeto segue o padrão CommonJS (`require/module.exports`).

# backend-jr-smartnx
