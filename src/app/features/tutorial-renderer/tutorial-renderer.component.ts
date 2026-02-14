import { Component, input } from '@angular/core';
import { TutorialPage } from '../../models/tutorial.schema';
import { BlockRendererComponent } from './block-renderer.component';

@Component({
  selector: 'app-tutorial-renderer',
  standalone: true,
  imports: [BlockRendererComponent],
  template: `
    <div class="space-y-12">
      @for (block of pageData().blocks; track $index) {
        <app-block-renderer [block]="block" />
      }
    </div>
  `,
})
export class TutorialRendererComponent {
  pageData = input.required<TutorialPage>();
}
