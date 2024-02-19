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
import * as cheerio from 'cheerio';

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
  const noJsHtmlAttrs = !isAmp && { className: 'no-js' };

  // In order to block relevant components rendering until we have AMP GeoIP information, we need to add
  // this class to the body of the document: https://amp.dev/documentation/components/amp-geo/#render-blocking
  const ampGeoPendingAttrs = isAmp && { className: 'amp-geo-pending' };

  let cleanedHtml = html;
  let cleanedHelmetLinkTags = helmetLinkTags;

  if (isLite) {
    // // This is a bad way to do it
    // // Remove all images, figures, pictures and inline styles
    // // Avoids having `isLite` checks everywhere
    // const imgRegex = /<img\b[^>]*>/gi;
    // const figureRegex = /<figure\b[^>]*>[\s\S]*?<\/figure>/gi;
    // const pictureRegex = /<picture\b[^>]*>[\s\S]*?<\/picture>/gi;
    // const inlineStyleRegex = /style="[^"]*"/gi;
    // // remove div with id include-3
    // const includeDivElementByIdRegex = /<div id="include-3">[\s\S]*?<\/div>/gi;

    // cleanedHtml = cleanedHtml.replace(imgRegex, '');
    // cleanedHtml = cleanedHtml.replace(figureRegex, '');
    // cleanedHtml = cleanedHtml.replace(pictureRegex, '');
    // cleanedHtml = cleanedHtml.replace(inlineStyleRegex, '');
    // cleanedHtml = cleanedHtml.replace(includeDivElementByIdRegex, '');

    // Prevent preloading images
    cleanedHelmetLinkTags = cleanedHelmetLinkTags.filter(
      tag =>
        !tag.props.rel ||
        (tag.props.rel !== 'preload' && tag.props.as !== 'image'),
    );

    const $ = cheerio.load(cleanedHtml);

    $('img, figure, picture').remove();
    $('div[id^=include-]').remove();
    $('nav[role=navigation]').remove();
    $('span[id=BrandLink-topPage]').remove();
    $('span[id=BrandLink-footer]').remove();

    $('[style]').removeAttr('style');

    cleanedHtml = $.html();
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

  const LITE_STYLES = (
    <style type="text/css">{`
      body {
        margin: 0;
        padding: 0;
      }
      #main-wrapper > div {
        padding: 20px;
      }
  `}</style>
  );

  return (
    <html lang="en-GB" {...noJsHtmlAttrs} {...htmlAttrs}>
      <head>
        {isApp && <meta name="robots" content="noindex" />}
        {meta}
        {title}
        {cleanedHelmetLinkTags}
        {headScript}
        {isCanonical && CANONICAL_STYLES}
        {isLite && LITE_STYLES}
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
