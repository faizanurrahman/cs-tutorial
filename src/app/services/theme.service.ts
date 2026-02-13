import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Current theme
  theme = signal<Theme>(this.loadThemeFromStorage());

  // Resolved theme (handles 'system' preference)
  resolvedTheme = signal<'light' | 'dark'>('light');

  constructor() {
    // Watch for theme changes and update DOM
    effect(() => {
      this.applyTheme(this.theme());
    });

    // Listen for system theme changes
    this.watchSystemTheme();
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme) {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  /**
   * Toggle between light and dark
   */
  toggleTheme() {
    const current = this.resolvedTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  /**
   * Load theme from localStorage
   */
  private loadThemeFromStorage(): Theme {
    if (typeof window === 'undefined') return 'system';

    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme) {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      root.classList.toggle('dark', systemPrefersDark);
      this.resolvedTheme.set(systemPrefersDark ? 'dark' : 'light');
    } else {
      root.classList.toggle('dark', theme === 'dark');
      this.resolvedTheme.set(theme);
    }
  }

  /**
   * Watch for system theme changes
   */
  private watchSystemTheme() {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
      if (this.theme() === 'system') {
        this.resolvedTheme.set(e.matches ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });
  }
}
