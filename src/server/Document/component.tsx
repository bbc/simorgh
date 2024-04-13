/* eslint-disable react/no-danger, react/prop-types */
import React from 'react';
import { EmotionCritical } from '@emotion/server/create-instance';

import { HelmetData } from 'react-helmet';
import LiteRenderer from './LiteRenderer';
import CanonicalRenderer from './CanonicalRenderer';
import AmpRenderer from './AmpRenderer';

type Props = {
  app: EmotionCritical;
  data: Record<string, unknown>;
  helmet: HelmetData;
  isAmp: boolean;
  isApp: boolean;
  isLite: boolean;
  modernScripts: React.ReactElement;
  legacyScripts: React.ReactElement;
  links: React.ReactElement;
  url: string;
};

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
}: Props) => {
  const title = helmet.title.toComponent();

  const htmlAttrs = helmet.htmlAttributes.toComponent();
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
          ids={ids}
          styles={css}
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
