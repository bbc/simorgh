import isLive from '#lib/utilities/isLive';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { useOnwardJourneyRequest } from '#app/contexts/ArticleOnwardJourneysContext';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import { topStoriesBlocks } from './helpers/fixtureData';
import TopBarOJs from '.';

jest.mock('#lib/utilities/isLive', () => jest.fn());
jest.mock('#app/components/OnwardJourneyPlaceholder', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="onward-journey-skeleton-topStoriesAndFeatures" />
  ),
}));
jest.mock('#app/contexts/ArticleOnwardJourneysContext', () => ({
  __esModule: true,
  ...jest.requireActual('#app/contexts/ArticleOnwardJourneysContext'),
  useOnwardJourneyRequest: jest.fn(),
}));

jest.mock('#hooks/useViewTracker', () => ({
  __esModule: true,
  ...jest.requireActual('#hooks/useViewTracker'),
}));

jest.mock('#hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('#hooks/useClickTrackerHandler'),
}));

describe('TopBarOJs', () => {
  beforeEach(() => {
    jest.mocked(useOnwardJourneyRequest).mockReturnValue(null);
  });

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

  it('does not render a loading placeholder outside the experiment', () => {
    jest.mocked(useOnwardJourneyRequest).mockReturnValue({
      article: null,
      isEnabled: true,
      requestOnwardJourney: jest.fn(),
    });

    render(<TopBarOJs blocks={[]} />);

    expect(
      screen.queryByTestId('top-bar-onward-journeys'),
    ).not.toBeInTheDocument();
  });

  it('renders a loading placeholder for the Top Stories treatment', () => {
    jest.mocked(useOnwardJourneyRequest).mockReturnValue({
      article: null,
      isEnabled: true,
      requestOnwardJourney: jest.fn(),
    });

    render(<TopBarOJs blocks={[]} />, {
      serverSideExperiments: [
        {
          experimentName: 'newswb_ws_topbarojs_read_more',
          variation: 'top-bar-top-stories',
          enabled: true,
        },
      ],
    });

    expect(screen.getByTestId('top-bar-onward-journeys')).toBeInTheDocument();
    expect(
      screen.getByTestId('onward-journey-skeleton-topStoriesAndFeatures'),
    ).toBeInTheDocument();
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
