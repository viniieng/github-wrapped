# 🎁 GitHub Wrapped

Sua retrospectiva do GitHub no estilo **Spotify Wrapped**: digite um username e veja um slideshow de cards com repositórios, estrelas, linguagens favoritas, repositório destaque e mais — com um card final compartilhável para baixar como imagem.

## Estrutura

```
github-wrapped/
├── client/   # Frontend — React (Vite) + Tailwind CSS + shadcn/ui + Framer Motion
└── server/   # Backend — Node.js + Express + Axios + node-cache
```

## Como rodar

Pré-requisito: Node.js 20+.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # opcional: adicione um GITHUB_TOKEN para 5000 req/hora
npm run dev            # http://localhost:3001
```

### 2. Frontend

```bash
cd client
npm install
npm run dev            # http://localhost:5173 (proxy de /api para o backend)
```

Abra http://localhost:5173, digite um username do GitHub e navegue pelos cards com as setas, teclado (← →) ou arrastando (swipe no mobile).

## API

| Rota | Descrição |
| --- | --- |
| `GET /api/wrapped/:username` | JSON agregado com perfil, total de stars, top 5 linguagens, repositório com mais stars, seguidores etc. |
| `GET /api/health` | Health check |

Erros tratados: `400` username inválido · `404` usuário não encontrado · `429` rate limit da API do GitHub excedido · `500` erro inesperado.

O backend usa cache em memória (10 min por username) para economizar o rate limit. Com `GITHUB_TOKEN` no `.env` (sem nenhum escopo), o limite sobe de 60 para 5000 req/hora.

## Deploy

- **Frontend (Vercel):** aponte o projeto para `client/`. Defina `VITE_API_URL` com a URL pública do backend.
- **Backend (Render/Railway):** aponte para `server/`, comando `npm start`. Defina `GITHUB_TOKEN` (recomendado em produção) e use a porta fornecida via `PORT`.

## Ideias futuras

- Gráfico de commits por mês (API de eventos do GitHub)
- Comparação entre dois usuários lado a lado
- Animação de confete no card final
