import React from 'react';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
} from '@bbc/psammead-assets/amp-boilerplate';
import ResourceHints from '#app/components/ResourceHints';
import IfAboveIE9 from '#app/components/IfAboveIE9Comment';

/* eslint-disable react/prop-types */
const Document = ({
  assetOrigins,
  app,
  data,
  styleTags,
  helmet,
  isAmp,
  scripts,
}) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const links = helmet.link.toComponent();
  const headScript = helmet.script.toComponent();
  const serialisedData = JSON.stringify(data);
  const scriptsAllowed = !isAmp;
  const scriptTags = (
    <>
      <IfAboveIE9>{scripts}</IfAboveIE9>
    </>
  );

  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        {meta}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <ResourceHints assetOrigins={assetOrigins} />
        {title}
        {links}
        {styleTags}
        {headScript}
        {isAmp && (
          <>
            <style amp-boilerplate="">{AMP_SCRIPT}</style>
            <noscript>
              <style amp-boilerplate="">{AMP_NO_SCRIPT}</style>
            </noscript>
          </>
        )}
        <script key="amp" async src="https://cdn.ampproject.org/v0.js" />
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        />
        {isAmp && (
          <>
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
          </>
        )}
      </head>
      <body>
        {/* disabling the rule that bans the use of dangerouslySetInnerHTML until a more appropriate implementation can be implemented */}
        {/* eslint-disable-next-line react/no-danger */}
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
        {scriptsAllowed && (
          <script
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: `window.SIMORGH_DATA=${serialisedData}`,
            }}
          />
        )}
        {scriptsAllowed && scriptTags}
      </body>
    </html>
  );
};

export default Document;
