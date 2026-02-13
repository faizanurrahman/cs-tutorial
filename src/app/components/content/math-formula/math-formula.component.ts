
import { Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import katex from 'katex';

@Component({
  selector: 'app-math-formula',
  standalone: true,
  imports: [],
  template: `
    <div
      class="not-prose my-4 flex justify-center"
      [class.text-center]="displayMode()"
      [innerHTML]="renderedFormula()"
    ></div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host ::ng-deep .katex {
        font-size: 1.1em;
      }
    `,
  ],
})
export class MathFormulaComponent {
  formula = input.required<string>();
  displayMode = input(false);

  constructor(private sanitizer: DomSanitizer) {}

  renderedFormula = computed(() => {
    const raw = this.formula();
    if (!raw?.trim()) return '';
    try {
      const html = katex.renderToString(raw.trim(), {
        throwOnError: false,
        displayMode: this.displayMode(),
        output: 'html',
      });
      return this.sanitizer.bypassSecurityTrustHtml(html) as SafeHtml;
    } catch {
      return this.sanitizer.bypassSecurityTrustHtml(raw);
    }
  });
}
