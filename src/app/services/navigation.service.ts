import { computed, effect, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BreadcrumbItem, NavItem } from '../models/nav-item.model';
import { NAVIGATION } from '../navigation.manifest';

/** Display labels for top-level path segments (clean URLs). Only OOP and DSA are main sections. */
const SECTION_LABELS: Record<string, string> = {
  oop: 'OOP',
  dsa: 'DSA',
  'test-components': 'Test Components',
  'test-interactive': 'Test Interactive',
};

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).url),
    ),
    { initialValue: this.router.url },
  );

  navTree = signal<NavItem[]>([]);
  mobileMenuOpen = signal(false);
  breadcrumbs = computed(() => this.buildBreadcrumbs(this.currentRoute()));

  constructor(private router: Router) {
    this.initNavTree();
    effect(() => {
      this.currentRoute();
      this.expandActivePath();
    });
  }

  private initNavTree() {
    this.navTree.set(JSON.parse(JSON.stringify(NAVIGATION)));
    this.expandActivePath();
  }

  /**
   * Expand the section and category that contain the current route so the sidebar shows the active branch.
   */
  private expandActivePath() {
    const url = this.currentRoute();
    this.navTree.update((tree) => {
      tree.forEach((section) => {
        section.expanded = url.startsWith(section.slug);
        section.children?.forEach((category) => {
          category.expanded = url.startsWith(category.slug);
        });
      });
      return [...tree];
    });
  }

  private segmentToLabel(segment: string): string {
    return SECTION_LABELS[segment] ?? this.humanize(segment);
  }

  private humanize(slug: string): string {
    return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  private buildBreadcrumbs(url: string): BreadcrumbItem[] {
    const crumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/', isActive: false },
    ];

    if (url === '/') {
      crumbs[0].isActive = true;
      return crumbs;
    }

    const parts = url.split('/').filter(Boolean);
    let currentPath = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath += `/${part}`;
      const isLast = i === parts.length - 1;
      crumbs.push({
        label: this.segmentToLabel(part),
        path: currentPath,
        isActive: isLast,
      });
    }

    return crumbs;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  toggleExpanded(item: NavItem) {
    item.expanded = !item.expanded;
    this.navTree.update((tree) => [...tree]);
  }

  isActive(slug: string): boolean {
    return this.currentRoute() === slug;
  }

  isParentActive(slug: string): boolean {
    return this.currentRoute().startsWith(slug);
  }
}
