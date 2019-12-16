import React from 'react';
import { Helmet } from 'react-helmet';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
  AMP_JS,
  AMP_GEO_JS,
  AMP_CONSENT_JS,
  AMP_ANALYTICS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';

const AMP_ADS_JS = (
  <script
    async
    custom-element="amp-ad"
    src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
  />
);

/*
  Contains AMP required markup https://www.ampproject.org/docs/fundamentals/spec#required-markup
*/

const AmpDecorator = storyFn => (
  <div>
    <Helmet htmlAttributes={{ amp: '' }}>
      <link rel="canonical" href="http://foobar.com" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <style amp-boilerplate="">{AMP_SCRIPT}</style>
      <noscript>{`<style amp-boilerplate="">${AMP_NO_SCRIPT}</style>`}</noscript>
      {AMP_JS}
      {AMP_GEO_JS}
      {AMP_CONSENT_JS}
      {AMP_ANALYTICS_JS}
      {AMP_ADS_JS}
    </Helmet>
    {storyFn()}
  </div>
);

export default AmpDecorator;
