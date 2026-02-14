import { Component, input } from '@angular/core';
import { HeroHeaderBlock } from '../../models/tutorial.schema';

@Component({
  selector: 'app-hero-header',
  standalone: true,
  imports: [],
  host: {
    class: 'block',
  },
  template: `
    <header
      class="relative overflow-hidden py-24 md:py-32 px-6 border-b
             bg-white dark:bg-slate-900/50
             border-slate-200 dark:border-white/5
             shadow-sm dark:shadow-none
             dark:backdrop-blur-3xl"
    >
      <!-- Background grid (light: subtle gray grid; dark: white grid) -->
      <div class="hero-grid-bg"></div>

      <!-- Aurora: light = soft pastel orb; dark = indigo glow -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow pointer-events-none
               bg-indigo-100/60 dark:bg-indigo-500/20 dark:mix-blend-screen"
      ></div>

      <!-- Content -->
      <div class="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        @if (data().badge) {
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-transform hover:scale-105 cursor-default
                   bg-indigo-50 border border-indigo-200/80 text-indigo-700
                   dark:bg-white/5 dark:border-white/10 dark:text-indigo-300"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 dark:opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {{ data().badge }}
          </div>
        }

        <h1
          class="text-6xl md:text-7xl font-display font-bold tracking-tight
                 text-transparent bg-clip-text
                 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600
                 dark:from-white dark:via-white dark:to-white/60
                 drop-shadow-sm dark:drop-shadow-2xl"
        >
          {{ data().title }}
        </h1>

        @if (data().subtitle) {
          <p
            class="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light
                   text-slate-600 dark:text-slate-400"
          >
            {{ data().subtitle }}
          </p>
        }

        @if (data().tags?.length) {
          <div class="flex flex-wrap justify-center gap-2 pt-4">
            @for (tag of data().tags; track tag) {
              <span
                class="px-2.5 py-1 rounded-md text-xs font-mono
                       bg-slate-100 border border-slate-200 text-slate-600
                       dark:bg-slate-800/50 dark:border-white/5 dark:text-slate-400"
              >
                #{{ tag }}
              </span>
            }
          </div>
        }
      </div>
    </header>
  `,
  styles: [
    `
      .hero-grid-bg {
        position: absolute;
        inset: 0;
        opacity: 0.5;
        pointer-events: none;
        background-size: 32px 32px;
        mask-image: linear-gradient(0deg, transparent, black 20%, black 80%, transparent);
        -webkit-mask-image: linear-gradient(0deg, transparent, black 20%, black 80%, transparent);
      }
      .hero-grid-bg {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.4)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
      }
      :host-context(.dark) .hero-grid-bg {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
      }
    `,
  ],
})
export class HeroHeaderComponent {
  data = input.required<HeroHeaderBlock['data']>();
}
