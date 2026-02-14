import { Component } from '@angular/core';
import { MemoryVizComponent } from '../../components/dsa/memory-viz/memory-viz.component';
import { DocPageComponent } from '../../components/layout/doc-page/doc-page.component';

@Component({
  selector: 'app-test-visualizers',
  standalone: true,
  imports: [MemoryVizComponent, DocPageComponent],
  template: `
    <app-doc-page
      badge="Theory Foundation"
      title="Data Structures Visualizers"
      description="This page demonstrates DSA visualization components."
      module="DSA"
      category="Visualizers"
    >
      <h2>Array / Memory Visualizer</h2>
      <h3>Basic Array</h3>
      <app-memory-viz
        [data]="basicArray"
        label="Basic Integer Array"
        [showIndices]="true"
      />

      <h3>Array with Highlighting</h3>
      <app-memory-viz
        [data]="highlightArray"
        [highlightIndices]="[1, 3]"
        label="Highlighted Elements at Index 1 and 3"
        [showLegend]="true"
      />

      <h3>Array with Pointers</h3>
      <app-memory-viz
        [data]="pointerArray"
        [pointers]="twoPointers"
        label="Two Pointer Technique"
        description="Left pointer at index 0, Right pointer at index 5"
      />
    </app-doc-page>
  `,
})
export class TestVisualizersComponent {
  basicArray = [5, 12, 7, 23, 9, 15];
  highlightArray = [10, 20, 30, 40, 50];
  pointerArray = [3, 7, 2, 9, 1, 6];
  twoPointers = [
    { name: 'left', index: 0, color: '#3b82f6' },
    { name: 'right', index: 5, color: '#ef4444' },
  ];
}
