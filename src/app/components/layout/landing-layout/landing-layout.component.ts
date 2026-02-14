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

/**
 * Minimal layout for landing/home page: navbar + full-width content.
 * No left sidebar or right TOC - for pages like the home page.
 */
@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [NavbarComponent, MobileMenuComponent],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <!-- Top Navbar -->
      <app-navbar />

      <!-- Mobile Menu Overlay -->
      <app-mobile-menu />

      <!-- Full-width content area -->
      <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <ng-content />
      </main>

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
export class LandingLayoutComponent {
  navService = inject(NavigationService);
}
