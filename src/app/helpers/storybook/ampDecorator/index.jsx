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
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <link rel="canonical" href="https://www.bbc.com" />
      <style amp-boilerplate="">{AMP_SCRIPT}</style>
      <noscript>{`<style amp-boilerplate="">${AMP_NO_SCRIPT}</style>`}</noscript>
      <script async src="https://cdn.ampproject.org/v0.js" />
    </Helmet>
    {storyFn()}
  </div>
);

export default AmpDecorator;
