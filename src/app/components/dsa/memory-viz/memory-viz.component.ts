import { Component, computed, input } from '@angular/core';
import { MemoryCell, Pointer } from '../../../models/dsa.models';

@Component({
  selector: 'app-memory-viz',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-16 overflow-x-auto pb-8 px-4
             bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 py-6"
    >
      <!-- Container: label + row of cells -->
      <div class="flex items-end gap-1 min-w-max">
        <!-- Variable name label (left) -->
        @if (label()) {
          <div class="mr-6 mb-8 text-right shrink-0">
            <div class="font-mono text-indigo-600 dark:text-indigo-400 text-sm font-bold">
              {{ label() }}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">4 bytes/cell</div>
          </div>
        }

        <!-- Array cells -->
        @for (cell of cells(); track cell.index; let last = $last) {
          <div class="relative group flex flex-col items-center gap-0">
            <!-- 1. Memory address (top) -->
            <div
              class="text-[10px] font-mono text-slate-500 dark:text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity mb-1"
            >
              {{ getAddressHex(cell.index) }}
            </div>

            <!-- 2. The cell (box) -->
            <div
              [class]="getCellClasses(cell)"
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 flex items-center justify-center
                     transition-all duration-300 relative z-10
                     group-hover:border-indigo-500 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]
                     dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]"
            >
              <span class="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                {{ formatValue(cell.value) }}
              </span>
              @if (cell.label) {
                <div
                  class="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded"
                >
                  {{ cell.label }}
                </div>
              }
            </div>

            <!-- 3. Connector line (contiguous memory) -->
            @if (!last) {
              <div
                class="absolute top-[2.6rem] -right-[5px] w-[10px] h-[2px] bg-slate-400 dark:bg-slate-600 z-0"
              ></div>
            }

            <!-- 4. Index (bottom) -->
            <div
              class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold mt-1.5
                     bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400
                     group-hover:bg-indigo-500 group-hover:text-white transition-colors"
            >
              {{ cell.index }}
            </div>
          </div>
        }
      </div>

      <!-- Explainer text -->
      @if (description()) {
        <div class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          <span class="inline-block w-2 h-2 rounded-full bg-indigo-500 mr-2 align-middle"></span>
          {{ description() }}
        </div>
      } @else if (showAddresses() !== false) {
        <div class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          <span class="inline-block w-2 h-2 rounded-full bg-indigo-500 mr-2 align-middle"></span>
          Addresses increase by <strong>4</strong> bytes per cell. This predictability allows <strong>O(1)</strong> access by index.
        </div>
      }

      <!-- Pointers legend -->
      @if (pointers().length > 0) {
        <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 justify-center text-sm">
          @for (pointer of pointers(); track pointer.name) {
            <div class="flex items-center gap-2">
              <div
                class="w-3 h-3 rounded-full"
                [style.background-color]="pointer.color || '#6366f1'"
              ></div>
              <span class="font-mono font-semibold" [style.color]="pointer.color || '#6366f1'">
                {{ pointer.name }} → [{{ pointer.index }}]
              </span>
            </div>
          }
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
  showAddresses = input(true);
  showLegend = input(false);
  baseAddress = input(0x1000);

  cells = computed(() => {
    const data = this.data() ?? [];
    const highlights = this.highlightIndices() ?? [];
    return data.map(
      (value, index) =>
        ({
          value,
          index,
          highlighted: highlights.includes(index),
        }) as MemoryCell,
    );
  });

  getAddressHex(index: number): string {
    const addr = this.baseAddress() + index * 4;
    return '0x' + addr.toString(16).toUpperCase();
  }

  getCellClasses(cell: MemoryCell): string {
    const base =
      'border-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600';
    if (cell.highlighted) {
      return `${base} border-green-500 bg-green-50 dark:bg-green-900/30 shadow-lg`;
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
