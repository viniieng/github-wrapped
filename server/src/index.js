import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import { buildWrapped } from './github.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Cache em memória (10 min) para não estourar o rate limit da API do GitHub
const cache = new NodeCache({ stdTTL: 60 * 10 });

app.use(cors());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/wrapped/:username', async (req, res) => {
  const username = req.params.username.trim().toLowerCase();

  // Regra de usernames válidos do GitHub: alfanumérico e hífens, máx. 39 chars
  if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/.test(username)) {
    return res.status(400).json({ error: 'Username inválido.' });
  }

  const cached = cache.get(username);
  if (cached) return res.json(cached);

  try {
    const wrapped = await buildWrapped(username);
    cache.set(username, wrapped);
    res.json(wrapped);
  } catch (err) {
    const status = err.response?.status;
    const remaining = err.response?.headers?.['x-ratelimit-remaining'];

    if (status === 404) {
      return res.status(404).json({
        error: `Usuário "${req.params.username}" não encontrado no GitHub.`,
      });
    }
    if (status === 429 || (status === 403 && remaining === '0')) {
      const reset = Number(err.response.headers['x-ratelimit-reset']) * 1000;
      return res.status(429).json({
        error: 'Rate limit da API do GitHub excedido. Tente novamente em alguns minutos.',
        resetAt: reset ? new Date(reset).toISOString() : undefined,
      });
    }

    console.error('Erro ao gerar wrapped:', err.message);
    res.status(500).json({ error: 'Erro inesperado ao buscar dados do GitHub.' });
  }
});

app.listen(PORT, () => {
  console.log(`✨ GitHub Wrapped API rodando em http://localhost:${PORT}`);
  console.log(
    process.env.GITHUB_TOKEN
      ? '🔑 Token do GitHub configurado (5000 req/hora)'
      : '⚠️  Sem GITHUB_TOKEN (limite de 60 req/hora) — veja server/.env.example',
  );
});
