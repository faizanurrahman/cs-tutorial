import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  private readonly defaultSEO: SEOData = {
    title: 'DevMastery - Learn OOP, DSA, Spring Boot & System Design',
    description:
      'Master Object-Oriented Programming, Data Structures & Algorithms, Spring Boot, and System Design with interactive tutorials and visualizations.',
    keywords:
      'OOP, DSA, Spring Boot, System Design, Java, Python, Programming, Algorithms, Data Structures',
    image: '/assets/og-image.png',
    type: 'website',
    author: 'DevMastery Team',
  };

  constructor() {
    this.initializeDefaultSEO();
    this.watchRouteChanges();
  }

  /**
   * Update SEO tags for a page
   */
  updateSEO(data: Partial<SEOData>) {
    const seoData: SEOData = { ...this.defaultSEO, ...data };
    const fullUrl = `https://devmastery.com${this.router.url}`;

    // Update title
    this.title.setTitle(seoData.title);

    // Update meta tags
    this.updateMetaTags([
      { name: 'description', content: seoData.description },
      {
        name: 'keywords',
        content: seoData.keywords || this.defaultSEO.keywords,
      },
      { name: 'author', content: seoData.author || this.defaultSEO.author },

      // Open Graph
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:type', content: seoData.type || 'article' },
      { property: 'og:url', content: seoData.url || fullUrl },
      { property: 'og:image', content: seoData.image || this.defaultSEO.image },
      { property: 'og:site_name', content: 'DevMastery' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description },
      {
        name: 'twitter:image',
        content: seoData.image || this.defaultSEO.image,
      },

      // Article metadata
      ...(seoData.publishedTime
        ? [
            {
              property: 'article:published_time',
              content: seoData.publishedTime,
            },
          ]
        : []),
      ...(seoData.modifiedTime
        ? [{ property: 'article:modified_time', content: seoData.modifiedTime }]
        : []),
      ...(seoData.author
        ? [{ property: 'article:author', content: seoData.author }]
        : []),
    ]);

    // Update canonical URL
    this.updateCanonicalUrl(fullUrl);
  }

  /**
   * Generate JSON-LD structured data
   */
  generateStructuredData(
    type: 'Article' | 'BreadcrumbList' | 'Course',
    data: any,
  ) {
    const structuredData = this.createStructuredData(type, data);
    this.injectStructuredData(structuredData);
  }

  /**
   * Initialize default SEO tags
   */
  private initializeDefaultSEO() {
    this.updateSEO(this.defaultSEO);
  }

  /**
   * Watch route changes and clear SEO
   */
  private watchRouteChanges() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Reset to defaults on route change
        // Specific pages will override with their own SEO
      });
  }

  /**
   * Update multiple meta tags
   */
  private updateMetaTags(
    tags: Array<{ name?: string; property?: string; content: string }>,
  ) {
    tags.forEach((tag) => {
      if (tag.name) {
        this.meta.updateTag({ name: tag.name, content: tag.content });
      } else if (tag.property) {
        this.meta.updateTag({ property: tag.property, content: tag.content });
      }
    });
  }

  /**
   * Update canonical URL
   */
  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = document.querySelector(
      'link[rel="canonical"]',
    );

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  /**
   * Create structured data object
   */
  private createStructuredData(type: string, data: any): object {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    switch (type) {
      case 'Article':
        return {
          ...baseData,
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Person',
            name: data.author || 'DevMastery Team',
          },
          datePublished: data.publishedTime,
          dateModified: data.modifiedTime || data.publishedTime,
          publisher: {
            '@type': 'Organization',
            name: 'DevMastery',
            logo: {
              '@type': 'ImageObject',
              url: 'https://devmastery.com/logo.png',
            },
          },
        };

      case 'BreadcrumbList':
        return {
          ...baseData,
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://devmastery.com${item.url}`,
          })),
        };

      case 'Course':
        return {
          ...baseData,
          name: data.title,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'DevMastery',
          },
        };

      default:
        return baseData;
    }
  }

  /**
   * Inject structured data script into document
   */
  private injectStructuredData(data: object) {
    const scriptId = 'structured-data';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }
}
