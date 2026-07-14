# GitHub Wrapped

Retrospectiva ao estilo Spotify Wrapped para perfis do GitHub. O usuário digita um username, e a aplicação monta um slideshow com repositórios, estrelas, linguagens favoritas e um card final para baixar como imagem.

## Stack

- **client** — React (Vite), Tailwind CSS, shadcn/ui, Framer Motion
- **server** — Node.js, Express, Axios, node-cache

## Rodando localmente

Requer Node.js 20+.

```bash
# backend
cd server
npm install
cp .env.example .env   # GITHUB_TOKEN é opcional, mas aumenta o rate limit
npm run dev             # http://localhost:3001

# frontend, em outro terminal
cd client
npm install
npm run dev              # http://localhost:5173
```

O Vite faz proxy de `/api` para o backend, então basta abrir `http://localhost:5173`.

## API

| Rota | Descrição |
| --- | --- |
| `GET /api/wrapped/:username` | Agrega perfil, total de stars, top 5 linguagens, repositório em destaque e seguidores |
| `GET /api/health` | Health check |

Códigos de erro: `400` username inválido, `404` usuário inexistente, `429` rate limit do GitHub excedido, `500` erro inesperado.

As respostas são cacheadas em memória por 10 minutos por username, para não estourar o rate limit da API do GitHub. Sem token, o limite é 60 requisições/hora; com um `GITHUB_TOKEN` (sem escopos, só para dados públicos) sobe para 5000/hora.

## Deploy

- **client** (Vercel): apontar para o diretório `client/`. Definir `VITE_API_URL` com a URL pública do backend.
- **server** (Render/Railway): apontar para `server/`, comando de start `npm start`. Definir `GITHUB_TOKEN` e usar a porta fornecida via `PORT`.

## Roadmap

- Gráfico de commits por mês
- Comparação entre dois usuários
- Animação no card final
