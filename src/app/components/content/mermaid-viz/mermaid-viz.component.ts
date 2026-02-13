import { Component, computed, input } from '@angular/core';

/**
 * Placeholder for Mermaid diagrams. Mermaid rendering is disabled to avoid
 * plugin/type issues; restore by uncommenting the mermaid import and render logic.
 */
@Component({
  selector: 'app-mermaid-viz',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
    >
      @if (title()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide"
        >
          {{ title() }}
        </h4>
      }

      <!-- Placeholder: diagram not rendered -->
      <div
        class="mermaid-placeholder flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50"
      >
        <svg
          class="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
          Diagram (Mermaid placeholder)
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Mermaid rendering is temporarily disabled.
        </p>
        @if (decodedCode(); as code) {
          <details class="mt-4 w-full max-w-2xl">
            <summary class="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
              View diagram source
            </summary>
            <pre class="mt-2 p-4 text-xs bg-gray-900 text-gray-100 rounded overflow-x-auto text-left">{{ code }}</pre>
          </details>
        }
      </div>

      @if (caption()) {
        <div
          class="mt-4 text-sm text-gray-600 dark:text-gray-400 italic text-center"
        >
          {{ caption() }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class MermaidVizComponent {
  code = input('');
  title = input('');
  caption = input('');
  theme = input<'default' | 'dark' | 'forest' | 'neutral'>('default');

  decodedCode = computed(() => {
    const raw = this.code();
    try {
      return raw ? decodeURIComponent(raw) : '';
    } catch {
      return raw || '';
    }
  });
}

/* === Commented out: Mermaid rendering (restore when plugin/type issues are resolved) ===
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnDestroy,
  signal,
  viewChild
} from '@angular/core';

// Lazy load: const mermaid = (await import('mermaid')).default;
// mermaid.initialize({ ... });
// const { svg } = await mermaid.render(id, this.decodedCode());
// container.nativeElement.innerHTML = svg;
*/
