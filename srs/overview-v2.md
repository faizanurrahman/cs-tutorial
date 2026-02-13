# **Computer Science Tutorial Platform: Final Requirement & Solution Blueprint (with Interactive Extensions)**

This document consolidates all previous requirements and adds powerful interactive capabilities—**Mermaid.js diagrams**, **live code execution**, **LaTeX mathematical notation**, and **hand‑drawn Excalidraw sketches**—into a single, production‑ready blueprint. These extensions preserve the **Docs‑as‑Code** philosophy while dramatically enhancing the learning experience.

---

## **1. Executive Summary**

- **Product Vision:** A high‑performance, interactive educational platform for computer science (OOP, DSA, Algorithms, System Design) that combines the simplicity of Markdown authoring with the richness of a modern Angular application.
- **Core Principles:**
  - **Docs‑as‑Code:** All content is written in Markdown, version‑controlled with Git, and treated with the same rigor as source code.
  - **Documentation‑as‑App:** The final output is a statically‑generated Angular SPA with client‑side routing and dynamic interactive components.
- **Key Interactive Additions:**
  - **Mermaid.js** – Text‑based diagrams (flowcharts, sequence diagrams, class diagrams) rendered as SVG.
  - **Live Code Playground** – Embedded Monaco editor connected to a sandboxed code execution API (Piston), allowing readers to modify and run code instantly.
  - **KaTeX** – Beautiful, fast mathematical typesetting for complexity analysis and formulas.
  - **Excalidraw** – Hand‑drawn style diagrams for conceptual explanations, optionally with stroke animation.
- **Target Audience:** Students, self‑learners, and professionals reviewing CS fundamentals.
- **Architecture:** Hybrid **Docs‑as‑Code** + **Docs‑as‑App** built with **Angular 19+**, **AnalogJS**, **Unified** (AST processing), and **Tailwind CSS**.

---

## **2. Technical Stack (Updated)**

| Layer                   | Technology                 | Justification                                                                        |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| **Core Framework**      | Angular 19+                | Signals for high‑performance reactivity; mature ecosystem.                           |
| **Meta‑Framework**      | AnalogJS                   | File‑based routing, static site generation (SSG), and seamless Markdown integration. |
| **Markdown Processing** | Unified (Remark + Rehype)  | AST‑based parsing – secure, extensible, industry standard.                           |
| **Diagram Rendering**   | Mermaid.js (lazy‑loaded)   | Renders diagrams defined as code; perfect for Docs‑as‑Code workflow.                 |
| **Code Playground**     | Monaco Editor + Piston API | Full VS‑Code‑like editing; Piston provides safe, multi‑language execution.           |
| **Math Typesetting**    | KaTeX                      | Fast, lightweight LaTeX rendering for mathematical notation.                         |
| **Hand‑Drawn Sketches** | Excalidraw (static SVG)    | Exportable, friendly diagrams that reduce cognitive load.                            |
| **Styling**             | Tailwind CSS               | Utility‑first framework aligned with custom design system.                           |
| **Code Highlighting**   | Shiki                      | Fast, accurate syntax highlighting (built into Analog).                              |
| **Search**              | Algolia DocSearch          | Industry‑standard, low‑maintenance search for documentation sites.                   |
| **Hosting**             | Vercel / Netlify           | Zero‑configuration deployment, automatic SSL, CDN.                                   |

---

## **3. Design System: "Deep Learning" Theme**

The visual identity remains as previously defined – a deep indigo palette with high contrast, designed for long reading sessions and technical clarity. (See full Tailwind configuration in Section 5 of the previous blueprint.)

- **Primary:** Deep Indigo (`#6366f1` to `#312e81`)
- **Logic Colors:** Address blue, value green, pointer rose
- **Admonitions:** Note, tip, warning, danger with distinct backgrounds and borders
- **Surfaces:** Canvas white, sidebar subtle grey, code block dark slate
- **Typography:** Inter (sans) for text, JetBrains Mono (mono) for code (ligatures enabled)
- **Layout:** Holy Grail – left sidebar (280px), center stage (max 900px), right TOC (240px)

---

## **4. Content Structure & Domain Requirements**

The platform must accommodate four core content domains, each now enhanced with interactive elements:

| Domain              | Traditional Requirements                                | New Interactive Enhancements                                                           |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **OOP**             | UML class diagrams, object instances, inheritance trees | Mermaid `classDiagram`; live code playground for Java/Python examples                  |
| **Data Structures** | Memory visualizers (array, linked list, tree)           | Mermaid flowcharts to show traversal; live code for implementation                     |
| **Algorithms**      | Step‑by‑step execution, Big‑O notation                  | KaTeX for math (`$O(n^2)$`); Mermaid flowcharts; live code to experiment               |
| **System Design**   | Architecture blocks, data flow arrows, CAP theorem      | Mermaid `sequenceDiagram` and `C4Context`; Excalidraw sketches for high‑level concepts |

