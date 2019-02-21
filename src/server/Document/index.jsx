import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
import { ServerApp } from '../../app/containers/App';

import { getStyleTag } from '../styles';
import getAssetsArray from '../assets';
import Document from './component';

const renderDocument = async (url, data, routes) => {
  const sheet = new ServerStyleSheet();

  const app = renderToString(
    sheet.collectStyles(
      <ServerApp location={url} routes={routes} data={data} context={{}} />,
    ),
  );

  const headHelmet = Helmet.renderStatic();
  const assets = getAssetsArray();
  const doc = renderToStaticMarkup(
    <Document
      assets={assets}
      app={app}
      data={data}
      styleTags={getStyleTag(sheet, data.isAmp)}
      helmet={headHelmet}
    />,
  );

  return `<!doctype html>${doc}`;
};

export default renderDocument;
