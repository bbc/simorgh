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
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { getProcessEnvAppVariables } from '#lib/utilities/getEnvConfig';

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
  // Determine render mode to ensure we don't mix up rendered elements
  let renderMode = 'canonical';

  switch (true) {
    case isAmp:
      renderMode = 'amp';
      break;
    case isLite:
      renderMode = 'lite';
      break;
    default:
      renderMode = 'canonical';
      break;
  }

  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const title = helmet.title.toComponent();
  const helmetMetaTags = helmet.meta.toComponent();
  const helmetLinkTags = helmet.link.toComponent();
  const helmetScriptTags = helmet.script.toComponent();
  const serialisedData = serialiseForScript(data);
  const appEnvVariables = serialiseForScript(getProcessEnvAppVariables());

  const helmetProps = {
    helmetMetaTags,
    helmetLinkTags,
    helmetScriptTags,
  };

  const { html, css, ids } = app;

  let renderedHtml = html;

  // Apply HTML transformations for Lite pages
  if (renderMode === 'lite') {
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
      renderMode = 'canonical';
    }
  }

  // The JS to remove the no-js class will not run on AMP, therefore only add it to canonical
  const noJsHtmlAttrs = renderMode === 'canonical' && {
    className: NO_JS_CLASSNAME,
  };

  // In order to block relevant components rendering until we have AMP GeoIP information, we need to add
  // this class to the body of the document: https://amp.dev/documentation/components/amp-geo/#render-blocking
  const ampGeoPendingAttrs = renderMode === 'amp' && {
    className: 'amp-geo-pending',
  };

  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
      <head>
        {(isApp || renderMode === 'lite') && (
          <meta name="robots" content="noindex" />
        )}
        {title}
        {helmetProps.helmetMetaTags}
        {helmetProps.helmetLinkTags}
        {helmetProps.helmetScriptTags}
        {renderMode === 'canonical' && (
          <style
            data-emotion-css={ids.join(' ')}
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />
        )}
        {renderMode === 'amp' && (
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
        {renderMode === 'lite' && (
          <style dangerouslySetInnerHTML={{ __html: LITE_STYLES }} />
        )}
        {(renderMode === 'canonical' || renderMode === 'lite') && (
          <script
            id="simorgh-envvars"
            dangerouslySetInnerHTML={{
              // Read env variables from the server and expose them to the client
              __html: `window.SIMORGH_ENV_VARS=${appEnvVariables}`,
            }}
          />
        )}
      </head>
      <body {...ampGeoPendingAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        {renderMode === 'canonical' && (
          <>
            <script
              // This script should be the first script tag in the body, otherwise Opera Mini has trouble parsing the `window.SIMORGH_DATA` object
              dangerouslySetInnerHTML={{
                __html: `window.SIMORGH_DATA=${serialisedData}`,
              }}
            />
            {links}
            <IfAboveIE9>
              {modernScripts}
              {legacyScripts}
            </IfAboveIE9>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `document.documentElement.classList.remove("no-js");`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
};

export default Document;
