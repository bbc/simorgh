declare namespace JSX {
  /*
   * AMP currently doesn't have built-in types for TypeScript, but it's in their roadmap (https://github.com/ampproject/amphtml/issues/13791).
   * As a workaround you can manually create custom types (https://stackoverflow.com/a/50601125).
   */
  interface AmpImgProps {
    alt?: string;
    src?: string;
    width?: number;
    height?: number;
    srcSet?: string;
    sizes?: string;
    children?: React.ReactNode;
    fallback?: string;
    layout?: string;
  }
  /*
   * Overrides type for link with missing imagesrcset and imagesizes attributes
   */
  interface LinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
    imagesrcset?: string;
    imagesizes?: string;
  }
  interface IntrinsicElements {
    'amp-img': AmpImgProps;
    link: LinkProps;
  }
}
