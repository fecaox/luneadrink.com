import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const article = await readFile(new URL("./blog-curcuma-cycle.html", import.meta.url), "utf8");
const sitemap = await readFile(new URL("./sitemap.xml", import.meta.url), "utf8");

const title = article.match(/<title>([^<]+)<\/title>/)?.[1];
const description = article.match(/<meta name="description" content="([^"]+)">/)?.[1];
const openGraphTitle = article.match(/<meta property="og:title" content="([^"]+)">/)?.[1];
const openGraphDescription = article.match(/<meta property="og:description" content="([^"]+)">/)?.[1];
const twitterTitle = article.match(/<meta name="twitter:title" content="([^"]+)">/)?.[1];
const twitterDescription = article.match(/<meta name="twitter:description" content="([^"]+)">/)?.[1];
const structuredData = JSON.parse(article.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const sitemapEntry = sitemap.match(/<url>\s*<loc>https:\/\/luneadrink\.com\/blog-curcuma-cycle\.html<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/)?.[1];

test("l’extrait de recherche cible curcuma et règles avec des métadonnées cohérentes", () => {
  assert.match(title, /^Curcuma et règles/);
  assert.ok(title.length <= 65);
  assert.match(description, /confort menstruel/i);
  assert.match(description, /précautions/i);
  assert.ok(description.length <= 160);
  assert.equal(openGraphTitle, title);
  assert.equal(twitterTitle, title);
  assert.equal(openGraphDescription, description);
  assert.equal(twitterDescription, description);
  assert.equal(structuredData.headline, title);
  assert.equal(structuredData.description, description);
});

test("la date de modification publique correspond au sitemap", () => {
  assert.equal(structuredData.dateModified, "2026-10-16");
  assert.equal(sitemapEntry, structuredData.dateModified);
  assert.match(article, /Mis à jour le 16 octobre 2026/);
});

test("Google Analytics reste bloqué tant que le visiteur n’a pas consenti", async () => {
  const script = await readFile(new URL("./script.js", import.meta.url), "utf8");
  assert.match(script, /G-WWYLD1FE4S/);
  assert.match(script, /analytics_storage/);
  assert.match(script, /googletagmanager\.com\/gtag\/js/);
  assert.match(script, /localStorage/);
  assert.match(script, /Gérer les cookies/);
});
