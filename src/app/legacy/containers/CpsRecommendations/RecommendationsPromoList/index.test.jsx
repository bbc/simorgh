import React from 'react';
import path from 'ramda/src/path';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import * as viewTracking from '#hooks/useViewTracker';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RecommendationsPromoList from './index';

process.env.SIMORGH_BASE_URL = 'http://bbc.com';

const promoItems = path(
  ['relatedContent', 'groups', 0, 'promos'],
  pidginPageData.data.article,
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
  suppressPropWarnings(['optimizely', 'null']);

  it('it renders a list of Story Promos wrapped in Grid components', () => {
    const { container } = render(
      <RecommendationsPromoList promoItems={promoItems} dir="ltr" />,
      {
        service: 'pidgin',
        toggles: {
          eventTracking: {
            enabled: true,
          },
        },
        pageType: 'STY',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render multiple promos in an unordered list', () => {
    const { container, getByRole } = render(<Fixture />);

    expect(getByRole('list')).toBeInTheDocument();
    expect(container.querySelectorAll('li').length).toEqual(3);
  });

  describe('Event Tracking', () => {
    it('should implement 3 BLOCK level and 3 LINK level click trackers (1 for each promo item)', () => {
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
        campaignID: 'cps_wsoj',
        componentName:
          'Meet%20boys%20who%20dey%20convert%20cassava%20to%20electricity',
        format: 'CHD=promo::1',
        advertiserID: 'pidgin',
        url: 'http://bbc.com/pidgin/44508901',
        preventNavigation: true,
      });

      expect(blockLevelTrackingItem2).toEqual({
        componentName: 'wsoj',
        preventNavigation: true,
      });
      expect(linkLevelTrackingItem2).toEqual({
        campaignID: 'cps_wsoj',
        componentName:
          'How%20light%20companies%20dey%20use%20estimated%20billing%20show%20Nigerians%20pepper',
        format: 'CHD=promo::2',
        advertiserID: 'pidgin',
        url: 'http://bbc.com/pidgin/tori-46975713',
        preventNavigation: true,
      });

      expect(blockLevelTrackingItem3).toEqual({
        componentName: 'wsoj',
        preventNavigation: true,
      });
      expect(linkLevelTrackingItem3).toEqual({
        campaignID: 'cps_wsoj',
        componentName:
          'Nigeria%3A%20Wetin%205%2C222%20megawatts%20electric%20fit%20do%3F',
        format: 'CHD=promo::3',
        advertiserID: 'pidgin',
        url: 'http://bbc.com/pidgin/tori-42494678',
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
        campaignID: 'cps_wsoj',
        componentName:
          'Meet%20boys%20who%20dey%20convert%20cassava%20to%20electricity',
        format: 'CHD=promo::1',
        advertiserID: 'pidgin',
        url: 'http://bbc.com/pidgin/44508901',
      });

      expect(linkLevelTrackingItem2).toEqual({
        campaignID: 'cps_wsoj',
        componentName:
          'How%20light%20companies%20dey%20use%20estimated%20billing%20show%20Nigerians%20pepper',
        format: 'CHD=promo::2',
        advertiserID: 'pidgin',
        url: 'http://bbc.com/pidgin/tori-46975713',
      });

      expect(linkLevelTrackingItem3).toEqual({
        campaignID: 'cps_wsoj',
        componentName:
          'Nigeria%3A%20Wetin%205%2C222%20megawatts%20electric%20fit%20do%3F',
        format: 'CHD=promo::3',
        advertiserID: 'pidgin',
        url: 'http://bbc.com/pidgin/tori-42494678',
      });
    });
  });
});
