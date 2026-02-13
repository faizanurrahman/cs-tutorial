
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
    <div
      class="not-prose my-8 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow-lg"
    >
      <!-- Toolbar -->
      <div
        class="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-600"
      >
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {{ title() || language() }}
          </span>

          @if (fileName()) {
            <span class="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {{ fileName() }}
            </span>
          }
        </div>

        <div class="flex items-center gap-2">
          <!-- Remaining Attempts -->
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ remainingAttempts() }}/5 runs left
          </span>

          <!-- Run Button -->
          <button
            (click)="runCode()"
            [disabled]="running() || remainingAttempts() === 0"
            [class.opacity-50]="running() || remainingAttempts() === 0"
            [class.cursor-not-allowed]="running() || remainingAttempts() === 0"
            class="px-4 py-1.5 bg-brand-500 hover:bg-brand-600 active:bg-brand-700
                   text-white text-sm font-medium rounded-lg transition-colors
                   flex items-center gap-2 disabled:hover:bg-brand-500"
          >
            @if (running()) {
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
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
              <span>Running...</span>
            } @else {
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Run Code</span>
            }
          </button>

          <!-- Reset Button -->
          <button
            (click)="resetCode()"
            [disabled]="running()"
            class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Reset to original code"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Split View: Editor + Console -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-300 dark:divide-gray-600"
      >
        <!-- Monaco Editor -->
        <div class="relative bg-gray-900">
          @if (loadingEditor()) {
            <div
              class="absolute inset-0 flex items-center justify-center bg-gray-900"
            >
              <div class="text-center">
                <div
                  class="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"
                ></div>
                <p class="mt-3 text-sm text-gray-400">Loading editor...</p>
              </div>
            </div>
          }
          <div #editorContainer class="h-[400px]"></div>
        </div>

        <!-- Console Output -->
        <div class="bg-gray-950 text-gray-100 h-[400px] overflow-y-auto">
          <div class="p-4 font-mono text-sm">
            @if (output()) {
              <!-- Success Output -->
              <div class="space-y-2">
                <div
                  class="flex items-center gap-2 text-green-400 text-xs font-semibold mb-2"
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
                <pre class="whitespace-pre-wrap text-gray-100">{{
                  output()
                }}</pre>
              </div>
            }

            @if (executionError()) {
              <!-- Error Output -->
              <div class="space-y-2 mt-4">
                <div
                  class="flex items-center gap-2 text-red-400 text-xs font-semibold mb-2"
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
                <pre class="whitespace-pre-wrap text-red-400">{{
                  executionError()
                }}</pre>
              </div>
            }

            @if (!output() && !executionError() && !running()) {
              <!-- Empty State -->
              <div
                class="flex flex-col items-center justify-center h-full text-gray-500"
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
              <div class="flex items-center gap-3 text-yellow-400">
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

      <!-- Info Footer -->
      @if (description()) {
        <div
          class="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-t border-gray-300 dark:border-gray-600"
        >
          <p class="text-xs text-gray-600 dark:text-gray-400">
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

  private editor: any = null;
  private monaco: any = null;

  async ngAfterViewInit() {
    await this.initializeMonaco();
    this.updateRemainingAttempts();
  }

  ngOnDestroy() {
    this.editor?.dispose();
  }

  private async initializeMonaco() {
    try {
      // Lazy load Monaco (CRITICAL - 3-5MB)
      this.monaco = (await import('monaco-editor')).default;

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
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      this.monaco?.editor.setTheme(e.matches ? 'vs-dark' : 'vs');
    });
  }
}
