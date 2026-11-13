import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { render } from '../react-testing-library-with-providers';
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

  it('should render a promo for the live page', () => {
    const { getByRole } = render(
      // @ts-expect-error require partial data for testing purposes
      <LivePagePromoExperiment blocks={topStoriesBlocksWithLiveItem} />,
    );

    expect(getByRole('link')).toHaveAttribute(
      'href',
      `https://www.bbc.com${livePageBlock.destinationUrl}`,
    );
    expect(getByRole('link')).toHaveTextContent(/^LIVE/);
    expect(getByRole('link')).toHaveTextContent(`${livePageBlock.headline}`);
  });

  it.each([
    { scenario: 'Top Stories has no live page', blocks: topStoriesBlocks },
    {
      scenario: 'the live page is no longer live',
      blocks: [topStoriesBlocks[0], notLivePageBlock],
    },
  ])('should render nothing when $scenario', ({ blocks }) => {
    const { container } = render(
      // @ts-expect-error require partial data for testing purposes
      <LivePagePromoExperiment blocks={blocks} />,
    );

    expect(container).toBeEmptyDOMElement();
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
