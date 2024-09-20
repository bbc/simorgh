import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import { Article } from '#app/models/types/optimo';
import { Helmet } from 'react-helmet';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import newsMostReadData from '../../../../data/news/mostRead/index.json';
import MediaArticlePage from './MediaArticlePage';
import ThemeProvider from '../../components/ThemeProvider';
import { pidginPageData } from './fixtureData';
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
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';

    fetchMock.resetMocks();
  });

  afterEach(() => {
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  it('should render a news article correctly', async () => {
    fetchMock.mockResponse(JSON.stringify(newsMostReadData));

    const { container } = render(
      <Context service="news">
        <MediaArticlePage pageData={pidginPageData as unknown as Article} />
      </Context>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should set "amphtml" link tag for asset', async () => {
    render(
      <Context service="pidgin">
        <MediaArticlePage pageData={pidginPageData as unknown as Article} />
      </Context>,
    );

    const helmetContent = Helmet.peek()?.linkTags;
    const ampHtmlLink = helmetContent.find(link => link.rel === 'amphtml');

    expect(ampHtmlLink).toEqual({
      href: 'https://www.test.bbc.co.uk/pathname.amp',
      rel: 'amphtml',
    });
  });

  it('should not set "amphtml" link tag for TC2 asset', async () => {
    const pageDataAsTC2Asset = {
      ...pidginPageData,
      metadata: {
        ...pidginPageData.metadata,
        analyticsLabels: {
          ...pidginPageData.metadata.analyticsLabels,
          contentId:
            'urn:bbc:topcat:curie:asset:7b51390e-c5c3-11e3-a6ee-819a3db9bd6e',
        },
      },
    };

    render(
      <Context service="pidgin">
        <MediaArticlePage pageData={pageDataAsTC2Asset as unknown as Article} />
      </Context>,
    );

    const helmetContent = Helmet.peek()?.linkTags;
    const ampHtmlLink = helmetContent.find(link => link.rel === 'amphtml');

    expect(ampHtmlLink).toBeUndefined();
  });

  it('should NOT render mpu or advert leaderboard', async () => {
    fetchMock.mockResponse(JSON.stringify(newsMostReadData));

    const { container } = render(
      <Context service="news" adsToggledOn showAdsBasedOnLocation>
        <MediaArticlePage pageData={pidginPageData as unknown as Article} />
      </Context>,
    );

    const adElements = container.querySelectorAll('[data-e2e="advertisement"]');

    await waitFor(() => {
      expect(adElements.length).toBe(0);
    });
  });

  it('should render image with the .webp image extension', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageBlock = pidginPageData.content.model.blocks[6] as any;
    const imageAltText =
      imageBlock.model.blocks[0].model.blocks[0].model.blocks[0].model.text;
    const imageLocator = imageBlock.model.blocks[1].model.locator;
    const imageOriginCode = imageBlock.model.blocks[1].model.originCode;
    const imageURL = `https://ichef.test.bbci.co.uk/ace/ws/640/${imageOriginCode}/${imageLocator}.webp`;
    const expectedSrcSetURLs = [
      `https://ichef.test.bbci.co.uk/ace/ws/240/${imageOriginCode}/${imageLocator}.webp 240w`,
      `https://ichef.test.bbci.co.uk/ace/ws/320/${imageOriginCode}/${imageLocator}.webp 320w`,
      `https://ichef.test.bbci.co.uk/ace/ws/480/${imageOriginCode}/${imageLocator}.webp 480w`,
      `https://ichef.test.bbci.co.uk/ace/ws/624/${imageOriginCode}/${imageLocator}.webp 624w`,
      `https://ichef.test.bbci.co.uk/ace/ws/800/${imageOriginCode}/${imageLocator}.webp 800w`,
    ].join(', ');

    render(
      <Context service="news" adsToggledOn showAdsBasedOnLocation>
        <MediaArticlePage pageData={pidginPageData as unknown as Article} />
      </Context>,
    );

    const { src, srcset } = screen.getByAltText(
      imageAltText,
    ) as HTMLImageElement;

    expect(src).toEqual(imageURL);
    expect(srcset).toEqual(expectedSrcSetURLs);
  });

  const services = ['serbian', 'uzbek', 'zhongwen'] satisfies Services[];

  services.forEach(service => {
    it(`should not render a relatedTopics onward journey for a ${service} optimo article`, async () => {
      const { queryByTestId } = render(
        <Context service={service as Services}>
          <MediaArticlePage pageData={pidginPageData as unknown as Article} />
        </Context>,
      );
      const relatedTopics = queryByTestId('related-topics');
      expect(relatedTopics).toBeNull();
    });
  });
});
