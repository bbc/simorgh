import isLive from '#lib/utilities/isLive';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import { topStoriesBlocks } from './helpers/fixtureData';
import TopBarOJs from '.';

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('TopBarOJs', () => {
  it('it should display Top Stories label', () => {
    const { getByText, queryByText } = render(
      // @ts-expect-error require partial data for testing purposes
      <TopBarOJs blocks={topStoriesBlocks} />,
    );
    expect(getByText('Top Stories')).toBeVisible();
    expect(queryByText('Popular Reads')).toBeNull();
  });

  it('it should display 3 promo items with Top Stories', () => {
    // @ts-expect-error require partial data for testing purposes
    const { getAllByRole } = render(<TopBarOJs blocks={topStoriesBlocks} />);
    expect(getAllByRole('listitem')).toHaveLength(3);
  });

  it('it should display Top Stories content', () => {
    // @ts-expect-error require partial data for testing purposes
    const { getAllByRole } = render(<TopBarOJs blocks={topStoriesBlocks} />);
    const expectedFirstHeadline =
      topStoriesBlocks[0].headlines.promoHeadline.blocks[0].model.blocks[0]
        .model.text;
    expect(getAllByRole('listitem')[0]).toHaveTextContent(
      expectedFirstHeadline,
    );
  });

  it('should return null if no data is passed', () => {
    const { container } = render(<TopBarOJs blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render TopBarOJs component when isLive is true', () => {
    const mockedIsLive = isLive as jest.Mock;
    mockedIsLive.mockReturnValue(true);
    const { container } = render(
      // @ts-expect-error require partial data for testing purposes
      !isLive() && <TopBarOJs blocks={topStoriesBlocks} />,
    );

    expect(
      screen.queryByTestId('top-bar-onward-journeys'),
    ).not.toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
    expect(isLive()).toBe(true);
  });

  it('should render TopBarOJs component when isLive is false', () => {
    const mockedIsLive = isLive as jest.Mock;
    mockedIsLive.mockReturnValue(false);
    const { container } = render(
      // @ts-expect-error require partial data for testing purposes
      !isLive() && <TopBarOJs blocks={topStoriesBlocks} />,
    );

    expect(screen.queryByTestId('top-bar-onward-journeys')).toBeInTheDocument();
    expect(container).not.toBeEmptyDOMElement();
    expect(isLive()).toBe(false);
  });

  describe('Event Tracking', () => {
    const eventTrackingData = { componentName: 'top-bar-oj' };

    describe('View tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker if event tracking data provided', () => {
        // @ts-expect-error require partial data for testing purposes
        render(<TopBarOJs blocks={topStoriesBlocks} />);

        expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });
    });

    describe('Click tracking', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

      it('should register click tracker if event tracking data provided', () => {
        // @ts-expect-error require partial data for testing purposes
        render(<TopBarOJs blocks={topStoriesBlocks} />);

        expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });

      it('should handle a click event when link clicked', () => {
        clickTrackerSpy.mockRestore();
        // @ts-expect-error require partial data for testing purposes
        const { container } = render(<TopBarOJs blocks={topStoriesBlocks} />);

        const [anchorTag] = container.getElementsByTagName('a');
        fireEvent.click(anchorTag);

        expect(anchorTag.onclick).toBeTruthy();
      });
    });
  });
});
