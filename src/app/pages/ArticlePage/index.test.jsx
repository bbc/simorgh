import React from 'react';
import { render, waitFor } from '@testing-library/react';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { BrowserRouter } from 'react-router-dom';
import ArticlePage from '.';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidgin,
} from '#pages/ArticlePage/fixtureData';
import newsMostReadData from '#data/news/mostRead';
import persianMostReadData from '#data/persian/mostRead';
import pidginMostReadData from '#data/pidgin/mostRead';
import { textBlock } from '#models/blocks/index';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => <Component {...props} />;
});

jest.mock('#containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

// eslint-disable-next-line react/prop-types
const Context = ({ service, children }) => (
  <BrowserRouter>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        service,
        bbcOrigin: 'https://www.test.bbc.co.uk',
        id: 'c0000000000o',
        isAmp: false,
        pageType: 'article',
        pathname: '/pathname',
        status: 200,
      }),
    )}
  </BrowserRouter>
);

beforeEach(() => {
  fetch.resetMocks();
});

it('should use headline for meta description if summary does not exist', async () => {
  const articleDataNewsWithSummary = mergeDeepLeft(
    {
      promo: {
        summary: textBlock(''),
      },
    },
    articleDataNews,
  );

  render(
    <Context service="news">
      <ArticlePage pageData={articleDataNewsWithSummary} />
    </Context>,
  );

  await waitFor(() => {
    expect(
      document
        .querySelector('meta[name="description"]')
        .getAttribute('content'),
    ).toEqual('Article Headline for SEO');
  });
});

it('should render a news article correctly', async () => {
  fetch.mockResponse(JSON.stringify(newsMostReadData));

  const { container } = render(
    <Context service="news">
      <ArticlePage pageData={articleDataNews} />
    </Context>,
  );

  expect(container).toMatchSnapshot();
});

it('should render a rtl article (persian) with most read correctly', async () => {
  fetch.mockResponse(JSON.stringify(persianMostReadData));

  const { container } = render(
    <Context service="persian">
      <ArticlePage pageData={articleDataPersian} />
    </Context>,
  );

  await waitFor(() => container.querySelector('#Most-Read'));
  const mostReadSection = container.querySelector('#Most-Read');

  expect(mostReadSection).not.toBeNull();
  expect(container).toMatchSnapshot();
});

it('should render a ltr article (pidgin) with most read correctly', async () => {
  fetch.mockResponse(JSON.stringify(pidginMostReadData));

  const { container } = render(
    <Context service="pidgin">
      <ArticlePage pageData={articleDataPidgin} />
    </Context>,
  );

  await waitFor(() => container.querySelector('#Most-Read'));
  const mostReadSection = container.querySelector('#Most-Read');

  expect(mostReadSection).not.toBeNull();
  expect(container).toMatchSnapshot();
});
