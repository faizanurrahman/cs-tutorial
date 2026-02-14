
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav
      class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left: Logo + Mobile Menu Toggle -->
          <div class="flex items-center gap-4">
            <!-- Mobile Menu Button -->
            <button
              (click)="navService.toggleMobileMenu()"
              class="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-colors"
              aria-label="Toggle menu"
            >
              @if (navService.mobileMenuOpen()) {
                <!-- X Icon -->
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              } @else {
                <!-- Hamburger Icon -->
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              }
            </button>

            <!-- Logo -->
            <a routerLink="/" class="flex items-center gap-3 group">
              <div
                class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700
                          rounded-lg flex items-center justify-center
                          group-hover:scale-110 transition-transform"
              >
                <span class="text-white font-bold text-lg">CS</span>
              </div>
              <span
                class="hidden sm:block font-bold text-lg text-gray-900 dark:text-white"
              >
                CS Tutorial Platform
              </span>
            </a>
          </div>

          <!-- Center: Desktop Navigation -->
          <div class="hidden md:flex items-center gap-6">
            <a
              routerLink="/oop"
              routerLinkActive="text-brand-600 dark:text-brand-400"
              class="text-sm font-medium text-gray-700 dark:text-gray-300
                      hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              OOP
            </a>
            <a
              routerLink="/dsa/arrays/intro"
              routerLinkActive="text-brand-600 dark:text-brand-400"
              class="text-sm font-medium text-gray-700 dark:text-gray-300
                      hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Data Structures
            </a>
            <a
              routerLink="/dsa/arrays/intro"
              routerLinkActive="text-brand-600 dark:text-brand-400"
              class="text-sm font-medium text-gray-700 dark:text-gray-300
                      hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Algorithms
            </a>
          </div>

          <!-- Right: Search + Theme Toggle -->
          <div class="flex items-center gap-2">
            <!-- Search Button (Placeholder) -->
            <button
              class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-colors"
              aria-label="Search"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <!-- Theme Toggle -->
            <button
              (click)="themeService.toggleTheme()"
              class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-colors"
              [attr.aria-label]="
                'Switch to ' +
                (themeService.resolvedTheme() === 'light' ? 'dark' : 'light') +
                ' mode'
              "
            >
              @if (themeService.resolvedTheme() === 'light') {
                <!-- Moon Icon (Dark Mode) -->
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              } @else {
                <!-- Sun Icon (Light Mode) -->
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
            </button>

            <!-- GitHub Link -->
            <a
              href="https://github.com/yourusername/cs-tutorial-platform"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800
                      transition-colors"
              aria-label="View on GitHub"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
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
export class NavbarComponent {
  navService = inject(NavigationService);
  themeService = inject(ThemeService);
}
