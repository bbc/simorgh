import React from 'react';
import { JSDOM } from 'jsdom';
import { Helmet } from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { render } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import routes from '../app/routes';
import App from '#containers/App/App'; // eslint-disable-line import/no-named-as-default
import DocumentComponent from '../server/Document/component';

const getByTextSpecial = getByText => text =>
  getByText((content, node) => {
    const hasText = ({ textContent }) => textContent === text;
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      child => !hasText(child),
    );

    return nodeHasText && childrenDontHaveText;
  });

const getRoute = pathname =>
  routes.find(({ path }) =>
    matchPath(pathname, {
      path,
      exact: true,
    }),
  );

const getPageData = async pathname => {
  const { getInitialData } = getRoute(pathname);
  const { pageData } = await getInitialData(pathname);

  return pageData;
};

const getParams = pathname => {
  const { path } = getRoute(pathname);
  const { params } = matchPath(pathname, {
    path,
  });
  return params;
};

const getService = pathname => {
  const { service } = getParams(pathname);
  return service;
};

const getPathname = url => url.replace('https://www.bbc.com', '');

const getAppComponent = async url => {
  const pathname = getPathname(url);
  const jsonData = require(`./pageData/${pathname}`); // eslint-disable-line import/no-dynamic-require, global-require
  fetch.mockResponse(JSON.stringify(jsonData));
  const pageData = await getPageData(pathname);

  return (
    <MemoryRouter initialEntries={[pathname]}>
      <App
        routes={routes}
        initialData={{ pageData, status: 200 }}
        bbcOrigin=""
        history={{}}
      />
    </MemoryRouter>
  );
};

export default async url => {
  const appComponent = await getAppComponent(url);
  const renderResult = render(appComponent);

  return {
    ...renderResult,
    within: (...args) => {
      const withinResult = within(...args);

      return {
        ...withinResult,
        getByTextSpecial: getByTextSpecial(withinResult.getByText),
      };
    },
    getByTextSpecial: getByTextSpecial(renderResult.getByText),
  };
};

export const renderFullHTML = async url => {
  Helmet.canUseDOM = false;

  const pathname = getPathname(url);
  const service = getService(pathname);
  const appComponent = await getAppComponent(url);
  const appString = renderToString(appComponent);
  const pageData = await getPageData(pathname);

  const assetOrigins = ['http://example.com']; // TODO

  const staticMarkup = renderToStaticMarkup(
    <DocumentComponent
      assetOrigins={assetOrigins}
      app={appString}
      data={pageData}
      helmet={Helmet.renderStatic()}
      styleTags={<></>} // TODO
      scripts={<></>} // TODO
      service={service}
      isAmp={false} // TODO
    />,
  );

  const { window } = new JSDOM(staticMarkup);

  return { window, document: window.document };
};
