import React from 'react';
import { render, waitForDomChange, waitFor } from '@testing-library/react';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import ArticlePage from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidgin,
} from '#pages/ArticlePage/fixtureData';
import newsMostReadData from '#data/news/mostRead';
import persianMostReadData from '#data/persian/mostRead';
import pidginMostReadData from '#data/pidgin/mostRead';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

jest.mock('#containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

// eslint-disable-next-line react/prop-types
const Context = ({ service, children }) => (
  <ToggleContextProvider service={service} origin="https://www.test.bbc.co.uk">
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        pathname="/pathname"
        service={service}
        statusCode={200}
      >
        {children}
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
);

beforeEach(() => {
  fetch.resetMocks();
});

it('should use headline for meta description if summary does not exist', async () => {
  const articleDataNewsWithSummary = mergeDeepLeft(
    { promo: { summary: '' } },
    articleDataNews,
  );

  render(
    <Context service="news">
      <ArticlePage pageData={articleDataNewsWithSummary} />
    </Context>,
  );

  await waitForDomChange({
    container: document.querySelector('head'),
  });

  expect(
    document.querySelector('meta[name="description"]').getAttribute('content'),
  ).toEqual('Article Headline for SEO');
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
