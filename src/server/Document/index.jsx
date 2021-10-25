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

const extractChunk = type => chunk => {
  const commonAttributes = {
    crossOrigin: 'anonymous',
    defer: true,
    type,
  };

  if (chunk && chunk.url) {
    return {
      ...commonAttributes,
      src: encodeChunkFilename(chunk),
    };
  }

  return commonAttributes;
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

  const legacyExtractor = new ChunkExtractor({ statsFile: legacyStatsFile });
  const modernExtractor = new ChunkExtractor({ statsFile: modernStatsFile });

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
    extractChunk('module'),
  );
  const legacyScripts = legacyExtractor.getScriptElements(
    extractChunk('nomodule'),
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
