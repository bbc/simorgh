import React from 'react';
import { Helmet } from 'react-helmet';
import { ampScript, ampNoscript } from '../../../lib/constants/styles';

/*
  Contains AMP required markup https://www.ampproject.org/docs/fundamentals/spec#required-markup
*/

const AmpDecorator = storyFn => (
  <div>
    <Helmet htmlAttributes={{ amp: '' }}>
      <link rel="canonical" href="http://foobar.com" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <style amp-boilerplate="">{ampScript}</style>
      <noscript>{`<style amp-boilerplate="">${ampNoscript}</style>`}</noscript>
      <script async src="https://cdn.ampproject.org/v0.js" />
    </Helmet>
    {storyFn()}
  </div>
);

export default AmpDecorator;
