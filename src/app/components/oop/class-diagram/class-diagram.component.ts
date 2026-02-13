
import { Component, input } from '@angular/core';


/**
 * Container for one or more UML class cards (e.g. to show a class diagram with multiple classes).
 * Use as: <app-class-diagram><app-uml-card ...></app-uml-card><app-uml-card ...></app-uml-card></app-class-diagram>
 */
@Component({
  selector: 'app-class-diagram',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-8 p-6 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      @if (title()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide text-center"
        >
          {{ title() }}
        </h4>
      }
      <div
        class="flex flex-wrap gap-8 justify-center items-start"
        [class.flex-col]="layout() === 'vertical'"
      >
        <ng-content></ng-content>
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
export class ClassDiagramComponent {
  title = input('');
  layout = input<'horizontal' | 'vertical'>('horizontal');
}
