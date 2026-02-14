import { Component, input } from '@angular/core';
import { SplitLayoutBlock } from '../../models/tutorial.schema';
import { BlockRendererComponent } from '../../features/tutorial-renderer/block-renderer.component';

@Component({
  selector: 'app-split-layout',
  standalone: true,
  imports: [BlockRendererComponent],
  host: {
    class: 'block',
  },
  template: `
    <div class="grid gap-8 items-start md:grid-cols-2 md:gap-10">
      <div>
        <app-block-renderer [block]="data().left" />
      </div>
      <div>
        <app-block-renderer [block]="data().right" />
      </div>
    </div>
  `,
})
export class SplitLayoutComponent {
  data = input.required<SplitLayoutBlock['data']>();
}
