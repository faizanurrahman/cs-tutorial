import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TocHeading } from '../../../models/nav-item.model';

@Component({
  selector: 'app-toc',
  standalone: true,
  imports: [],
  template: `
    <div
      class="relative p-6 sticky top-20 min-h-[200px]
             bg-white/80 dark:bg-slate-900/30 border-l border-slate-200 dark:border-white/5
             dark:backdrop-blur-xl"
      style="mask-image: linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%);"
    >
      <!-- Masked gradient line -->
      <div
        class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent"
        aria-hidden="true"
      ></div>

      <h3
        class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-4 tracking-wider"
      >
        On This Page
      </h3>

      @if (headings().length > 0) {
        <ul class="space-y-1 relative">
          @for (heading of headings(); track heading.id) {
            <li [class.ml-4]="heading.level === 3" class="relative">
              <a
                [href]="'#' + heading.id"
                (click)="scrollToHeading($event, heading.id)"
                class="block text-sm py-2 px-3 -mx-3 rounded-r-md border-l-2 transition-all duration-200 leading-relaxed"
                [class.border-indigo-500]="heading.active"
                [class.bg-indigo-50]="heading.active"
                [class.text-indigo-700]="heading.active"
                [class.dark:bg-indigo-500/10]="heading.active"
                [class.dark:text-indigo-300]="heading.active"
                [class.font-medium]="heading.active"
                [class.border-transparent]="!heading.active"
                [class.text-slate-600]="!heading.active"
                [class.hover:bg-slate-50]="!heading.active"
                [class.hover:text-slate-900]="!heading.active"
                [class.dark:text-slate-400]="!heading.active"
                [class.dark:hover:bg-white/5]="!heading.active"
                [class.dark:hover:text-slate-300]="!heading.active"
              >
                {{ heading.text }}
              </a>
            </li>
          }
        </ul>
      } @else {
        <p class="text-sm text-slate-500 italic">
          No headings found
        </p>
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
export class TocComponent implements OnInit, OnDestroy {
  headings = signal<TocHeading[]>([]);
  private observer?: IntersectionObserver;
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Wait for content to render
    setTimeout(() => {
      this.extractHeadings();
      this.setupIntersectionObserver();
    }, 500);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  /**
   * Extract h2 and h3 headings from page content
   */
  private extractHeadings() {
    const contentArea =
      document.querySelector('article') || document.querySelector('main');

    if (!contentArea) {
      console.warn('No content area found for TOC');
      return;
    }

    const headingElements = contentArea.querySelectorAll('h2, h3');

    const extracted: TocHeading[] = Array.from(headingElements).map((el) => {
      // Ensure heading has an ID
      if (!el.id) {
        el.id = this.generateId(el.textContent || '');
      }

      return {
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1)),
        active: false,
      };
    });

    this.headings.set(extracted);
  }

  /**
   * Setup Intersection Observer to track active heading
   */
  private setupIntersectionObserver() {
    const headingIds = this.headings().map((h) => h.id);

    if (headingIds.length === 0) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px', // Trigger when heading is near top
        threshold: 1.0,
      },
    );

    // Observe all headings
    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        this.observer!.observe(element);
      }
    });
  }

  /**
   * Mark a heading as active
   */
  private setActiveHeading(id: string) {
    this.headings.update((headings) =>
      headings.map((h) => ({
        ...h,
        active: h.id === id,
      })),
    );
  }

  /**
   * Smooth scroll to heading
   */
  scrollToHeading(event: Event, id: string) {
    event.preventDefault();

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky navbar
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL without triggering navigation
      history.pushState(null, '', `#${id}`);
    }
  }

  /**
   * Generate ID from heading text
   */
  private generateId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
