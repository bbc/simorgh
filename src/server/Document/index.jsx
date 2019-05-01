import React from 'react';
import fs from 'fs';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import { Helmet } from 'react-helmet';
import { ServerApp } from '../../app/containers/App';
// import stats from './build/react-loadable.json';

import { getStyleTag } from '../styles';
import { getAssetsArray, getAssetOrigins } from '../assets';
import DocumentComponent from './component';

const renderDocument = async (url, data, routes, bbcOrigin) => {
  const stats = JSON.parse(
    fs.readFileSync('build/react-loadable.json'),
  );

  const sheet = new ServerStyleSheet();

  const modules = [];

  const app = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      {sheet.collectStyles(
        <ServerApp
          location={url}
          routes={routes}
          data={data}
          bbcOrigin={bbcOrigin}
          context={{}}
        />,
      )}
    </Loadable.Capture>,
  );

  console.log('APPLE', modules);

  console.log('PEACH', stats);

  const bundles = getBundles(stats, modules);

  console.log('PEAR', bundles);

  const headHelmet = Helmet.renderStatic();
  const assets = getAssetsArray();
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
