/* eslint-disable react/no-danger */
import React from 'react';

import { HelmetData } from 'react-helmet';
import LiteRenderer from './Renderers/LiteRenderer';
import CanonicalRenderer from './Renderers/CanonicalRenderer';
import AmpRenderer from './Renderers/AmpRenderer';
import litePageTransforms from './Renderers/litePageTransforms';

type AppData = {
  html: string;
  css: string;
  ids: string[];
};

type Props = {
  app: AppData;
  data: Record<string, unknown>;
  helmet: HelmetData;
  isAmp: boolean;
  isApp: boolean;
  isLite: boolean;
  legacyScripts: React.ReactElement;
  links: React.ReactElement;
  modernScripts: React.ReactElement;
  service?: string;
};

const Document = ({
  app,
  data,
  helmet,
  isAmp,
  isApp,
  isLite,
  legacyScripts,
  links,
  modernScripts,
  service,
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
          bodyContent={
            <div
              dangerouslySetInnerHTML={{ __html: litePageTransforms(html) }}
            />
          }
          helmetLinkTags={helmetLinkTags}
          helmetMetaTags={helmetMetaTags}
          helmetScriptTags={helmetScriptTags}
          htmlAttrs={htmlAttrs}
          styles={css}
          title={title}
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
          service={service}
        />
      );
  }
};

export default Document;
