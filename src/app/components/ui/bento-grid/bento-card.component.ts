
import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export type BentoCardVariant = 'default' | 'feature' | 'highlight' | 'minimal';

@Component({
  selector: 'app-bento-card',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div [class]="cardClasses()" [attr.role]="'listitem'">
      <!-- Icon (Optional) -->
      @if (icon()) {
        <div [class]="iconWrapperClasses()">
          <div [innerHTML]="iconSvg()"></div>
        </div>
      }

      <!-- Title -->
      @if (title()) {
        <h3 [class]="titleClasses()">
          {{ title() }}
        </h3>
      }

      <!-- Description -->
      @if (description()) {
        <p [class]="descriptionClasses()">
          {{ description() }}
        </p>
      }

      <!-- Content Slot -->
      <div class="mt-3">
        <ng-content></ng-content>
      </div>

      <!-- Link (Optional) -->
      @if (href()) {
        <a
          [routerLink]="href()"
          [class]="linkClasses()"
          [attr.aria-label]="'Navigate to ' + title()"
        >
          {{ linkText() || 'Learn more' }}
          <svg
            class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
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
export class BentoCardComponent {
  title = input('');
  description = input('');
  icon = input('');
  href = input('');
  linkText = input('');
  variant = input<BentoCardVariant>('default');

  cardClasses = computed(() => {
    const variant = this.variant();
    const baseClasses =
      'group relative p-6 rounded-xl border transition-all duration-200';

    const variantClasses = {
      default:
        'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand-500 hover:shadow-lg',
      feature:
        'bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 border-brand-200 dark:border-brand-800 hover:shadow-xl',
      highlight:
        'bg-brand-500 text-white border-brand-600 hover:bg-brand-600 hover:shadow-xl',
      minimal:
        'bg-transparent border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50',
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  });

  iconWrapperClasses = computed(() => {
    const variant = this.variant();
    const baseClasses =
      'w-12 h-12 rounded-lg flex items-center justify-center mb-4';

    const variantClasses = {
      default: 'bg-brand-100 dark:bg-brand-900/30',
      feature: 'bg-brand-200 dark:bg-brand-800/50',
      highlight: 'bg-white/20',
      minimal: 'bg-gray-100 dark:bg-gray-800',
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  });

  titleClasses = computed(() => {
    const variant = this.variant();
    const baseClasses = 'text-lg font-semibold mb-2';

    const variantClasses = {
      default: 'text-gray-900 dark:text-white',
      feature: 'text-brand-900 dark:text-brand-100',
      highlight: 'text-white',
      minimal: 'text-gray-900 dark:text-white',
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  });

  descriptionClasses = computed(() => {
    const variant = this.variant();
    const baseClasses = 'text-sm leading-relaxed';

    const variantClasses = {
      default: 'text-gray-600 dark:text-gray-400',
      feature: 'text-brand-700 dark:text-brand-300',
      highlight: 'text-white/90',
      minimal: 'text-gray-600 dark:text-gray-400',
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  });

  linkClasses = computed(() => {
    const variant = this.variant();
    const baseClasses =
      'inline-flex items-center text-sm font-medium mt-4 transition-colors';

    const variantClasses = {
      default:
        'text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300',
      feature:
        'text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200',
      highlight: 'text-white hover:text-white/80',
      minimal: 'text-brand-600 hover:text-brand-700 dark:text-brand-400',
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  });

  iconSvg = computed(() => {
    const iconName = this.icon();
    return this.getIconSvg(iconName);
  });

  /**
   * Get SVG icon by name
   */
  private getIconSvg(name: string): string {
    const icons: Record<string, string> = {
      code: `<svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>`,
      book: `<svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>`,
      lightning: `<svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>`,
      database: `<svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>`,
      chart: `<svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>`,
    };

    return icons[name] || '';
  }
}
