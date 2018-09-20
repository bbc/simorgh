import React from 'react';
import ResourceHints from './ResourceHints';
import '../../lib/globalStyles';
import { C_POSTBOX } from '../../lib/constants/styles';

/* eslint-disable react/prop-types */
const Document = ({ assets, app, data, styleTags, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const links = helmet.link.toComponent();
  const serialisedData = JSON.stringify(data);
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
        {/* eslint-disable react/no-danger */
        /* disabling the rule that bans the use of dangerouslySetInnerHTML until a more appropriate implementation can be implemented */}
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.SIMORGH_DATA=${serialisedData}`,
          }}
        />
        {scripts}
      </body>
    </html>
  );
};

export default Document;
