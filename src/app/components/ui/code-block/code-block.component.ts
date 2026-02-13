
import { Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [],
  template: `
    <div class="relative group my-6">
      <!-- File Name Header (Optional) -->
      @if (fileName()) {
        <div
          class="bg-gray-800 dark:bg-gray-900 text-gray-300 px-4 py-2
                    rounded-t-lg border-b border-gray-700 flex items-center justify-between"
        >
          <span class="text-sm font-mono">{{ fileName() }}</span>

          @if (language()) {
            <span class="text-xs px-2 py-1 bg-gray-700 rounded">
              {{ language() }}
            </span>
          }
        </div>
      }

      <!-- Code Container -->
      <div class="relative">
        <pre
          [class.rounded-t-lg]="!fileName()"
          [class.rounded-t-none]="fileName()"
          class="bg-gray-900 dark:bg-black text-gray-100 p-4 rounded-b-lg
                 overflow-x-auto text-sm leading-relaxed"
        >
          <code [class]="'language-' + language()" [innerHTML]="highlightedCode()"></code>
        </pre>

        <!-- Copy Button -->
        <button
          (click)="copyCode()"
          [class.opacity-100]="showCopyButton()"
          class="absolute top-3 right-3 opacity-0 group-hover:opacity-100
                 transition-opacity duration-200
                 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700
                 text-white text-xs font-medium rounded
                 flex items-center gap-2 shadow-lg"
          [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
        >
          @if (copied()) {
            <!-- Check Icon -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Copied!</span>
          } @else {
            <!-- Copy Icon -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy</span>
          }
        </button>

        <!-- Line Numbers (Optional) -->
        @if (showLineNumbers()) {
          <div
            class="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/50
                      border-r border-gray-700 flex flex-col
                      text-gray-500 text-xs font-mono pt-4 select-none"
          >
            @for (lineNum of lineNumbers(); track lineNum) {
              <span class="px-2 leading-relaxed">{{ lineNum }}</span>
            }
          </div>
        }
      </div>

      <!-- Caption (Optional) -->
      @if (caption()) {
        <div
          class="text-sm text-gray-500 dark:text-gray-400 mt-2 italic text-center"
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

      pre {
        margin: 0;
      }

      code {
        display: block;
        font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
        font-size: 0.875rem;
        line-height: 1.7;
      }

      /* Syntax Highlighting (basic fallback) */
      :host ::ng-deep .token.comment,
      :host ::ng-deep .token.prolog,
      :host ::ng-deep .token.doctype,
      :host ::ng-deep .token.cdata {
        color: #6a9955;
      }

      :host ::ng-deep .token.keyword {
        color: #569cd6;
      }

      :host ::ng-deep .token.string {
        color: #ce9178;
      }

      :host ::ng-deep .token.function {
        color: #dcdcaa;
      }

      :host ::ng-deep .token.number {
        color: #b5cea8;
      }

      :host ::ng-deep .token.operator {
        color: #d4d4d4;
      }
    `,
  ],
})
export class CodeBlockComponent {
  code = input('');
  fileName = input('');
  language = input('');
  showLineNumbers = input(false);
  caption = input('');

  copied = signal(false);
  showCopyButton = signal(false);

  highlightedCode = computed(() => {
    const code = this.code();
    return this.escapeHtml(code);
  });

  lineNumbers = computed(() => {
    if (!this.showLineNumbers()) return [];
    const lines = this.code().split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1);
  });

  constructor() {
    // Show copy button on hover
    effect(() => {
      if (this.copied()) {
        setTimeout(() => this.showCopyButton.set(true), 100);
      }
    });
  }

  /**
   * Copy code to clipboard
   */
  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      this.showCopyButton.set(true);

      // Reset after 2 seconds
      setTimeout(() => {
        this.copied.set(false);
        this.showCopyButton.set(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
