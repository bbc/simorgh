import React from 'react';
import { render } from '@testing-library/react';
import path from 'ramda/src/path';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import RecommendationsPromoList from './index';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import * as viewTracking from '#hooks/useViewTracker';

const promoItems = path(
  ['relatedContent', 'groups', 0, 'promos'],
  pidginPageData,
);

const Fixture = () => (
  <ServiceContextProvider service="pidgin">
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
      }}
    >
      <RecommendationsPromoList promoItems={promoItems} dir="ltr" />,
    </ToggleContextProvider>
  </ServiceContextProvider>
);

beforeEach(jest.clearAllMocks);

describe('RecommendationsPromoList', () => {
  shouldMatchSnapshot(
    'it renders a list of Story Promos wrapped in Grid components',
    <Fixture />,
  );

  describe('Event Tracking', () => {
    it('should implement 3 BLOCK level and 3 LINK level click tracker (1 for each promo item)', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

      render(<Fixture />);

      const [
        [blockLevelTrackingItem1],
        [linkLevelTrackingItem1],

        [blockLevelTrackingItem2],
        [linkLevelTrackingItem2],

        [blockLevelTrackingItem3],
        [linkLevelTrackingItem3],
      ] = clickTrackerSpy.mock.calls;

      expect(blockLevelTrackingItem1).toEqual({
        componentName: 'wsoj',
        preventNavigation: true,
      });
      expect(linkLevelTrackingItem1).toEqual({
        componentName:
          'Meet%20boys%20who%20dey%20convert%20cassava%20to%20electricity',
        format: 'CHD=promo::1',
        url: 'pidgin',
        preventNavigation: true,
      });

      expect(blockLevelTrackingItem2).toEqual({
        componentName: 'wsoj',
        preventNavigation: true,
      });
      expect(linkLevelTrackingItem2).toEqual({
        componentName:
          'How%20light%20companies%20dey%20use%20estimated%20billing%20show%20Nigerians%20pepper',
        format: 'CHD=promo::2',
        url: 'pidgin',
        preventNavigation: true,
      });

      expect(blockLevelTrackingItem3).toEqual({
        componentName: 'wsoj',
        preventNavigation: true,
      });
      expect(linkLevelTrackingItem3).toEqual({
        componentName:
          'Nigeria%3A%20Wetin%205%2C222%20megawatts%20electric%20fit%20do%3F',
        format: 'CHD=promo::3',
        url: 'pidgin',
        preventNavigation: true,
      });
    });

    it('should implement 1 BLOCK level view tracker (1 for the whole component) and 3 LINK level click trackers (1 for each promo item)', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      render(<Fixture />);

      const [
        [blockLevelTrackingItem1],
        [linkLevelTrackingItem1],
        [linkLevelTrackingItem2],
        [linkLevelTrackingItem3],
      ] = viewTrackerSpy.mock.calls;

      expect(blockLevelTrackingItem1).toEqual({ componentName: 'wsoj' });
      expect(linkLevelTrackingItem1).toEqual({
        componentName:
          'Meet%20boys%20who%20dey%20convert%20cassava%20to%20electricity',
        format: 'CHD=promo::1',
        url: 'pidgin',
      });

      expect(linkLevelTrackingItem2).toEqual({
        componentName:
          'How%20light%20companies%20dey%20use%20estimated%20billing%20show%20Nigerians%20pepper',
        format: 'CHD=promo::2',
        url: 'pidgin',
      });

      expect(linkLevelTrackingItem3).toEqual({
        componentName:
          'Nigeria%3A%20Wetin%205%2C222%20megawatts%20electric%20fit%20do%3F',
        format: 'CHD=promo::3',
        url: 'pidgin',
      });
    });
  });
});
