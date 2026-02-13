
import { Component, computed, input } from '@angular/core';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
  | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  template: `
    <span [class]="badgeClasses()">
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');
  size = input<BadgeSize>('md');

  badgeClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();

    const baseClasses = 'inline-flex items-center font-medium rounded-full';

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    const variantClasses = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      success:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      warning:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      purple:
        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      outline:
        'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  });
}
