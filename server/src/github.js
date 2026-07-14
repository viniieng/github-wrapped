import 'dotenv/config';
import axios from 'axios';

const MAX_REPO_PAGES = 3; // até 300 repositórios por usuário, para não estourar o rate limit

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
});

async function fetchAllRepos(username) {
  const repos = [];
  for (let page = 1; page <= MAX_REPO_PAGES; page++) {
    const { data } = await api.get(`/users/${username}/repos`, {
      params: { per_page: 100, page, type: 'owner', sort: 'pushed' },
    });
    repos.push(...data);
    if (data.length < 100) break;
  }
  return repos;
}

export async function buildWrapped(username) {
  const [{ data: user }, repos] = await Promise.all([
    api.get(`/users/${username}`),
    fetchAllRepos(username),
  ]);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Linguagens contadas apenas em repos próprios (forks distorcem o resultado)
  const languageCount = {};
  for (const repo of repos) {
    if (!repo.fork && repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] ?? 0) + 1;
    }
  }
  const languagesTotal = Object.values(languageCount).reduce((a, b) => a + b, 0);
  const languages = Object.entries(languageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / languagesTotal) * 100),
    }));

  const topRepo =
    [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0] ?? null;

  return {
    year: new Date().getFullYear(),
    user: {
      login: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      createdAt: user.created_at,
      since: new Date(user.created_at).getFullYear(),
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      profileUrl: user.html_url,
    },
    stats: {
      totalStars,
      totalForks,
      topLanguage: languages[0]?.name ?? null,
      languages,
      topRepo: topRepo && {
        name: topRepo.name,
        description: topRepo.description,
        stars: topRepo.stargazers_count,
        forks: topRepo.forks_count,
        language: topRepo.language,
        url: topRepo.html_url,
      },
    },
    generatedAt: new Date().toISOString(),
  };
}
