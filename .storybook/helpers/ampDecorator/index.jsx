import React from 'react';
import { Helmet } from 'react-helmet';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
} from '@bbc/psammead-assets/amp-boilerplate';

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
      <script async src="https://cdn.ampproject.org/v0.js" />
      <script
        async
        custom-element="amp-geo"
        src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"
      />
      <script
        async
        custom-element="amp-consent"
        src="https://cdn.ampproject.org/v0/amp-consent-0.1.js"
      />
      <script
        async
        custom-element="amp-analytics"
        src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
      />
    </Helmet>
    {storyFn()}
  </div>
);

export default AmpDecorator;
