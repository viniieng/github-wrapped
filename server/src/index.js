import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`GitHub Wrapped API running at http://localhost:${PORT}`);
  console.log(
    process.env.GITHUB_TOKEN
      ? 'GitHub token detected (5000 req/hour)'
      : 'No GITHUB_TOKEN set (60 req/hour) — see server/.env.example',
  );
});
