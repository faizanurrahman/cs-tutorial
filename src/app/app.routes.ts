import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/index.page').then((m) => m.default),
  },
  {
    path: 'oop',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'index',
      },
      {
        path: 'index',
        loadComponent: () =>
          import('./features/tutorial-renderer/tutorial-page.component').then(
            (m) => m.TutorialPageComponent,
          ),
        resolve: {
          pageData: () =>
            import('./data/oop-index.page').then((m) => m.OopIndexPage),
        },
      },
      {
        path: 'fundamentals/encapsulation',
        loadComponent: () =>
          import('./features/tutorial-renderer/tutorial-page.component').then(
            (m) => m.TutorialPageComponent,
          ),
        resolve: {
          pageData: () =>
            import('./data/oop-encapsulation.page').then(
              (m) => m.OopEncapsulationPage,
            ),
        },
      },
      {
        path: 'concepts/classes',
        loadComponent: () =>
          import('./features/tutorial-renderer/tutorial-page.component').then(
            (m) => m.TutorialPageComponent,
          ),
        resolve: {
          pageData: () =>
            import('./data/oop-classes.page').then((m) => m.OopClassesPage),
        },
      },
    ],
  },
  {
    path: 'dsa',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'arrays/intro',
      },
      {
        path: 'arrays/intro',
        loadComponent: () =>
          import('./features/tutorial-renderer/tutorial-page.component').then(
            (m) => m.TutorialPageComponent,
          ),
        resolve: {
          pageData: () =>
            import('./data/dsa-arrays-intro.page').then(
              (m) => m.DsaArraysIntroPage,
            ),
        },
      },
      {
        path: 'arrays/two-pointer',
        loadComponent: () =>
          import('./features/tutorial-renderer/tutorial-page.component').then(
            (m) => m.TutorialPageComponent,
          ),
        resolve: {
          pageData: () =>
            import('./data/dsa-two-pointer.page').then(
              (m) => m.DsaTwoPointerPage,
            ),
        },
      },
      {
        path: 'test-visualizers',
        loadComponent: () =>
          import('./pages/dsa/test-visualizers.component').then((m) => m.TestVisualizersComponent),
      },
    ],
  },
  {
    path: 'algorithms',
    redirectTo: 'dsa/arrays/intro',
    pathMatch: 'full',
  },
  {
    path: 'test-components',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/test-components.component').then((m) => m.TestComponentsComponent),
      },
    ],
  },
  {
    path: 'test-interactive',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/test-interactive.component').then((m) => m.TestInteractiveComponent),
      },
    ],
  },
];
