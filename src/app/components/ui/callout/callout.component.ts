
import { Component, computed, input } from '@angular/core';

export type CalloutType =
  | 'tip'
  | 'note'
  | 'warning'
  | 'danger'
  | 'info'
  | 'success';

interface CalloutStyle {
  containerClasses: string;
  iconSvg: string;
  titleColor: string;
}

@Component({
  selector: 'app-callout',
  standalone: true,
  imports: [],
  template: `
    <div [class]="containerClasses()" role="alert">
      <!-- Icon and Title Row -->
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div [class]="iconWrapperClasses()" [innerHTML]="iconSvg()"></div>

        <!-- Title and Content -->
        <div class="flex-1 min-w-0">
          @if (displayTitle()) {
            <h4 [class]="titleClasses()">
              {{ displayTitle() }}
            </h4>
          }

          <!-- Content -->
          <div [class]="contentClasses()">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
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
export class CalloutComponent {
  type = input<CalloutType>('note');
  title = input<string>('');

  containerClasses = computed(() => {
    const styles = this.getCalloutStyle(this.type());
    return `${styles.containerClasses} rounded-lg p-4 border-l-4`;
  });

  iconWrapperClasses = computed(() => 'shrink-0 w-5 h-5 mt-0.5');

  titleClasses = computed(() => {
    const styles = this.getCalloutStyle(this.type());
    return `font-bold text-sm mb-2 ${styles.titleColor}`;
  });

  contentClasses = computed(
    () => 'text-sm prose prose-sm dark:prose-invert max-w-none',
  );

  iconSvg = computed(() => this.getCalloutStyle(this.type()).iconSvg);

  /** Resolved title: custom title or default from type */
  displayTitle = computed(
    () => this.title() || this.getDefaultTitle(this.type()),
  );

  private getCalloutStyle(type: CalloutType): CalloutStyle {
    const styles: Record<CalloutType, CalloutStyle> = {
      tip: {
        containerClasses:
          'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-900 dark:text-green-100',
        titleColor: 'text-green-800 dark:text-green-200',
        iconSvg: `
          <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        `,
      },
      note: {
        containerClasses:
          'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-900 dark:text-blue-100',
        titleColor: 'text-blue-800 dark:text-blue-200',
        iconSvg: `
          <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `,
      },
      info: {
        containerClasses:
          'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500 text-cyan-900 dark:text-cyan-100',
        titleColor: 'text-cyan-800 dark:text-cyan-200',
        iconSvg: `
          <svg class="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `,
      },
      warning: {
        containerClasses:
          'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-900 dark:text-yellow-100',
        titleColor: 'text-yellow-800 dark:text-yellow-200',
        iconSvg: `
          <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        `,
      },
      danger: {
        containerClasses:
          'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-100',
        titleColor: 'text-red-800 dark:text-red-200',
        iconSvg: `
          <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `,
      },
      success: {
        containerClasses:
          'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-900 dark:text-emerald-100',
        titleColor: 'text-emerald-800 dark:text-emerald-200',
        iconSvg: `
          <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `,
      },
    };
    return styles[type];
  }

  private getDefaultTitle(type: CalloutType): string {
    const titles: Record<CalloutType, string> = {
      tip: 'TIP',
      note: 'NOTE',
      info: 'INFO',
      warning: 'WARNING',
      danger: 'DANGER',
      success: 'SUCCESS',
    };
    return titles[type];
  }
}