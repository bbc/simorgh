import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ComscoreAnalytics from '.';

const mockToggleDispatch = jest.fn();

const defaultPersonalisation = { personalisationEnabled: false };

jest.mock('#app/lib/utilities/getEnvConfig', () => ({
  getEnvConfig: jest.fn(() => ({
    SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN: 'https://static.files.bbci.co.uk',
    SIMORGH_PUBLIC_STATIC_ASSETS_PATH: '/ws/simorgh-assets/public/',
  })),
}));

const ContextWrap = ({
  pageType,
  platform,
  origin,
  children,
  comscoreAnalyticsToggle,
  showCookieBannerBasedOnCountry,
  personalisation = defaultPersonalisation,
}) => {
  const requestContextValue = useMemo(
    () => ({
      toggleState: {
        comscoreAnalytics: {
          enabled: comscoreAnalyticsToggle,
        },
      },
      toggleDispatch: mockToggleDispatch,
    }),
    [comscoreAnalyticsToggle],
  );
  return (
    <RequestContextProvider
      isAmp={platform === 'amp'}
      pageType={pageType}
      service="news"
      statusCode={200}
      bbcOrigin={origin}
      pathname="/pathname"
      showCookieBannerBasedOnCountry={showCookieBannerBasedOnCountry}
    >
      <ServiceContextProvider service="pidgin">
        <ToggleContext.Provider value={requestContextValue}>
          <UserContext.Provider value={personalisation}>
            {children}
          </UserContext.Provider>
        </ToggleContext.Provider>
      </ServiceContextProvider>
    </RequestContextProvider>
  );
};

describe('Comscore Analytics Container', () => {
  describe('AMP', () => {
    it('should return null when toggle is disabled', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle={false}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should render comscore amp-analytics component', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle
          showCookieBannerBasedOnCountry={false}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container.firstChild).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should return null when country-based cookie logic is enabled', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle
          showCookieBannerBasedOnCountry
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Canonical', () => {
    it('should render comscore script with correct static assets path', async () => {
      render(
        <ContextWrap
          platform="canonical"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle
          showCookieBannerBasedOnCountry
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      const { scriptTags, noscriptTags } = Helmet.peek();

      expect(scriptTags[0]).toMatchObject({
        async: true,
        type: 'text/javascript',
        src: 'https://static.files.bbci.co.uk/ws/simorgh-assets/public/static/js/comscore/main-1.0.js',
      });

      expect(noscriptTags[0].innerHTML).toContain(
        '<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cv=2.0&cj=1" />',
      );
    });

    it('should return null when toggle is disabled', async () => {
      const { container } = render(
        <ContextWrap
          platform="canonical"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle={false}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
