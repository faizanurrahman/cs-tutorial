import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { GraphEdge, GraphNode } from '../../../models/dsa.models';

@Component({
  selector: 'app-graph-viz',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="not-prose my-8 p-6 bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      @if (label()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide"
        >
          {{ label() }}
        </h4>
      }
      <div class="relative min-h-[300px]" [style.width.px]="width()">
        <svg [attr.width]="width()" [attr.height]="height()" class="overflow-visible">
          <defs>
            <marker
              id="graph-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </marker>
          </defs>
          @for (edge of parsedEdges(); track edge.from + '-' + edge.to) {
            @let fromNode = getNode(edge.from);
            @let toNode = getNode(edge.to);
            @if (fromNode && toNode) {
              <line
                [attr.x1]="fromNode.x ?? 0"
                [attr.y1]="fromNode.y ?? 0"
                [attr.x2]="toNode.x ?? 0"
                [attr.y2]="toNode.y ?? 0"
                class="stroke-gray-400 dark:stroke-gray-500"
                stroke-width="2"
                [attr.marker-end]="edge.directed !== false ? 'url(#graph-arrow)' : null"
              />
              @if (edge.weight != null) {
                <text
                  [attr.x]="((fromNode.x ?? 0) + (toNode.x ?? 0)) / 2 + 8"
                  [attr.y]="((fromNode.y ?? 0) + (toNode.y ?? 0)) / 2"
                  class="text-xs fill-gray-600 dark:fill-gray-400 font-mono"
                >
                  {{ edge.weight }}
                </text>
              }
            }
          }
        </svg>
        @for (node of nodesWithLayout(); track node.id) {
          <div
            class="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 flex items-center justify-center font-mono text-sm font-semibold
                   bg-white dark:bg-gray-800 border-indigo-500 dark:border-indigo-400 text-gray-900 dark:text-gray-100 shadow-md"
            [style.left.px]="node.x"
            [style.top.px]="node.y"
            [style.background-color]="node.color"
          >
            {{ node.label || node.id }}
          </div>
        }
      </div>
      @if (description()) {
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
          {{ description() }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})


export class GraphVizComponent {
  /** Accepts array or JSON string (e.g. from markdown attributes) */
  nodes = input<GraphNode[] | string>([]);
  /** Accepts array or JSON string */
  edges = input<GraphEdge[] | string>([]);
  label = input('');
  description = input('');
  width = input(400);
  height = input(300);

  parsedNodes = computed(() => parseJsonArray<GraphNode>(this.nodes(), []));
  parsedEdges = computed(() => parseJsonArray<GraphEdge>(this.edges(), []));

  /** Default layout: simple grid for nodes without x,y */
  nodesWithLayout = computed(() => {
    const n = this.parsedNodes();
    const w = this.width();
    const h = this.height();
    const cols = Math.ceil(Math.sqrt(n.length)) || 1;
    const spacingX = w / (cols + 1);
    const spacingY = h / (n.length ? Math.ceil(n.length / cols) + 1 : 1);
    return n.map((node, i) => ({
      ...node,
      x: node.x ?? spacingX * ((i % cols) + 1),
      y: node.y ?? spacingY * (Math.floor(i / cols) + 1),
    }));
  });

  nodeMap = computed(() => {
    const map = new Map<string, GraphNode & { x?: number; y?: number }>();
    this.nodesWithLayout().forEach((node) => map.set(node.id, node));
    return map;
  });

  getNode(id: string): (GraphNode & { x?: number; y?: number }) | undefined {
    return this.nodeMap().get(id);
  }
}

function parseJsonArray<T>(raw: T[] | string, fallback: T[]): T[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string' && raw.trim()) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}