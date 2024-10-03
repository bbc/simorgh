import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, act, screen } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import urduPageData from '#data/urdu/cpsAssets/science-51314202.json';
import getInitialData from '#app/routes/article/getInitialData';
import { FEATURE_INDEX_PAGE } from '#app/routes/utils/pageTypes';
import { Helmet } from 'react-helmet';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../../components/ThemeProvider';
import FeatureIdxPage from '.';

jest.mock('../../components/ThemeProvider');

const mockToggles = {
  comscoreAnalytics: {
    enabled: true,
  },
  ads: {
    enabled: false,
  },
};

const requestContextData = ({ service = 'urdu', showAdsBasedOnLocation }) => ({
  pageType: FEATURE_INDEX_PAGE,
  service,
  pathname: '/urdu/science-51314202',
  data: { status: 200 },
  showAdsBasedOnLocation,
});

const FeatureIdxPageWithContext = ({
  isAmp = false,
  service = 'urdu',
  toggles = mockToggles,
  showAdsBasedOnLocation,
  ...props
}) => (
  <BrowserRouter>
    <ThemeProvider service={service} variant="default">
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
    </ThemeProvider>
  </BrowserRouter>
);

jest.mock('uuid', () => {
  let x = 1;
  return {
    v4: () => {
      x += 1;
      return `mockid-${x}`;
    },
  };
});
jest.mock('../../components/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

jest.mock('../../components/ATIAnalytics/amp', () => {
  return () => <div>Amp ATI analytics</div>;
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

describe('Feature Idx Page', () => {
  let pageData;

  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify(urduPageData));
    delete process.env.SIMORGH_APP_ENV;

    ({ pageData } = await getInitialData({
      path: '/urdu/science-51314202',
      service: 'urdu',
      pageType: 'article',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Assertions', () => {
    it('should render visually hidden text as h1', async () => {
      const { container } = render(
        <FeatureIdxPageWithContext pageData={pageData} />,
      );

      await act(async () => {
        const h1 = container.querySelector('h1');
        const content = h1.getAttribute('id');
        const tabIndex = h1.getAttribute('tabIndex');

        expect(content).toEqual('content');
        expect(tabIndex).toBe('-1');

        expect(h1.textContent).toMatchInlineSnapshot(
          `"کورونا وائرس: تحقیق، تشخیص اور احتیاط"`,
        );
      });
    });

    it('should render flattened sections', async () => {
      const { container } = render(
        <FeatureIdxPageWithContext pageData={pageData} />,
      );

      await act(async () => {
        const sections = container.querySelectorAll('section');
        expect(sections).toHaveLength(4);
        sections.forEach(section => {
          expect(section.getAttribute('role')).toEqual('region');

          const strapline = section.querySelector('h2');
          expect(strapline.textContent).toMatchSnapshot();
        });
      });
    });

    it('should render images with the .webp image extension', () => {
      process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';

      render(<FeatureIdxPageWithContext pageData={pageData} />);

      const imageBlock = pageData.content.groups[3].items[0].indexImage;
      const { altText: imageAltText, path: imagePath } = imageBlock;
      const imageURL = `https://ichef.test.bbci.co.uk/ace/ws/660${imagePath}.webp`;
      const expectedSrcSetURLs = [
        `https://ichef.test.bbci.co.uk/ace/ws/70${imagePath}.webp 70w`,
        `https://ichef.test.bbci.co.uk/ace/ws/95${imagePath}.webp 95w`,
        `https://ichef.test.bbci.co.uk/ace/ws/144${imagePath}.webp 144w`,
        `https://ichef.test.bbci.co.uk/ace/ws/183${imagePath}.webp 183w`,
        `https://ichef.test.bbci.co.uk/ace/ws/240${imagePath}.webp 240w`,
        `https://ichef.test.bbci.co.uk/ace/ws/320${imagePath}.webp 320w`,
        `https://ichef.test.bbci.co.uk/ace/ws/660${imagePath}.webp 660w`,
      ].join(', ');

      const { src, srcset } = screen.getByAltText(imageAltText);

      expect(src).toEqual(imageURL);
      expect(srcset).toEqual(expectedSrcSetURLs);
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
          let container;
          await act(async () => {
            ({ container, queryByTestId } = render(
              <FeatureIdxPageWithContext
                pageData={pageData}
                showAdsBasedOnLocation={showAdsBasedOnLocation}
                toggles={toggles}
              />,
            ));
          });

          const leaderboardAd = container.querySelector(
            '[id="dotcom-leaderboard"]',
          );
          expect(leaderboardAd).not.toBeInTheDocument();

          const mpuAd = container.querySelector('[id="dotcom-mpu"]');
          expect(mpuAd).not.toBeInTheDocument();

          const adBootstrap = queryByTestId('adBootstrap');
          expect(adBootstrap).not.toBeInTheDocument();
        },
      );

      it('should render leaderboard and MPU ads when the ads toggle is enabled and is first section', async () => {
        const toggles = {
          ads: {
            enabled: true,
          },
        };

        await act(async () => {
          render(
            <FeatureIdxPageWithContext
              pageData={pageData}
              showAdsBasedOnLocation
              toggles={toggles}
            />,
          );
        });

        const leaderboardAd = document.querySelector(
          '[id="dotcom-leaderboard"]',
        );
        expect(leaderboardAd).toBeInTheDocument();

        const mpuAd = document.querySelector('[id="dotcom-mpu"]');
        expect(mpuAd).toBeInTheDocument();

        const bootstrapScript = Helmet.peek().scriptTags.find(({ innerHTML }) =>
          innerHTML.includes('window.dotcom'),
        );

        expect(bootstrapScript).toBeTruthy();
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
