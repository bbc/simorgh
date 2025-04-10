declare module '*.md';

declare namespace React.JSX {
  interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: ForwardedRef<HTMLDivElement> | null;
    placeholder?: string;
    'amp-access'?: string;
    'amp-access-hide'?: string;
    'data-lite-ati-view'?: string;
  }

  interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    key?: string | null;
  }

  interface IntrinsicElements {
    div: DivProps;
    p: ParagraphProps;
  }

  interface AmpIframeProps {
    children?: React.ReactNode;
    class?: string;
    height?: number;
    layout?: string;
    src?: string;
    width?: number;
    sandbox?: string;
    resizable?: string | undefined;
    scrolling?: string;
    frameborder?: string;
    title?: string;
    allowfullscreen?: string;
  }
  interface IntrinsicElements {
    'amp-iframe': AmpIframeProps;
  }
}
