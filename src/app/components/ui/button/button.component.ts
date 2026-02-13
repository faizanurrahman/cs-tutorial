import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule, NgTemplateOutlet],
  template: `
    @if (href()) {
      <a
        [routerLink]="href()"
        [class]="buttonClasses()"
        [attr.disabled]="isDisabled() ? true : null"
      >
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </a>
    } @else {
      <button [type]="type()" [disabled]="isDisabled()" [class]="buttonClasses()">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    }

    <ng-template #content>
      @if (loading()) {
        <svg
          class="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      }
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false);
  loading = input(false);
  href = input('');
  type = input<'button' | 'submit' | 'reset'>('button');

  isDisabled = computed(() => this.disabled() || this.loading());

  buttonClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const isDisabled = this.isDisabled();

    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary:
        'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 focus:ring-brand-500',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:ring-gray-500',
      outline:
        'border-2 border-brand-500 text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-900/20 focus:ring-brand-500',
      ghost:
        'text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700 focus:ring-gray-500',
      danger:
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${isDisabled ? disabledClasses : ''}`;
  });
}
