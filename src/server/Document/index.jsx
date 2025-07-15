import path from 'path';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { Helmet } from 'react-helmet';
import { ServerApp } from '#containers/App';
import DocumentComponent from './component';
import {
  getLinkAttributes,
  getScriptAttributes,
} from '../utilities/attributeFunctions';

const renderDocument = async ({
  bbcOrigin,
  data,
  isAmp,
  isApp,
  isLite,
  routes,
  service,
  url,
}) => {
  const isDev = process.env.NODE_ENV === 'development';
  const modernStatsFile = path.resolve(
    `${__dirname}/public/modern-loadable-stats-${process.env.SIMORGH_APP_ENV}.json`,
  );
  const legacyStatsFile =
    !isDev &&
    path.resolve(
      `${__dirname}/public/legacy-loadable-stats-${process.env.SIMORGH_APP_ENV}.json`,
    );

  const legacyExtractor =
    !isDev &&
    new ChunkExtractor({
      statsFile: legacyStatsFile,
      namespace: 'legacy',
    });
  const modernExtractor = new ChunkExtractor({
    statsFile: modernStatsFile,
    namespace: 'modern',
  });
  const commonLoadableState = {
    addChunk(chunk) {
      modernExtractor.addChunk(chunk);

      if (!isDev) {
        legacyExtractor.addChunk(chunk);
      }
    },
  };

  const context = {};

  const appHtml = renderToString(
    <ChunkExtractorManager extractor={commonLoadableState}>
      <ServerApp
        location={url}
        routes={routes}
        data={data}
        bbcOrigin={bbcOrigin}
        context={context}
        service={service}
        isAmp={isAmp}
        isApp={isApp}
        isLite={isLite}
      />
    </ChunkExtractorManager>,
  );

  if (context.url) {
    /**
     * React Router automatically adds an url property with the
     * redirected url to the context object when a Redirect component
     * is used - https://alligator.io/react/react-router-ssr/
     */
    return { redirectUrl: context.url, html: null };
  }

  const headHelmet = Helmet.renderStatic();

  const modernScripts = modernExtractor.getScriptElements(
    getScriptAttributes('modern'),
  );

  const legacyScripts =
    !isDev && legacyExtractor.getScriptElements(getScriptAttributes('legacy'));

  const links = modernExtractor.getLinkElements(getLinkAttributes); // TODO investigate a way to conditionally preload modern/legacy scripts

  const app = {
    html: appHtml,
    css: '', // No longer needed with Tailwind
    ids: [], // No longer needed with Tailwind
  };

  const doc = renderToStaticMarkup(
    <DocumentComponent
      modernScripts={modernScripts}
      legacyScripts={legacyScripts}
      links={links}
      app={app}
      data={data}
      helmet={headHelmet}
      isAmp={isAmp}
      isApp={isApp}
      isLite={isLite}
      service={service}
    />,
  );

  return { html: `<!doctype html>${doc}`, redirectUrl: null };
};

export default renderDocument;
