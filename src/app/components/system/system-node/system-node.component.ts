
import { Component, computed, input } from '@angular/core';

export type SystemNodeType =
  | 'server'
  | 'database'
  | 'cache'
  | 'loadbalancer'
  | 'queue'
  | 'cdn'
  | 'api'
  | 'client'
  | 'storage'
  | 'firewall';

@Component({
  selector: 'app-system-node',
  standalone: true,
  imports: [],
  template: `
    <div [class]="containerClasses()">
      <!-- Icon -->
      <div [class]="iconWrapperClasses()" [innerHTML]="iconSvg()"></div>

      <!-- Label -->
      <div class="text-center mt-2">
        <div class="font-semibold text-sm">{{ label() }}</div>
        @if (sublabel()) {
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {{ sublabel() }}
          </div>
        }
      </div>

      <!-- Badge (Optional) -->
      @if (badge()) {
        <div
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
        >
          {{ badge() }}
        </div>
      }

      <!-- Status Indicator (Optional) -->
      @if (status()) {
        <div [class]="statusClasses()" [title]="status()"></div>
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
export class SystemNodeComponent {
  type = input<SystemNodeType>('server');
  label = input('Node');
  sublabel = input('');
  badge = input('');
  status = input<'active' | 'inactive' | 'error' | ''>('');
  highlighted = input(false);

  containerClasses = computed(() => {
    const isHighlighted = this.highlighted();
    const baseClasses =
      'relative inline-flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer';

    if (isHighlighted) {
      return `${baseClasses} border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-lg`;
    }

    return `${baseClasses} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-brand-400 hover:shadow-md`;
  });

  iconWrapperClasses = computed(() => {
    const type = this.type();
    const colors = this.getTypeColor(type);
    return `w-16 h-16 rounded-lg flex items-center justify-center ${colors}`;
  });

  iconSvg = computed(() => {
    const type = this.type();
    return this.getIconSvg(type);
  });

  statusClasses = computed(() => {
    const status = this.status();
    const baseClasses =
      'absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800';

    const statusColors = {
      active: 'bg-green-500',
      inactive: 'bg-gray-400',
      error: 'bg-red-500',
      '': 'hidden',
    };

    return `${baseClasses} ${statusColors[status]}`;
  });

  private getTypeColor(type: SystemNodeType): string {
    const colors: Record<SystemNodeType, string> = {
      server:
        'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      database:
        'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      cache:
        'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      loadbalancer:
        'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      queue:
        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      cdn: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
      api: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
      client: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
      storage:
        'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
      firewall: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    };

    return colors[type];
  }

  private getIconSvg(type: SystemNodeType): string {
    const icons: Record<SystemNodeType, string> = {
      server: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>`,

      database: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>`,

      cache: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>`,

      loadbalancer: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>`,

      queue: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>`,

      cdn: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,

      api: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>`,

      client: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>`,

      storage: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>`,

      firewall: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>`,
    };

    return icons[type];
  }
}
