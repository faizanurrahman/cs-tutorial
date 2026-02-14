
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-uml-card',
  standalone: true,
  imports: [],
  host: {
    class:
      'block my-8 not-prose border-2 border-gray-800 dark:border-gray-300 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-fit',
  },
  template: `
    <div>
      <!-- Class Name Header -->
      <div [class]="headerClasses()">
        <h4 class="font-mono font-bold text-lg text-center">
          {{ name() }}
        </h4>
        @if (stereotype()) {
          <div class="text-xs text-center mt-1 opacity-80">
            «{{ stereotype() }}»
          </div>
        }
      </div>

      <!-- Fields Section -->
      <div
        class="border-t-2 border-gray-800 dark:border-gray-300 px-6 py-4 min-w-[250px]"
      >
        @if (fields().length > 0) {
          <div class="space-y-1">
            @for (field of fields(); track field) {
              <div class="font-mono text-sm flex items-start">
                <span class="mr-2">{{ getVisibilitySymbol(field) }}</span>
                <span>{{ getFieldText(field) }}</span>
              </div>
            }
          </div>
        } @else {
          <div
            class="text-gray-400 dark:text-gray-500 text-sm italic text-center"
          >
            No fields
          </div>
        }
      </div>

      <!-- Methods Section -->
      <div class="border-t-2 border-gray-800 dark:border-gray-300 px-6 py-4">
        @if (methods().length > 0) {
          <div class="space-y-1">
            @for (method of methods(); track method) {
              <div class="font-mono text-sm flex items-start">
                <span class="mr-2">{{ getVisibilitySymbol(method) }}</span>
                <span>{{ getMethodText(method) }}</span>
              </div>
            }
          </div>
        } @else {
          <div
            class="text-gray-400 dark:text-gray-500 text-sm italic text-center"
          >
            No methods
          </div>
        }
      </div>
    </div>
  `,
  styles: [],
})
export class UmlCardComponent {
  name = input('ClassName');
  fields = input<string[]>([]);
  methods = input<string[]>([]);
  stereotype = input('');
  abstract = input(false);

  headerClasses = computed(() => {
    const isAbstract = this.abstract();
    const baseClasses =
      'px-6 py-3 bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-gray-100';

    if (isAbstract) {
      return `${baseClasses} italic`;
    }

    return baseClasses;
  });

  getVisibilitySymbol(text: string): string {
    if (text.startsWith('+')) return '+';
    if (text.startsWith('-')) return '-';
    if (text.startsWith('#')) return '#';
    if (text.startsWith('~')) return '~';
    return '';
  }

  getFieldText(text: string): string {
    return text.replace(/^[+\-#~]\s*/, '');
  }

  getMethodText(text: string): string {
    return text.replace(/^[+\-#~]\s*/, '');
  }
}
