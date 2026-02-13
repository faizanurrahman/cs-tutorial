
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- Mobile Sidebar Drawer -->
    <aside
      [class.translate-x-0]="navService.mobileMenuOpen()"
      [class.-translate-x-full]="!navService.mobileMenuOpen()"
      class="fixed top-16 left-0 bottom-0 w-[280px] bg-white dark:bg-gray-900
             border-r border-gray-200 dark:border-gray-700
             transform transition-transform duration-300 ease-in-out
             overflow-y-auto z-50 lg:hidden"
    >
      <nav class="p-6">
        <ul class="space-y-1">
          @for (section of navService.navTree(); track section.slug) {
            <li>
              <!-- Section Header -->
              <button
                (click)="navService.toggleExpanded(section)"
                class="w-full flex items-center justify-between px-3 py-2 rounded-md
                       text-sm font-semibold text-gray-900 dark:text-white
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{{ section.title }}</span>

                <svg
                  class="w-4 h-4 transition-transform"
                  [class.rotate-90]="section.expanded"
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
              </button>

              <!-- Section Children -->
              @if (section.expanded && section.children) {
                <ul
                  class="ml-3 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3"
                >
                  @for (item of section.children; track item.slug) {
                    <li>
                      <a
                        [routerLink]="item.slug"
                        (click)="navService.closeMobileMenu()"
                        routerLinkActive="bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400"
                        class="block px-3 py-1.5 rounded-md text-sm
                               text-gray-600 dark:text-gray-400
                               hover:bg-gray-100 dark:hover:bg-gray-800
                               transition-colors"
                      >
                        {{ item.title }}
                      </a>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        </ul>
      </nav>
    </aside>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class MobileMenuComponent {
  navService = inject(NavigationService);
}
