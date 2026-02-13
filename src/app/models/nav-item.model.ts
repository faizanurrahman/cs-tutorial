/**
 * Navigation item structure for sidebar
 */
export interface NavItem {
  /** Display title in navigation */
  title: string;

  /** Relative route path (e.g., '/oop/classes') */
  slug: string;

  /** Optional icon name */
  icon?: string;

  /** Nested sub-items */
  children?: NavItem[];

  /** Is this item currently expanded? */
  expanded?: boolean;

  /** Order for sorting */
  order?: number;

  /** Section label (OOP, DSA, etc.) */
  section?: string;
}

/**
 * Table of Contents heading
 */
export interface TocHeading {
  /** HTML id attribute for anchor link */
  id: string;

  /** Heading text content */
  text: string;

  /** Heading level (2, 3, 4) */
  level: number;

  /** Is this heading currently in viewport? */
  active?: boolean;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  /** Display label */
  label: string;

  /** Route path */
  path: string;

  /** Is this the current page? */
  isActive?: boolean;
}
