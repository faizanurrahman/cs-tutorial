
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-queue-viz',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-8 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <!-- Title -->
      @if (label()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-6 uppercase tracking-wide"
        >
          {{ label() }}
        </h4>
      }

      <!-- Queue Visualization -->
      <div class="flex flex-col gap-4">
        <!-- Front/Rear Labels -->
        <div class="flex justify-between text-sm font-bold">
          <span class="text-cyan-600 dark:text-cyan-400"
            >← FRONT (Dequeue)</span
          >
          <span class="text-blue-600 dark:text-blue-400">REAR (Enqueue) →</span>
        </div>

        <!-- Queue Items -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          @if (items().length === 0) {
            <div
              class="flex-1 text-center text-gray-400 dark:text-gray-500 italic py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
            >
              Queue is empty
            </div>
          } @else {
            @for (item of items(); track $index; let i = $index) {
              <div
                [class]="getItemClasses(i)"
                class="min-w-[120px] px-4 py-3 rounded-lg border-2 transition-all duration-300 relative"
              >
                <div class="text-center">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    [{{ i }}]
                  </div>
                  <span class="font-mono font-bold text-lg">{{ item }}</span>
                </div>

                <!-- Front indicator -->
                @if (i === 0) {
                  <div
                    class="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-600 dark:text-cyan-400"
                  >
                    FRONT
                  </div>
                }

                <!-- Rear indicator -->
                @if (i === items().length - 1) {
                  <div
                    class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600 dark:text-blue-400"
                  >
                    REAR
                  </div>
                }
              </div>
            }
          }
        </div>

        <!-- Arrow Direction -->
        <div class="flex items-center gap-2 text-gray-400 dark:text-gray-500">
          <svg
            class="w-full h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 400 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2 12h392m0 0l-10-10m10 10l-10 10"
              stroke-dasharray="5,5"
            />
          </svg>
        </div>
      </div>

      <!-- Stats -->
      @if (showStats()) {
        <div
          class="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600 flex gap-6 text-sm"
        >
          <div>
            <span class="text-gray-500 dark:text-gray-400">Size:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{
              items().length
            }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">Front:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">
              {{ items().length > 0 ? items()[0] : '—' }}
            </span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">Rear:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">
              {{ items().length > 0 ? items()[items().length - 1] : '—' }}
            </span>
          </div>
        </div>
      }

      <!-- Description -->
      @if (description()) {
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
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
export class QueueVizComponent {
  items = input<any[]>([]);
  label = input('');
  description = input('');
  showStats = input(true);

  getItemClasses(index: number): string {
    const isFront = index === 0;
    const isRear = index === this.items().length - 1;

    if (isFront) {
      return 'border-cyan-500 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-100 shadow-lg';
    }

    if (isRear) {
      return 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 shadow-lg';
    }

    return 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';
  }
}
