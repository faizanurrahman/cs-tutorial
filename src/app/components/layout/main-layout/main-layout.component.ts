import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TocComponent } from '../toc/toc.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    TocComponent,
    MobileMenuComponent
],
  template: `
    <div class="min-h-screen bg-surface-canvas text-surface-text">
      <!-- Top Navbar -->
      <app-navbar />

      <!-- Mobile Menu Overlay -->
      <app-mobile-menu />

      <!-- Main Grid Layout -->
      <div class="flex max-w-[1800px] mx-auto relative">
        <!-- Left Sidebar (Desktop) -->
        <aside
          class="hidden lg:block w-[280px] sticky top-16 h-[calc(100vh-4rem)]
                 overflow-y-auto border-r border-gray-200 dark:border-gray-700"
        >
          <app-sidebar />
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <article class="max-w-[900px] mx-auto">
            <!-- Content projected from page component -->
            <ng-content />
          </article>
        </main>

        <!-- Right TOC (Desktop XL) -->
        <aside
          class="hidden xl:block w-[240px] sticky top-16 h-[calc(100vh-4rem)]
                 overflow-y-auto border-l border-gray-200 dark:border-gray-700"
        >
          <app-toc />
        </aside>
      </div>

      <!-- Overlay for mobile menu -->
      @if (navService.mobileMenuOpen()) {
        <div
          (click)="navService.closeMobileMenu()"
          class="fixed inset-0 bg-black/50 z-40 lg:hidden"
          [@fadeIn]
        ></div>
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
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MainLayoutComponent {
  navService = inject(NavigationService);
}
