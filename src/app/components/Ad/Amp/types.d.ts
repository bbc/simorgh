declare namespace React.JSX {
  /*
   * AMP currently doesn't have built-in types for TypeScript, but it's in their roadmap (https://github.com/ampproject/amphtml/issues/13791).
   * As a workaround you can manually create custom types (https://stackoverflow.com/a/50601125).
   */

  interface AmpAd {
    'data-block-on-consent': string;
    'data-npa-on-unknown-consent': string;
    type: string;
    'data-slot': string;
    'data-amp-slot-index': string;
    'data-a4a-upgrade-type': string;
    'data-multi-size-validation': string;
    width: string;
    height: string;
    media?: string;
    'data-multi-size': string;
    json: string;
  }

  interface IntrinsicElements {
    'amp-ad': AmpAd;
  }
}
