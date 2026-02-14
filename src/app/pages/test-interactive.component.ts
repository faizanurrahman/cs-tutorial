import { Component } from '@angular/core';

@Component({
  selector: 'app-test-interactive',
  standalone: true,
  imports: [],
  template: `
    <h1>Test Interactive</h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
      Interactive code playground and visualizer demos.
    </p>
  `,
})
export class TestInteractiveComponent {}
