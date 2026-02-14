
import { Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [],
  host: {
    class: 'block my-8',
  },
  template: `
    <div class="relative group my-12 mx-auto max-w-4xl">
      <!-- Light: dark shadow only; Dark: colored glow -->
      <div
        class="absolute -inset-1 rounded-2xl transition duration-200
               bg-slate-200/30 dark:bg-transparent
               shadow-lg group-hover:shadow-xl
               dark:shadow-none dark:blur dark:opacity-20 group-hover:dark:opacity-40 dark:bg-gradient-to-r dark:from-indigo-500 dark:to-purple-500"
      ></div>

      <!-- Terminal window -->
      <div
        class="relative rounded-xl overflow-hidden
               bg-white ring-1 ring-slate-200/80 shadow-md
               dark:bg-slate-950 dark:ring-white/10 dark:shadow-2xl"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-4 py-3 border-b
                 bg-slate-50/80 border-slate-200 text-slate-600
                 dark:bg-white/5 dark:border-white/5 dark:text-slate-500 dark:backdrop-blur-sm"
        >
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-400/90 border border-red-500/50 dark:bg-red-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-amber-400/90 border border-amber-500/50 dark:bg-yellow-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-emerald-400/90 border border-emerald-500/50 dark:bg-green-500/80"></div>
          </div>
          <div class="text-xs font-mono flex items-center gap-2">
            @if (fileName()) {
              <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              {{ fileName() }}
            }
            @if (language()) {
              <span class="px-2 py-0.5 rounded bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">{{ language() }}</span>
            }
          </div>
          <button
            (click)="copyCode()"
            class="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
            [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
          >
            @if (copied()) {
              <svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-emerald-600 dark:text-emerald-400">Copied!</span>
            } @else {
              <span>Copy</span>
            }
          </button>
        </div>

        <!-- Code area: light = GitHub-style bg; dark = #0d1117 -->
        <div class="relative overflow-x-auto bg-slate-50 dark:bg-[#0d1117]">
          @if (showLineNumbers()) {
            <div
              class="absolute left-0 top-0 bottom-0 w-12 flex flex-col text-xs font-mono pt-4 select-none
                     bg-slate-100/80 border-r border-slate-200 text-slate-500
                     dark:bg-slate-900/50 dark:border-white/5 dark:text-slate-500"
            >
              @for (lineNum of lineNumbers(); track lineNum) {
                <span class="px-2 leading-relaxed">{{ lineNum }}</span>
              }
            </div>
          }
          <pre
            [class.pl-14]="showLineNumbers()"
            class="p-6 text-sm font-mono leading-relaxed m-0 text-slate-800 dark:text-slate-300"
          >
            <code [class]="'language-' + language()" [innerHTML]="highlightedCode()"></code>
          </pre>
        </div>
      </div>

      @if (caption()) {
        <div class="text-sm text-slate-500 dark:text-slate-500 mt-2 italic text-center">
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
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      code {
        display: block;
        font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 0.875rem;
        line-height: 1.7;
        letter-spacing: 0.02em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      /* Syntax highlighting: light (GitHub-style) */
      :host ::ng-deep .token.comment,
      :host ::ng-deep .token.prolog,
      :host ::ng-deep .token.doctype,
      :host ::ng-deep .token.cdata {
        color: #6a737d;
      }
      :host ::ng-deep .token.keyword {
        color: #d73a49;
      }
      :host ::ng-deep .token.string {
        color: #032f62;
      }
      :host ::ng-deep .token.function {
        color: #6f42c1;
      }
      :host ::ng-deep .token.number {
        color: #005cc5;
      }
      :host ::ng-deep .token.operator {
        color: #24292e;
      }

      /* Dark theme token overrides */
      :host-context(.dark) ::ng-deep .token.comment,
      :host-context(.dark) ::ng-deep .token.prolog,
      :host-context(.dark) ::ng-deep .token.doctype,
      :host-context(.dark) ::ng-deep .token.cdata {
        color: #6a9955;
      }
      :host-context(.dark) ::ng-deep .token.keyword {
        color: #569cd6;
      }
      :host-context(.dark) ::ng-deep .token.string {
        color: #ce9178;
      }
      :host-context(.dark) ::ng-deep .token.function {
        color: #dcdcaa;
      }
      :host-context(.dark) ::ng-deep .token.number {
        color: #b5cea8;
      }
      :host-context(.dark) ::ng-deep .token.operator {
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
