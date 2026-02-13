
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-linked-list-node',
  standalone: true,
  imports: [],
  template: `
    <div [class]="nodeClasses()" [style.background-color]="color()">
      <!-- Data Section -->
      <div
        class="flex-1 flex items-center justify-center border-r-2 border-current"
      >
        <span class="font-mono font-bold text-lg">
          {{ displayValue() }}
        </span>
      </div>

      <!-- Pointer Section -->
      <div class="w-8 flex items-center justify-center">
        <svg
          class="w-4 h-4"
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
      </div>
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
export class LinkedListNodeComponent {
  value = input<any>(null);
  highlighted = input(false);
  color = input<string | undefined>(undefined);

  displayValue = computed(() => {
    const val = this.value();
    if (val === null) return 'null';
    if (val === undefined) return '—';
    return String(val);
  });

  nodeClasses = computed(() => {
    const isHighlighted = this.highlighted();
    const baseClasses =
      'flex w-24 h-16 border-2 rounded-lg transition-all duration-300 transform hover:scale-105';

    if (isHighlighted) {
      return `${baseClasses} border-pink-500 bg-pink-100 dark:bg-pink-900/30 text-pink-900 dark:text-pink-100 shadow-lg`;
    }

    return `${baseClasses} border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`;
  });
}
