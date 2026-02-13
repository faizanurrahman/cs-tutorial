
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav aria-label="Breadcrumb" class="mb-6">
      <ol class="flex items-center space-x-2 text-sm">
        @for (
          crumb of navService.breadcrumbs();
          track crumb.path;
          let isLast = $last
        ) {
          <li class="flex items-center">
            @if (!isLast) {
              <a
                [routerLink]="crumb.path"
                class="text-gray-600 dark:text-gray-400 hover:text-brand-600
                       dark:hover:text-brand-400 transition-colors"
              >
                {{ crumb.label }}
              </a>

              <!-- Separator -->
              <svg
                class="w-4 h-4 mx-2 text-gray-400"
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
            } @else {
              <span class="font-medium text-gray-900 dark:text-white">
                {{ crumb.label }}
              </span>
            }
          </li>
        }
      </ol>
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
export class BreadcrumbsComponent {
  navService = inject(NavigationService);
}
