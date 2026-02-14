import type { NavItem } from './models/nav-item.model';

export const NAVIGATION: NavItem[] = [
  {
    title: 'OOP',
    slug: '/oop/index',
    order: 1,
    section: 'OOP',
    children: [
      {
        title: 'Fundamentals',
        slug: '/oop/fundamentals/encapsulation',
        order: 1,
        children: [
          { title: 'Encapsulation', slug: '/oop/fundamentals/encapsulation', order: 3 },
        ],
      },
      {
        title: 'Concepts',
        slug: '/oop/concepts/classes',
        order: 2,
        children: [
          { title: 'Classes', slug: '/oop/concepts/classes', order: 1 },
        ],
      },
    ],
    expanded: false,
  },
  {
    title: 'DSA',
    slug: '/dsa/arrays/intro',
    order: 2,
    section: 'DSA',
    children: [
      {
        title: 'Arrays',
        slug: '/dsa/arrays/intro',
        order: 1,
        children: [
          { title: 'Introduction', slug: '/dsa/arrays/intro', order: 1 },
          { title: 'Two Pointer', slug: '/dsa/arrays/two-pointer', order: 2 },
        ],
      },
      { title: 'Test Visualizers', slug: '/dsa/test-visualizers', order: 99 },
    ],
    expanded: false,
  },
  { title: 'Test Components', slug: '/test-components', order: 99 },
  { title: 'Test Interactive', slug: '/test-interactive', order: 99 },
];
