
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
  viewChild
} from '@angular/core';
import { CodeExecutionService } from '../../../../services/code-execution.service';

@Component({
  selector: 'app-code-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="relative group not-prose my-12 mx-auto max-w-4xl">
      <!-- Light: shadow; Dark: colored glow -->
      <div
        class="absolute -inset-1 rounded-2xl transition duration-200
               bg-slate-200/30 dark:bg-transparent shadow-lg group-hover:shadow-xl
               dark:shadow-none dark:blur dark:opacity-20 group-hover:dark:opacity-40 dark:bg-gradient-to-r dark:from-indigo-500 dark:to-purple-500"
      ></div>

      <div
        class="relative rounded-xl overflow-hidden
               bg-white ring-1 ring-slate-200/80 shadow-md
               dark:bg-slate-950 dark:ring-white/10 dark:shadow-2xl"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-b
                 bg-slate-50/80 border-slate-200 text-slate-600
                 dark:bg-white/5 dark:border-white/5 dark:text-slate-500 dark:backdrop-blur-sm"
        >
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-400/90 border border-red-500/50 dark:bg-red-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-amber-400/90 border border-amber-500/50 dark:bg-yellow-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-emerald-400/90 border border-emerald-500/50 dark:bg-green-500/80"></div>
          </div>
          <div class="text-xs font-mono flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            {{ fileName() || title() || language() || 'Playground' }}
          </div>
          <div class="flex items-center gap-2">
            <button
              (click)="copyCode()"
              class="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-white/5"
            >
              @if (copied()) {
                <span class="text-emerald-600 dark:text-emerald-400">Copied!</span>
              } @else {
                <span>Copy</span>
              }
            </button>
            <span class="text-xs text-slate-500 dark:text-slate-400">
              {{ remainingAttempts() }}/5 runs
            </span>
            <button
              (click)="runCode()"
              [disabled]="running() || remainingAttempts() === 0"
              [class.opacity-50]="running() || remainingAttempts() === 0"
              [class.cursor-not-allowed]="running() || remainingAttempts() === 0"
              class="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 disabled:hover:bg-indigo-500"
            >
              @if (running()) {
                <svg class="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Running...</span>
              } @else {
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Run</span>
              }
            </button>
            <button
              (click)="resetCode()"
              [disabled]="running()"
              class="p-1.5 rounded transition-colors text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 disabled:opacity-50"
              title="Reset to original code"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Split View: Editor + Console (Monaco theme set by getEditorTheme: vs vs vs-dark) -->
        <div
          class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-white/5"
        >
          <div class="relative code-playground-editor-bg">
            @if (loadingEditor()) {
              <div class="absolute inset-0 flex items-center justify-center code-playground-editor-bg">
                <div class="text-center">
                  <div class="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading editor...</p>
                </div>
              </div>
            }
            <div #editorContainer class="h-[400px]"></div>
          </div>

          <div class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 h-[400px] overflow-y-auto ring-1 ring-slate-200 dark:ring-white/5 lg:ring-l-0">
          <div class="p-4 font-mono text-sm">
            @if (output()) {
              <!-- Success Output -->
              <div class="space-y-2">
                <div
                  class="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs font-semibold mb-2"
                >
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>OUTPUT</span>
                </div>
                <pre class="whitespace-pre-wrap text-slate-800 dark:text-gray-100">{{
                  output()
                }}</pre>
              </div>
            }

            @if (executionError()) {
              <!-- Error Output -->
              <div class="space-y-2 mt-4">
                <div
                  class="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-semibold mb-2"
                >
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>ERROR</span>
                </div>
                <pre class="whitespace-pre-wrap text-red-600 dark:text-red-400">{{
                  executionError()
                }}</pre>
              </div>
            }

            @if (!output() && !executionError() && !running()) {
              <!-- Empty State -->
              <div
                class="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400"
              >
                <svg
                  class="w-12 h-12 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p class="text-sm">Click "Run Code" to see output</p>
              </div>
            }

            @if (running()) {
              <!-- Running State -->
              <div class="flex items-center gap-3 text-amber-600 dark:text-yellow-400">
                <svg
                  class="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Executing code...</span>
              </div>
            }
          </div>
        </div>
      </div>

      @if (description()) {
        <div class="bg-slate-50/80 dark:bg-white/5 px-4 py-2 border-t border-slate-200/80 dark:border-white/5">
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ description() }}
          </p>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .code-playground-editor-bg {
        background: #f6f8fa;
      }
      :host-context(.dark) .code-playground-editor-bg {
        background: #0d1117;
      }
      pre {
        margin: 0;
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
      }
    `,
  ],
})
export class CodePlaygroundComponent implements AfterViewInit, OnDestroy {
  code = input('');
  language = input('python');
  title = input('');
  fileName = input('');
  description = input('');

  readonly editorContainer = viewChild.required<ElementRef<HTMLDivElement>>('editorContainer');

  private readonly codeExecution = inject(CodeExecutionService);

  running = signal(false);
  loadingEditor = signal(true);
  output = signal('');
  executionError = signal('');
  remainingAttempts = signal(5);
  copied = signal(false);

  private editor: any = null;
  private monaco: any = null;
  private themeObserver: MutationObserver | null = null;

  async ngAfterViewInit() {
    await this.initializeMonaco();
    this.updateRemainingAttempts();
  }

  ngOnDestroy() {
    this.editor?.dispose();
    this.themeObserver?.disconnect();
  }

  private async initializeMonaco() {
    try {
      // Try bundled Monaco first (e.g. dev with full build), then CDN when externalized
      try {
        this.monaco = (await import('monaco-editor')).default;
      } catch {
        this.monaco = await this.loadMonacoFromCdn();
      }

      // Create editor
      this.editor = this.monaco.editor.create(
        this.editorContainer().nativeElement,
        {
          value: this.code(),
          language: this.getMonacoLanguage(this.language()),
          theme: this.getEditorTheme(),
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
        },
      );

      // Listen for theme changes
      this.watchThemeChanges();

      this.loadingEditor.set(false);
    } catch (err) {
      console.error('Failed to load Monaco:', err);
      this.executionError.set('Failed to load code editor');
      this.loadingEditor.set(false);
    }
  }

  async runCode() {
    if (this.running() || this.remainingAttempts() === 0) return;

    this.running.set(true);
    this.output.set('');
    this.executionError.set('');

    const code = this.editor?.getValue() || this.code();
    const lang = this.language();
    const config = this.codeExecution.getLanguageConfig(lang);

    try {
      const result = await this.codeExecution
        .executeCode({
          language: config.language,
          version: config.version,
          files: [
            {
              name:
                this.fileName() ||
                `main.${this.codeExecution.getFileExtension(lang)}`,
              content: code,
            },
          ],
          stdin: '',
          compile_timeout: 10000,
          run_timeout: 3000,
          compile_memory_limit: -1,
          run_memory_limit: -1,
        })
        .toPromise();

      if (result) {
        // Handle compilation errors
        if (result.compile && result.compile.code !== 0) {
          this.executionError.set(
            result.compile.stderr ||
              result.compile.stdout ||
              'Compilation failed',
          );
        }
        // Handle runtime errors
        else if (result.run.code !== 0) {
          this.executionError.set(
            result.run.stderr || `Process exited with code ${result.run.code}`,
          );
        }
        // Success
        else {
          this.output.set(result.run.stdout || '(no output)');
          if (result.run.stderr) {
            this.executionError.set(result.run.stderr);
          }
        }
      }
    } catch (err: any) {
      this.executionError.set(err.message || 'Execution failed');
    } finally {
      this.running.set(false);
      this.updateRemainingAttempts();
    }
  }

  resetCode() {
    if (this.editor) {
      this.editor.setValue(this.code());
    }
    this.output.set('');
    this.executionError.set('');
  }

  async copyCode() {
    const text = this.editor?.getValue() ?? this.code();
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  }

  private updateRemainingAttempts() {
    this.remainingAttempts.set(this.codeExecution.getRemainingAttempts());
  }

  private getMonacoLanguage(lang: string): string {
    const map: Record<string, string> = {
      python: 'python',
      javascript: 'javascript',
      typescript: 'typescript',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      rust: 'rust',
      go: 'go',
      ruby: 'ruby',
      php: 'php',
    };
    return map[lang.toLowerCase()] || 'plaintext';
  }

  private getEditorTheme(): string {
    const isDark =
      window.matchMedia('(prefers-color-scheme: dark)').matches ||
      document.documentElement.classList.contains('dark');
    return isDark ? 'vs-dark' : 'vs';
  }

  private watchThemeChanges() {
    const updateTheme = () => {
      const theme = this.getEditorTheme();
      this.monaco?.editor.setTheme(theme);
    };
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);
    // Sync with app dark-mode toggle (class on <html>)
    this.themeObserver = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === 'class')) updateTheme();
    });
    this.themeObserver.observe(document.documentElement, { attributes: true });
  }

  /** Cached CDN load so multiple code-playground instances share one load. */
  private static monacoCdnPromise: Promise<any> | null = null;

  /**
   * Load Monaco from CDN when the app build externalizes monaco-editor (browser cannot resolve bare specifier).
   */
  private loadMonacoFromCdn(): Promise<any> {
    if (CodePlaygroundComponent.monacoCdnPromise) {
      return CodePlaygroundComponent.monacoCdnPromise;
    }
    const MONACO_VERSION = '0.44.0';
    const CDN_BASE = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min`;
    const loaderUrl = `${CDN_BASE}/vs/loader.js`;

    CodePlaygroundComponent.monacoCdnPromise = new Promise((resolve, reject) => {
      const win = window as unknown as {
        require?: ((deps: string[], callback: () => void) => void) & { config: (cfg: object) => void };
        monaco?: any;
        MonacoEnvironment?: { getWorkerUrl: (workerId: string, label: string) => string };
      };

      if (win.monaco) {
        resolve(win.monaco);
        return;
      }

      const loadScript = (src: string): Promise<void> =>
        new Promise((res, rej) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            res();
            return;
          }
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => res();
          script.onerror = () => rej(new Error(`Failed to load ${src}`));
          document.head.appendChild(script);
        });

      const ensureMonacoCss = (): void => {
        const href = `${CDN_BASE}/vs/editor/editor.main.css`;
        if (document.querySelector(`link[href="${href}"]`)) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      };

      loadScript(loaderUrl)
        .then(() => {
          ensureMonacoCss();
          win.MonacoEnvironment = {
            getWorkerUrl: () => `${CDN_BASE}/vs/base/worker/workerMain.js`,
          };
          win.require!.config({
            paths: { vs: CDN_BASE + '/vs' },
            'vs/nls': { availableLanguages: {} },
          });
          win.require!(['vs/editor/editor.main'], () => {
            if (win.monaco) {
              resolve(win.monaco);
            } else {
              reject(new Error('Monaco global not set after load'));
            }
          });
        })
        .catch((err) => {
          CodePlaygroundComponent.monacoCdnPromise = null;
          reject(err);
        });
    });
    return CodePlaygroundComponent.monacoCdnPromise;
  }
}
