
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-architecture-diagram',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-8 p-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <!-- Title -->
      @if (title()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-6 uppercase tracking-wide text-center"
        >
          {{ title() }}
        </h4>
      }

      <!-- Diagram Content -->
      <div class="relative min-h-[300px]">
        <ng-content></ng-content>
      </div>

      <!-- Legend -->
      @if (showLegend()) {
        <div class="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
          <div class="flex flex-wrap gap-4 justify-center text-xs">
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-600 rounded"
              ></div>
              <span class="text-gray-600 dark:text-gray-400"
                >Application Server</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 bg-green-100 dark:bg-green-900/30 border border-green-600 rounded"
              ></div>
              <span class="text-gray-600 dark:text-gray-400">Database</span>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 bg-orange-100 dark:bg-orange-900/30 border border-orange-600 rounded"
              ></div>
              <span class="text-gray-600 dark:text-gray-400">Cache</span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-500"
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
              <span class="text-gray-600 dark:text-gray-400">Data Flow</span>
            </div>
          </div>
        </div>
      }

      <!-- Description -->
      @if (description()) {
        <div
          class="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center italic"
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
export class ArchitectureDiagramComponent {
  title = input('');
  description = input('');
  showLegend = input(false);
}
