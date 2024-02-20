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
  const headScript = helmet.script.toComponent();
  const serialisedData = serialiseForScript(data);
  const scriptsAllowed = !isAmp && !isLite;
  const linksAllowed = !isAmp && !isLite;
  const isCanonical = !isAmp && !isLite;

  const { html, css, ids } = app;

  // The JS to remove the no-js class will not run on AMP, therefore only add it to canonical
  const noJsHtmlAttrs = isCanonical && { className: 'no-js' };

  // In order to block relevant components rendering until we have AMP GeoIP information, we need to add
  // this class to the body of the document: https://amp.dev/documentation/components/amp-geo/#render-blocking
  const ampGeoPendingAttrs = isAmp && { className: 'amp-geo-pending' };

  let cleanedHtml = html;
  let cleanedHelmetLinkTags = helmetLinkTags;

  // Apply HTML transformations for Lite pages
  if (isLite) {
    const litePage = litePageTransform({ html, helmetLinkTags });
    cleanedHtml = litePage.html;
    cleanedHelmetLinkTags = litePage.helmetLinkTags;
  }

  const scriptTags = (
    <IfAboveIE9>
      {modernScripts}
      {legacyScripts}
    </IfAboveIE9>
  );

  const AMP_STYLES = (
    <style
      amp-custom=""
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />
  );

  const CANONICAL_STYLES = (
    <style
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />
  );

  // Base styling used for Lite pages
  const NORMALIZE_STYLES = `html{line-height:1.15;-webkit-text-size-adjust:100%;font-size:16px;}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}ul{padding-inline-start:1.25rem}ol{padding-inline-start:1.25rem;list-style-type:none;}.lite-header-brand-wrapper{background-color:#b80000; padding:0.625rem;}#brandSvgHeader,#brandSvgFooter{fill:white;height:1.5rem;}main,aside,[data-e2e=related-content-heading],[data-e2e=top-stories-heading],[data-e2e=features-analysis-heading],[data-e2e=most-read]{padding:0 1.25rem;}.lite-footer{background-color:#b80000; padding:0.625rem;}[class*=visuallyHiddenText]{clip-path:inset(100%);clip rect(1px,1px,1px,1px);height:1px;overflow:hidden;position:absolute;width:1px;margin:0;}.lite-nav-list{margin:0;padding:0.625rem;list-style-type:none; border-bottom:1px solid #E6E8EA;}.lite-nav-list-item{display:inline;padding-inline-end:1rem;}.lite-footer-list{margin:0;padding:0.625rem;list-style-type:none;}.lite-footer-list-item{display:inline;padding-inline-end:1rem;}.lite-footer-copyright{padding-inline-start:0.625rem;}`;

  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
      <head>
        {isApp && <meta name="robots" content="noindex" />}
        {meta}
        {title}
        {cleanedHelmetLinkTags}
        {headScript}
        {isCanonical && CANONICAL_STYLES}
        {isLite && <style>{NORMALIZE_STYLES}</style>}
        {isAmp && (
          <>
            {AMP_STYLES}
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
