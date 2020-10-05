/* eslint-disable react/prop-types */
import React from 'react';
import fetchMock from 'fetch-mock';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import assocPath from 'ramda/src/assocPath';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import afriqueFeatureIdxPageData from '#data/afrique/cpsAssets/48465371';
import getInitialData from '#app/routes/cpsAsset/getInitialData';
import FeatureIdxPage from '.';

const mockToggles = {
  comscoreAnalytics: {
    enabled: true,
  },
  ads: {
    enabled: false,
  },
};

const requestContextData = ({
  service = 'afrique',
  showAdsBasedOnLocation,
}) => ({
  pageType: 'FIX',
  service,
  pathname: '/pathname',
  data: { status: 200 },
  showAdsBasedOnLocation,
});

// eslint-disable-next-line react/prop-types
const FeatureIdxPageWithContext = ({
  isAmp = false,
  service = 'afrique',
  toggles = mockToggles,
  showAdsBasedOnLocation,
  ...props
}) => (
  <BrowserRouter>
    <ToggleContextProvider toggles={toggles}>
      <RequestContextProvider
        isAmp={isAmp}
        {...requestContextData({ service, showAdsBasedOnLocation })}
      >
        <ServiceContextProvider service={service}>
          <FeatureIdxPage {...props} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

jest.mock('uuid', () => {
  let x = 1;
  return () => {
    x += 1;
    return `mockid-${x}`;
  };
});

jest.mock('#containers/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

jest.mock('#containers/ATIAnalytics/amp', () => {
  return () => <div>Amp ATI analytics</div>;
});

jest.mock('#containers/PageHandlers/withVariant', () => Component => {
  return props => (
    <div id="VariantContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  return props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withLoading', () => Component => {
  return props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withError', () => Component => {
  return props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withData', () => Component => {
  return props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  return props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/Ad/MPU', () => {
  const MPUContainer = () => (
    <div data-testid="fix-ads">Feature Index Page Ad - MPU</div>
  );
  return MPUContainer;
});

jest.mock('#containers/Ad/Canonical/CanonicalAdBootstrapJs', () => {
  const CanonicalAdBootstrapJs = () => (
    <div data-testid="adBootstrap">bootstrap</div>
  );
  return CanonicalAdBootstrapJs;
});

describe('Feature Idx Page', () => {
  let pageData;

  beforeEach(async () => {
    fetchMock.mock(
      'http://localhost/some-feature-idx-page-path.json',
      JSON.stringify(afriqueFeatureIdxPageData),
    );

    ({ pageData } = await getInitialData({
      path: 'some-feature-idx-page-path',
      service: 'afrique',
    }));
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  describe('snapshots', () => {
    it('should render an afrique feature idx page correctly', async () => {
      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });
      expect(container).toMatchSnapshot();
    });

    it('should render an afrique amp feature idx page', async () => {
      let container;
      await act(async () => {
        container = render(
          <FeatureIdxPageWithContext pageData={pageData} isAmp />,
        ).container;
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render visually hidden text as h1', async () => {
      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });

      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');

      // const span = h1.querySelector('span');
      // expect(span.getAttribute('role')).toEqual('text');
      expect(h1.textContent).toEqual('Tout savoir sur la CAN 2019');

      // const langSpan = span.querySelector('span');
      // expect(langSpan.getAttribute('lang')).toEqual('en-GB');
      // expect(langSpan.textContent).toEqual('BBC News');
    });

    it('should render feature index page sections', async () => {
      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(10);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });

    describe('Ads', () => {
      it.each`
        adsEnabled | showAdsBasedOnLocation | scenario
        ${false}   | ${true}                | ${'ads feature toggle is not enabled'}
        ${true}    | ${false}               | ${'ads not permitted to be shown in location'}
      `(
        'should not render because $scenario',
        async ({ showAdsBasedOnLocation, adsEnabled }) => {
          const toggles = {
            ads: {
              enabled: adsEnabled,
            },
          };

          let queryByTestId;
          await act(async () => {
            ({ queryByTestId } = render(
              <FeatureIdxPageWithContext
                pageData={pageData}
                showAdsBasedOnLocation={showAdsBasedOnLocation}
                toggles={toggles}
              />,
            ));
          });

          const fixPageAds = queryByTestId('fix-ads');
          expect(fixPageAds).not.toBeInTheDocument();
          const adBootstrap = queryByTestId('adBootstrap');
          expect(adBootstrap).not.toBeInTheDocument();
        },
      );

      it('should render leaderboard and MPU ads when the ads toggle is enabled and page has top-stories', async () => {
        const toggles = {
          ads: {
            enabled: true,
          },
        };

        const pageDataWithTopStories = assocPath(
          ['content', 'groups', 0, 'type'],
          'top-stories',
          pageData,
        );

        let getByTestId;
        await act(async () => {
          ({ getByTestId } = render(
            <FeatureIdxPageWithContext
              pageData={pageDataWithTopStories}
              showAdsBasedOnLocation
              toggles={toggles}
            />,
          ));
        });

        const leaderboardAd = document.querySelector(
          '[data-e2e="advertisement"]',
        );
        expect(leaderboardAd).toBeInTheDocument();

        const mpuAd = getByTestId('fix-ads');
        expect(mpuAd).toBeInTheDocument();

        const adBootstrap = getByTestId('adBootstrap');
        expect(adBootstrap).toBeInTheDocument();
      });

      it('should not render canonical ad bootstrap on amp', async () => {
        process.env.SIMORGH_APP_ENV = 'test';
        const toggles = {
          ads: {
            enabled: true,
          },
        };

        let queryByTestId;
        await act(async () => {
          ({ queryByTestId } = render(
            <FeatureIdxPageWithContext
              pageData={pageData}
              toggles={toggles}
              showAdsBasedOnLocation={false}
            />,
          ));
        });

        const adBootstrap = queryByTestId('adBootstrap');
        expect(adBootstrap).not.toBeInTheDocument();
      });
    });
  });
});
