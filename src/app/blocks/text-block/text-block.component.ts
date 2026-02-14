import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [],
  template: `
    <div
      class="prose prose-lg dark:prose-invert max-w-3xl mx-auto px-6
             prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
             prose-p:text-slate-400 prose-p:leading-8
             prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300 hover:prose-a:underline
             prose-code:text-indigo-300 prose-code:bg-indigo-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
             prose-strong:text-slate-100"
      [innerHTML]="html()"
    ></div>
  `,
})
export class TextBlockComponent {
  html = input.required<string>();
}