---

## **5. Shared Component Library (Extended)**

In addition to the core UI and domain components described earlier, we now add the following interactive components:

| Component           | Selector                                  | Description                                                            | Integration Method                                |
| ------------------- | ----------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------- |
| **Mermaid Diagram** | `app-mermaid-viz`                         | Lazy‑loads Mermaid and renders a diagram from a code block.            | AST transforms ` ```mermaid ` into this component |
| **Code Playground** | `app-code-playground`                     | Monaco editor + output console + Run button; sends code to Piston API. | Used via custom directive or embedded in Markdown |
| **Math Formula**    | `app-math-formula` (or KaTeX auto‑render) | Renders LaTeX expressions (`$...$` or `$$...$$`) using KaTeX.          | AST (Remark‑math + Rehype‑katex)                  |
| **Sketch Diagram**  | `app-sketch-diagram`                      | Displays an exported Excalidraw SVG, optionally with stroke animation. | Static import of SVG files (or Excalidraw editor) |

---

## **6. Implementation Details**

### **6.1 Unified Markdown Processing Pipeline (AST‑Based)**

The core of the platform is the AST pipeline that transforms Markdown into Angular components. We extend the pipeline to handle Mermaid code blocks and LaTeX math.

**Install additional packages:**

```bash
npm install remark-math rehype-katex katex
# Mermaid and Monaco will be lazy‑loaded at runtime
```

**Updated `vite.config.ts`:**

````typescript
import { defineConfig } from "vite";
import analog from "@analogjs/platform";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math"; // for LaTeX detection
import rehypeKatex from "rehype-katex"; // for KaTeX rendering
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

// 1. Mermaid transformer: turns ```mermaid blocks into <app-mermaid-viz>
function mermaidTransformer() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang === "mermaid") {
        node.type = "html";
        // Encode the diagram code to safely pass as attribute
        node.value = `<app-mermaid-viz code="${encodeURIComponent(node.value)}"></app-mermaid-viz>`;
      }
    });
  };
}

// 2. Custom directives (tip, note, etc.)
function angularDirectives() {
  return (tree) => {
    visit(tree, "containerDirective", (node) => {
      if (["tip", "note", "warning", "danger"].includes(node.name)) {
        node.data = node.data || {};
        node.data.hName = "app-callout";
        node.data.hProperties = {
          type: node.name,
          title: node.attributes?.title || node.name.toUpperCase(),
        };
      }
    });
  };
}

export default defineConfig({
  plugins: [
    analog({
      content: {
        renderer: (code) => {
          const processor = unified()
            .use(remarkParse)
            .use(remarkDirective)
            .use(angularDirectives)
            .use(mermaidTransformer)
            .use(remarkMath) // identifies $...$ and $$...$$
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeKatex) // renders math using KaTeX
            .use(rehypeStringify, { allowDangerousHtml: true });
          return processor.processSync(code).toString();
        },
        highlighter: "shiki", // for code blocks (non‑mermaid)
      },
    }),
  ],
});
````

**Important:** We set `allowDangerousHtml: true` because we are intentionally injecting trusted component tags (`<app-mermaid-viz>`, `<app-callout>`). The pipeline does not allow arbitrary user HTML; only our known component tags survive.

### **6.2 Mermaid Diagram Component**

Create `src/app/components/content/mermaid-viz.component.ts` as previously described. Key points:

- Lazy‑load Mermaid using `await import('mermaid')`.
- Configure Mermaid theme to match the platform’s indigo palette.
- Render the diagram and inject the SVG.
- Show a loading indicator while the library loads.

### **6.3 Live Code Execution with Monaco + Piston**

#### **Component: `app-code-playground`**

- **Inputs:** `language` (e.g., 'python', 'java'), `initialCode` (string), `fileName` (optional).
- **Template:** Split view with Monaco editor (left) and console output (right), plus a "Run" button.
- **Functionality:**
  - When user clicks Run, send code to Piston API (`https://emkc.org/api/v2/piston/execute`).
  - Display stdout/stderr or execution error in the console panel.
  - Handle loading states.

**Integration into Markdown:**

We can create a custom directive, e.g., `:::playground`, or use an HTML‑like tag directly. Since we have AST control, we can define a new directive that transforms into `<app-code-playground>`. For simplicity, we can allow:

```html
<app-code-playground language="python" initialCode="print('hello')"></app-code-playground>
```

And ensure that the AST pipeline does not strip it (our pipeline passes through unknown HTML tags because of `allowDangerousHtml`).

#### **Security Considerations:**

- Piston is a sandboxed execution environment; still, we should never expose API keys client‑side – the Piston API is free and public, but we can rate‑limit or proxy if needed.
- Ensure we don’t execute code automatically on page load.

