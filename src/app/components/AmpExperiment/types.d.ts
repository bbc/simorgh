declare namespace JSX {
  interface IntrinsicElements {
    'amp-experiment': React.PropsWithChildren<
      ScriptHTMLAttributes<HTMLScriptElement>
    >;
  }
}
