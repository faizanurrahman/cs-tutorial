
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [],
  template: `
    <div [class]="nodeClasses()" [style.background-color]="color()">
      <span class="font-mono font-bold text-base">
        {{ displayValue() }}
      </span>
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
export class TreeNodeComponent {
  value = input<any>(null);
  highlighted = input(false);
  color = input<string | undefined>(undefined);

  displayValue = computed(() => {
    const val = this.value();
    if (val === null) return 'ø';
    if (val === undefined) return '—';
    return String(val);
  });

  nodeClasses = computed(() => {
    const isHighlighted = this.highlighted();
    const baseClasses =
      'w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md';

    if (isHighlighted) {
      return `${baseClasses} border-teal-500 bg-teal-100 dark:bg-teal-900/50 text-teal-900 dark:text-teal-100 shadow-lg`;
    }

    return `${baseClasses} border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`;
  });
}
