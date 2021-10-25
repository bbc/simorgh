import path from 'path';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import { Helmet } from 'react-helmet';
import { ServerApp } from '#app/containers/App';
import getAssetOrigins from '../utilities/getAssetOrigins';
import DocumentComponent from './component';
import encodeChunkFilename from '../utilities/encodeChunkUri';

const extractChunk = bundleType => chunk => {
  const { type, url } = chunk || {};

  return {
    crossOrigin: 'anonymous',
    defer: true,
    ...(url && { src: encodeChunkFilename(chunk) }),
    ...(bundleType === 'modern' && type === 'mainAsset' && { type: 'module' }),
    ...(bundleType === 'legacy' && type === 'mainAsset' && { noModule: true }),
  };
};

const renderDocument = async ({
  bbcOrigin,
  data,
  isAmp,
  routes,
  service,
  url,
}) => {
  const cache = createCache({ key: 'bbc' });
  const { extractCritical } = createEmotionServer(cache);
  const modernStatsFile = path.resolve(
    `${__dirname}/public/modern/loadable-stats-${process.env.SIMORGH_APP_ENV}.json`,
  );
  const legacyStatsFile = path.resolve(
    `${__dirname}/public/legacy/loadable-stats-${process.env.SIMORGH_APP_ENV}.json`,
  );

  const legacyExtractor = new ChunkExtractor({
    statsFile: legacyStatsFile,
    namespace: 'legacy',
  });
  const modernExtractor = new ChunkExtractor({
    statsFile: modernStatsFile,
    namespace: 'modern',
  });

  const context = {};

  const app = extractCritical(
    renderToString(
      modernExtractor.collectChunks(
        <CacheProvider value={cache}>
          <ServerApp
            location={url}
            routes={routes}
            data={data}
            bbcOrigin={bbcOrigin}
            context={context}
            service={service}
            isAmp={isAmp}
          />
        </CacheProvider>,
      ),
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
    extractChunk('modern'),
  );
  const legacyScripts = legacyExtractor.getScriptElements(
    extractChunk('legacy'),
  );

  const headHelmet = Helmet.renderStatic();
  const assetOrigins = getAssetOrigins(service);
  const doc = renderToStaticMarkup(
    <DocumentComponent
      assetOrigins={assetOrigins}
      modernScripts={modernScripts}
      legacyScripts={legacyScripts}
      app={app}
      data={data}
      helmet={headHelmet}
      service={service}
      isAmp={isAmp}
    />,
  );

  return { html: `<!doctype html>${doc}`, redirectUrl: null };
};

export default renderDocument;
