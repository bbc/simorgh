import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { render, screen } from '../react-testing-library-with-providers';
import {
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
} from '../TopBarOJs/helpers/fixtureData';
import LivePagePromoExperiment from '.';

jest.mock('#hooks/useViewTracker', () => ({
  __esModule: true,
  ...jest.requireActual('#hooks/useViewTracker'),
}));

jest.mock('#hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('#hooks/useClickTrackerHandler'),
}));

describe('LivePagePromoExperiment', () => {
  const livePageBlock = topStoriesBlocksWithLiveItem[1];
  const notLivePageBlock = { ...livePageBlock, isLive: false };

  it('should render a promo for the live page instead of Top Stories', () => {
    const { getByRole, queryByRole } = render(
      // @ts-expect-error require partial data for testing purposes
      <LivePagePromoExperiment blocks={topStoriesBlocksWithLiveItem} />,
    );

    expect(getByRole('link')).toHaveAttribute(
      'href',
      `https://www.bbc.com${livePageBlock.destinationUrl}`,
    );
    expect(getByRole('link')).toHaveTextContent(/^LIVE/);
    expect(getByRole('link')).toHaveTextContent(`${livePageBlock.headline}`);
    expect(queryByRole('list')).not.toBeInTheDocument();
  });

  it.each([
    { scenario: 'Top Stories has no live page', blocks: topStoriesBlocks },
    {
      scenario: 'the live page is no longer live',
      blocks: [topStoriesBlocks[0], notLivePageBlock],
    },
  ])('should render Top Stories when $scenario', ({ blocks }) => {
    // @ts-expect-error require partial data for testing purposes
    render(<LivePagePromoExperiment blocks={blocks} />);

    expect(screen.queryByTestId('top-bar-live-promo')).not.toBeInTheDocument();
    expect(screen.getByTestId('top-bar-onward-journeys')).toBeVisible();
  });

  it('should register view and click trackers for the live promo', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
    const eventTrackingData = { componentName: 'top-bar-live-promo' };

    render(
      // @ts-expect-error require partial data for testing purposes
      <LivePagePromoExperiment blocks={topStoriesBlocksWithLiveItem} />,
    );

    expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });
});