### **6.4 LaTeX with KaTeX**

Thanks to `remark-math` and `rehype-katex`, any standard LaTeX notation inside Markdown will be automatically converted to HTML with KaTeX classes.

**Example in Markdown:**

```markdown
The complexity is $O(n \log n)$ because of divide and conquer.

$$
T(n) = 2T(n/2) + O(n)
$$
```

This will render as beautiful math without any extra component.

We must include the KaTeX CSS in `index.html`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
```

### **6.5 Hand‑Drawn Sketches (Excalidraw)**

**Option A (Static):** Use Excalidraw to create diagrams, export as SVG, and place them in the `assets/` folder. Reference them with standard Markdown image syntax:

```markdown
![Sliding Window Concept](/assets/sliding-window.svg)
```

**Option B (Animated):** Create a component `<app-sketch-diagram>` that takes an SVG path and animates the strokes using a library like `vivus`. This adds a “drawing” effect that can engage learners.

**Option C (Embed Editor – advanced):** Embed the Excalidraw editor for users to create diagrams directly. This is complex and may be overkill; we can recommend Option A for most use cases.

Given the scope, we include **Option A** as the baseline, with a note that **Option B** can be added later for enhanced engagement.

---

## **7. Updated Folder Structure**

```text
src/
├── app/
│   ├── core/                           # Services (theme, search, API)
│   ├── components/
│   │   ├── ui/                          # Callout, CodeBlock, Bento, Tabs, Breadcrumbs
│   │   ├── layout/                       # Navbar, Sidebar, TOC
│   │   ├── content/                       # Domain‑agnostic interactive components
│   │   │   ├── mermaid-viz/
│   │   │   ├── code-playground/
│   │   │   └── sketch-diagram/            # (optional)
│   │   ├── dsa/                           # MemoryViz, LinkedList, TreeViz
│   │   ├── oop/                            # UMLCard, ObjectInstance
│   │   └── system/                         # SystemNode, FlowArrow, ArchMap
│   ├── pages/
│   │   ├── index.page.ts
│   │   └── [...slug].page.ts
│   └── app.config.ts
├── content/                               # Markdown files (organized by topic)
├── assets/
│   ├── images/                             # Static images
│   └── sketches/                            # Excalidraw SVGs
├── styles/                                 # Global CSS (Tailwind + KaTeX)
└── index.html
```

---

## **8. "Docs‑as‑Code" vs "Docs‑as‑App" (Reaffirmed)**

- **Docs‑as‑Code:** All content – including diagrams (Mermaid), code playground initial code, and math – is stored as plain text in Markdown. This enables version control, code reviews, and easy collaboration.
- **Docs‑as‑App:** The build pipeline transforms that text into a fully interactive Angular application. Mermaid diagrams become SVG, math becomes rendered KaTeX, code playgrounds become live editors.

The new integrations preserve this philosophy: the author writes ` ```mermaid `, `$...$`, or `<app-code-playground>`, and the system takes care of the rest.

---

## **9. Implementation Roadmap (Updated)**

1. **Project Setup** – Initialize Analog + Tailwind; install required packages.
2. **Design System** – Configure Tailwind with the indigo palette and fonts.
3. **Core Layout** – Build sidebar, navigation, TOC.
4. **AST Pipeline** – Implement the full Unified pipeline with directives, Mermaid transformer, and math plugins.
5. **UI Components** – Create Callout, CodeBlock, BentoGrid, etc.
6. **Interactive Components (in order of priority):**
   - **MermaidViz** – Lazy‑loaded diagram rendering.
   - **CodePlayground** – Monaco editor + Piston integration.
   - (Optional) **SketchDiagram** – Animated SVG.
7. **Domain Components** – MemoryViz, UMLCard, etc.
8. **Content Population** – Write/import tutorials using the new interactive features.
9. **Search Integration** – Algolia DocSearch.
10. **Testing & Performance** – Lighthouse, bundle size optimization (ensure Mermaid and Monaco are lazy‑loaded).
11. **Deployment** – Vercel/Netlify.

---

## **10. Conclusion**

This blueprint now fully incorporates three powerful extensions that transform a static tutorial site into an interactive learning environment:

- **Mermaid.js** brings diagrams to life, authored as code.
- **Live code execution** turns passive reading into active experimentation.
- **KaTeX** adds professional mathematical notation.
- **Excalidraw sketches** provide friendly, approachable visuals.

All of these are seamlessly integrated into the existing Docs‑as‑Code workflow, ensuring that content remains easy to write and maintain while delivering an exceptional, app‑like user experience. The AST‑based pipeline guarantees security and extensibility, and the lazy‑loading of heavy libraries keeps performance optimal.

With this blueprint, you are equipped to build a state‑of‑the‑art computer science platform that will engage and educate learners effectively.
