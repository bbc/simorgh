declare namespace JSX {
  /*
   * AMP currently doesn't have built-in types for TypeScript, but it's in their roadmap (https://github.com/ampproject/amphtml/issues/13791).
   * As a workaround you can manually create custom types (https://stackoverflow.com/a/50601125).
   */
  interface AmpIframeProps {
    children?: React.ReactNode;
    class?: string;
    height?: number;
    layout?: string;
    src?: string;
    width?: number;
    sandbox?: string;
    resizable?: string | undefined;
  }
  interface IntrinsicElements {
    'amp-iframe': AmpIframeProps;
  }
}
