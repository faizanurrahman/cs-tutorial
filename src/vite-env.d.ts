/// <reference types="vite/client" />

/** Lazy-loaded at runtime; no static dependency */
declare module 'mermaid' {
  const mermaid: {
    initialize: (config: unknown) => void;
    render: (id: string, code: string) => Promise<{ svg: string }>;
  };
  export default mermaid;
}

/** Lazy-loaded at runtime; no static dependency */
declare module 'monaco-editor' {
  const monaco: {
    editor: {
      create: (el: HTMLElement, options: unknown) => { getValue: () => string; setValue: (v: string) => void; dispose: () => void };
    };
  };
  export default monaco;
}
