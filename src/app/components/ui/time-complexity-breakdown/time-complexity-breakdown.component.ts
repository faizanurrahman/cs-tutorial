import { Component, input } from '@angular/core';

export interface ComplexityCase {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-time-complexity-breakdown',
  standalone: true,
  imports: [],
  host: {
    class: 'block my-8',
  },
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
      @for (item of cases(); track item.label) {
        <div
          class="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center"
        >
          <div class="text-3xl font-bold text-brand-600 dark:text-brand-400 font-mono mb-2">
            {{ item.value }}
          </div>
          <div class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            {{ item.label }}
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      }
    </div>
  `,
})
export class TimeComplexityBreakdownComponent {
  cases = input.required<ComplexityCase[]>();
}
