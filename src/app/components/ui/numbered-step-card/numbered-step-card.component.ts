import { Component, input } from '@angular/core';

@Component({
  selector: 'app-numbered-step-card',
  standalone: true,
  imports: [],
  host: {
    class: 'block my-5',
  },
  template: `
    <div
      class="flex gap-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex shrink-0 items-center justify-center w-14 h-14 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-2xl font-bold text-slate-800 dark:text-slate-200">
        {{ number() }}
      </div>
      <div class="min-w-0 flex-1 border-l-2 border-slate-200 dark:border-slate-600 pl-6">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 not-prose">
          {{ title() }}
        </h3>
        <div class="text-slate-600 dark:text-slate-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none">
          <ng-content />
        </div>
      </div>
    </div>
  `,
})
export class NumberedStepCardComponent {
  number = input.required<number>();
  title = input.required<string>();
}
