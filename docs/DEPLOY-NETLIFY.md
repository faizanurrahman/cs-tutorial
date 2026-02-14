# Deploy to Netlify

## Option A: Deploy via Netlify UI (recommended first time)

1. **Push your code to GitHub** (or GitLab/Bitbucket).
   ```bash
   git add .
   git commit -m "Add Netlify config"
   git push origin main
   ```

2. **Sign in to Netlify**  
   Go to [https://app.netlify.com](https://app.netlify.com) and sign in (e.g. with GitHub).

3. **Add a new site**
   - Click **Add new site** → **Import an existing project**.
   - Choose your Git provider and authorize Netlify.
   - Select the repo: `cs-tutorial-platform` (or your repo name).

4. **Build settings** (should be filled by `netlify.toml`)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/client/browser`
   - **Base directory:** leave empty unless the app lives in a subfolder.

5. **Deploy**
   - Click **Deploy site**. Netlify will run `npm run build` and publish `dist/client/browser`.
   - After the build finishes, you get a URL like `https://random-name-123.netlify.app`.

6. **Optional: custom domain**  
   In **Site settings** → **Domain management** add your domain and follow the DNS steps.

---

## Option B: Deploy from the command line (CLI)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Log in**
   ```bash
   netlify login
   ```
   This opens the browser to authenticate.

3. **Link the site (first time only)**
   ```bash
   netlify init
   ```
   - Choose **Create & configure a new site**.
   - Pick your team.
   - Site name: optional (or let Netlify generate one).
   - Build command: `npm run build` (or leave default if it matches).
   - Publish directory: `dist/client/browser`.

4. **Deploy to production**
   ```bash
   npm run deploy:netlify
   ```
   or:
   ```bash
   netlify deploy --prod
   ```
   For a draft (preview) deploy without going live:
   ```bash
   netlify deploy
   ```

---

## What the repo config does

- **`netlify.toml`** in the project root sets:
  - **Build command:** `npm run build` (runs `ng build`).
  - **Publish directory:** `dist/client/browser` (Angular’s browser output).
  - **Redirects:** `/*` → `/index.html` with status 200 so client-side routes (e.g. `/dsa/arrays/intro`, `/oop`) work on refresh and direct links.
  - **Node version:** 20 (to match your `engines`).

After the first deploy, every push to your main branch will trigger a new build and deploy (if you connected a Git repo in the Netlify UI).
