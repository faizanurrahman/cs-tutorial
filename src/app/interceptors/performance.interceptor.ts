import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const startTime = performance.now();

    return next.handle(req).pipe(
      tap({
        next: () => {
          const duration = performance.now() - startTime;

          if (duration > 1000) {
            console.warn(
              `Slow HTTP request detected: ${req.url} took ${duration.toFixed(2)}ms`,
            );
          }

          // Send to analytics if enabled
          this.reportPerformance(req.url, duration);
        },
        error: (error) => {
          const duration = performance.now() - startTime;
          console.error(
            `HTTP request failed: ${req.url} after ${duration.toFixed(2)}ms`,
            error,
          );
        },
      }),
    );
  }

  private reportPerformance(url: string, duration: number) {
    // Report to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'api_request',
        value: Math.round(duration),
        event_category: 'API',
        event_label: url,
      });
    }
  }
}
