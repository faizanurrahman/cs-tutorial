import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../environments/environment';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly router = inject(Router);
  private enabled = environment.enableAnalytics;

  constructor() {
    if (this.enabled && environment.gaMeasurementId) {
      this.initializeGoogleAnalytics();
      this.trackPageViews();
    }
  }

  /**
   * Initialize Google Analytics (only when gaMeasurementId is set)
   */
  private initializeGoogleAnalytics() {
    const id = environment.gaMeasurementId;
    if (!id) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id, {
      send_page_view: false,
    });
  }

  /**
   * Track page views on route changes
   */
  private trackPageViews() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  /**
   * Track individual page view
   */
  trackPageView(url: string) {
    if (!this.enabled || !window.gtag || !environment.gaMeasurementId) return;

    window.gtag('config', environment.gaMeasurementId, {
      page_path: url,
    });
  }

  /**
   * Track custom events
   */
  trackEvent(eventName: string, params?: Record<string, any>) {
    if (!this.enabled || !window.gtag) return;

    window.gtag('event', eventName, params);
  }

  /**
   * Track code execution events
   */
  trackCodeExecution(language: string, success: boolean) {
    this.trackEvent('code_execution', {
      event_category: 'engagement',
      event_label: language,
      value: success ? 1 : 0,
    });
  }

  /**
   * Track component interactions
   */
  trackComponentInteraction(componentName: string, action: string) {
    this.trackEvent('component_interaction', {
      event_category: 'engagement',
      component_name: componentName,
      action: action,
    });
  }

  /**
   * Track search queries
   */
  trackSearch(query: string) {
    this.trackEvent('search', {
      search_term: query,
    });
  }

  /**
   * Track outbound links
   */
  trackOutboundLink(url: string) {
    this.trackEvent('outbound_link', {
      event_category: 'engagement',
      event_label: url,
    });
  }
}
