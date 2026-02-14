export type BlockType =
  | 'hero-header'
  | 'steps-list'
  | 'section-header'
  | 'text'
  | 'code'
  | 'code-playground'
  | 'concept-grid'
  | 'callout'
  | 'memory-viz'
  | 'time-complexity'
  | 'split-layout'
  | 'comprehension-check'
  | 'uml-card';

export interface TutorialPage {
  id: string;
  title: string;
  metaDescription: string;
  blocks: Block[];
}

export interface HeroHeaderBlock {
  type: 'hero-header';
  data: {
    badge?: string;
    title: string;
    subtitle?: string;
    tags?: string[];
  };
}

export interface StepsListBlock {
  type: 'steps-list';
  data: {
    steps: Array<{
      title: string;
      content: string;
    }>;
  };
}

export interface SectionHeaderBlock {
  type: 'section-header';
  data: {
    badge?: string;
    title: string;
    subtitle?: string;
  };
}

export interface TextBlock {
  type: 'text';
  data: {
    html: string;
  };
}

export interface CodeBlock {
  type: 'code';
  data: {
    language: 'java' | 'python';
    filename?: string;
    code: string;
  };
}

export interface CodePlaygroundBlock {
  type: 'code-playground';
  data: {
    language: 'java' | 'python';
    title?: string;
    filename?: string;
    code: string;
  };
}

export interface ConceptGridBlock {
  type: 'concept-grid';
  data: {
    columns?: 2 | 3;
    items: Array<{
      icon?: string;
      title: string;
      text: string;
    }>;
  };
}

export interface CalloutBlock {
  type: 'callout';
  data: {
    variant: 'tip' | 'note' | 'warning' | 'danger' | 'info' | 'success';
    title?: string;
    content: string;
  };
}

export interface MemoryVizBlock {
  type: 'memory-viz';
  data: {
    data: Array<number | string>;
    label?: string;
    /** Start address (e.g. 4096 for 0x1000). Enables address-on-top layout. */
    startAddress?: number;
    /** Single index to highlight (e.g. active element). */
    highlightIndex?: number;
    highlightIndices?: number[];
    showIndices?: boolean;
    showAddresses?: boolean;
    showLegend?: boolean;
    description?: string;
    pointers?: Array<{ name: string; index: number; color?: string }>;
  };
}

export interface TimeComplexityBlock {
  type: 'time-complexity';
  data: {
    cases: Array<{
      value: string;
      label: string;
      description: string;
    }>;
  };
}

export interface SplitLayoutBlock {
  type: 'split-layout';
  data: {
    ratio?: '50-50' | '40-60' | '60-40';
    left: Block;
    right: Block;
  };
}

export interface ComprehensionCheckBlock {
  type: 'comprehension-check';
  data: {
    title: string;
    questions: Array<{
      number: number;
      title: string;
      question: string;
      expected: string;
      ifIncorrect: string;
    }>;
    footer?: string;
  };
}

export interface UmlCardBlock {
  type: 'uml-card';
  data: {
    name: string;
    fields: string[];
    methods: string[];
    stereotype?: string;
    abstract?: boolean;
  };
}

export type Block =
  | HeroHeaderBlock
  | StepsListBlock
  | SectionHeaderBlock
  | TextBlock
  | CodeBlock
  | CodePlaygroundBlock
  | ConceptGridBlock
  | CalloutBlock
  | MemoryVizBlock
  | TimeComplexityBlock
  | SplitLayoutBlock
  | ComprehensionCheckBlock
  | UmlCardBlock;
