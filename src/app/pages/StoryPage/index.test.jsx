/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import deepClone from 'ramda/src/clone';

// test helpers
import assocPath from 'ramda/src/assocPath';
import fetchMock from 'fetch-mock';

// components to test
import getInitialData from '#app/routes/cpsAsset/getInitialData';

// mock data
import pidginPageData from '#data/pidgin/cpsAssets/world-23252817';
import { data as pidginMostReadData } from '#data/pidgin/mostRead/index.json';
import igboPageData from '#data/igbo/cpsAssets/afirika-23252735';
import russianPageDataWithInlinePromo from '#data/russian/cpsAssets/news-55041160';
import ukrainianInRussianPageData from '#data/ukrainian/cpsAssets/news-russian-23333960.json';
import { render } from '../../components/react-testing-library-with-providers';

import russianPageDataWithoutInlinePromo from './fixtureData/russianPageDataWithoutPromo';
import StoryPageIndex from '.';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

jest.mock('../../components/ThemeProvider');

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('#containers/ComscoreAnalytics', () => {
  const ComscoreAnalytics = () => <div>comscore</div>;
  return ComscoreAnalytics;
});

jest.mock('#containers/Ad', () => {
  const AdsContainer = () => <div data-testid="sty-ads">STY ADS</div>;
  return AdsContainer;
});

jest.mock('#containers/Ad/Canonical/CanonicalAdBootstrapJs', () => {
  const CanonicalAdBootstrapJs = ({ adcampaign }) => (
    <div data-testid="adBootstrap" data-adcampaign={adcampaign}>
      bootstrap
    </div>
  );
  return CanonicalAdBootstrapJs;
});

jest.mock('#server/utilities/getAgent/index');

const toggles = {
  ads: {
    enabled: true,
  },
  mostRead: {
    enabled: true,
  },
  socialEmbed: {
    enabled: true,
  },
};

