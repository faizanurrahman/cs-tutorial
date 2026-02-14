import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [],
  host: {
    class: 'block my-8',
  },
  template: `
    <div
      class="sticky top-16 z-20 -mx-4 px-4 py-3 -mt-3 rounded-lg
             bg-white/80 dark:bg-slate-950/80 backdrop-blur-md
             border-b border-transparent
             transition-shadow duration-200"
      style="box-shadow: 0 1px 0 0 rgba(99, 102, 241, 0.15), 0 0 0 1px transparent;"
    >
      <div class="border-l-4 border-indigo-500 pl-4 relative">
        <!-- Glowing underline (gradient line under title) -->
        <div
          class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-80"
          style="filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.4));"
        ></div>

        @if (badge()) {
          <span
            class="text-indigo-600 dark:text-indigo-400 font-mono text-sm uppercase tracking-wider font-semibold"
          >
            {{ badge() }}
          </span>
        }
        @if (title()) {
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mt-1 font-display tracking-tight">
            {{ title() }}
          </h2>
        }
        @if (subtitle()) {
          <p class="text-slate-500 dark:text-slate-400 mt-2 text-lg">
            {{ subtitle() }}
          </p>
        }
      </div>
    </div>
  `,
})
export class SectionHeaderComponent {
  badge = input<string>('');
  title = input<string>('');
  subtitle = input<string>('');
}
