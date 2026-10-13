# Tutorial 4 — CRUD com Routes, Controllers e Repositories

Projeto didático do Senac RJ com Node.js, Express, MySQL e Docker.

## Requisitos
- Node.js 20.6 ou superior
- Docker Desktop aberto

## 1. Configurar
Copie `.env.example` para `.env` se ainda não existir:
```powershell
Copy-Item .env.example .env
```
Configure `.env` com as credenciais do banco:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3307
DB_USER=api_user
DB_PASSWORD=api123
DB_NAME=api_rest
```
Não publique `.env` no GitHub.

## 2. Iniciar o banco e criar a tabela
```powershell
docker compose up -d
docker exec -it mysql-api-rest mysql -u root -p
```
Digite a senha `root123` e, dentro do MySQL, execute:
```sql
USE api_rest;
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  curso VARCHAR(100) NOT NULL
);
exit;
```

## 3. Instalar e iniciar a API
```powershell
npm.cmd install
npm.cmd run dev
```
Abra http://localhost:3000.

## 4. Endpoints CRUD
- `GET /alunos` — lista alunos
- `GET /alunos/:id` — busca por ID
- `POST /alunos` — cadastra aluno
- `PUT /alunos/:id` — atualiza aluno
- `DELETE /alunos/:id` — exclui aluno

Para POST e PUT, envie JSON:
```json
{
  "nome": "Pedro",
  "curso": "ADS"
}
```

## Estrutura
```text
src/
├── controllers/AlunoController.js
├── database/pool.js
├── repositories/AlunoRepository.js
├── routes/alunos.routes.js
├── app.js
└── server.js
```
