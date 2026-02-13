
import { Component, computed, input } from '@angular/core';

export type GridColumns = 1 | 2 | 3 | 4;

@Component({
  selector: 'app-bento-grid',
  standalone: true,
  imports: [],
  template: `
    <div [class]="containerClasses()" [attr.role]="'list'">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class BentoGridComponent {
  columns = input<GridColumns>(2);
  gap = input('6');

  containerClasses = computed(() => {
    const cols = this.columns();
    const gap = this.gap();
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };
    return `grid ${gridCols[cols]} gap-${gap}`;
  });
}
