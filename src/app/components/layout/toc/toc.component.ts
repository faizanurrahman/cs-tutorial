import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TocHeading } from '../../../models/nav-item.model';

@Component({
  selector: 'app-toc',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 sticky top-20">
      <h3
        class="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-4 tracking-wider"
      >
        On This Page
      </h3>

      @if (headings().length > 0) {
        <ul class="space-y-2">
          @for (heading of headings(); track heading.id) {
            <li [class.ml-4]="heading.level === 3">
              <a
                [href]="'#' + heading.id"
                (click)="scrollToHeading($event, heading.id)"
                [class.text-brand-600]="heading.active"
                [class.dark:text-brand-400]="heading.active"
                [class.font-medium]="heading.active"
                [class.text-gray-600]="!heading.active"
                [class.dark:text-gray-400]="!heading.active"
                class="block text-sm hover:text-brand-600 dark:hover:text-brand-400
                       transition-colors leading-relaxed"
              >
                {{ heading.text }}
              </a>
            </li>
          }
        </ul>
      } @else {
        <p class="text-sm text-gray-400 dark:text-gray-500 italic">
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
