/**
 * Synchronise les métadonnées des dépôts publics GitHub au moment du build.
 *
 *   npm run sync:github          → échoue bruyamment en cas d'erreur
 *   node scripts/sync-github.mjs --soft  (lancé par `prebuild`)
 *                                → en cas d'erreur réseau, garde le fichier existant
 *
 * Résultat : src/data/github.generated.json (à commiter, pour que le site reste
 * consultable même si l'API GitHub est indisponible).
 *
 * Variable optionnelle : GITHUB_TOKEN (côté build uniquement, jamais préfixée VITE_).
 * Le contenu éditorial (descriptions, stack vérifiée, captures…) vit dans src/data/projects.ts.
 */
import { readFile, writeFile } from 'node:fs/promises';

const OWNER = 'khaledopen';
const OUT = new URL('../src/data/github.generated.json', import.meta.url);
const soft = process.argv.includes('--soft');

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${OWNER}-portfolio-sync`,
  'X-GitHub-Api-Version': '2022-11-28'
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function fetchAllRepos() {
  const repos = [];
  for (let page = 1; page < 20; page += 1) {
    const res = await fetch(`https://api.github.com/users/${OWNER}/repos?per_page=100&page=${page}&type=owner`, {
      headers,
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function main() {
  const raw = await fetchAllRepos();
  const repos = raw
    .map(r => ({
      name: r.name,
      url: r.html_url,
      createdAt: r.created_at,
      pushedAt: r.pushed_at,
      fork: r.fork,
      empty: r.size === 0,
      description: r.description,
      homepage: r.homepage || null,
      language: r.language
    }))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const data = {
    source: 'github-api',
    note: 'Généré par scripts/sync-github.mjs depuis l’API GitHub (created_at réel).',
    generatedAt: new Date().toISOString(),
    owner: OWNER,
    repos
  };
  await writeFile(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`✓ ${repos.length} dépôts synchronisés → src/data/github.generated.json`);
}

main().catch(async error => {
  if (!soft) {
    console.error('✗ Synchronisation GitHub impossible :', error.message);
    process.exit(1);
  }
  try {
    const existing = JSON.parse(await readFile(OUT, 'utf8'));
    console.warn(`⚠ Synchronisation GitHub ignorée (${error.message}). Données conservées du ${existing.generatedAt}.`);
  } catch {
    console.error('✗ Aucune donnée GitHub disponible et synchronisation impossible.');
    process.exit(1);
  }
});
