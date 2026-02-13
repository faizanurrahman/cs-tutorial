import { writeFileSync } from 'fs';
import { join } from 'path';

interface Route {
  url: string;
  priority: number;
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  lastmod?: string;
}

const baseUrl = 'https://devmastery.com';

const routes: Route[] = [
  // Homepage
  { url: '/', priority: 1.0, changefreq: 'daily' },

  // Main sections
  { url: '/oop', priority: 0.9, changefreq: 'weekly' },
  { url: '/dsa', priority: 0.9, changefreq: 'weekly' },
  { url: '/spring-boot', priority: 0.9, changefreq: 'weekly' },
  { url: '/system-design', priority: 0.9, changefreq: 'weekly' },

  // OOP - Fundamentals
  {
    url: '/oop/fundamentals/what-is-oop',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/fundamentals/classes-objects',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/fundamentals/encapsulation',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/fundamentals/inheritance',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/fundamentals/polymorphism',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/fundamentals/abstraction',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // OOP - Design Patterns
  {
    url: '/oop/design-patterns/singleton',
    priority: 0.8,
    changefreq: 'monthly',
  },
  { url: '/oop/design-patterns/factory', priority: 0.8, changefreq: 'monthly' },
  {
    url: '/oop/design-patterns/observer',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/design-patterns/strategy',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // OOP - SOLID
  {
    url: '/oop/solid-principles/single-responsibility',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/solid-principles/open-closed',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/solid-principles/liskov-substitution',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/solid-principles/interface-segregation',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/oop/solid-principles/dependency-inversion',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // DSA - Arrays
  { url: '/dsa/arrays/introduction', priority: 0.8, changefreq: 'monthly' },
  { url: '/dsa/arrays/two-pointer', priority: 0.8, changefreq: 'monthly' },
  { url: '/dsa/arrays/sliding-window', priority: 0.8, changefreq: 'monthly' },
  {
    url: '/dsa/arrays/kadanes-algorithm',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // DSA - Linked Lists
  {
    url: '/dsa/linked-lists/singly-linked-list',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/dsa/linked-lists/doubly-linked-list',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/dsa/linked-lists/reverse-linked-list',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/dsa/linked-lists/detect-cycle',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // DSA - Stacks & Queues
  {
    url: '/dsa/stacks-queues/stack-basics',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/dsa/stacks-queues/queue-basics',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/dsa/stacks-queues/monotonic-stack',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // DSA - Trees
  { url: '/dsa/trees/binary-tree', priority: 0.8, changefreq: 'monthly' },
  {
    url: '/dsa/trees/binary-search-tree',
    priority: 0.8,
    changefreq: 'monthly',
  },
  { url: '/dsa/trees/tree-traversals', priority: 0.8, changefreq: 'monthly' },
  {
    url: '/dsa/trees/lowest-common-ancestor',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // Spring Boot
  {
    url: '/spring-boot/getting-started/introduction',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/spring-boot/getting-started/first-application',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/spring-boot/rest-api/rest-controllers',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/spring-boot/rest-api/request-mapping',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/spring-boot/data-access/spring-data-jpa',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/spring-boot/data-access/repositories',
    priority: 0.8,
    changefreq: 'monthly',
  },

  // System Design
  {
    url: '/system-design/fundamentals/scalability',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/system-design/fundamentals/load-balancing',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/system-design/fundamentals/caching',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/system-design/fundamentals/database-sharding',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/system-design/patterns/microservices',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    url: '/system-design/patterns/event-driven',
    priority: 0.8,
    changefreq: 'monthly',
  },
];

function generateSitemap(): string {
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod || lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Generate and save sitemap
const sitemap = generateSitemap();
const outputPath = join(process.cwd(), 'public', 'sitemap.xml');

writeFileSync(outputPath, sitemap, 'utf-8');
console.log('✅ Sitemap generated successfully:', outputPath);
