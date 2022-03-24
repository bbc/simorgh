import React from 'react';
import { render, screen } from '@testing-library/react';
import path from 'ramda/src/path';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

import getInitialData from '#app/routes/cpsAsset/getInitialData';
import { MEDIA_ASSET_PAGE, STORY_PAGE } from '#app/routes/utils/pageTypes';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import * as viewTracking from '#hooks/useViewTracker';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import CpsRelatedContent from '.';

jest.mock('#hooks/useOptimizelyVariation', () => jest.fn(() => null));

const promos = path(['relatedContent', 'groups', 0, 'promos'], pidginPageData);

// eslint-disable-next-line react/prop-types
const renderRelatedContent = ({
  content = promos,
  isStoryPage = false,
  bbcOrigin = 'https://www.test.bbc.co.uk',
  service = 'pidgin',
  pageType = MEDIA_ASSET_PAGE,
} = {}) => {
  return render(
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={pageType}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: true },
          }}
        >
          <CpsRelatedContent
            content={content}
            recommendations={content}
            enableGridWrapper
            isStoryPage={isStoryPage}
          />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('CpsRelatedContent', () => {
  it('should render Story Promo components when given appropriate data', () => {
    // Ensure fixture still has promos
    expect(promos.length).toBe(3);

    const { asFragment } = renderRelatedContent();

    expect(document.querySelectorAll(`li[class*='StoryPromoLi']`).length).toBe(
      promos.length,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Story Promo components without <ul> when given single item in collection', () => {
    const topRelatedContentsOneItem = [promos[0]];

    expect(promos[0]).toBeTruthy();

    const { asFragment } = renderRelatedContent({
      content: topRelatedContentsOneItem,
    });

    expect(document.querySelector("li[class*='StoryPromoLi']")).toBeNull();

    expect(document.querySelector('ul')).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have a "region" role (a11y)', () => {
    renderRelatedContent();
    expect(document.querySelectorAll(`[role='region']`).length).toBe(1);
  });

  it('should render timestamps in milliseconds when page data has timestamps in seconds', async () => {
    const initialPromo = [
      {
        ...promos[0],
        timestamp: 1234567890,
      },
    ];

    fetch.mockResponse(
      JSON.stringify({
        ...pidginPageData,
        relatedContent: {
          groups: [
            {
              type: 'see-alsos',
              promos: initialPromo,
            },
          ],
        },
      }),
    );

    const { pageData } = await getInitialData({
      path: 'some-cps-path',
      service: 'pidgin',
    });

    const transformedPromos = path(
      ['relatedContent', 'groups', 0, 'promos'],
      pageData,
    );

    const { getByText } = renderRelatedContent({
      content: transformedPromos,
    });

    expect(getByText('February 2009', { exact: false })).not.toBeNull();
  });
  it('should render a default title if translations are not available', () => {
    renderRelatedContent({ pageType: STORY_PAGE, service: 'news' });
    expect(screen.getByText(`Related content`)).toBeTruthy();
  });

  describe('003_hindi_experiment_feature', () => {
    it('should render a normal title and Related Content for "control" variation', async () => {
      useOptimizelyVariation.mockReturnValue('control');
      const { container, queryByText } = renderRelatedContent({
        pageType: STORY_PAGE,
        isStoryPage: true,
        service: 'hindi',
      });

      expect(queryByText('संबंधित समाचार')).toBeInTheDocument();
      expect(container.querySelectorAll('time').length).toBe(3);
    });

    it('should render a translated title for Hindi Recommendations Related Content', async () => {
      useOptimizelyVariation.mockReturnValue('variation_2');
      const { queryByText } = renderRelatedContent({
        pageType: STORY_PAGE,
        isStoryPage: true,
        service: 'hindi',
      });

      expect(queryByText('ये भी पढ़ें')).toBeInTheDocument();
    });

    it('should render a timestamp for Related Content', async () => {
      useOptimizelyVariation.mockReturnValue(null);
      const { container } = renderRelatedContent({
        pageType: STORY_PAGE,
        isStoryPage: true,
        service: 'pidgin',
      });

      expect(container.querySelectorAll('time').length).toBe(3);
    });

    it('should not render a timestamp for Hindi Recommendations Related Content', async () => {
      useOptimizelyVariation.mockReturnValue('variation_2');
      const { container } = renderRelatedContent({
        pageType: STORY_PAGE,
        isStoryPage: true,
        service: 'hindi',
      });

      expect(container.querySelectorAll('time').length).toBe(0);
    });
  });
});

describe('Event Tracking', () => {
  it('should implement 3 BLOCK level click trackers(1 for each promo item) and 0 link level click trackers', () => {
    const expected = {
      componentName: 'related-content',
      preventNavigation: true,
    };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    renderRelatedContent();

    const [
      [blockLevelTrackingItem1],
      [linkLevelTrackingItem1],

      [blockLevelTrackingItem2],
      [linkLevelTrackingItem2],

      [blockLevelTrackingItem3],
      [linkLevelTrackingItem3],
    ] = clickTrackerSpy.mock.calls;

    expect(blockLevelTrackingItem1).toEqual(expected);
    expect(linkLevelTrackingItem1).toEqual({});

    expect(blockLevelTrackingItem2).toEqual(expected);
    expect(linkLevelTrackingItem2).toEqual({});

    expect(blockLevelTrackingItem3).toEqual(expected);
    expect(linkLevelTrackingItem3).toEqual({});
  });

  it('should implement 1 BLOCK level view tracker', () => {
    const expected = {
      componentName: 'related-content',
    };
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    renderRelatedContent();

    const [[blockLevelTracking]] = viewTrackerSpy.mock.calls;

    expect(blockLevelTracking).toEqual(expected);
  });
});
