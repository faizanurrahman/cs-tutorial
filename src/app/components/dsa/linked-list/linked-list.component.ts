
import { Component, computed, input } from '@angular/core';
import { LinkedListNode } from '../../../models/dsa.models';
import { LinkedListNodeComponent } from './linked-list-node.component';

@Component({
  selector: 'app-linked-list',
  standalone: true,
  imports: [LinkedListNodeComponent],
  template: `
    <div
      class="not-prose my-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto"
    >
      <!-- Title -->
      @if (label()) {
        <h4
          class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-6 uppercase tracking-wide"
        >
          {{ label() }}
        </h4>
      }

      <!-- Linked List Visualization -->
      <div class="flex items-center gap-4 min-w-max">
        <!-- Head Pointer -->
        @if (showHead()) {
          <div class="flex flex-col items-center">
            <div
              class="text-xs font-bold text-purple-600 dark:text-purple-400 mb-2"
            >
              HEAD
            </div>
            <svg
              class="w-8 h-8 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        }

        <!-- Nodes -->
        @for (node of nodeList(); track $index; let isLast = $last) {
          <div class="flex items-center gap-4">
            <app-linked-list-node
              [value]="node.value"
              [highlighted]="node.highlighted"
              [color]="node.color"
            >
            </app-linked-list-node>

            <!-- Arrow to next node -->
            @if (!isLast) {
              <svg
                class="w-12 h-6 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12h40m0 0l-6-6m6 6l-6 6"
                />
              </svg>
            }
          </div>
        }

        <!-- Null terminator -->
        <div
          class="flex flex-col items-center px-4 py-2 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg"
        >
          <span class="text-sm font-mono text-gray-500 dark:text-gray-400"
            >NULL</span
          >
        </div>
      </div>

      <!-- Description -->
      @if (description()) {
        <div class="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
          {{ description() }}
        </div>
      }

      <!-- Stats -->
      @if (showStats()) {
        <div
          class="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600 flex gap-6 text-sm"
        >
          <div>
            <span class="text-gray-500 dark:text-gray-400">Length:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{
              nodeList().length
            }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">Memory:</span>
            <span class="ml-2 font-semibold text-gray-900 dark:text-white">
              {{ nodeList().length * 8 }} bytes
            </span>
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
export class LinkedListComponent {
  nodes = input<LinkedListNode[]>([]);
  values = input<any[]>([]);
  highlightIndex = input(-1);
  label = input('');
  description = input('');
  showHead = input(true);
  showStats = input(false);

  private effectiveNodes = computed(() => {
    const v = this.values();
    if (v?.length) return v.map((val) => ({ value: val }) as LinkedListNode);
    return this.nodes();
  });

  nodeList = computed(() => {
    const nodes = this.effectiveNodes();
    const highlightIdx = this.highlightIndex();
    return nodes.map((node, idx) => ({
      ...node,
      highlighted: idx === highlightIdx,
    }));
  });
}
