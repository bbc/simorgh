import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import ResourceHints from './ResourceHints';
import { C_POSTBOX } from '../../lib/constants/styles';

/* eslint-disable react/prop-types */
const Document = ({ assets, data, styleTags, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const links = helmet.link.toComponent();
  const scripts = assets.map(asset => (
    <script key={asset} type="text/javascript" src={asset} defer />
  ));

  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="robots" content="nofollow" />
        <meta name="theme-color" content={C_POSTBOX} />
        {meta}
        <link rel="manifest" href="/manifest.json" />
        <ResourceHints />
        {title}
        {links}
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
