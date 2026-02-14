
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
  host: {
    class: 'block my-8',
  },
  template: `
    <div
      [class]="containerClasses()"
      role="alert"
      class="rounded-2xl overflow-hidden border
             bg-white/70 dark:bg-white/5
             backdrop-blur-xl
             border-slate-200/80 dark:border-white/10
             shadow-lg shadow-slate-200/50 dark:shadow-none"
    >
      <div class="flex items-start gap-4 p-5">
        <!-- Icon in glass pill -->
        <div
          [class]="iconWrapperClasses()"
          class="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
                 bg-white/80 dark:bg-white/10 border border-slate-200/60 dark:border-white/10
                 shadow-inner"
          [innerHTML]="iconSvg()"
        ></div>

        <div class="flex-1 min-w-0">
          @if (displayTitle()) {
            <h4 [class]="titleClasses()">
              {{ displayTitle() }}
            </h4>
          }
          <div [class]="contentClasses()">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CalloutComponent {
  type = input<CalloutType>('note');
  title = input<string>('');

  containerClasses = computed(() => {
    const styles = this.getCalloutStyle(this.type());
    return styles.containerClasses;
  });

  iconWrapperClasses = computed(() => '');

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
        containerClasses: 'border-l-4 border-green-500',
        titleColor: 'text-green-800 dark:text-green-200',
        iconSvg: `
          <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        `,
      },
      note: {
        containerClasses: 'border-l-4 border-blue-500',
        titleColor: 'text-blue-800 dark:text-blue-200',
        iconSvg: `
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        `,
      },
      info: {
        containerClasses: 'border-l-4 border-cyan-500',
        titleColor: 'text-cyan-800 dark:text-cyan-200',
        iconSvg: `
          <svg class="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `,
      },
      warning: {
        containerClasses: 'border-l-4 border-amber-500',
        titleColor: 'text-amber-800 dark:text-amber-200',
        iconSvg: `
          <svg class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        `,
      },
      danger: {
        containerClasses: 'border-l-4 border-red-500',
        titleColor: 'text-red-800 dark:text-red-200',
        iconSvg: `
          <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-7.11 7.25l1.357 1.418A2 2 0 008.282 21h7.436a2 2 0 001.413-3.332l-1.357-1.418M12 2v.01" />
          </svg>
        `,
      },
      success: {
        containerClasses: 'border-l-4 border-emerald-500',
        titleColor: 'text-emerald-800 dark:text-emerald-200',
        iconSvg: `
          <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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