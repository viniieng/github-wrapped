# GitHub Wrapped

A Spotify Wrapped-style retrospective for GitHub profiles. Enter a username, get a slideshow of stats — top repos, total stars, favorite languages, most-starred repo — ending in a shareable card you can download as an image.

## Stack

- **client** — React (Vite), Tailwind CSS, shadcn/ui, Framer Motion
- **server** — Node.js, Express, Axios, node-cache

## Running locally

Requires Node.js 20+.

```bash
# backend
cd server
npm install
cp .env.example .env   # GITHUB_TOKEN is optional but raises the rate limit
npm run dev             # http://localhost:3001

# frontend, in a separate terminal
cd client
npm install
npm run dev              # http://localhost:5173
```

Vite proxies `/api` to the backend, so just open `http://localhost:5173`.

## API

| Route | Description |
| --- | --- |
| `GET /api/wrapped/:username` | Aggregates profile, total stars, top 5 languages, most-starred repo, follower count |
| `GET /api/health` | Health check |

Error codes: `400` invalid username, `404` user not found, `429` GitHub rate limit exceeded, `500` unexpected error.

Responses are cached in memory for 10 minutes per username to conserve the GitHub API rate limit. Unauthenticated requests are capped at 60/hour; a `GITHUB_TOKEN` (no scopes needed, public data only) raises that to 5000/hour.

## Deployment

The whole app deploys as a single Vercel project: the client builds to a static site, and the Express API runs as a serverless function.

```
/                 → static build (client/dist)
/api/*            → api/index.js, which wraps the Express app in server/src/app.js
```

`server/src/app.js` exports the Express app with no `listen()` call, so the same code runs locally (via `server/src/index.js`) and as a Vercel function (via `api/index.js`). `vercel.json` at the repo root wires the build and rewrites `/api/*` to that function.

To deploy: import the repo in Vercel with the default root directory, and set `GITHUB_TOKEN` as an environment variable (recommended in production to avoid the 60 req/hour cap). No other configuration is needed — `VITE_API_URL` can stay unset since the client and API share the same domain.

One tradeoff worth knowing: the in-memory response cache lives per function instance, not globally, so on Vercel it's best-effort rather than a guaranteed 10-minute cache across all requests.

## Roadmap

- Monthly commit activity chart
- Side-by-side comparison between two users
- Animation on the final card