const StoryPage = ({ pageData }) => (
  <StaticRouter>
    <StoryPageIndex pageData={pageData} />
  </StaticRouter>
);

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('#containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('#containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('#containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  const ContextsContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

const pageType = 'cpsAsset';

describe('Story Page', () => {
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
    process.env.RECOMMENDATIONS_ENDPOINT = 'http://mock-recommendations-path';
  });

  afterEach(() => {
    fetchMock.restore();

    delete process.env.SIMORGH_ICHEF_BASE_URL;
    delete process.env.RECOMMENDATIONS_ENDPOINT;
  });

  describe('snapshots', () => {
    it('should match snapshot for STY', async () => {
      fetch.mockResponse(JSON.stringify({ ...pidginPageData }));

      const { pageData } = await getInitialData({
        path: '/some-cps-sty-path',
        service: 'pidgin',
        pageType,
      });

      const { container } = render(<StoryPage pageData={pageData} />, {
        service: 'pidgin',
        toggles,
      });

      expect(container).toMatchSnapshot();
    });
  });

  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...igboPageData,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const { getByText } = render(<StoryPage pageData={pageData} />, {
      service: 'igbo',
    });
    expect(getByText('23 Ọktọba 2019')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...igboPageData,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const pageDataWithHiddenTimestamp = assocPath(
      ['metadata', 'options', 'allowDateStamp'],
      false,
      pageData,
    );

    render(<StoryPage pageData={pageDataWithHiddenTimestamp} />, {
      service: 'pidgin',
      toggles,
    });

    expect(document.querySelector('main time')).toBeNull();
  });

  it('should render correctly when the secondary column data is not available', async () => {
    fetch.mockResponse(
      JSON.stringify({
        data: {
          article: { ...pidginPageData.data.article },
          secondaryData: {
            topStories: null,
            features: null,
            mostRead: pidginMostReadData,
            mostWatched: null,
          },
        },
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { container } = render(<StoryPage pageData={pageData} />, {
      service: 'pidgin',
      toggles,
    });

    expect(container).toMatchSnapshot();
  });

  it('should render secondary column with lang attribute of `serviceLang` when a language override is present', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...ukrainianInRussianPageData,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'ukrainian',
      pageType,
    });

    render(<StoryPage pageData={pageData} />, {
      service: 'ukrainian',
      pageLang: 'ru',
    });

    const secondaryColumn = document.querySelector(
      'div[class*="SecondaryColumn"]',
    );

    expect(secondaryColumn).toHaveAttribute('lang', 'uk');
  });

  it.each`
    showAdsBasedOnLocation | showAdsBasedOnLocationExpectation
    ${true}                | ${'permitted to be shown'}
    ${true}                | ${'permitted to be shown'}
    ${false}               | ${'not permitted to be shown'}
    ${false}               | ${'not permitted to be shown'}
  `(
    'should not render ads when the ads toggle is disabled and is in a location where ads are $showAdsBasedOnLocationExpectation',
    async ({ showAdsBasedOnLocation }) => {
      fetch.mockResponse(
        JSON.stringify({
          ...pidginPageData,
        }),
      );

      const { pageData } = await getInitialData({
        path: '/some-cps-sty-path',
        service: 'pidgin',
        pageType,
      });

      const { queryByTestId } = render(<StoryPage pageData={pageData} />, {
        service: 'pidgin',
        showAdsBasedOnLocation,
        toggles: { ads: { enabled: false } },
      });

      const storyPageAds = queryByTestId('sty-ads');
      expect(storyPageAds).not.toBeInTheDocument();
      const adBootstrap = queryByTestId('adBootstrap');
      expect(adBootstrap).not.toBeInTheDocument();
    },
  );

  it('should not render ads when the ads are not permitted for asset, ads are enabled and location permits ads', async () => {
    const pidginPageDataDisallowAdvertising = deepClone(pidginPageData);
    pidginPageDataDisallowAdvertising.data.article.metadata.options.allowAdvertising = false;

    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageDataDisallowAdvertising,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { queryByTestId } = render(<StoryPage pageData={pageData} />, {
      service: 'pidgin',
      toggles,
      showAdsBasedOnLocation: true,
    });

    const storyPageAds = queryByTestId('sty-ads');
    expect(storyPageAds).not.toBeInTheDocument();
    const adBootstrap = queryByTestId('adBootstrap');
    expect(adBootstrap).not.toBeInTheDocument();
  });

  it('should not render ads when the ads toggle is enabled and is in a location where ads are not permitted to be shown', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageData,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { queryByTestId } = render(<StoryPage pageData={pageData} />, {
      service: 'pidgin',
      toggles,
      showAdsBasedOnLocation: false,
    });

    const storyPageAds = queryByTestId('sty-ads');
    expect(storyPageAds).not.toBeInTheDocument();
    const adBootstrap = queryByTestId('adBootstrap');
    expect(adBootstrap).not.toBeInTheDocument();
  });

  it('should render ads when the ads toggle is enabled', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageData,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { getByTestId, getAllByTestId } = render(
      <StoryPage pageData={pageData} />,
      { service: 'pidgin', toggles, showAdsBasedOnLocation: true },
    );

    const storyPageAds = getAllByTestId('sty-ads');
    // render ads container twice for leaderboard and mpu
    expect(storyPageAds).toHaveLength(2);
    const adBootstrap = getByTestId('adBootstrap');
    expect(adBootstrap).toBeInTheDocument();
  });

  it(`should configure canonical ad bootstrap with campaign where 'adCampaignKeyword' is in metadata`, async () => {
    const pidginPageDataAdCampaign = deepClone(pidginPageData);
    pidginPageDataAdCampaign.data.article.metadata.adCampaignKeyword =
      'royalwedding';

    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageDataAdCampaign,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'gahuza',
      pageType,
    });

    const { getByTestId } = render(<StoryPage pageData={pageData} />, {
      service: 'gahuza',
      toggles,
      showAdsBasedOnLocation: true,
    });

    const adBootstrap = getByTestId('adBootstrap');
    expect(adBootstrap).toBeInTheDocument();
    expect(adBootstrap).toHaveAttribute('data-adcampaign', 'royalwedding');
  });

  it('should configure canonical ad bootstrap where campaign is not in metadata', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageData,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { getByTestId } = render(<StoryPage pageData={pageData} />, {
      service: 'pidgin',
      toggles,
      showAdsBasedOnLocation: true,
    });

    const adBootstrap = getByTestId('adBootstrap');
    expect(adBootstrap).toBeInTheDocument();
    expect(adBootstrap).not.toHaveAttribute('data-adcampaign');
  });

  it('should not render canonical ad bootstrap on amp', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageData,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    const { queryByTestId } = render(<StoryPage pageData={pageData} />, {
      service: 'pidgin',
      toggles,
      showAdsBasedOnLocation: true,
      isAmp: true,
    });

    const adBootstrap = queryByTestId('adBootstrap');
    expect(adBootstrap).not.toBeInTheDocument();
  });

  it('should render the inline podcast promo component on russian pages with a paragraph of 940 characters and after 8th paragraph', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...russianPageDataWithInlinePromo,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'russian',
      pageType,
    });

    const { getAllByRole } = render(<StoryPage pageData={pageData} />, {
      service: 'russian',
      toggles: { podcastPromo: { enabled: true } },
      showAdsBasedOnLocation: true,
    });

    const regions = getAllByRole('region');
    expect(regions.length).toEqual(4);

    const fourthRegion = regions[0];
    expect(fourthRegion.getAttribute('aria-labelledby')).toEqual(
      'podcast-promo',
    );
  });

  it('should not render the inline podcast promo component on russian pages with paragraphs of less than 940 characters', async () => {
    fetch.mockResponse(
      JSON.stringify({
        ...russianPageDataWithoutInlinePromo,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'russian',
      pageType,
    });

    const { getAllByRole } = render(<StoryPage pageData={pageData} />, {
      service: 'russian',
      toggles: { podcastPromo: { enabled: true } },
      showAdsBasedOnLocation: true,
    });

    const regions = getAllByRole('region');
    expect(regions.length).toEqual(3);

    regions.forEach(region =>
      expect(region.getAttribute('aria-labelledby')).not.toEqual(
        'podcast-promo',
      ),
    );
  });
});
