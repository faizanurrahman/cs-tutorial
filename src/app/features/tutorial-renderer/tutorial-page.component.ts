import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TutorialPage } from '../../models/tutorial.schema';
import { TutorialRendererComponent } from './tutorial-renderer.component';

@Component({
  selector: 'app-tutorial-page',
  standalone: true,
  imports: [CommonModule, TutorialRendererComponent],
  template: `
    <section class="max-w-5xl mx-auto px-6 py-10">
      @if (pageData()) {
        <app-tutorial-renderer [pageData]="pageData()!" />
      }
    </section>
  `,
})
export class TutorialPageComponent {
  private route = inject(ActivatedRoute);

  pageData = toSignal(
    this.route.data.pipe(
      map((data) => data['pageData'] as TutorialPage),
    ),
    { initialValue: null },
  );
}
