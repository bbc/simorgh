import path from 'path';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { CacheProvider } from '@emotion/core';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';
import { Helmet } from 'react-helmet';
import { ServerApp } from '#app/containers/App';
import getAssetOrigins from '../utilities/getAssetOrigins';
import DocumentComponent from './component';

const renderDocument = async ({
  bbcOrigin,
  data,
  isAmp,
  routes,
  service,
  url,
}) => {
  const cache = createCache();
  const { extractCritical } = createEmotionServer(cache);

  const statsFile = path.resolve(
    `${__dirname}/public/loadable-stats-${process.env.SIMORGH_APP_ENV}.json`,
  );

  const extractor = new ChunkExtractor({ statsFile });

  const context = {};

  const app = extractCritical(
    renderToString(
      extractor.collectChunks(
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

  // const scripts = extractor.getScriptElements(chunk => {
  //   console.log(chunk);
  //   return <script src={chunk} />;
  // });

  const scripts = extractor.getScriptElements(chunk => {
    const commonAttributes = {
      crossOrigin: 'anonymous',
      type: 'text/javascript',
      defer: true,
    };

    if (!chunk) return commonAttributes;

    const pathParts = chunk.url.split('/'); // Split full url at each `/`
    const fileName = pathParts.pop(); // Feth the content after the last `/`
    const encodedFileName = encodeURIComponent(fileName); // Encode the filename
    const scriptUrl = pathParts.join('/').concat(`/${encodedFileName}`); // reconstruct the full url with the encoded filename

    return {
      ...commonAttributes,
      src: scriptUrl,
    };
  });

  const headHelmet = Helmet.renderStatic();
  const assetOrigins = getAssetOrigins(service);
  const doc = renderToStaticMarkup(
    <DocumentComponent
      assetOrigins={assetOrigins}
      scripts={scripts}
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
