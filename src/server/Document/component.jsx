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
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { getProcessEnvAppVariables } from '#lib/utilities/getEnvConfig';

const Document = ({
  app,
  data,
  helmet,
  isAmp,
  isApp,
  modernScripts,
  legacyScripts,
  links,
}) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const helmetLinkTags = helmet.link.toComponent();
  const headScript = helmet.script.toComponent();
  const serialisedData = serialiseForScript(data);
  const appEnvVariables = serialiseForScript(getProcessEnvAppVariables());

  const scriptsAllowed = !isAmp;

  const { html, css, ids } = app;

  // The JS to remove the no-js class will not run on AMP, therefore only add it to canonical
  const noJsHtmlAttrs = !isAmp && { className: NO_JS_CLASSNAME };

  // In order to block relevant components rendering until we have AMP GeoIP information, we need to add
  // this class to the body of the document: https://amp.dev/documentation/components/amp-geo/#render-blocking
  const ampGeoPendingAttrs = isAmp && { className: 'amp-geo-pending' };

  const scriptTags = (
    <IfAboveIE9>
      {modernScripts}
      {legacyScripts}
    </IfAboveIE9>
  );
  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
      <head>
        {isApp && <meta name="robots" content="noindex" />}
        {meta}
        {title}
        {helmetLinkTags}
        {headScript}
        {isAmp ? (
          <style
            amp-custom=""
            data-emotion-css={ids.join(' ')}
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />
        ) : (
          <style
            data-emotion-css={ids.join(' ')}
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />
        )}
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
        {scriptsAllowed && (
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
        <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
        {scriptsAllowed && (
          // This script should be the first script tag in the body, otherwise Opera Mini has trouble parsing the `window.SIMORGH_DATA` object
          <script
            dangerouslySetInnerHTML={{
              __html: `window.SIMORGH_DATA=${serialisedData}`,
            }}
          />
        )}
        {!isAmp && links}
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
