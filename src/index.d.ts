declare module '*.md';

declare namespace JSX {
  interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: ForwardedRef<HTMLDivElement> | null;
    'amp-access'?: string;
    'amp-access-hide'?: string;
  }

  interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    key?: string | null;
  }

  interface IntrinsicElements {
    div: DivProps;
    p: ParagraphProps;
  }
}
