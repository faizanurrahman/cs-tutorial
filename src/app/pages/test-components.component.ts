import { Component } from '@angular/core';

@Component({
  selector: 'app-test-components',
  standalone: true,
  imports: [],
  template: `
    <h1>Test Components</h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
      Showcase of UI components (callouts, code blocks, tabs, etc.).
    </p>
  `,
})
export class TestComponentsComponent {}
