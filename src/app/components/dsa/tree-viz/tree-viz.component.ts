
import { Component, computed, effect, input, signal } from '@angular/core';
import { TreeNode } from '../../../models/dsa.models';
import { TreeNodeComponent } from './tree-node.component';

interface PositionedNode extends TreeNode {
  x: number;
  y: number;
  level: number;
}

@Component({
  selector: 'app-tree-viz',
  standalone: true,
  imports: [TreeNodeComponent],
  template: `
    <div
      class="not-prose my-8 p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <!-- Title -->
      @if (label()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-6 uppercase tracking-wide"
        >
          {{ label() }}
        </h4>
      }

      <!-- Tree SVG Container -->
      <div class="relative" [style.height.px]="svgHeight()">
        <svg
          [attr.width]="svgWidth()"
          [attr.height]="svgHeight()"
          class="absolute top-0 left-0"
        >
          <!-- Define arrow marker -->
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                class="fill-gray-400 dark:fill-gray-500"
              />
            </marker>
          </defs>

          <!-- Draw edges (lines connecting nodes) -->
          @for (edge of edges(); track edge.from + '-' + edge.to) {
            <line
              [attr.x1]="edge.x1"
              [attr.y1]="edge.y1"
              [attr.x2]="edge.x2"
              [attr.y2]="edge.y2"
              class="stroke-gray-400 dark:stroke-gray-500"
              stroke-width="2"
              marker-end="url(#arrowhead)"
            />
          }
        </svg>

        <!-- Nodes positioned absolutely -->
        @for (node of positionedNodes(); track node.x + '-' + node.y) {
          <div
            [style.position]="'absolute'"
            [style.left.px]="node.x - 28"
            [style.top.px]="node.y - 28"
          >
            <app-tree-node
              [value]="node.value"
              [highlighted]="node.highlighted ?? false"
              [color]="node.color"
            >
            </app-tree-node>
          </div>
        }
      </div>

      <!-- Description -->
      @if (description()) {
        <div class="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
          {{ description() }}
        </div>
      }

      <!-- Stats -->
      @if (showStats() === true) {
        <div
          class="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600 flex gap-6 text-sm"
        >
          <div>
            <span class="text-gray-500 dark:text-gray-400">Nodes:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{
              nodeCount()
            }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">Height:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{
              treeHeight()
            }}</span>
          </div>
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
export class TreeVizComponent {
  root = input<TreeNode | null>(null);
  label = input('');
  description = input('');
  showStats = input(false);

  svgWidth = signal(800);
  svgHeight = signal(400);

  positionedNodes = computed(() => {
    const root = this.root();
    if (!root) return [];

    const nodes: PositionedNode[] = [];
    const width = this.svgWidth();

    this.calculatePositions(root, 0, width / 2, 50, width / 4, nodes);

    return nodes;
  });

  // Computed: Edges between nodes
  edges = computed(() => {
    const nodes = this.positionedNodes();
    const edges: Array<{
      from: string;
      to: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];

    const nodeMap = new Map<TreeNode, PositionedNode>();
    nodes.forEach((n) => nodeMap.set(n, n));

    nodes.forEach((node) => {
      if (node.left) {
        const leftNode = nodes.find((n) => n === node.left);
        if (leftNode) {
          edges.push({
            from: String(node.value),
            to: String(leftNode.value),
            x1: node.x,
            y1: node.y + 28,
            x2: leftNode.x,
            y2: leftNode.y - 28,
          });
        }
      }

      if (node.right) {
        const rightNode = nodes.find((n) => n === node.right);
        if (rightNode) {
          edges.push({
            from: String(node.value),
            to: String(rightNode.value),
            x1: node.x,
            y1: node.y + 28,
            x2: rightNode.x,
            y2: rightNode.y - 28,
          });
        }
      }
    });

    return edges;
  });

  nodeCount = computed(() => this.countNodes(this.root()));

  treeHeight = computed(() => this.calculateHeight(this.root()));

  constructor() {
    effect(() => {
      this.svgHeight.set(Math.max(400, this.treeHeight() * 100 + 100));
    });
  }

  /**
   * Calculate positions for tree nodes (recursive)
   */
  private calculatePositions(
    node: TreeNode | undefined,
    level: number,
    x: number,
    y: number,
    xOffset: number,
    result: PositionedNode[],
  ) {
    if (!node) return;

    result.push({
      ...node,
      x,
      y,
      level,
    });

    if (node.left) {
      this.calculatePositions(
        node.left,
        level + 1,
        x - xOffset,
        y + 100,
        xOffset / 2,
        result,
      );
    }

    if (node.right) {
      this.calculatePositions(
        node.right,
        level + 1,
        x + xOffset,
        y + 100,
        xOffset / 2,
        result,
      );
    }
  }

  /**
   * Count total nodes in tree
   */
  private countNodes(node: TreeNode | null | undefined): number {
    if (!node) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }

  /**
   * Calculate tree height
   */
  private calculateHeight(node: TreeNode | null | undefined): number {
    if (!node) return 0;
    return (
      1 +
      Math.max(
        this.calculateHeight(node.left),
        this.calculateHeight(node.right),
      )
    );
  }
}
