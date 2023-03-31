/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import newsMostReadData from '#data/news/mostRead';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MediaArticlePage from './MediaArticlePage';
import ThemeProvider from '../../components/ThemeProvider';
import pidginPageData from './fixtureData';

jest.mock('../../components/ThemeProvider');

jest.mock('#containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const recommendationSettings = {
  hasStoryRecommendations: true,
  skipLink: {
    text: 'Skip recommendations and continue reading',
    endTextVisuallyHidden: 'End of recommendations',
  },
};

const Context = ({
  service = 'pidgin',
  children,
  adsToggledOn = false,
  mostReadToggledOn = true,
  showAdsBasedOnLocation = false,
} = {}) => (
  <BrowserRouter>
    <ThemeProvider service={service} variant="default">
      <ToggleContextProvider
        toggles={{
          mostRead: {
            enabled: mostReadToggledOn,
          },
          ads: {
            enabled: adsToggledOn,
          },
          cpsRecommendations: {
            enabled: true,
          },
        }}
      >
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          id="c0000000000o"
          isAmp={false}
          pageType={ARTICLE_PAGE}
          pathname="/pathname"
          service={service}
          statusCode={200}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
        >
          <ServiceContextProvider
            service={service}
            recommendations={recommendationSettings}
          >
            {children}
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('MediaArticlePage', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should render a news article correctly', async () => {
    fetch.mockResponse(JSON.stringify(newsMostReadData));

    const { container } = render(
      <Context service="news">
        <MediaArticlePage pageData={pidginPageData} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should NOT render mpu or advert leaderboard', async () => {
    fetch.mockResponse(JSON.stringify(newsMostReadData));

    const { container } = render(
      <Context service="news" adsToggledOn showAdsBasedOnLocation>
        <MediaArticlePage pageData={pidginPageData} />
      </Context>,
    );

    const adElements = container.querySelectorAll('[data-e2e="advertisement"]');

    await waitFor(() => {
      expect(adElements.length).toBe(0);
    });
  });
});
