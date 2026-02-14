import { Component, input, signal } from '@angular/core';

export interface QuizOption {
  text: string;
  correct: boolean;
}

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [],
  host: {
    class: 'block my-8',
  },
  template: `
    <div
      class="bg-slate-100 dark:bg-canvas-card border border-slate-200 dark:border-canvas-border rounded-xl p-6"
    >
      <div class="flex items-center gap-3 mb-4 text-neon-orange">
        <svg
          class="w-6 h-6 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A5.001 5.001 0 0014.95 20H9.05a5.001 5.001 0 00-1.878-3.957l-.548-.547z"
          />
        </svg>
        <h3 class="font-bold text-lg uppercase tracking-wide">
          Comprehension Check
        </h3>
      </div>

      <p
        class="text-lg text-slate-700 dark:text-slate-200 mb-6 font-medium"
      >
        <ng-content select="[question]" />
      </p>

      <div class="space-y-3">
        @for (option of options(); track option.text) {
          <button
            type="button"
            (click)="select(option)"
            [disabled]="selected() !== null"
            [class]="getOptionClasses(option)"
            class="w-full text-left p-4 rounded-lg border transition-colors disabled:cursor-default"
          >
            {{ option.text }}
          </button>
        }
      </div>
    </div>
  `,
})
export class QuizCardComponent {
  options = input.required<QuizOption[]>();

  selected = signal<QuizOption | null>(null);

  select(option: QuizOption): void {
    if (this.selected() !== null) return;
    this.selected.set(option);
  }

  isCorrect(option: QuizOption): boolean {
    return option.correct === true;
  }

  getOptionClasses(option: QuizOption): string {
    const sel = this.selected();
    if (sel !== option) {
      return 'bg-white dark:bg-canvas-DEFAULT border-slate-200 dark:border-canvas-border hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300';
    }
    if (this.isCorrect(option)) {
      return 'border-2 border-neon-green bg-neon-green/10 dark:bg-neon-green/20 text-slate-900 dark:text-white';
    }
    return 'border-2 border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-slate-900 dark:text-white';
  }
}
