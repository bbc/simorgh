import path from 'path';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import { Helmet } from 'react-helmet';
import { ServerApp } from '#app/containers/App';
import getAssetOrigins from '../utilities/getAssetOrigins';
import DocumentComponent from './component';
import encodeChunkFilename from '../utilities/encodeChunkUri';

const crossOrigin = 'anonymous';
const getScriptAttributes = bundleType => chunk => {
  const { type, url } = chunk || {};
  const MAIN_ASSET = 'mainAsset';

  return {
    crossOrigin,
    defer: true,
    ...(url && { src: encodeChunkFilename(chunk) }),
    ...(bundleType === 'modern' && type === MAIN_ASSET && { type: 'module' }),
    ...(bundleType === 'legacy' && type === MAIN_ASSET && { noModule: true }),
  };
};
const getLinkAttributes = chunk => ({
  crossOrigin,
  ...(chunk && chunk.url && { href: encodeChunkFilename(chunk) }),
});

const renderDocument = async ({
  bbcOrigin,
  data,
  isAmp,
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
  const assetOrigins = getAssetOrigins(service);
  const doc = renderToStaticMarkup(
    <DocumentComponent
      assetOrigins={assetOrigins}
      modernScripts={modernScripts}
      legacyScripts={legacyScripts}
      links={links}
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
