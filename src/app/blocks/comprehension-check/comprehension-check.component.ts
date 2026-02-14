import { Component, input } from '@angular/core';
import { ComprehensionCheckBlock } from '../../models/tutorial.schema';
import { ComprehensionCardComponent } from '../../components/content/comprehension-card/comprehension-card.component';

@Component({
  selector: 'app-comprehension-check',
  standalone: true,
  imports: [ComprehensionCardComponent],
  host: {
    class: 'block',
  },
  template: `
    <section class="not-prose">
      <div class="mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
          </svg>
          <span>Comprehension Check</span>
        </div>
        <h2 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          {{ data().title }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (q of data().questions; track q.title) {
          <app-comprehension-card [number]="q.number" [title]="q.title">
            <div question>{{ q.question }}</div>
            <span expected>{{ q.expected }}</span>
            <span ifIncorrect>{{ q.ifIncorrect }}</span>
          </app-comprehension-card>
        }
      </div>

      @if (data().footer) {
        <div class="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 text-sm">
          {{ data().footer }}
        </div>
      }
    </section>
  `,
})
export class ComprehensionCheckComponent {
  data = input.required<ComprehensionCheckBlock['data']>();
}
