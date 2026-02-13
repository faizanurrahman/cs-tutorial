# Styles and SRS Component Status

## Global styles: `src/styles.css` (keep as CSS)

- **Keep the main entry as `src/styles.css`**, not `src/styles.scss`.
- **Tailwind v4** is configured to load from a single global **CSS** file (`@import "tailwindcss"` in `src/styles.css`). Tailwind v4 is not designed to be mixed with Sass in the same file.
- **SCSS** is used for **Angular component styles** only. Default for new components is set in `angular.json`:
  ```json
  "schematics": {
    "@schematics/angular:component": { "style": "scss" }
  }
  ```
- So: global Tailwind and base styles → `src/styles.css`; component-specific styles → `*.component.scss`.

---

## SRS component status (vs srs-v1 / overview-v2)

### Implemented and used in content

| SRS / Overview | Selector | Status |
|----------------|----------|--------|
| Callout | `app-callout` | Done |
| Code Block | `app-code-block` | Done |
| Bento Grid / Card | `app-bento-grid`, `app-bento-card` | Done |
| Tabs | `app-tab-group`, `app-tab` | Done |
| Badge, Alert, Button | `app-badge`, `app-alert`, `app-button` | Done |
| Memory Visualizer | `app-memory-viz` | Done |
| Linked List | `app-linked-list`, `app-linked-list-node` | Done |
| Tree Visualizer | `app-tree-viz`, `app-tree-node` | Done |
| Stack / Queue | `app-stack-viz`, `app-queue-viz` | Done |
| UML Class Card | `app-uml-card` | Done |
| System Node | `app-system-node` | Done |
| Data Flow | `app-data-flow` | Done |
| Architecture Diagram | `app-architecture-diagram` | Done |
| Mermaid Diagram | `app-mermaid-viz` | Done (AST transform) |
| Code Playground | `app-code-playground` | Done |
| Math (KaTeX) | — | Done via remark-math + rehype-katex (no separate component) |

### Optional / not implemented

| SRS / Overview | Selector | Notes |
|----------------|----------|--------|
| Object Instance (OOP heap) | `app-object-instance` | Optional; heap representation for OOP. Can be added later. |
| Sketch Diagram (Excalidraw) | `app-sketch-diagram` | Optional; static SVG or Excalidraw export. Can be added later. |

All components above that are implemented have been migrated to use **`input()` and `output()`** (signal-based API) and no longer use `@Input()` / `@Output()` with duplicate identifiers.
