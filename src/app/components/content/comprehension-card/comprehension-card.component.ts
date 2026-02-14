import { Component, input, signal } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-comprehension-card',
  standalone: true,
  imports: [],
  host: {
    class: 'block my-5',
  },
  template: `
    <div
      class="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-start gap-4">
        <div
          class="flex shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 text-lg font-bold text-slate-700 dark:text-slate-300"
        >
          {{ number() }}
        </div>
        <div class="min-w-0 flex-1 space-y-4">
          <h3 class="text-base font-bold text-slate-900 dark:text-white not-prose">
            {{ title() }}
          </h3>
          <div class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <ng-content select="[question]" />
          </div>
          <div class="space-y-2">
            <p class="text-sm">
              <span class="font-semibold text-slate-700 dark:text-slate-200">Expected answer:</span>
              <span class="text-slate-600 dark:text-slate-400 ml-1">
                <ng-content select="[expected]" />
              </span>
            </p>
            <p class="text-sm">
              <span class="font-semibold text-amber-700 dark:text-neon-orange">If incorrect:</span>
              <span class="text-slate-600 dark:text-slate-400 ml-1">
                <ng-content select="[ifIncorrect]" />
              </span>
            </p>
          </div>
          @if (!gotIt()) {
            <button
              (click)="onGotIt()"
              class="mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              I got it
            </button>
          } @else {
            <p class="mt-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              ✓ Got it
            </p>
          }
        </div>
      </div>
    </div>
  `,
})
export class ComprehensionCardComponent {
  number = input.required<number>();
  title = input.required<string>();
  gotIt = signal(false);

  onGotIt() {
    this.gotIt.set(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#a855f7', '#22d3ee'],
    });
  }
}
