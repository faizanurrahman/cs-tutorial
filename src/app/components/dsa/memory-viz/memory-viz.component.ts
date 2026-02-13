
import { Component, computed, input } from '@angular/core';
import { MemoryCell, Pointer } from '../../../models/dsa.models';

@Component({
  selector: 'app-memory-viz',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <!-- Title -->
      @if (label()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide"
        >
          {{ label() }}
        </h4>
      }

      <!-- Memory Cells Container -->
      <div class="relative">
        <!-- Cells -->
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          @for (cell of cells(); track cell.index) {
            <div class="flex flex-col items-center">
              <!-- Index Label (Top) -->
              <div
                class="text-xs text-gray-500 dark:text-gray-400 font-mono mb-1 h-4"
              >
                {{ showIndices() ? '[' + cell.index + ']' : '' }}
              </div>

              <!-- Memory Cell Box -->
              <div
                [class]="getCellClasses(cell)"
                [style.background-color]="cell.color"
                class="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center
                       border-2 rounded-lg transition-all duration-300 transform
                       hover:scale-105 hover:shadow-lg"
              >
                <!-- Value -->
                <span class="font-mono font-bold text-base sm:text-lg">
                  {{ formatValue(cell.value) }}
                </span>

                <!-- Custom Label (if provided) -->
                @if (cell.label) {
                  <div
                    class="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full"
                  >
                    {{ cell.label }}
                  </div>
                }
              </div>

              <!-- Memory Address (Bottom) -->
              @if (showAddresses()) {
                <div
                  class="text-xs text-blue-600 dark:text-blue-400 font-mono mt-1 h-4"
                >
                  {{ getAddress(cell.index) }}
                </div>
              }
            </div>
          }
        </div>

        <!-- Pointers (Arrows) -->
        @if (pointers().length > 0) {
          <div
            class="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start"
          >
            @for (pointer of pointers(); track pointer.name) {
              <div class="flex items-center gap-2 text-sm">
                <div
                  class="w-3 h-3 rounded-full"
                  [style.background-color]="pointer.color || '#f43f5e'"
                ></div>
                <span
                  class="font-mono font-semibold"
                  [style.color]="pointer.color || '#f43f5e'"
                >
                  {{ pointer.name }} → [{{ pointer.index }}]
                </span>
              </div>
            }
          </div>
        }
      </div>

      <!-- Legend -->
      @if (showLegend()) {
        <div
          class="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600 flex flex-wrap gap-4 text-xs"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-4 h-4 border-2 border-green-500 bg-green-100 dark:bg-green-900/30 rounded"
            ></div>
            <span class="text-gray-600 dark:text-gray-400">Highlighted</span>
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-4 h-4 border-2 border-gray-300 bg-white dark:bg-gray-800 rounded"
            ></div>
            <span class="text-gray-600 dark:text-gray-400">Normal</span>
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
export class MemoryVizComponent {
  data = input<any[]>([]);
  highlightIndices = input<number[]>([]);
  pointers = input<Pointer[]>([]);
  label = input('');
  description = input('');
  showIndices = input(true);
  showAddresses = input(false);
  showLegend = input(false);
  baseAddress = input(0x1000);

  cells = computed(() => {
    const data = this.data();
    const highlights = this.highlightIndices();

    return data.map(
      (value, index) =>
        ({
          value,
          index,
          highlighted: highlights.includes(index),
        }) as MemoryCell,
    );
  });

  /**
   * Get CSS classes for a cell
   */
  getCellClasses(cell: MemoryCell): string {
    const baseClasses = 'border-2';

    if (cell.highlighted) {
      return `${baseClasses} border-green-500 bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 shadow-lg`;
    }

    return `${baseClasses} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`;
  }

  /**
   * Format cell value for display
   */
  formatValue(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return '—';
    if (typeof value === 'string') return value;
    return String(value);
  }

  /**
   * Get memory address for index
   */
  getAddress(index: number): string {
    const addr = this.baseAddress() + index * 4; // Assume 4-byte integers
    return `0x${addr.toString(16).toUpperCase()}`;
  }
}
