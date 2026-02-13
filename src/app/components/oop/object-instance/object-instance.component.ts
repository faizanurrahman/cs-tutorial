
import { Component, computed, input } from '@angular/core';

export interface ObjectField {
  name: string;
  value: unknown;
  type?: string;
}

@Component({
  selector: 'app-object-instance',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose inline-block my-6 border-2 border-rose-200 dark:border-rose-800
             bg-rose-50/50 dark:bg-rose-900/20 rounded-lg overflow-hidden shadow-lg"
    >
      <!-- Heap / Object header -->
      <div
        class="px-4 py-2 bg-rose-100 dark:bg-rose-900/40 border-b-2 border-rose-200 dark:border-rose-800"
      >
        <span class="text-xs font-mono text-rose-600 dark:text-rose-400 mr-2"
          >@</span
        >
        <span class="font-mono font-bold text-rose-900 dark:text-rose-100">{{
          typeName()
        }}</span>
      </div>
      <!-- Fields -->
      <div class="px-4 py-3 min-w-[200px] space-y-2">
        @for (f of parsedFields(); track f.name) {
          <div class="flex items-baseline gap-2 font-mono text-sm">
            <span class="text-rose-600 dark:text-rose-400">{{ f.name }}:</span>
            <span class="text-gray-800 dark:text-gray-200">{{
              formatValue(f.value)
            }}</span>
            @if (f.type) {
              <span class="text-xs text-gray-500 dark:text-gray-400"
                >({{ f.type }})</span
              >
            }
          </div>
        }
        @if (parsedFields().length === 0) {
          <div class="text-gray-500 dark:text-gray-400 text-sm italic">
            No fields
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class ObjectInstanceComponent {
  typeName = input('Object');
  /** Accepts array or JSON string (e.g. from markdown attributes) */
  fields = input<ObjectField[] | string>([]);

  parsedFields = computed(() => {
    const raw = this.fields();
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

  formatValue(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return '—';
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
  }
}
