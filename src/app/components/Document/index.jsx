import React from 'react';
import ResourceHints from './ResourceHints';
import '../../lib/globalStyles';
import { C_POSTBOX } from '../../lib/constants/styles';

const isAmpPayload = htmlAttributes =>
  htmlAttributes.toString().includes('amp');

/* eslint-disable react/no-danger */
/* disabling the rule that bans the use of dangerouslySetInnerHTML until a more appropriate implementation can be implemented */
const injectClientSideApp = serialisedData => {
  if (serialisedData) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.SIMORGH_DATA=${serialisedData}`,
        }}
      />
    );
  }

  return null;
};

/* eslint-disable react/prop-types */
const Document = ({ assets, app, data, styleTags, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const links = helmet.link.toComponent();
  let scripts = [];
  let ampScript;
  let serialisedData;

  if (isAmpPayload(helmet.htmlAttributes)) {
    ampScript = (
      <script key="amp" async src="https://cdn.ampproject.org/v0.js" />
    );
  }

  if (!isAmpPayload(helmet.htmlAttributes)) {
    serialisedData = !isAmpPayload(helmet.htmlAttributes)
      ? JSON.stringify(data)
      : null;
    scripts = assets.map(asset => (
      <script key={asset} type="text/javascript" src={asset} defer />
    ));
  }

  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="theme-color" content={C_POSTBOX} />
        {meta}
        <link rel="manifest" href="/manifest.json" />
        <ResourceHints />
        {title}
        {links}
        {styleTags}
        {ampScript}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
        {injectClientSideApp(serialisedData)}
        {scripts}
      </body>
    </html>
  );
};

export default Document;
