import { Component, input } from '@angular/core';
import { ConceptGridBlock } from '../../models/tutorial.schema';
import { SpotlightDirective } from '../../directives/spotlight.directive';

@Component({
  selector: 'app-concept-grid',
  standalone: true,
  imports: [SpotlightDirective],
  host: {
    class: 'block not-prose',
  },
  template: `
    <div
      appSpotlight
      [class]="gridClasses()"
      class="grid gap-8 md:gap-12 max-w-5xl mx-auto px-6"
    >
      @for (item of data().items; track item.title) {
        <div
          class="group relative h-full rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02]
                 bg-white border border-slate-200 shadow-md hover:shadow-xl
                 dark:bg-slate-900 dark:border-white/5 dark:shadow-none"
        >
          <!-- Spotlight: light = pastel indigo; dark = indigo glow -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none concept-spotlight"
          ></div>

          <!-- Content -->
          <div class="relative z-10 p-8 flex flex-col h-full">
            <div
              class="w-12 h-12 mb-6 rounded-2xl flex items-center justify-center text-xl font-bold
                     bg-indigo-50 border border-indigo-100 text-indigo-600
                     dark:bg-slate-800/50 dark:border-white/5 dark:text-indigo-400 dark:shadow-inner"
            >
              {{ item.icon || item.title.charAt(0) }}
            </div>
            <h3
              class="text-xl font-display font-semibold mb-3 tracking-tight
                     text-slate-900 dark:text-slate-100"
            >
              {{ item.title }}
            </h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-sm flex-grow">
              {{ item.text }}
            </p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .concept-spotlight {
        background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(199, 210, 254, 0.35), transparent 40%);
      }
      :host-context(.dark) .concept-spotlight {
        background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.1), transparent 40%);
      }
    `,
  ],
})
export class ConceptGridComponent {
  data = input.required<ConceptGridBlock['data']>();

  columns(): 2 | 3 {
    return this.data().columns ?? 2;
  }

  gridClasses(): string {
    return this.columns() === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  }
}
