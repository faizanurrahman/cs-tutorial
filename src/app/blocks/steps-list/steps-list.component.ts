import { Component, input } from '@angular/core';
import { StepsListBlock } from '../../models/tutorial.schema';

@Component({
  selector: 'app-steps-list',
  standalone: true,
  imports: [],
  host: {
    class: 'block not-prose',
  },
  template: `
    <div class="relative">
      <!-- Vertical timeline line -->
      <div
        class="absolute left-[1.4rem] top-6 bottom-6 w-0.5 rounded-full
               bg-gradient-to-b from-indigo-400 via-indigo-300/80 to-slate-300
               dark:from-indigo-500 dark:via-indigo-400/60 dark:to-slate-600"
      ></div>

      <div class="flex flex-col gap-8">
        @for (step of data().steps; track step.title; let idx = $index; let last = $last) {
          <div class="relative flex gap-6 pl-2">
            <!-- Timeline node (circle on the line) -->
            <div
              class="relative z-10 flex shrink-0 w-12 h-12 rounded-full
                     bg-white dark:bg-slate-800 border-2 border-indigo-500
                     shadow-md shadow-indigo-500/20
                     flex items-center justify-center text-lg font-bold
                     text-indigo-600 dark:text-indigo-400
                     ring-4 ring-indigo-500/10 dark:ring-indigo-400/10"
            >
              {{ idx + 1 }}
            </div>

            <!-- Step content card -->
            <div
              class="min-w-0 flex-1 p-6 rounded-xl
                     bg-white dark:bg-slate-800/50
                     border border-slate-200 dark:border-slate-700
                     shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3 font-display">
                {{ step.title }}
              </h3>
              <div
                class="text-slate-600 dark:text-slate-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                [innerHTML]="step.content"
              ></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class StepsListComponent {
  data = input.required<StepsListBlock['data']>();
}
