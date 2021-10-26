/* eslint-disable react/no-danger, react/prop-types */
import React from 'react';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
  AMP_JS,
  AMP_CONSENT_JS,
  AMP_ANALYTICS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { AMP_GEO_SCRIPT } from '#components/AmpGeo';
import serialiseForScript from '#lib/utilities/serialiseForScript';
import ResourceHints from '#app/components/ResourceHints';
import IfAboveIE9 from '#app/components/IfAboveIE9Comment';

const Document = ({
  assetOrigins,
  app,
  data,
  helmet,
  isAmp,
  modernScripts,
  legacyScripts,
}) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const helmetLinkTags = helmet.link.toComponent();
  const headScript = helmet.script.toComponent();
  const serialisedData = serialiseForScript(data);
  const scriptsAllowed = !isAmp;

  const { html, css, ids } = app;

  // The JS to remove the no-js class will not run on AMP, therefore only add it to canonical
  const noJsHtmlAttrs = !isAmp && { className: 'no-js' };

  // In order to block relevant components rendering until we have AMP GeoIP information, we need to add
  // this class to the body of the document: https://amp.dev/documentation/components/amp-geo/#render-blocking
  const ampGeoPendingAttrs = isAmp && { className: 'amp-geo-pending' };

  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
      <head>
        {meta}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <ResourceHints assetOrigins={assetOrigins} />
        {title}
        {isAmp ? (
          <style
            amp-custom=""
            data-emotion-css={['bbc', ...ids].join(' ')}
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />
        ) : (
          <style
            data-emotion-css={['bbc', ...ids].join(' ')}
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />
        )}
        {helmetLinkTags}
        {headScript}
        {isAmp && (
          <>
            <style amp-boilerplate="">{AMP_SCRIPT}</style>
            <noscript>
              <style amp-boilerplate="">{AMP_NO_SCRIPT}</style>
            </noscript>
          </>
        )}
        {isAmp && (
          <>
            {AMP_JS}
            {AMP_GEO_SCRIPT}
            {AMP_CONSENT_JS}
            {AMP_ANALYTICS_JS}
          </>
        )}
      </head>
      <body {...ampGeoPendingAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
        {scriptsAllowed && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.SIMORGH_DATA=${serialisedData}`,
            }}
          />
        )}
        {scriptsAllowed && (
          <>
            <IfAboveIE9>{modernScripts}</IfAboveIE9>
            <IfAboveIE9>{legacyScripts}</IfAboveIE9>
          </>
        )}
        {scriptsAllowed && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.remove("no-js");`,
            }}
          />
        )}
      </body>
    </html>
  );
};

export default Document;
