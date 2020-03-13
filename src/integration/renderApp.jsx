import React from 'react';
import { render } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import Url from 'url-parse';
import routes from '../app/routes';
// eslint-disable-next-line import/no-named-as-default
import App from '#containers/App/App';

const getByTextSpecial = getByText => text =>
  getByText((content, node) => {
    const hasText = ({ textContent }) => textContent === text;
    const nodeHasText = hasText(node);
    const childrenDontHaveText =
      node &&
      node.children &&
      Array.from(node.children).every(child => !hasText(child));

    return nodeHasText && childrenDontHaveText;
  });

export default async url => {
  const pageUrl = new Url(url);
  const { pathname } = pageUrl;
  const jsonData = require(`./pageData${pathname}`); // eslint-disable-line import/no-dynamic-require, global-require
  fetch.mockResponse(JSON.stringify(jsonData));

  const { getInitialData } = routes.find(({ path }) =>
    matchPath(pathname, {
      path,
      exact: true,
    }),
  );
  const { pageData } = await getInitialData(pathname);

  const renderResult = render(
    <MemoryRouter initialEntries={[pathname]}>
      <App
        routes={routes}
        initialData={{ pageData, status: 200 }}
        bbcOrigin=""
        history={{}}
      />
    </MemoryRouter>,
  );

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
