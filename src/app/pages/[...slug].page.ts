import { injectContent, MarkdownComponent } from '@analogjs/content';

import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreadcrumbsComponent } from '../components/layout/breadcrumbs/breadcrumbs.component';
import { MainLayoutComponent } from '../components/layout/main-layout/main-layout.component';

// UI Components
import { AlertComponent } from '../components/ui/alert/alert.component';
import { BadgeComponent } from '../components/ui/badge/badge.component';
import { BentoCardComponent } from '../components/ui/bento-grid/bento-card.component';
import { BentoGridComponent } from '../components/ui/bento-grid/bento-grid.component';
import { ButtonComponent } from '../components/ui/button/button.component';
import { CalloutComponent } from '../components/ui/callout/callout.component';
import { CodeBlockComponent } from '../components/ui/code-block/code-block.component';
import { TabGroupComponent } from '../components/ui/tabs/tab-group.component';
import { TabComponent } from '../components/ui/tabs/tab.component';

// DSA Components
import { ArrayOperationComponent } from '../components/dsa/array-operation/array-operation.component';
import { GraphVizComponent } from '../components/dsa/graph-viz/graph-viz.component';
import { LinkedListComponent } from '../components/dsa/linked-list/linked-list.component';
import { MemoryVizComponent } from '../components/dsa/memory-viz/memory-viz.component';
import { QueueVizComponent } from '../components/dsa/queue-viz/queue-viz.component';
import { StackVizComponent } from '../components/dsa/stack-viz/stack-viz.component';
import { TreeVizComponent } from '../components/dsa/tree-viz/tree-viz.component';

// OOP / Content / System Components
import { CodePlaygroundComponent } from '../components/content/code-playground/code-playground.component';
import { MathFormulaComponent } from '../components/content/math-formula/math-formula.component';
import { MermaidVizComponent } from '../components/content/mermaid-viz/mermaid-viz.component';
import { ClassDiagramComponent } from '../components/oop/class-diagram/class-diagram.component';
import { ObjectInstanceComponent } from '../components/oop/object-instance/object-instance.component';
import { UmlCardComponent } from '../components/oop/uml-card/uml-card.component';
import { ArchitectureDiagramComponent } from '../components/system/architecture-diagram/architecture-diagram.component';
import { DataFlowComponent } from '../components/system/data-flow/data-flow.component';
import { SystemNodeComponent } from '../components/system/system-node/system-node.component';

export interface PostAttributes {
  title: string;
  description?: string;
  date?: string;
  author?: string;
}

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [
    MarkdownComponent,
    MainLayoutComponent,
    BreadcrumbsComponent,
    // UI Components
    CalloutComponent,
    CodeBlockComponent,
    BentoGridComponent,
    BentoCardComponent,
    TabGroupComponent,
    TabComponent,
    BadgeComponent,
    AlertComponent,
    ButtonComponent,
    // DSA Components
    MemoryVizComponent,
    LinkedListComponent,
    TreeVizComponent,
    StackVizComponent,
    QueueVizComponent,
    // OOP / Content / System Components
    MermaidVizComponent,
    CodePlaygroundComponent,
    MathFormulaComponent,
    UmlCardComponent,
    ClassDiagramComponent,
    ObjectInstanceComponent,
    ArchitectureDiagramComponent,
    DataFlowComponent,
    SystemNodeComponent,
    GraphVizComponent,
    ArrayOperationComponent
],
  template: `
    <app-main-layout>
      @if (post()) {
        <article class="prose prose-lg dark:prose-invert max-w-none">
          <app-breadcrumbs />

          <h1 class="text-4xl font-bold mb-4">
            {{ post()!.attributes.title }}
          </h1>

          @if (post()!.attributes.description) {
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {{ post()!.attributes.description }}
            </p>
          }

          @if (post()!.attributes.date || post()!.attributes.author) {
            <div
              class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
            >
              @if (post()!.attributes.date) {
                <span>{{ post()!.attributes.date }}</span>
              }
              @if (post()!.attributes.author) {
                <span>By {{ post()!.attributes.author }}</span>
              }
            </div>
          }

          <analog-markdown [content]="post()!.content" />

          <!-- Referenced by rendered markdown; keep so compiler does not report unused imports -->
          @if (false) {
            <app-callout type="tip" title="" />
            <app-code-block />
            <app-bento-grid /><app-bento-card />
            <app-tab-group /><app-tab label="" />
            <app-badge /><app-alert /><app-button />
            <app-memory-viz /><app-linked-list /><app-tree-viz /><app-stack-viz /><app-queue-viz />
            <app-mermaid-viz /><app-code-playground /><app-math-formula formula="" />
            <app-uml-card /><app-class-diagram /><app-object-instance />
            <app-architecture-diagram /><app-data-flow /><app-system-node />
            <app-graph-viz /><app-array-operation />
          }
        </article>
      } @else {
        <div class="text-center py-16">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist.
          </p>
        </div>
      }
    </app-main-layout>
  `,
  styles: [
    `
      :host ::ng-deep .prose {
        max-width: 100%;
      }

      :host ::ng-deep .prose pre {
        @apply bg-gray-900 text-white rounded-lg my-6;
      }

      :host ::ng-deep .prose code:not(pre code) {
        @apply bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm;
      }

      :host ::ng-deep .prose h2,
      :host ::ng-deep .prose h3 {
        @apply scroll-mt-20;
      }

      /* DSA components should not be constrained by prose */
      :host ::ng-deep .prose app-memory-viz,
      :host ::ng-deep .prose app-linked-list,
      :host ::ng-deep .prose app-tree-viz,
      :host ::ng-deep .prose app-stack-viz,
      :host ::ng-deep .prose app-queue-viz {
        @apply not-prose;
      }

      /* OOP / Content / System / DSA components */
      :host ::ng-deep .prose app-mermaid-viz,
      :host ::ng-deep .prose app-code-playground,
      :host ::ng-deep .prose app-math-formula,
      :host ::ng-deep .prose app-uml-card,
      :host ::ng-deep .prose app-class-diagram,
      :host ::ng-deep .prose app-object-instance,
      :host ::ng-deep .prose app-architecture-diagram,
      :host ::ng-deep .prose app-system-node,
      :host ::ng-deep .prose app-data-flow,
      :host ::ng-deep .prose app-graph-viz,
      :host ::ng-deep .prose app-array-operation {
        @apply not-prose;
      }
    `,
  ],
})
export default class ContentPageComponent {
  readonly post = toSignal(injectContent<PostAttributes>());


  constructor() {}
}
