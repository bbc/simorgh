import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import getMatchedRoutes from '../../app/routes/getMatchedRoutes';
import { ServerApp } from '../../app/containers/App';

import { getStyleTag } from '../styles';
import { getAssetsArray, getAssetOrigins } from '../assets';
import DocumentComponent from './component';

const renderDocument = async (url, data, routes, bbcOrigin) => {
  const sheet = new ServerStyleSheet();

  const app = renderToString(
    sheet.collectStyles(
      <ServerApp
        location={url}
        routes={routes}
        data={data}
        bbcOrigin={bbcOrigin}
        context={{}}
      />,
    ),
  );

  const headHelmet = Helmet.renderStatic();
  let assets = getAssetsArray();

  const { match } = getMatchedRoutes(url, routes);
  const { service } = match.params;

  assets = assets.filter(
    asset =>
      asset.includes('main') ||
      asset.includes('vendor') ||
      asset.includes(service),
  );

  const assetOrigins = getAssetOrigins();
  const doc = renderToStaticMarkup(
    <DocumentComponent
      assets={assets}
      assetOrigins={assetOrigins}
      app={app}
      data={data}
      styleTags={getStyleTag(sheet, data.isAmp)}
      helmet={headHelmet}
    />,
  );

  return `<!doctype html>${doc}`;
};

export default renderDocument;
