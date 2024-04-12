/* eslint-disable react/no-danger, react/prop-types */
import React from 'react';

import LiteRenderer from './LiteRenderer';
import CanonicalRenderer from './CanonicalRenderer';
import AmpRenderer from './AmpRenderer';

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
  url,
}) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const title = helmet.title.toComponent();
  const helmetMetaTags = helmet.meta.toComponent();
  const helmetLinkTags = helmet.link.toComponent();
  const helmetScriptTags = helmet.script.toComponent();

  const { html, css, ids } = app;

  switch (true) {
    case isLite:
      return (
        <LiteRenderer
          helmetLinkTags={helmetLinkTags}
          helmetMetaTags={helmetMetaTags}
          helmetScriptTags={helmetScriptTags}
          html={html}
          htmlAttrs={htmlAttrs}
          title={title}
          url={url}
        />
      );
    case isAmp:
      return (
        <AmpRenderer
          helmetMetaTags={helmetMetaTags}
          helmetLinkTags={helmetLinkTags}
          helmetScriptTags={helmetScriptTags}
          html={html}
          htmlAttrs={htmlAttrs}
          ids={ids}
          styles={css}
          title={title}
        />
      );
    default:
      return (
        <CanonicalRenderer
          data={data}
          helmetMetaTags={helmetMetaTags}
          helmetLinkTags={helmetLinkTags}
          helmetScriptTags={helmetScriptTags}
          html={html}
          htmlAttrs={htmlAttrs}
          ids={ids}
          isApp={isApp}
          legacyScripts={legacyScripts}
          links={links}
          modernScripts={modernScripts}
          styles={css}
          title={title}
        />
      );
  }
};

export default Document;
