declare module '*.md';

declare namespace JSX {
  interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: ForwardedRef<HTMLDivElement> | null;
    'amp-access'?: string;
    'amp-access-hide'?: string;
  }

  interface IntrinsicElements {
    div: DivProps;
  }
}
