import { injectContentFiles } from '@analogjs/content';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { BreadcrumbItem, NavItem } from '../models/nav-item.model';

interface NavContentAttributes {
  title: string;
  order?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly platformId = inject(PLATFORM_ID);

  // Current route signal
  private currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).url),
    ),
    { initialValue: this.router.url },
  );

  // Navigation tree (computed from content files)
  navTree = signal<NavItem[]>([]);

  // Mobile menu state
  mobileMenuOpen = signal(false);

  // Current breadcrumbs
  breadcrumbs = computed(() => this.buildBreadcrumbs(this.currentRoute()));

  constructor(private router: Router) {
    // Only build nav tree in browser; injectContentFiles is not available during SSR/prerender
    if (isPlatformBrowser(this.platformId)) {
      this.buildNavigationTree();
    }
  }

  /**
   * Build navigation tree from content files
   */
  private buildNavigationTree() {
    let files: { slug: string; attributes: NavContentAttributes }[] | undefined;
    try {
      files = injectContentFiles<NavContentAttributes>();
    } catch {
      this.navTree.set([]);
      return;
    }

    if (!files || files.length === 0) {
      console.warn('No content files found');
      this.navTree.set([]);
      return;
    }

    const tree: NavItem[] = [];
    const sectionMap = new Map<string, NavItem>();

    // Sort files by slug
    const sortedFiles = [...files].sort((a, b) => a.slug.localeCompare(b.slug));

    // Track which sections/categories have an index.md so we link to .../index
    const sectionHasIndex = new Set<string>();
    const categoryHasIndex = new Set<string>(); // key: "sectionSlug/categorySlug"
    for (const file of sortedFiles) {
      const parts = file.slug.split('/').filter(Boolean);
      if (parts.length === 2 && parts[1] === 'index') {
        sectionHasIndex.add(parts[0]);
      } else if (parts.length === 3 && parts[2] === 'index') {
        categoryHasIndex.add(`${parts[0]}/${parts[1]}`);
      }
    }

    for (const file of sortedFiles) {
      const parts = file.slug.split('/').filter(Boolean);

      if (parts.length === 0) continue;

      // Extract section (e.g., '1-oop' -> 'OOP')
      const sectionSlug = parts[0];
      const sectionName = this.extractSectionName(sectionSlug);

      // Create or get section
      if (!sectionMap.has(sectionSlug)) {
        const section: NavItem = {
          title: sectionName,
          // Section index lives at content/<section>/index.md → slug "section/index"
          slug: sectionHasIndex.has(sectionSlug) ? `/${sectionSlug}/index` : `/${sectionSlug}`,
          children: [],
          expanded: false,
          section: sectionName,
          order: this.extractOrder(sectionSlug),
        };
        sectionMap.set(sectionSlug, section);
        tree.push(section);
      }

      const section = sectionMap.get(sectionSlug)!;

      if (parts.length === 1) {
        // Top-level page in section (single-segment slug)
        continue;
      }
      if (parts.length === 2 && parts[1] === 'index') {
        // Section index page; section link already points to /section/index
        continue;
      }

      if (parts.length === 2) {
        // Direct child of section (e.g., 1-oop/classes.md)
        const pageSlug = parts[1].replace(/\.md$/, '');
        section.children!.push({
          title: file.attributes.title || this.humanize(pageSlug),
          slug: `/${sectionSlug}/${pageSlug}`,
          order: file.attributes.order || 999,
        });
      } else if (parts.length === 3) {
        // Nested item (e.g., 1-oop/1-concepts/classes.md) or category index (1-oop/1-fundamentals/index)
        const categorySlug = parts[1];
        const pageSlug = parts[2].replace(/\.md$/, '');
        const categoryKey = `${sectionSlug}/${categorySlug}`;
        const baseCategorySlug = `/${sectionSlug}/${categorySlug}`;
        const categorySlugWithIndex = categoryHasIndex.has(categoryKey)
          ? `${baseCategorySlug}/index`
          : baseCategorySlug;

        // Find or create category (match by base path; slug may be .../index when index exists)
        let category = section.children!.find(
          (c) => c.slug === baseCategorySlug || c.slug === `${baseCategorySlug}/index`,
        );

        if (!category) {
          category = {
            title: this.extractSectionName(categorySlug),
            slug: categorySlugWithIndex,
            children: [],
            expanded: false,
            order: this.extractOrder(categorySlug),
          };
          section.children!.push(category);
        }

        if (pageSlug !== 'index') {
          category.children!.push({
            title: file.attributes.title || this.humanize(pageSlug),
            slug: `/${sectionSlug}/${categorySlug}/${pageSlug}`,
            order: file.attributes.order || 999,
          });
        }
      }
    }

    // Sort all levels by order
    this.sortNavTree(tree);

    this.navTree.set(tree);
  }

  /**
   * Recursively sort navigation tree by order
   */
  private sortNavTree(items: NavItem[]) {
    items.sort((a, b) => (a.order || 999) - (b.order || 999));

    for (const item of items) {
      if (item.children) {
        this.sortNavTree(item.children);
      }
    }
  }

  /**
   * Extract section name from slug (e.g., '1-oop' -> 'OOP')
   */
  private extractSectionName(slug: string): string {
    const match = slug.match(/^\d+-(.+)$/);
    if (match) {
      return match[1]
        .split('-')
        .map((word) => word.toUpperCase())
        .join(' ');
    }
    return this.humanize(slug);
  }

  /**
   * Extract order number from slug (e.g., '1-oop' -> 1)
   */
  private extractOrder(slug: string): number {
    const match = slug.match(/^(\d+)-/);
    return match ? parseInt(match[1], 10) : 999;
  }

  /**
   * Convert slug to human-readable format
   */
  private humanize(slug: string): string {
    return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  /**
   * Build breadcrumbs from current route
   */
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
        label: this.extractSectionName(part),
        path: currentPath,
        isActive: isLast,
      });
    }

    return crumbs;
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    this.mobileMenuOpen.update((open) => !open);
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  /**
   * Toggle section/category expansion
   */
  toggleExpanded(item: NavItem) {
    item.expanded = !item.expanded;
    this.navTree.update((tree) => [...tree]); // Trigger change detection
  }

  /**
   * Check if route is active
   */
  isActive(slug: string): boolean {
    return this.currentRoute() === slug;
  }

  /**
   * Check if route is a parent of current route
   */
  isParentActive(slug: string): boolean {
    return this.currentRoute().startsWith(slug);
  }
}
