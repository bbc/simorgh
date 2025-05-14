declare namespace React.JSX {
  interface IntrinsicElements {
    'amp-experiment': React.PropsWithChildren<
      // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
      ScriptHTMLAttributes<HTMLScriptElement>
    >;
  }
}
