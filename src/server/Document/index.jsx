import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import { ServerApp } from '../../app/containers/App';

import { getStyleTag } from '../styles';
import { getAssetsArray, getAssetOrigins } from '../assets';
import DocumentComponent from './component';

const renderDocument = async (url, data, routes, bbcOrigin, service, isAmp) => {
  const sheet = new ServerStyleSheet();

  const app = renderToString(
    sheet.collectStyles(
      <ServerApp
        location={url}
        routes={routes}
        data={data}
        bbcOrigin={bbcOrigin}
        context={{}}
        service={service}
        isAmp={isAmp}
      />,
    ),
  );

  let assets = getAssetsArray();

  assets = assets.filter(
    asset =>
      asset.includes('main') ||
      asset.includes('vendor') ||
      asset.includes(service),
  );

  const headHelmet = Helmet.renderStatic();
  const assetOrigins = getAssetOrigins();
  const doc = renderToStaticMarkup(
    <DocumentComponent
      assets={assets}
      assetOrigins={assetOrigins}
      app={app}
      data={data}
      styleTags={getStyleTag(sheet, isAmp)}
      helmet={headHelmet}
      service={service}
      isAmp={isAmp}
    />,
  );

  return `<!doctype html>${doc}`;
};

export default renderDocument;
