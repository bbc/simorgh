/* eslint-disable react/prop-types */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import {
  oneRecommendation,
  twoRecommendations,
  threeRecommendations,
  fourRecommendations,
} from './helpers/fixtureData';
import ExperimentalEOJ from '.';

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

const ExperimentalEOJWithContext = ({
  blocks,
  blockGroupIndex,
  translations,
  service,
  eventTracking = true,
}) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: {
        enabled: eventTracking,
      },
    }}
  >
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
            <ExperimentalEOJ
              blocks={blocks}
              blockGroupIndex={blockGroupIndex}
            />
          </OptimizelyProvider>
        </EventTrackingContextProvider>
      </RequestContextProvider>
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

describe('ExperimentalEOJ', () => {
  it('should return null if no data is provided', () => {
    const { container } = render(
      <ExperimentalEOJWithContext blocks={[]} service="news" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render max 3 recommendations when more than 3 recommendations are provided', () => {
    const { getAllByRole } = render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
        service="news"
      />,
    );
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  it('should correctly render single recommendation', () => {
    const { container } = render(
      <ExperimentalEOJWithContext blocks={oneRecommendation} service="news" />,
    );
    expect(container.childElementCount).toEqual(1);
  });

  it('should not render a list when only one recommendation is provided', () => {
    const { queryByRole } = render(
      <ExperimentalEOJWithContext blocks={oneRecommendation} service="news" />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render an unordered list when more than 1 recommendation is provided', () => {
    const { queryByRole, getAllByRole } = render(
      <ExperimentalEOJWithContext
        blocks={threeRecommendations}
        service="news"
      />,
    );
    expect(queryByRole('list')).toBeInTheDocument();
    expect(getAllByRole('listitem').length).toEqual(3);
  });
});

describe('ExperimentalEOJ event tracking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the view tracking hook with the correct params with one editorial onward journey', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    render(
      <ExperimentalEOJWithContext
        blocks={oneRecommendation}
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
      <ExperimentalEOJWithContext
        blocks={oneRecommendation}
        blockGroupIndex={1}
        service="news"
      />,
    );
    render(
      <ExperimentalEOJWithContext
        blocks={twoRecommendations}
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
      <ExperimentalEOJWithContext
        blocks={oneRecommendation}
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
      <ExperimentalEOJWithContext
        blocks={oneRecommendation}
        blockGroupIndex={1}
        service="news"
      />,
    );
    render(
      <ExperimentalEOJWithContext
        blocks={twoRecommendations}
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
    <ExperimentalEOJWithContext blocks={oneRecommendation} service="news" />,
  );
  expect(queryByRole('list')).toBeNull();
});

describe('ExperimentalEOJ optimizely tracking', () => {
  beforeEach(() => {
    useOptimizelyVariation.mockReturnValue('variation_3');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render recommendation variation when recommendation && recommendation data are passed', () => {
    const { getAllByRole, queryByRole, queryByText } = render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
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
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
        isRecommendationType
        service="mundo"
        translations={{ recommendationTitle: 'Quizás también te interese' }}
      />,
    );
    expect(getByText('Quizás también te interese')).toBeInTheDocument();
  });

  it('should have a section with a "region" role (a11y)', () => {
    const { getByRole } = render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
        isRecommendationType
        service="news"
      />,
    );
    expect(getByRole('region', { elementType: 'section' })).toBeInTheDocument();
  });

  it('the section with role region should be correctly labelledBy the strong element (a11y)', () => {
    const { getByRole } = render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
        isRecommendationType
        service="news"
      />,
    );
    const region = getByRole('region');
    expect(region.getAttribute('aria-labelledBy')).toEqual(
      'eoj-recommendations-heading',
    );
  });

  it('should call the view tracking hook with the correct params (including optimizely)', async () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
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
          [`viewed_${OPTIMIZELY_CONFIG.viewClickAttributeId}`]: true,
        });
      },
      { timeout: 2000 },
    );
  }, 10000);

  it('should send optimizely click event when link is clicked', async () => {
    const { getByText } = render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
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
          [`clicked_${OPTIMIZELY_CONFIG.viewClickAttributeId}`]: true,
        });
      },
      { timeout: 2000 },
    );
  });

  it('should not send optimizely click event when tracking is not enabled', async () => {
    const { getByText } = render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
        blockGroupIndex={1}
        isRecommendationType
        service="news"
        eventTracking={false}
      />,
    );

    const link = getByText(
      'La conmovedora historia de cómo una madre y el hombre preso por la muerte de su hija se unieron para atrapar al verdadero asesino',
    );

    userEvent.click(link);

    await waitFor(
      () => {
        expect(optimizely.track).toHaveBeenCalledTimes(0);
      },
      { timeout: 2000 },
    );
  });

  it('should send only one optimizely click event if the link is clicked more than once', async () => {
    const { getByText } = render(
      <ExperimentalEOJWithContext
        blocks={fourRecommendations}
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
          [`clicked_${OPTIMIZELY_CONFIG.viewClickAttributeId}`]: true,
        });
      },
      { timeout: 2000 },
    );
  });
});
