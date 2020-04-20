import React from 'react';
import styled from 'styled-components';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
  AMP_JS,
  AMP_GEO_JS,
  AMP_CONSENT_JS,
  AMP_ANALYTICS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import serialiseForScript from '#lib/utilities/serialiseForScript';
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
  const serialisedData = serialiseForScript(data);
  const scriptsAllowed = !isAmp;
  const StyledDiv = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${C_GHOST};
  `;

  // The JS to remove the no-js class will not run on AMP, therefore only add it to canonical
  const noJsHtmlAttrs = !isAmp && { className: 'no-js' };
  const scriptTags = (
    <>
      <IfAboveIE9>{scripts}</IfAboveIE9>
    </>
  );

  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
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
        {isAmp && (
          <>
            {AMP_JS}
            {AMP_GEO_JS}
            {AMP_CONSENT_JS}
            {AMP_ANALYTICS_JS}
          </>
        )}
      </head>
      <body>
        {/* disabling the rule that bans the use of dangerouslySetInnerHTML until a more appropriate implementation can be implemented */}
        {/* eslint-disable-next-line react/no-danger */}
        <StyledDiv id="root" dangerouslySetInnerHTML={{ __html: app }} />
        {scriptsAllowed && (
          <script
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: `window.SIMORGH_DATA=${serialisedData}`,
            }}
          />
        )}
        {scriptsAllowed && scriptTags}
        {scriptsAllowed && (
          <script
            type="text/javascript"
            // Justification:
            // - we need this to be a blocking script that runs before the page first renders
            // - the content is static text so there is no real XSS risk
            /* eslint-disable-next-line react/no-danger */
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
