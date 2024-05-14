import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import newsMostReadData from '../../../../data/news/mostRead/index.json';
import MediaArticlePage from './MediaArticlePage';
import ThemeProvider from '../../components/ThemeProvider';
import pidginPageData from './fixtureData';
import { Services } from '../../models/types/global';

jest.mock('../../components/ThemeProvider');

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

type ContextProps = {
  service: Services;
  adsToggledOn?: boolean;
  mostReadToggledOn?: boolean;
  showAdsBasedOnLocation?: boolean;
};

const Context = ({
  service = 'pidgin',
  children,
  adsToggledOn = false,
  mostReadToggledOn = true,
  showAdsBasedOnLocation = false,
}: PropsWithChildren<ContextProps>) => (
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
        }}
      >
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          id="c0000000000o"
          isAmp={false}
          isApp={false}
          pageType={ARTICLE_PAGE}
          pathname="/pathname"
          service={service}
          statusCode={200}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
          isUK
        >
          <ServiceContextProvider service={service}>
            {children}
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);

const fetchMock = fetch as FetchMock;

describe('MediaArticlePage', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should render a news article correctly', async () => {
    fetchMock.mockResponse(JSON.stringify(newsMostReadData));

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
    fetchMock.mockResponse(JSON.stringify(newsMostReadData));

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
