import { writeFileSync } from 'fs';
import { join } from 'path';
import { NAVIGATION } from '../src/app/navigation.manifest';

interface Route {
  url: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
}

const baseUrl = 'https://devmastery.com';

function collectUrls(slug: string, priority: number, changefreq: Route['changefreq'], urls: Route[]) {
  urls.push({ url: slug, priority, changefreq });
}

function flattenNav(items: typeof NAVIGATION, urls: Route[] = [], priority = 0.8, changefreq: Route['changefreq'] = 'monthly'): Route[] {
  for (const item of items) {
    collectUrls(item.slug, priority, changefreq, urls);
    if (item.children?.length) {
      flattenNav(item.children, urls, 0.8, changefreq);
    }
  }
  return urls;
}

function dedupeByUrl(routes: Route[]): Route[] {
  const seen = new Set<string>();
  return routes.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });
}

const baseRoutes: Route[] = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/oop', priority: 0.9, changefreq: 'weekly' },
  { url: '/dsa', priority: 0.9, changefreq: 'weekly' },
  ...flattenNav(NAVIGATION),
];
const routes = dedupeByUrl(baseRoutes);

function generateSitemap(): string {
  const lastmod = new Date().toISOString().split('T')[0];
  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod || lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

const sitemap = generateSitemap();
const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');
console.log('Sitemap generated:', outputPath);
