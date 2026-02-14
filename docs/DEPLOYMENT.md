# Deployment & SEO

## Does `git push` deploy automatically?

- **Vercel:** Yes. Pushing to `main` or `master` runs the GitHub Action, which builds and deploys to **Vercel** → **https://cs-tutorial.vercel.app**.
- **Netlify:** The repo has `netlify.toml`; connect it in the [Netlify dashboard](https://app.netlify.com) and set publish to `dist/client/browser` for auto-deploy → **https://cs-foundation.netlify.app**.
- **Canonical URL for SEO:** The app uses **https://cs-tutorial.vercel.app** as the canonical origin (sitemap, robots, og:url, canonical link). Both deployments serve the same app; search engines are pointed at the Vercel URL.

## GitHub Action (`.github/workflows/deploy.yml`)

- **Triggers:** Push and pull requests to `main` and `master`.
- **Steps:** Checkout → Node 18 → `npm ci` → lint → test → **generate sitemap** → build → Lighthouse CI (against live URLs) → **Deploy to Vercel** (only on push to main/master, not on PRs).
- **Secrets required in GitHub:** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Vercel (`vercel.json`)

- **Build:** `npm run build`; **output:** `dist/client/browser` (Angular app output).
- **SPA:** All routes rewrite to `/index.html`.
- **Headers:** Security (X-Content-Type-Options, X-Frame-Options, etc.), cache for `/assets/` and `.html`.

## Netlify (`netlify.toml`)

- **Build:** `npm run build`; **publish:** `dist/client/browser`.
- **Redirects:** SPA fallback `/*` → `/index.html` (status 200).

## Analytics

- **Google Analytics 4:** Set your Measurement ID in `src/environments/environment.prod.ts` as `gaMeasurementId: 'G-XXXXXXXXXX'`. The production build uses this file (via `fileReplacements` in `angular.json`). If `gaMeasurementId` is empty or missing, the gtag script is not loaded.
- **Enable/disable:** `enableAnalytics` in the same env file.

## SEO

- **Meta & OG:** `SEOService` updates title, description, og:*, twitter:card, and canonical on route changes. Defaults and per-page overrides are supported.
- **Structured data:** `generateStructuredData()` for Article, BreadcrumbList, Course (JSON-LD).
- **Sitemap:** Run `npm run generate:sitemap` to regenerate `public/sitemap.xml` from `NAVIGATION` (and static routes). The deploy workflow runs this before build, so the built site includes an up-to-date sitemap.
- **robots.txt:** In `public/robots.txt`; points to `https://cs-tutorial.vercel.app/sitemap.xml`. No `Crawl-delay` (not standard; Google ignores it).

## PWA / Manifest

- **manifest.json:** In `public/manifest.json` (name, short_name, theme_color, icons, etc.).
- **index.html:** Includes `<link rel="manifest" href="/manifest.json">` and `theme-color` meta.

## Checklist before go-live

1. Set `gaMeasurementId` in `src/environments/environment.prod.ts` (or leave empty to disable).
2. Ensure `public` contains `favicon.ico`, `manifest.json`, `robots.txt`; `sitemap.xml` is regenerated in CI.
3. Add `/assets/og-image.png` for social previews (referenced in SEO defaults).
4. Confirm Vercel (or Netlify) env and secrets so the correct production URL is used.
