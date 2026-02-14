import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="py-6 px-4">
      <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-4">
        Contents
      </p>
      <ul class="space-y-0.5">
        @for (section of navService.navTree(); track section.slug) {
          <li>
            <!-- Section row: link + expand -->
            <div
              class="group flex items-center gap-1 rounded-lg transition-colors"
            >
              <a
                [routerLink]="section.slug"
                routerLinkActive="text-indigo-600 dark:text-indigo-400 font-semibold"
                class="flex-1 min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium
                       text-slate-700 dark:text-slate-300
                       hover:bg-slate-100 dark:hover:bg-white/5
                       hover:text-slate-900 dark:hover:text-slate-100
                       transition-colors truncate"
                (click)="$event.stopPropagation()"
              >
                {{ section.title }}
              </a>
              @if (section.children && section.children.length > 0) {
                <button
                  (click)="navService.toggleExpanded(section); $event.preventDefault()"
                  type="button"
                  class="shrink-0 p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  [class.rotate-90]="section.expanded"
                  aria-label="Toggle section"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              }
            </div>

            @if (section.expanded && section.children) {
              <ul class="ml-2 mt-0.5 pl-4 border-l-2 border-slate-200 dark:border-slate-700/80 space-y-0.5">
                @for (item of section.children; track item.slug) {
                  <li>
                    @if (item.children && item.children.length > 0) {
                      <div class="group flex items-center gap-1">
                        <a
                          [routerLink]="item.slug"
                          routerLinkActive="text-indigo-600 dark:text-indigo-400 font-medium"
                          class="flex-1 min-w-0 py-2 px-3 rounded-lg text-sm
                                 text-slate-600 dark:text-slate-400
                                 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors truncate"
                          (click)="$event.stopPropagation()"
                        >
                          {{ item.title }}
                        </a>
                        <button
                          (click)="navService.toggleExpanded(item); $event.preventDefault()"
                          type="button"
                          class="shrink-0 p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          [class.rotate-90]="item.expanded"
                          aria-label="Toggle"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      @if (item.expanded) {
                        <ul class="ml-2 space-y-0.5">
                          @for (child of item.children; track child.slug) {
                            <li>
                              <a
                                [routerLink]="child.slug"
                                routerLinkActive="sidebar-link-active"
                                [routerLinkActiveOptions]="{ exact: true }"
                                class="block py-1.5 px-3 rounded-lg text-sm
                                       text-slate-600 dark:text-slate-400
                                       hover:bg-slate-100 dark:hover:bg-white/5
                                       hover:text-slate-900 dark:hover:text-slate-100
                                       transition-colors"
                              >
                                {{ child.title }}
                              </a>
                            </li>
                          }
                        </ul>
                      }
                    } @else {
                      <a
                        [routerLink]="item.slug"
                        routerLinkActive="sidebar-link-active"
                        [routerLinkActiveOptions]="{ exact: true }"
                        class="block py-2 px-3 rounded-lg text-sm
                               text-slate-600 dark:text-slate-400
                               hover:bg-slate-100 dark:hover:bg-white/5
                               hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
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

      <div class="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-700/50">
        <p class="text-xs text-slate-400 dark:text-slate-500 px-3">v1.0.0</p>
      </div>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host ::ng-deep .sidebar-link-active {
        background: rgba(99, 102, 241, 0.1);
        color: rgb(99, 102, 241);
        font-weight: 500;
        border-left: 2px solid rgb(99, 102, 241);
        margin-left: -2px;
        padding-left: calc(0.75rem + 2px);
      }
      :host-context(.dark) ::ng-deep .sidebar-link-active {
        background: rgba(129, 140, 248, 0.15);
        color: rgb(165, 180, 252);
      }
    `,
  ],
})
export class SidebarComponent {
  navService = inject(NavigationService);
}
