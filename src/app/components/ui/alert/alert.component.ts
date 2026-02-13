
import {
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  template: `
    @if (visible()) {
      <div [class]="alertClasses()" role="alert">
        <div class="flex items-start gap-3">
          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5" [innerHTML]="iconSvg()"></div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            @if (title()) {
              <h4 class="font-semibold text-sm mb-1">{{ title() }}</h4>
            }
            <div class="text-sm">
              <ng-content></ng-content>
            </div>
          </div>

          <!-- Close Button (Optional) -->
          @if (dismissible()) {
            <button
              (click)="dismiss()"
              class="flex-shrink-0 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10
                     transition-colors"
              aria-label="Dismiss alert"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 1.5rem;
      }
    `,
  ],
})
export class AlertComponent {
  variant = input<AlertVariant>('info');
  title = input('');
  dismissible = input(false);
  dismissed = output<void>();

  visible = signal(true);

  alertClasses = computed(() => {
    const variant = this.variant();
    const baseClasses = 'p-4 rounded-lg border';

    const variantClasses = {
      info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
      success:
        'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
      warning:
        'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
      danger:
        'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  });

  iconSvg = computed(() => {
    const variant = this.variant();
    const icons = {
      info: `<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,
      success: `<svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,
      warning: `<svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>`,
      danger: `<svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,
    };

    return icons[variant];
  });

  dismiss() {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
