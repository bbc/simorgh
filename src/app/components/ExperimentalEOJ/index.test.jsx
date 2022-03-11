/* eslint-disable react/prop-types */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import mundoRecommendationsData from '#pages/StoryPage/fixtureData/recommendations.ltr.json';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import {
  threeLinks,
  oneLinkOnly,
  moreThanThreeLinks,
} from './helpers/fixtureData';
import ScrollablePromo from '.';
import { edOjA, edOjB } from './fixtures';

jest.mock('#hooks/useOptimizelyVariation', () => jest.fn(() => null));

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  user: {
    attributes: {},
  },
  close: jest.fn(),
};

const pageData = {
  metadata: {
    analyticsLabels: {
      counterName: 'mundo.media.media_asset.52123665.page',
    },
    atiAnalytics: {
      producerName: 'MUNDO',
      producerId: '62',
    },
    locators: {
      assetUri: '/mundo/noticias-internacional-60519322',
      cpsUrn: 'urn:bbc:content:assetUri:mundo/noticias-internacional-60519322',
      curie: 'http://www.bbc.co.uk/asset/5409e20a-bc37-4ee0-9ac0-610cc38671d5',
      assetId: '60519322',
    },
  },
};

const ScrollablePromoWithContext = ({
  blocks,
  blockGroupIndex,
  isRecommendationType,
  translations,
  service,
}) => (
  <ToggleContextProvider>
    <ServiceContext.Provider
      value={{
        service,
        translations,
        atiAnalyticsProducerId: 62,
      }}
    >
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType={STORY_PAGE}
        service="hindi"
        pathname="/pathname"
        platform="canonical"
        statsDestination="WS_NEWS_LANGUAGES_TEST"
        statusCode={200}
      >
        <EventTrackingContextProvider pageData={pageData}>
          <OptimizelyProvider optimizely={optimizely} isServerSide>
            <ScrollablePromo
              blocks={blocks}
              blockGroupIndex={blockGroupIndex}
              isRecommendationType={isRecommendationType}
            />
          </OptimizelyProvider>
        </EventTrackingContextProvider>
      </RequestContextProvider>
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

describe('ScrollablePromo', () => {
  it('should return null if no data is passed', () => {
    const { container } = render(
      <ScrollablePromoWithContext blocks={{}} service="news" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render max 3 promo items', () => {
    const { getAllByRole } = render(
      <ScrollablePromoWithContext blocks={moreThanThreeLinks} service="news" />,
    );
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  it('should render single promo item', () => {
    const { container } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} service="news" />,
    );
    expect(container.childElementCount).toEqual(1);
  });

  it('should not render a list when there is only one promo', () => {
    const { queryByRole } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} service="news" />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render unordered list if more than 1 item', () => {
    const { queryByRole, getAllByRole } = render(
      <ScrollablePromoWithContext blocks={threeLinks} service="news" />,
    );
    expect(queryByRole('list')).toBeInTheDocument();
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  describe('event tracking in editorial onward journeys', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call the view tracking hook with the correct params with one editorial onward journey', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
    });

    it('should call the view tracking hook with the correct params with multiple editorial onward journeys', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );
      render(
        <ScrollablePromoWithContext
          blocks={edOjB.model.blocks}
          blockGroupIndex={2}
          service="news"
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledTimes(2);
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj2',
        format: 'CHD=edoj',
      });
    });

    it('should call the click tracking hook with one editorial onward journey', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
    });

    it('should call the click tracking hook with multiple editorial onward journeys', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );
      render(
        <ScrollablePromoWithContext
          blocks={edOjB.model.blocks}
          blockGroupIndex={2}
          service="news"
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledTimes(2);
      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj2',
        format: 'CHD=edoj',
      });
    });
  });

  it('it should not be a list if a single card is displayed (a11y)', () => {
    const { queryByRole } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} service="news" />,
    );
    expect(queryByRole('list')).toBeNull();
  });
});

describe('recommendationEOJ', () => {
  beforeEach(() => {
    useOptimizelyVariation.mockReturnValue('variation_3');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render recommendation variation when recommendation && recommendation data are passed', () => {
    const { getAllByRole, queryByRole, queryByText } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="news"
      />,
    );
    expect(getAllByRole('listitem').length).toEqual(3);
    expect(queryByRole('region')).toBeInTheDocument();
    expect(queryByText('Recommended stories')).toBeInTheDocument();
  });

  it('should render translated title', () => {
    const { getByText } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="mundo"
        translations={{ recommendationTitle: 'Quizás también te interese' }}
      />,
    );
    expect(getByText('Quizás también te interese')).toBeInTheDocument();
  });

  it('should have a section with a "region" role (a11y)', () => {
    const { getByRole } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="news"
      />,
    );
    expect(getByRole('region', { elementType: 'section' })).toBeInTheDocument();
  });

  it('the section with role region should be correctly labelledBy the strong element (a11y)', () => {
    const { getByRole } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="news"
      />,
    );
    const region = getByRole('region');
    expect(region.getAttribute('aria-labelledBy')).toEqual(
      'recommendations-heading',
    );
  });

  it('should call the view tracking hook with the correct params (including optimizely)', async () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        blockGroupIndex={1}
        isRecommendationType
        service="news"
      />,
    );
    await waitFor(
      () => {
        expect(optimizely.track).toHaveBeenCalledTimes(1);
        expect(viewTrackerSpy).toHaveBeenCalledWith({
          componentName: 'edoj1',
          format: 'CHD=edoj',
          optimizely: expect.anything(),
        });
        expect(optimizely.track).toBeCalledWith('component_views', undefined, {
          viewed_edoj1: true,
        });
      },
      { timeout: 2000 },
    );
  }, 10000);

  it('should send optimizely click event when link is clicked', async () => {
    const { getByText } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        blockGroupIndex={1}
        isRecommendationType
        service="news"
      />,
    );

    const link = getByText(
      'La conmovedora historia de cómo una madre y el hombre preso por la muerte de su hija se unieron para atrapar al verdadero asesino',
    );

    userEvent.click(link);

    await waitFor(
      () => {
        expect(optimizely.track).toHaveBeenCalledTimes(1);
        expect(optimizely.track).toBeCalledWith('component_clicks', undefined, {
          clicked_edoj1: true,
        });
      },
      { timeout: 2000 },
    );
  });

  it('should not send optimizely click event when link is not clicked', async () => {
    render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        blockGroupIndex={1}
        isRecommendationType
        service="news"
      />,
    );

    await waitFor(
      () => {
        const optimizelyClickCalls = optimizely.track.mock.calls.filter(
          ([eventName]) => eventName === 'component_clicks',
        );

        expect(optimizelyClickCalls.length).toBe(0);
      },
      { timeout: 2000 },
    );
  });

  it('should send only one optimizely click event if the link is clicked more than once', async () => {
    const { getByText } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        blockGroupIndex={1}
        isRecommendationType
        service="news"
      />,
    );

    const link = getByText(
      'La conmovedora historia de cómo una madre y el hombre preso por la muerte de su hija se unieron para atrapar al verdadero asesino',
    );

    userEvent.click(link);
    userEvent.click(link);

    await waitFor(
      () => {
        expect(optimizely.track).toHaveBeenCalledTimes(1);
        expect(optimizely.track).toBeCalledWith('component_clicks', undefined, {
          clicked_edoj1: true,
        });
      },
      { timeout: 2000 },
    );
  });
});
