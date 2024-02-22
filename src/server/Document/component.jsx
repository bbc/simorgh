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
import litePageTransform from '#server/utilities/litePageTransform';

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
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const helmetLinkTags = helmet.link.toComponent();
  const helmetScriptTags = helmet.script.toComponent();
  const serialisedData = serialiseForScript(data);

  // Bit icky but we need to reassign these to allow them to be modified later
  let isLiteMode = isLite;

  let scriptsAllowed = !isAmp && !isLiteMode;
  let linksAllowed = !isAmp && !isLiteMode;
  let isCanonical = !isAmp && !isLiteMode;

  const { html, css, ids } = app;

  // The JS to remove the no-js class will not run on AMP, therefore only add it to canonical
  const noJsHtmlAttrs = isCanonical && { className: 'no-js' };

  // In order to block relevant components rendering until we have AMP GeoIP information, we need to add
  // this class to the body of the document: https://amp.dev/documentation/components/amp-geo/#render-blocking
  const ampGeoPendingAttrs = isAmp && { className: 'amp-geo-pending' };

  let cleanedHtml = html;
  let cleanedHelmetScriptTags = helmetScriptTags;
  let cleanedHelmetLinkTags = helmetLinkTags;

  // Apply HTML transformations for Lite pages
  if (isLiteMode) {
    try {
      const litePageTransforms = litePageTransform({
        html,
        helmetScriptTags,
        helmetLinkTags,
      });

      cleanedHtml = litePageTransforms.html;
      cleanedHelmetScriptTags = litePageTransforms.helmetScriptTags;
      cleanedHelmetLinkTags = litePageTransforms.helmetLinkTags;
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

  // Styling used for Lite pages - consider moving to a separate file
  const LITE_STYLES = `html{line-height:1.15;-webkit-text-size-adjust:100%;font-size:16px;}body{margin:0}ul{padding-inline-start:1.25rem}ol{padding-inline-start:1.25rem;list-style-type:none;}.lite-header-brand-wrapper{background-color:#b80000; padding:0.625rem;display:flex;justify-content:space-between;align-items:center;}#brandSvgHeader,#brandSvgFooter{fill:white;height:1.5rem;}#topPage,#footer{display:flex;}main,aside,[data-e2e=related-content-heading],[data-e2e=top-stories-heading],[data-e2e=features-analysis-heading],[data-e2e=most-read]{padding:0 1.25rem;}.lite-footer{background-color:#b80000; padding:0.625rem;}[class*=visuallyHiddenText]{clip-path:inset(100%);clip rect(1px,1px,1px,1px);height:1px;overflow:hidden;position:absolute;width:1px;margin:0;}.lite-nav-list{margin:0;padding:0.625rem;list-style-type:none; border-bottom:1px solid #E6E8EA;}.lite-nav-list-item{display:inline;padding-inline-end:1rem;}.lite-footer-list{margin:0;padding:0.625rem;list-style-type:none;}.lite-footer-list-item{display:inline;padding-inline-end:1rem;}.lite-footer-copyright{padding-inline-start:0.625rem;}`;

  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
      <head>
        {isApp && <meta name="robots" content="noindex" />}
        {meta}
        {title}
        {cleanedHelmetLinkTags}
        {cleanedHelmetScriptTags}
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
        <div id="root" dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
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
