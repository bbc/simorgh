declare namespace JSX {
  interface AmpImg {
    alt?: string;
    src?: string;
    width?: number;
    height?: number;
    srcSet?: string;
    sizes?: string;
    children?: React.ReactNode;
    fallback?: string;
  }
  interface LinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
    imagesrcset?: string;
    imagesizes?: string;
  }
  interface IntrinsicElements {
    'amp-img': AmpImg; // creates a type for amp-img
    link: LinkProps; // overrides type for link with missing imagesrcset and imagesizes attributes
  }
}
