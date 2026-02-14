# DevMastery – CS Tutorial Platform

A free, beginner-friendly tutorial platform for Computer Science topics: **OOP** (Object-Oriented Programming), **DSA** (Data Structures & Algorithms), and more. Built with Angular and designed for learners who want clear explanations plus interactive code and visualizations.

**Live:** [cs-tutorial.vercel.app](https://cs-tutorial.vercel.app) · [cs-foundation.netlify.app](https://cs-foundation.netlify.app)

---

## Table of contents

- [What is this project?](#what-is-this-project)
- [Goals](#goals)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Project structure (high level)](#project-structure-high-level)
- [How to contribute](#how-to-contribute)
  - [Contributing content (tutorials & pages)](#contributing-content-tutorials--pages)
  - [Contributing UI changes (layout, components, styling)](#contributing-ui-changes-layout-components-styling)
- [What contributions are needed?](#what-contributions-are-needed)
- [Scripts reference](#scripts-reference)
- [Deployment](#deployment)
- [License & links](#license--links)

---

## What is this project?

**DevMastery** (this repo: `cs-tutorial-platform`) is a **single-page web app** that serves structured tutorials on:

- **OOP** – e.g. classes, encapsulation (with more topics planned).
- **DSA** – e.g. arrays intro, two-pointer technique, plus visualizers for lists, stacks, queues, trees, graphs.
- **Spring Boot & System Design** – placeholders for future content.

Each lesson is built from **blocks**: hero sections, step lists, code snippets, runnable code playgrounds, callouts, memory/array visualizations, comprehension checks, UML cards, and more. The app is responsive, supports dark/light theme, and is built so new topics and pages can be added without touching much code.

---

## Goals

1. **Free and open** – Anyone can read, use, and contribute.
2. **Beginner-friendly** – Clear structure, simple navigation, and progressive difficulty.
3. **Interactive** – Code blocks, runnable playgrounds, and visualizations (e.g. memory, arrays, trees) to support understanding.
4. **Maintainable** – Content is data-driven; UI is component-based so content and design can evolve separately.
5. **Fast and accessible** – SPA with good performance and SEO (sitemap, meta tags, canonical URL).

---

## Tech stack

- **Framework:** [Angular 21](https://angular.dev) (standalone components, signals, modern control flow).
- **Build:** [Vite](https://vitejs.dev) via Angular CLI.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com).
- **Language:** TypeScript 5.9.
- **Tests:** [Vitest](https://vitest.dev).
- **Code execution (playgrounds):** [Piston API](https://github.com/engineer-man/piston) (run Java, Python, etc. in the browser).
- **Editor in playgrounds:** [Monaco Editor](https://microsoft.github.io/monaco-editor/).
- **Diagrams / math:** Mermaid, KaTeX, Prism for syntax highlighting.

---

## Prerequisites

Before you start, you need:

- **Node.js** – Version **20.x or higher** (LTS is fine). Check with `node -v`.
- **npm** – Comes with Node. Check with `npm -v`.
- A **code editor** – e.g. [VS Code](https://code.visualstudio.com/).

If you’re new to Node: install Node from [nodejs.org](https://nodejs.org/) and use the terminal (or VS Code’s integrated terminal) to run the commands below.

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/faizanurrahman/cs-tutorial.git
cd cs-tutorial
```

(If you use a fork, clone your fork and add this repo as `upstream` when you need to sync.)

### 2. Install dependencies

```bash
npm install
```

This installs Angular, Tailwind, and all other dependencies. It can take a minute.

### 3. Run the app locally

```bash
npm start
```

Then open **http://localhost:4200** in your browser. You should see the DevMastery landing page. Changes to code or content will reload the app automatically.

### 4. Build for production (optional)

```bash
npm run build
```

Output goes to **`dist/client/browser`**. You can preview that folder with:

```bash
npm run preview
```

---

## Project structure (high level)

Use this as a map when you contribute. You don’t need to memorize it; you can come back to this section.

```
cs-tutorial-platform/
├── src/
│   ├── app/
│   │   ├── data/              ← Tutorial page content (one file per page)
│   │   ├── blocks/           ← Reusable “content blocks” (hero, steps, concept grid, etc.)
│   │   ├── components/       ← UI: layout (navbar, sidebar, TOC), code blocks, visualizers, etc.
│   │   ├── features/         ← Tutorial renderer (reads data and renders blocks)
│   │   ├── pages/            ← Top-level pages (landing, test pages)
│   │   ├── models/           ← TypeScript types (e.g. tutorial blocks, nav items)
│   │   ├── services/         ← Navigation, theme
│   │   ├── app.routes.ts     ← URL routes
│   │   └── navigation.manifest.ts  ← Sidebar / nav menu structure
│   ├── environments/         ← Config for dev vs prod (API URL, analytics, etc.)
│   ├── services/            ← SEO, analytics, code execution
│   └── styles.css            ← Global styles
├── public/                   ← Static assets: favicon, manifest.json, robots.txt, sitemap.xml
├── scripts/                  ← e.g. generate-sitemap.ts
├── docs/                     ← Deployment and other docs
└── angular.json, package.json, tailwind.config.js, etc.
```

- **Content** lives in **`src/app/data/*.page.ts`** and is structured as “blocks” (see [Contributing content](#contributing-content-tutorials--pages)).
- **UI** lives in **`src/app/components/`** and **`src/app/blocks/`** (see [Contributing UI](#contributing-ui-changes-layout-components-styling)).
- **Routes** and **sidebar** are controlled by **`app.routes.ts`** and **`navigation.manifest.ts`**.

---

## How to contribute

Contributions are welcome. Below is enough for a beginner to add or edit **content** and to make **UI** changes.

---

### Contributing content (tutorials & pages)

Content is **not** stored in Markdown files. It’s stored in **TypeScript data files** that export a **page object** with a list of **blocks**. Each block has a `type` (e.g. `hero-header`, `text`, `code`) and `data` (title, HTML, code snippet, etc.).

#### Where content lives

| What you want to change | Where to look |
|-------------------------|----------------|
| Text, steps, code snippets, or block order on a tutorial page | `src/app/data/*.page.ts` (e.g. `oop-index.page.ts`, `dsa-arrays-intro.page.ts`) |
| Which pages appear in the sidebar / nav | `src/app/navigation.manifest.ts` |
| Which URL path a page has | `src/app/app.routes.ts` |
| Shape of blocks (what fields each block type has) | `src/app/models/tutorial.schema.ts` |

#### Adding or editing a tutorial page

1. **Edit an existing page**  
   Open the right file in `src/app/data/`, e.g. `oop-index.page.ts`. You’ll see something like:

   ```ts
   export const OopIndexPage: TutorialPage = {
     id: 'oop-index',
     title: 'Preparing for Your OOP Journey',
     metaDescription: '...',
     blocks: [
       { type: 'hero-header', data: { badge: '...', title: '...', ... } },
       { type: 'steps-list', data: { steps: [ ... ] } },
       // ...
     ],
   };
   ```

   - Change `title`, `metaDescription`, or any block’s `data` to update content.
   - Reorder or add blocks using the existing block types (see `tutorial.schema.ts` for the exact shape of each type).

2. **Adding a new page**  
   - Create a new file in `src/app/data/`, e.g. `oop-inheritance.page.ts`.
   - Export a `TutorialPage` with `id`, `title`, `metaDescription`, and `blocks` (copy an existing page and modify).
   - In **`src/app/app.routes.ts`**, add a route that loads `TutorialPageComponent` and resolves `pageData` from your new file (copy an existing OOP or DSA route).
   - In **`src/app/navigation.manifest.ts`**, add an entry (or child under OOP/DSA) with `title` and `slug` matching your new path (e.g. `slug: '/oop/concepts/inheritance'`).

3. **Block types you can use**  
   Defined in `src/app/models/tutorial.schema.ts`. Examples:

   - `hero-header` – big title, badge, subtitle, tags  
   - `steps-list` – numbered steps with title + content  
   - `section-header` – smaller section title  
   - `text` – HTML prose  
   - `code` – static code block (language, optional filename, code string)  
   - `code-playground` – runnable code (Java/Python via Piston)  
   - `concept-grid` – grid of concept cards  
   - `callout` – tip / note / warning / danger / info / success  
   - `memory-viz` – array/memory visualization  
   - `time-complexity` – best/average/worst case breakdown  
   - `comprehension-check` – quiz-style Q&A  
   - `uml-card` – class diagram card  
   - `split-layout` – left/right with two nested blocks  

   For each type, the **block renderer** (`src/app/features/tutorial-renderer/block-renderer.component.ts`) maps `type` to a component and passes `data`. So you only need to match the `data` shape in the schema.

#### After changing content

- Run `npm start` and open the page in the browser to confirm.
- If you add a new route or nav item, run **`npm run generate:sitemap`** so the sitemap stays up to date (CI also runs this on deploy).

---

### Contributing UI changes (layout, components, styling)

UI is split into **layout** (shell, nav, sidebar, TOC) and **content blocks / components** (buttons, code blocks, visualizers, etc.).

#### Where UI lives

| What you want to change | Where to look |
|-------------------------|----------------|
| Top bar (logo, links, GitHub button, theme toggle) | `src/app/components/layout/navbar/navbar.component.ts` |
| Left sidebar (section list, expand/collapse) | `src/app/components/layout/sidebar/sidebar.component.ts` |
| Right-hand table of contents | `src/app/components/layout/toc/toc.component.ts` |
| Main shell (sidebar + content + TOC) | `src/app/components/layout/main-layout/main-layout.component.ts` |
| Landing page layout | `src/app/pages/index.page.ts` and `src/app/components/layout/landing-layout/` |
| Content blocks (hero, steps, concept grid, etc.) | `src/app/blocks/` |
| Reusable UI (buttons, callouts, code block, section header) | `src/app/components/ui/` |
| DSA visualizers (array, memory, tree, etc.) | `src/app/components/dsa/` |
| OOP components (UML, class diagram) | `src/app/components/oop/` |
| Global styles and Tailwind | `src/styles.css`, `tailwind.config.js` |

#### Making a small UI change (e.g. colors, spacing, copy)

1. Find the component (see table above). Open its `.ts` file; the template is usually inline in `template: \` ... \``.
2. Adjust classes (Tailwind) or add/change HTML. For global look, edit `src/styles.css` or `tailwind.config.js`.
3. Save and check in the browser; the dev server will reload.

#### Adding a new block type (advanced)

1. **Schema** – In `src/app/models/tutorial.schema.ts`, add a new block type (e.g. `MyBlock`) and add it to the `Block` union and `BlockType`.
2. **Component** – Create a new component in `src/app/blocks/` or `src/app/components/`, with an `input()` for its `data`.
3. **Renderer** – In `src/app/features/tutorial-renderer/block-renderer.component.ts`, import the component, add it to `imports`, and add a `@case ('my-block')` that renders it with `block().data`.
4. **Content** – In any `src/app/data/*.page.ts`, add a block `{ type: 'my-block', data: { ... } }` using the shape you defined in the schema.

#### Styling conventions

- Use **Tailwind** utility classes in templates. Custom styles go in `src/styles.css` or in the component’s `styles` array.
- The app supports **dark mode**; use `dark:` variants where it matters (e.g. `bg-white dark:bg-slate-900`).
- Keep responsive behavior in mind; use Tailwind breakpoints (`sm:`, `md:`, `lg:`) where needed.

---

## What contributions are needed?

All of these are valuable, including small edits:

- **Content**
  - New lessons or sections (OOP, DSA, or future Spring Boot / System Design).
  - Fixes: typos, clearer explanations, better code samples, or updated diagrams.
  - New examples (Java/Python) that fit existing lessons.
- **UI/UX**
  - Accessibility (focus, contrast, labels, keyboard nav).
  - Mobile layout and touch targets.
  - Clearer visual hierarchy or spacing.
  - Better empty/error states (e.g. when code execution fails).
- **Learning experience**
  - More comprehension-check questions.
  - Extra callouts (tips, warnings) where beginners often get stuck.
  - Short “key takeaway” summaries for sections.
- **Technical**
  - Tests for new or existing components.
  - Performance (e.g. lazy loading, smaller bundles).
  - Docs (e.g. more inline comments or a short “Architecture” section in `docs/`).

If you’re not sure where to start, open an issue with the label “good first issue” or ask in a discussion. Small, focused pull requests (one topic or one page) are easier to review.

---

## Scripts reference

| Command | What it does |
|--------|----------------|
| `npm start` or `npm run dev` | Run dev server at http://localhost:4200 |
| `npm run build` | Production build → `dist/client/browser` |
| `npm run preview` | Build and serve the production output locally |
| `npm run test` | Run unit tests (Vitest) |
| `npm run lint` | Run ESLint on `src` |
| `npm run format` | Format code with Prettier |
| `npm run generate:sitemap` | Regenerate `public/sitemap.xml` from routes/nav (run after adding pages) |

---

## Deployment

The app is deployed at:

- **Vercel:** [cs-tutorial.vercel.app](https://cs-tutorial.vercel.app) (auto-deploy on push to `main`/`master` via GitHub Actions)
- **Netlify:** [cs-foundation.netlify.app](https://cs-foundation.netlify.app) (connect the repo in Netlify and set publish to `dist/client/browser`)

For details (secrets, canonical URL, sitemap, analytics), see **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

---

## License & links

- **Repository:** [github.com/faizanurrahman/cs-tutorial](https://github.com/faizanurrahman/cs-tutorial)
- **Live (Vercel):** [cs-tutorial.vercel.app](https://cs-tutorial.vercel.app)
- **Live (Netlify):** [cs-foundation.netlify.app](https://cs-foundation.netlify.app)

This project is open source. Contributions are welcome; please read the sections above and open an issue or pull request.
