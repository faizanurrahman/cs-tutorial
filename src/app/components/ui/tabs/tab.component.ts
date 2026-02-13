
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  template: `
    @if (active()) {
      <div class="animate-fadeIn">
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
      }
    `,
  ],
})
export class TabComponent {
  label = input.required<string>();
  active = signal(false);
}
