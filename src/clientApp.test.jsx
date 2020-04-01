import React from 'react';
import App from '#containers/app/App';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { matchPath } from 'react-router';
import routes from './app/routes';

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

test('renders the client app', async () => {
  const jsonData = require(`../data/mundo/frontpage/index.json`); // eslint-disable-line import/no-dynamic-require, global-require
  fetch.mockResponse(JSON.stringify(jsonData));

  const pageData = await getPageData('/mundo');

  const { getByRole } = render(
    <MemoryRouter initialEntries={['/mundo']}>
      <App
        initialData={{ pageData, status: 200, errorCode: '' }}
        routes={routes}
        bbcOrigin=""
        history={{}}
      />
    </MemoryRouter>,
  );

  // ensuring the app is rendering by checking for the <main> element
  expect(getByRole('main')).toBeTruthy;
});
