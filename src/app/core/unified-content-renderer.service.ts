import { ContentRenderer } from '@analogjs/content';
import { Injectable } from '@angular/core';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * Production-grade Markdown renderer using Unified/Remark AST.
 * Replaces Analog's default marked-based renderer so we get robust
 * parsing for :::directives, nested content, and custom components.
 */
@Injectable()
export class UnifiedContentRendererService implements ContentRenderer {
  /** Transform :::tip / :::note / :::warning / :::danger into <app-callout> */
  private remarkAdmonitions = () => {
    return (tree: import('unist').Node) => {
      visit(tree, 'containerDirective', (node: { name?: string; attributes?: { title?: string }; data?: Record<string, unknown> }) => {
        const type = node.name ?? '';
        if (['tip', 'note', 'warning', 'danger'].includes(type)) {
          const data = node.data ?? (node.data = {});
          const d = data as Record<string, unknown>;
          d['hName'] = 'app-callout';
          d['hProperties'] = {
            type,
            title: node.attributes?.title ?? type.toUpperCase(),
          };
        }
      });
    };
  };

  /** Transform ```mermaid code blocks into <app-mermaid-viz> */
  private remarkMermaid = () => {
    return (tree: import('unist').Node) => {
      visit(tree, 'code', (node: { lang?: string; type?: string; value?: string }) => {
        if (node.lang === 'mermaid') {
          node.type = 'html';
          const encoded = encodeURIComponent(node.value ?? '');
          (node as { value?: string }).value = `<app-mermaid-viz code="${encoded}"></app-mermaid-viz>`;
        }
      });
    };
  };

  async render(content: string): Promise<string> {
    const processor = unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkGfm)
      .use(this.remarkAdmonitions)
      .use(this.remarkMermaid)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeKatex)
      .use(rehypeSanitize, {
        tagNames: [
          'app-callout',
          'app-mermaid-viz',
          'app-memory-viz',
          'app-uml-card',
          'app-code-playground',
          'app-system-node',
          'app-data-flow',
          'app-architecture-diagram',
          'app-object-instance',
          'app-class-diagram',
          'app-graph-viz',
          'app-math-formula',
          'app-array-operation',
          'div',
          'span',
        ],
        attributes: {
          'app-callout': ['type', 'title'],
          'app-mermaid-viz': ['code', 'title', 'caption', 'theme'],
          'app-memory-viz': ['data', 'activeIndex'],
          'app-uml-card': ['name', 'fields', 'methods', 'stereotype', 'abstract'],
          'app-code-playground': ['code', 'language', 'title', 'fileName', 'description'],
          'app-system-node': ['type', 'label', 'sublabel', 'badge', 'status', 'highlighted'],
          'app-data-flow': ['direction', 'label', 'showLabel', 'animated', 'color'],
          'app-architecture-diagram': ['title', 'description', 'showLegend'],
          'app-object-instance': ['typeName', 'fields'],
          'app-class-diagram': ['title', 'layout'],
          'app-graph-viz': ['nodes', 'edges', 'label', 'description', 'width', 'height'],
          'app-math-formula': ['formula', 'displayMode'],
          'app-array-operation': ['data', 'highlightIndices', 'operationLabel', 'label', 'description'],
        },
      })
      .use(rehypeStringify, { allowDangerousHtml: true });

    const result = await processor.process(content);
    return String(result);
  }

  getContentHeadings(): Array<{ id: string; level: number; text: string }> {
    return [];
  }

  enhance(): void {
    // No-op; reserved for future use (e.g. client-side enhancements).
  }
}
