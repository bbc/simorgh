import React, { Fragment } from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import '../../lib/globalStyles';

const resourceHints = () => (
  <Fragment>
    <link
      rel="preconnect"
      href="https://ichef.bbci.co.uk"
      crossOrigin="anonymous"
    />
    <link
      rel="preconnect"
      href="https://static.bbci.co.uk"
      crossOrigin="anonymous"
    />
    <link
      rel="preconnect"
      href="https://gel.files.bbci.co.uk"
      crossOrigin="anonymous"
    />
    <link rel="dns-prefetch" href="https://ichef.bbci.co.uk" />
    <link rel="dns-prefetch" href="https://static.bbci.co.uk" />
    <link rel="dns-prefetch" href="https://gel.files.bbci.co.uk" />
  </Fragment>
);

const Document = ({ assets, data, styleTags, htmlAttrs, helmet }) => (
  <html lang="en-GB" {...htmlAttrs}>
    <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="nofollow" />
      <link rel="manifest" href="manifest.json" />
      {resourceHints()}
      {helmet.title.toComponent()}
      {styleTags}
    </head>
    <body>
      <AfterRoot />
      <AfterData data={data} />
      <script type="text/javascript" src={assets.client.js} defer />
    </body>
  </html>
);

export default Document;
