
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stack-viz',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <!-- Title -->
      @if (label()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide"
        >
          {{ label() }}
        </h4>
      }

      <div
        class="flex flex-col-reverse items-center gap-2 min-h-[200px] justify-end"
      >
        <!-- Stack Elements (bottom to top) -->
        @for (item of items(); track $index; let i = $index) {
          <div
            [class]="getItemClasses(i)"
            class="w-48 px-4 py-3 rounded-lg border-2 transition-all duration-300 relative"
          >
            <span class="font-mono font-bold text-lg">{{ item }}</span>

            <!-- Top indicator -->
            @if (i === items().length - 1) {
              <div
                class="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center gap-2"
              >
                <svg
                  class="w-6 h-6 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <span
                  class="text-sm font-bold text-orange-600 dark:text-orange-400"
                  >TOP</span
                >
              </div>
            }
          </div>
        }

        <!-- Empty Stack Indicator -->
        @if (items().length === 0) {
          <div class="text-gray-400 dark:text-gray-500 italic py-8">
            Stack is empty
          </div>
        }
      </div>

      <!-- Base Line -->
      <div
        class="w-48 mx-auto mt-2 border-t-4 border-gray-400 dark:border-gray-600"
      ></div>

      <!-- Stats -->
      @if (showStats()) {
        <div
          class="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600 flex gap-6 text-sm justify-center"
        >
          <div>
            <span class="text-gray-500 dark:text-gray-400">Size:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{
              items().length
            }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">Capacity:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{
              maxSize() || '∞'
            }}</span>
          </div>
        </div>
      }

      <!-- Description -->
      @if (description()) {
        <div
          class="mt-4 text-sm text-gray-600 dark:text-gray-400 italic text-center"
        >
          {{ description() }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class StackVizComponent {
  items = input<any[]>([]);
  maxSize = input<number | null>(null);
  label = input('');
  description = input('');
  showStats = input(true);

  getItemClasses(index: number): string {
    const isTop = index === this.items().length - 1;

    if (isTop) {
      return 'border-orange-500 bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 shadow-lg';
    }

    return 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';
  }
}
