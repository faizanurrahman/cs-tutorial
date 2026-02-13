
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="p-6">
      <!-- Navigation Tree -->
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

              <!-- Expand/Collapse Icon -->
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
                    @if (item.children && item.children.length > 0) {
                      <!-- Category with children -->
                      <button
                        (click)="navService.toggleExpanded(item)"
                        class="w-full flex items-center justify-between px-3 py-1.5 rounded-md
                               text-sm font-medium text-gray-700 dark:text-gray-300
                               hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>{{ item.title }}</span>
                        <svg
                          class="w-3 h-3 transition-transform"
                          [class.rotate-90]="item.expanded"
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

                      <!-- Nested children -->
                      @if (item.expanded) {
                        <ul class="ml-3 mt-1 space-y-1">
                          @for (child of item.children; track child.slug) {
                            <li>
                              <a
                                [routerLink]="child.slug"
                                routerLinkActive="bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 font-medium"
                                [routerLinkActiveOptions]="{ exact: true }"
                                class="block px-3 py-1.5 rounded-md text-sm
                                       text-gray-600 dark:text-gray-400
                                       hover:bg-gray-100 dark:hover:bg-gray-800
                                       hover:text-gray-900 dark:hover:text-white
                                       transition-colors"
                              >
                                {{ child.title }}
                              </a>
                            </li>
                          }
                        </ul>
                      }
                    } @else {
                      <!-- Direct page link -->
                      <a
                        [routerLink]="item.slug"
                        routerLinkActive="bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 font-medium"
                        [routerLinkActiveOptions]="{ exact: true }"
                        class="block px-3 py-1.5 rounded-md text-sm
                               text-gray-600 dark:text-gray-400
                               hover:bg-gray-100 dark:hover:bg-gray-800
                               hover:text-gray-900 dark:hover:text-white
                               transition-colors"
                      >
                        {{ item.title }}
                      </a>
                    }
                  </li>
                }
              </ul>
            }
          </li>
        }
      </ul>

      <!-- Version Info (Optional) -->
      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs text-gray-500 dark:text-gray-400">Version 1.0.0</p>
      </div>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class SidebarComponent {
  navService = inject(NavigationService);
}
