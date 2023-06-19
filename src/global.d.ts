declare module '*.md';

declare namespace JSX {
  interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: ForwardedRef<HTMLDivElement> | null;
  }

  interface IntrinsicElements {
    div: DivProps;
  }
}
