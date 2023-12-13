import path from 'path';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import { Helmet } from 'react-helmet';
import { ServerApp } from '#containers/App';
import {
  encoderV2,
  Counter,
  createClientDictionary,
  sendToClient,
} from '#app/routes/article/utils/encodeText';
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
  routes,
  service,
  url,
}) => {
  const isDev = process.env.NODE_ENV === 'development';
  const cache = createCache({ key: 'bbc' });
  const { extractCritical } = createEmotionServer(cache);
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

  const app = extractCritical(
    renderToString(
      <ChunkExtractorManager extractor={commonLoadableState}>
        <CacheProvider value={cache}>
          <ServerApp
            location={url}
            routes={routes}
            data={data}
            bbcOrigin={bbcOrigin}
            context={context}
            service={service}
            isAmp={isAmp}
            isApp={isApp}
          />
        </CacheProvider>
      </ChunkExtractorManager>,
    ),
  );

  if (context.url) {
    /**
     * React Router automatically adds an url property with the
     * redirected url to the context object when a Redirect component
     * is used - https://alligator.io/react/react-router-ssr/
     */
    return { redirectUrl: context.url, html: null };
  }

  const modernScripts = modernExtractor.getScriptElements(
    getScriptAttributes('modern'),
  );
  const legacyScripts =
    !isDev && legacyExtractor.getScriptElements(getScriptAttributes('legacy'));

  const links = modernExtractor.getLinkElements(getLinkAttributes); // TODO investigate a way to conditionally preload modern/legacy scripts
  const headHelmet = Helmet.renderStatic();
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
    />,
  );

  const compiledDoc = `<!doctype html>${doc}`;
  // const dict = new Map();
  // const encodedDoc = encoderV2(compiledDoc, dict, new Counter());
  // const clientDictionary = createClientDictionary(dict);

  // const decodeScript = sendToClient(encodedDoc, clientDictionary);

  return { html: compiledDoc, redirectUrl: null };
};

export default renderDocument;
