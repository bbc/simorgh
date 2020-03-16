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

/* getByText can only select text inside of one dom element and you will see error:
 * "Unable to find an element with the text: 'example'. This could be because the text is broken up by multiple elements."
 * Use getByTextSpecial to select text that spans multiple dom elements e.g. <h1>This is a <span>headline</span></h1>
 */
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

/*
 * renderAsReact renders page components using React Testing Library which exposes helpful methods and utilities to encourage
 * writing UI integration tests that closely resemble how our web pages are used by real users. More info https://testing-library.com/docs/guiding-principles
 * React Testing Library will only render everything inside of the `body` tag. For SEO/Analytics tests that do not concern the user and
 * require full DOM rendering you will need to use `renderAsJsDom` function.
 */
export const renderAsReact = async url => {
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

/*
 * renderAsJsDom should only be used for writing integration tests that are not user oriented such as analytics or SEO or
 * require full DOM rendering for access to attributes on the `html`, things inside of `noscript` tags or things inside of
 * the head of the document. This function will not render a working React app so will not attach event listeners or use state
 * or rerender. Instead it will return the full page HTML inside of a JSDOM emulation of a web browser that you can use to
 * query the DOM and assert markup has been rendered correctly.
 */
export const renderAsJsDom = async url => {
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
