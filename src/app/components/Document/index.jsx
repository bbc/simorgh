import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import ResourceHints from './ResourceHints';
import '../../lib/globalStyles';
import { C_POSTBOX } from '../../lib/constants/styles';

/* eslint-disable react/prop-types */
const Document = ({ assets, data, styleTags, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const title = helmet.title.toComponent();

  const scripts = assets.map(
    <script type="text/javascript" src={assets} defer />,
  );

  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="nofollow" />
        <meta name="theme-color" content={C_POSTBOX} />
        <link rel="manifest" href="/manifest.json" />
        <ResourceHints />
        {title}
        {styleTags}
      </head>
      <body>
        <AfterRoot />
        <AfterData data={data} />
        {scripts}
      </body>
    </html>
  );
};

export default Document;
