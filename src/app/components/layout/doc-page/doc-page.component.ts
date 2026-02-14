import { Component, input } from '@angular/core';

@Component({
  selector: 'app-doc-page',
  standalone: true,
  imports: [],
  template: `
    <article class="prose prose-lg prose-slate dark:prose-invert max-w-none">
      <header
        class="not-prose mb-12 border-b border-slate-200 dark:border-slate-700 pb-8"
      >
        @if (badge()) {
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{{ badge() }}</span>
          </div>
        }
        @if (module() || category()) {
          <div
            class="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 font-medium mb-4"
          >
            @if (module()) {
              <span>{{ module() }}</span>
            }
            @if (module() && category()) {
              <span class="text-slate-300 dark:text-slate-600">/</span>
            }
            @if (category()) {
              <span>{{ category() }}</span>
            }
          </div>
        }
        <h1
          class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
        >
          {{ title() }}
        </h1>
        @if (description()) {
          <p
            class="text-xl text-slate-500 dark:text-slate-400 leading-relaxed"
          >
            {{ description() }}
          </p>
        }
      </header>

      <div class="doc-content">
        <ng-content />
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host ::ng-deep app-callout,
      :host ::ng-deep app-code-block,
      :host ::ng-deep app-uml-card,
      :host ::ng-deep app-code-playground,
      :host ::ng-deep app-memory-viz,
      :host ::ng-deep app-mermaid-viz,
      :host ::ng-deep app-section-header,
      :host ::ng-deep app-quiz-card,
      :host ::ng-deep app-numbered-step-card,
      :host ::ng-deep app-time-complexity-breakdown,
      :host ::ng-deep app-comprehension-card {
        display: block;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class DocPageComponent {
  title = input.required<string>();
  description = input<string>('');
  module = input<string>('');
  category = input<string>('');
  /** Optional eyebrow badge above title (e.g. PRE-CLASS SETUP, THEORY FOUNDATION, COMPREHENSION CHECK) */
  badge = input<string>('');
}
