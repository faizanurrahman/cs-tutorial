import { Component, input } from '@angular/core';
import { Block } from '../../models/tutorial.schema';
import { CalloutComponent } from '../../components/ui/callout/callout.component';
import { CodeBlockComponent } from '../../components/ui/code-block/code-block.component';
import { CodePlaygroundComponent } from '../../components/content/code-playground/code-playground.component';
import { MemoryVizComponent } from '../../components/dsa/memory-viz/memory-viz.component';
import { SectionHeaderComponent } from '../../components/ui/section-header/section-header.component';
import { TimeComplexityBreakdownComponent } from '../../components/ui/time-complexity-breakdown/time-complexity-breakdown.component';
import { UmlCardComponent } from '../../components/oop/uml-card/uml-card.component';
import { HeroHeaderComponent } from '../../blocks/hero-header/hero-header.component';
import { ConceptGridComponent } from '../../blocks/concept-grid/concept-grid.component';
import { StepsListComponent } from '../../blocks/steps-list/steps-list.component';
import { TextBlockComponent } from '../../blocks/text-block/text-block.component';
import { ComprehensionCheckComponent } from '../../blocks/comprehension-check/comprehension-check.component';
import { SplitLayoutComponent } from '../../blocks/split-layout/split-layout.component';

@Component({
  selector: 'app-block-renderer',
  standalone: true,
  imports: [
    CalloutComponent,
    CodeBlockComponent,
    CodePlaygroundComponent,
    MemoryVizComponent,
    SectionHeaderComponent,
    TimeComplexityBreakdownComponent,
    UmlCardComponent,
    HeroHeaderComponent,
    ConceptGridComponent,
    StepsListComponent,
    TextBlockComponent,
    ComprehensionCheckComponent,
    SplitLayoutComponent,
  ],
  template: `
    @switch (block().type) {
      @case ('hero-header') {
        <app-hero-header [data]="$any(block()).data" />
      }
      @case ('steps-list') {
        <app-steps-list [data]="$any(block()).data" />
      }
      @case ('section-header') {
        <app-section-header
          [badge]="$any(block()).data.badge || ''"
          [title]="$any(block()).data.title"
          [subtitle]="$any(block()).data.subtitle || ''"
        />
      }
      @case ('text') {
        <app-text-block [html]="$any(block()).data.html" />
      }
      @case ('code') {
        <app-code-block
          [language]="$any(block()).data.language"
          [fileName]="$any(block()).data.filename"
          [code]="$any(block()).data.code"
        />
      }
      @case ('code-playground') {
        <app-code-playground
          [language]="$any(block()).data.language"
          [title]="$any(block()).data.title"
          [fileName]="$any(block()).data.filename"
          [code]="$any(block()).data.code"
        />
      }
      @case ('concept-grid') {
        <app-concept-grid [data]="$any(block()).data" />
      }
      @case ('callout') {
        <app-callout
          [type]="$any(block()).data.variant"
          [title]="$any(block()).data.title || ''"
        >
          {{ $any(block()).data.content }}
        </app-callout>
      }
      @case ('memory-viz') {
        <app-memory-viz
          [data]="$any(block()).data.data ?? []"
          [label]="$any(block()).data.label"
          [showIndices]="$any(block()).data.showIndices"
          [showAddresses]="$any(block()).data.showAddresses"
          [showLegend]="$any(block()).data.showLegend"
          [description]="$any(block()).data.description"
          [pointers]="$any(block()).data.pointers ?? []"
          [highlightIndices]="$any(block()).data.highlightIndex != null ? [$any(block()).data.highlightIndex] : ($any(block()).data.highlightIndices ?? [])"
          [baseAddress]="$any(block()).data.startAddress ?? $any(block()).data.baseAddress ?? 4096"
        />
      }
      @case ('time-complexity') {
        <app-time-complexity-breakdown [cases]="$any(block()).data.cases" />
      }
      @case ('uml-card') {
        <app-uml-card
          [name]="$any(block()).data.name"
          [fields]="$any(block()).data.fields"
          [methods]="$any(block()).data.methods"
          [stereotype]="$any(block()).data.stereotype"
          [abstract]="$any(block()).data.abstract"
        />
      }
      @case ('comprehension-check') {
        <app-comprehension-check [data]="$any(block()).data" />
      }
      @case ('split-layout') {
        <app-split-layout [data]="$any(block()).data" />
      }
    }
  `,
})
export class BlockRendererComponent {
  block = input.required<Block>();
}
