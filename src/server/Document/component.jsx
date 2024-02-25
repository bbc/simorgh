/* eslint-disable react/no-danger, react/prop-types */
import React from 'react';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
  AMP_JS,
  AMP_CONSENT_JS,
  AMP_ANALYTICS_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { AMP_GEO_SCRIPT } from '#components/AmpGeo';
import serialiseForScript from '#lib/utilities/serialiseForScript';
import IfAboveIE9 from '#components/IfAboveIE9Comment';
import litePageTransform, {
  LITE_STYLES,
} from '#server/utilities/litePageTransform';

const Document = ({
  app,
  data,
  helmet,
  isAmp,
  isApp,
  isLite,
  modernScripts,
  legacyScripts,
  links,
}) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const title = helmet.title.toComponent();
  const helmetMetaTags = helmet.meta.toComponent();
  const helmetLinkTags = helmet.link.toComponent();
  const helmetScriptTags = helmet.script.toComponent();
  const serialisedData = serialiseForScript(data);

  const helmetProps = {
    htmlAttrs,
    helmetMetaTags,
    helmetLinkTags,
    helmetScriptTags,
  };

  const { html, css, ids } = app;

  // Bit icky but we need to reassign these to allow them to be modified later
  let isLiteMode = isLite;
  let renderedHtml = html;

  let scriptsAllowed = !isAmp && !isLiteMode;
  let linksAllowed = !isAmp && !isLiteMode;
  let isCanonical = !isAmp && !isLiteMode;

  // The JS to remove the no-js class will not run on AMP, therefore only add it to canonical
  const noJsHtmlAttrs = isCanonical && { className: 'no-js' };

  // In order to block relevant components rendering until we have AMP GeoIP information, we need to add
  // this class to the body of the document: https://amp.dev/documentation/components/amp-geo/#render-blocking
  const ampGeoPendingAttrs = isAmp && { className: 'amp-geo-pending' };

  // Apply HTML transformations for Lite pages
  if (isLiteMode) {
    try {
      const {
        liteHtml,
        liteHelmetLinkTags,
        liteHelmetMetaTags,
        liteHelmetScriptTags,
      } = litePageTransform({
        html,
        helmetLinkTags,
        helmetMetaTags,
        helmetScriptTags,
      });

      renderedHtml = liteHtml;
      helmetProps.helmetMetaTags = liteHelmetMetaTags;
      helmetProps.helmetLinkTags = liteHelmetLinkTags;
      helmetProps.helmetScriptTags = liteHelmetScriptTags;
    } catch (e) {
      // Bail out on error and revert to canonical
      isLiteMode = false;
      isCanonical = true;
      scriptsAllowed = true;
      linksAllowed = true;
    }
  }

  const scriptTags = (
    <IfAboveIE9>
      {modernScripts}
      {legacyScripts}
    </IfAboveIE9>
  );

  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
      <head>
        {(isApp || isLiteMode) && <meta name="robots" content="noindex" />}
        {title}
        {helmetProps.helmetMetaTags}
        {helmetProps.helmetLinkTags}
        {helmetProps.helmetScriptTags}
        {isCanonical && (
          <style
            data-emotion-css={ids.join(' ')}
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />
        )}
        {isLiteMode && <style>{LITE_STYLES}</style>}
        {isAmp && (
          <>
            <style
              amp-custom=""
              data-emotion-css={ids.join(' ')}
              dangerouslySetInnerHTML={{
                __html: css,
              }}
            />
            <style amp-boilerplate="">{AMP_SCRIPT}</style>
            <noscript>
              <style amp-boilerplate="">{AMP_NO_SCRIPT}</style>
            </noscript>
            {AMP_JS}
            {AMP_GEO_SCRIPT}
            {AMP_CONSENT_JS}
            {AMP_ANALYTICS_JS}
          </>
        )}
      </head>
      <body {...ampGeoPendingAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        {scriptsAllowed && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.SIMORGH_DATA=${serialisedData}`,
            }}
          />
        )}
        {linksAllowed && links}
        {scriptsAllowed && scriptTags}
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
