import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ArticleMain from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidgin,
} from '../../pages/Article/fixtureData';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

jest.mock('../ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

// eslint-disable-next-line react/prop-types
const Context = ({ service, children }) => (
  <ToggleContextProvider>
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

it('should use headline for meta description if summary does not exist', async () => {
  const articleDataNewsWithSummary = mergeDeepLeft(
    { promo: { summary: '' } },
    articleDataNews,
  );

  render(
    <Context service="news">
      <ArticleMain articleData={articleDataNewsWithSummary} />
    </Context>,
  );

  await waitForDomChange({
    container: document.querySelector('head'),
  });

  expect(
    document.querySelector('meta[name="description"]').getAttribute('content'),
  ).toEqual('Article Headline for SEO');
});

shouldMatchSnapshot(
  'should render a news article correctly',
  <Context service="news">
    <ArticleMain articleData={articleDataNews} />
  </Context>,
);

shouldMatchSnapshot(
  'should render a persian article correctly',
  <Context service="persian">
    <ArticleMain articleData={articleDataPersian} />
  </Context>,
);

shouldMatchSnapshot(
  'should render a pidgin article correctly (with navigation)',
  <Context service="pidgin">
    <ArticleMain articleData={articleDataPidgin} />
  </Context>,
);
