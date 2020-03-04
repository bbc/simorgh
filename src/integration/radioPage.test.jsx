import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import liveRadioPageJson from '#data/korean/bbc_korean_radio/liveradio.json';
import routes from '../app/routes';
// eslint-disable-next-line import/no-named-as-default
import App from '#containers/App/App';

fetch.mockResponse(JSON.stringify(liveRadioPageJson));

const pathname = '/korean/bbc_korean_radio/liveradio';
const { getInitialData } = routes.find(({ path }) =>
  matchPath(pathname, {
    path,
    exact: true,
  }),
);

const renderApp = pageData =>
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <App
        routes={routes}
        initialData={{ pageData, status: 200 }}
        bbcOrigin=""
        history={{}}
      />
    </MemoryRouter>,
  );

it('should render a H1, which contains/displays a styled headline', async () => {
  const { pageData } = await getInitialData(pathname);
  const { getByText } = renderApp(pageData);
  const headlineEl = getByText('BBC 코리아 라디오');
  const headlineElType = headlineEl.tagName;

  expect(headlineEl).toBeInTheDocument();
  expect(headlineElType).toEqual('H1');
});

it('should render a paragraph, which contains/displays a styled summary', async () => {
  const { pageData } = await getInitialData(pathname);
  const { getByText } = renderApp(pageData);
  const summaryEl = getByText(
    '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
  );
  const summaryElType = summaryEl.tagName;
  const summaryElRole = summaryEl.getAttribute('role');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryElType).toEqual('P');
  expect(summaryElRole).toEqual('main');
});
