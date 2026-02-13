import {
  ContentRenderer,
  provideContent,
  withMarkdownRenderer,
} from '@analogjs/content';
import {
  provideFileRouter,
  requestContextInterceptor,
  withExtraRoutes,
} from '@analogjs/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { UnifiedContentRendererService } from './core/unified-content-renderer.service';

// Import all UI components for global registration
import { AlertComponent } from './components/ui/alert/alert.component';
import { BadgeComponent } from './components/ui/badge/badge.component';
import { BentoCardComponent } from './components/ui/bento-grid/bento-card.component';
import { BentoGridComponent } from './components/ui/bento-grid/bento-grid.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { CalloutComponent } from './components/ui/callout/callout.component';
import { CodeBlockComponent } from './components/ui/code-block/code-block.component';
import { TabGroupComponent } from './components/ui/tabs/tab-group.component';
import { TabComponent } from './components/ui/tabs/tab.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideContent(withMarkdownRenderer()),
    // Use Unified/Remark AST renderer instead of default marked
    {
      provide: ContentRenderer,
      useClass: UnifiedContentRendererService,
    },
    provideFileRouter(
      // Pretty-URL redirects → content slugs (injectContent looks up by slug)
      withExtraRoutes([
        { path: 'oop', redirectTo: '1-oop/index', pathMatch: 'full' },
        { path: 'dsa', redirectTo: '2-dsa/1-arrays/intro', pathMatch: 'full' },
        { path: 'spring-boot', redirectTo: '3-spring-boot/index', pathMatch: 'full' },
        { path: 'system-design', redirectTo: '4-system-design/index', pathMatch: 'full' },
        { path: 'algorithms', redirectTo: '2-dsa/1-arrays/intro', pathMatch: 'full' },
      ]),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions(),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor]),
    ),
    provideClientHydration(withEventReplay()),
  ],
};

// Export components for use in markdown
export const UI_COMPONENTS = [
  CalloutComponent,
  CodeBlockComponent,
  BentoGridComponent,
  BentoCardComponent,
  TabGroupComponent,
  TabComponent,
  BadgeComponent,
  AlertComponent,
  ButtonComponent,
];
