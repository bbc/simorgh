declare namespace JSX {
  interface AmpInstagramProps {
    height?: string;
    width?: string;
    layout?: string;
  }

  interface AmpTwitterProps {
    height?: string;
    width?: string;
    layout?: string;
  }

  interface AmpYoutubeProps {
    height?: string;
    width?: string;
    layout?: string;
  }

  interface AmpTiktokProps {
    height?: string;
    width?: string;
  }

  interface AmpFacebookProps {
    height?: string;
    width?: string;
    layout?: string;
  }

  interface IntrinsicElements {
    'amp-instagram': AmpInstagramProps;
    'amp-twitter': AmpTwitterProps;
    'amp-youtube': AmpYoutubeProps;
    'amp-tiktok': AmpTiktokProps;
    'amp-facebook': AmpFacebookProps;
  }
}
