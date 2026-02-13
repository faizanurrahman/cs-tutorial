
import { Component, computed, input } from '@angular/core';

export type FlowDirection = 'right' | 'left' | 'down' | 'up' | 'bidirectional';

@Component({
  selector: 'app-data-flow',
  standalone: true,
  imports: [],
  template: `
    <div [class]="containerClasses()" [title]="label()">
      <!-- Arrow SVG -->
      <div [innerHTML]="arrowSvg()"></div>

      <!-- Label (Optional) -->
      @if (label() && showLabel()) {
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium whitespace-nowrap
                    border border-gray-300 dark:border-gray-600"
        >
          {{ label() }}
        </div>
      }
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
export class DataFlowComponent {
  direction = input<FlowDirection>('right');
  label = input('');
  showLabel = input(true);
  animated = input(false);
  color = input('#6b7280');

  containerClasses = computed(() => {
    const baseClasses = 'relative inline-flex items-center justify-center';
    return baseClasses;
  });

  arrowSvg = computed(() => {
    const direction = this.direction();
    const color = this.color();
    const animated = this.animated();

    const animationClass = animated ? 'arrow-animated' : '';

    const arrows: Record<FlowDirection, string> = {
      right: `
        <svg class="${animationClass}" width="120" height="40" viewBox="0 0 120 40" fill="none">
          <defs>
            <marker id="arrowhead-right" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="${color}" />
            </marker>
          </defs>
          <line x1="0" y1="20" x2="115" y2="20" stroke="${color}" stroke-width="2"
                stroke-dasharray="${animated ? '5,5' : 'none'}" marker-end="url(#arrowhead-right)">
            ${animated ? '<animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />' : ''}
          </line>
        </svg>
      `,
      left: `
        <svg class="${animationClass}" width="120" height="40" viewBox="0 0 120 40" fill="none">
          <defs>
            <marker id="arrowhead-left" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto">
              <polygon points="10 0, 0 3, 10 6" fill="${color}" />
            </marker>
          </defs>
          <line x1="115" y1="20" x2="5" y2="20" stroke="${color}" stroke-width="2"
                stroke-dasharray="${animated ? '5,5' : 'none'}" marker-end="url(#arrowhead-left)">
            ${animated ? '<animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />' : ''}
          </line>
        </svg>
      `,
      down: `
        <svg class="${animationClass}" width="40" height="120" viewBox="0 0 40 120" fill="none">
          <defs>
            <marker id="arrowhead-down" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto">
              <polygon points="0 0, 6 10, 3 0" fill="${color}" />
            </marker>
          </defs>
          <line x1="20" y1="0" x2="20" y2="115" stroke="${color}" stroke-width="2"
                stroke-dasharray="${animated ? '5,5' : 'none'}" marker-end="url(#arrowhead-down)">
            ${animated ? '<animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />' : ''}
          </line>
        </svg>
      `,
      up: `
        <svg class="${animationClass}" width="40" height="120" viewBox="0 0 40 120" fill="none">
          <defs>
            <marker id="arrowhead-up" markerWidth="10" markerHeight="10" refX="3" refY="1" orient="auto">
              <polygon points="0 10, 6 0, 3 10" fill="${color}" />
            </marker>
          </defs>
          <line x1="20" y1="115" x2="20" y2="5" stroke="${color}" stroke-width="2"
                stroke-dasharray="${animated ? '5,5' : 'none'}" marker-end="url(#arrowhead-up)">
            ${animated ? '<animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />' : ''}
          </line>
        </svg>
      `,
      bidirectional: `
        <svg class="${animationClass}" width="120" height="40" viewBox="0 0 120 40" fill="none">
          <defs>
            <marker id="arrowhead-bi-left" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto">
              <polygon points="10 0, 0 3, 10 6" fill="${color}" />
            </marker>
            <marker id="arrowhead-bi-right" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="${color}" />
            </marker>
          </defs>
          <line x1="5" y1="20" x2="115" y2="20" stroke="${color}" stroke-width="2"
                marker-start="url(#arrowhead-bi-left)" marker-end="url(#arrowhead-bi-right)" />
        </svg>
      `,
    };

    return arrows[direction];
  });
}
