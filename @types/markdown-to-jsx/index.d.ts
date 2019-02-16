declare module 'markdown-to-jsx' {
  import * as React from 'react';

  export interface Overrides {
    a?: React.ComponentType<{ title?: string; href?: string }>;
    img?: React.ComponentType<{ title?: string; alt?: string; src?: string }>;
    p?: React.ComponentType;
  }

  export interface MarkdownProps {
    options?: {
      forceBlock?: boolean;
      forceInline?: boolean;
      overrides?: Overrides;
    };
  }
  export default class Markdown extends React.Component<MarkdownProps> {}
}
