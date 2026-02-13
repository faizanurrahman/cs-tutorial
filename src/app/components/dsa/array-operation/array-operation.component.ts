
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-array-operation',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      @if (label()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
        >
          {{ label() }}
        </h4>
      }
      @if (operationLabel()) {
        <div
          class="inline-block px-3 py-1.5 mb-4 rounded-lg bg-amber-200/80 dark:bg-amber-800/50 text-amber-900 dark:text-amber-100 font-mono text-sm font-semibold"
        >
          {{ operationLabel() }}
        </div>
      }
      <div class="flex flex-wrap gap-2 justify-center sm:justify-start items-end">
        @for (cell of cells(); track cell.index) {
          <div class="flex flex-col items-center">
            <div
              class="text-xs text-gray-500 dark:text-gray-400 font-mono mb-1 h-4"
            >
              [{{ cell.index }}]
            </div>
            <div
              [class]="getCellClasses(cell)"
              class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border-2 rounded-lg font-mono font-bold text-base transition-all"
            >
              {{ formatValue(cell.value) }}
            </div>
          </div>
        }
      </div>
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
export class ArrayOperationComponent {
  /** Accepts array or JSON string (e.g. from markdown attributes) */
  data = input<any[] | string>([]);
  /** Indices to highlight; accepts array or JSON string */
  highlightIndices = input<number[] | string>([]);
  /** Short label for the current operation, e.g. "Swap(0, 1)", "Compare(i, j)" */
  operationLabel = input('');
  label = input('');
  description = input('');

  parsedData = computed(() => {
    const raw = this.data();
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string' && raw.trim()) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  parsedHighlightIndices = computed(() => {
    const raw = this.highlightIndices();
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string' && raw.trim()) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  cells = computed(() => {
    const data = this.parsedData();
    const highlights = this.parsedHighlightIndices();
    return data.map((value, index) => ({
      value,
      index,
      highlighted: highlights.includes(index),
    }));
  });

  getCellClasses(cell: { index: number; value: unknown; highlighted: boolean }): string {
    const base =
      'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';
    if (cell.highlighted) {
      return 'border-amber-500 bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100 shadow-lg';
    }
    return base;
  }

  formatValue(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return '—';
    if (typeof value === 'string') return value;
    return String(value);
  }
}
