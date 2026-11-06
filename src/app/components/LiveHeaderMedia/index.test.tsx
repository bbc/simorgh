import mundoLiveFixture from '#data/mundo/live/c7dkx155e626t.json';
import LiveHeaderMedia from '.';
import { BumpType, MediaCollection, Player } from '../MediaLoader/types';
import {
  act,
  screen,
  waitFor,
  render,
  fireEvent,
} from '../react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

jest.mock('../../hooks/useViewTracker', () => ({
  __esModule: true,
  ...jest.requireActual('../../hooks/useViewTracker'),
}));

jest.mock('../../hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('../../hooks/useClickTrackerHandler'),
}));

const fixtureData = mundoLiveFixture.data.mediaCollections;

describe('liveMediaStream', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Only renders the media player once the watch button is clicked.', () => {
    const { container } = render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');

    expect(playCloseButton).toBeInTheDocument();
    expect(container.querySelector('figure')).not.toBeInTheDocument();

    fireEvent.click(playCloseButton);

    expect(container.querySelector('figure')).toBeInTheDocument();
  });

  it('Loads RequireJS before the watch button is clicked.', async () => {
    render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    await waitFor(() =>
      expect(
        document.querySelector(
          'script[src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"]',
        ),
      ).toBeInTheDocument(),
    );
  });

  it.each([
    {
      title:
        'Plays the media once the player has loaded after the first click.',
      warning: null,
      closeBeforeReady: false,
      playCalls: 1,
    },
    {
      title:
        'Does not play the media once the player has loaded for Level 1 warnings and above.',
      warning: [
        {
          warning_code: 'L1',
          short_description: 'some strong language',
        },
      ],
      closeBeforeReady: false,
      playCalls: 0,
    },
    {
      title:
        'Does not play the media if it is closed before the player has loaded.',
      warning: null,
      closeBeforeReady: true,
      playCalls: 0,
    },
  ])('$title', async ({ warning, closeBeforeReady, playCalls }) => {
    const mockPlayer = {
      load: jest.fn(),
      bind: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
    } satisfies Partial<Player>;
    const mockBump = { player: () => mockPlayer } as unknown as BumpType;
    const mockRequire = jest.fn();
    window.requirejs = mockRequire;
    window.mediaPlayers = {};

    const mediaCollection = JSON.parse(JSON.stringify(fixtureData));
    const { version } = mediaCollection[0].model;
    if (warning) {
      version.warnings = { warning_text: '', warning };
    } else {
      delete version.warnings;
    }

    render(
      <LiveHeaderMedia
        mediaCollection={mediaCollection as MediaCollection[]}
      />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);
    if (closeBeforeReady) fireEvent.click(playCloseButton);

    const initialisePlayer = mockRequire.mock.calls[0][1];
    await act(async () => initialisePlayer(mockBump));

    expect(mockPlayer.play).not.toHaveBeenCalled();

    const playlistLoaded = mockPlayer.bind.mock.calls.find(
      ([event]) => event === 'playlistLoaded',
    )?.[1];
    playlistLoaded();
    playlistLoaded();

    expect(mockPlayer.play).toHaveBeenCalledTimes(playCalls);
  });

  it('Displays a warning message when needed.', () => {
    const mediaBlock = fixtureData[0];
    mediaBlock.model.version.warnings = {
      warning_text: 'Contains some upsetting scenes.',
      warning: [
        {
          warning_code: 'D1',
          short_description: 'some upsetting scenes',
        },
      ],
    };

    const { container } = render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = container.querySelector(
      'span[data-testid="warning-message"]',
    );

    expect(playCloseButton?.innerHTML).toContain(
      'Contains some upsetting scenes.',
    );
  });

  it('Plays the media loader when the watch button is clicked.', () => {
    window.mediaPlayers = {
      p0gh4n67: {
        play: jest.fn(),
        pause: jest.fn(),
      },
    } as unknown as Record<string, Player>;

    render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);

    expect(window.mediaPlayers.p0gh4n67.play).toHaveBeenCalled();
  });

  it('Paused the media loader when the close button is clicked.', () => {
    window.mediaPlayers = {
      p0gh4n67: {
        play: jest.fn(),
        pause: jest.fn(),
      },
    } as unknown as Record<string, Player>;
    render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);
    fireEvent.click(playCloseButton);

    expect(window.mediaPlayers.p0gh4n67.play).toHaveBeenCalledTimes(1);
    expect(window.mediaPlayers.p0gh4n67.pause).toHaveBeenCalledTimes(1);
  });

  it('Displays nothing if no mediaCollection is passed in.', () => {
    const { container } = render(<LiveHeaderMedia mediaCollection={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('Displays nothing if an empty array is passed in.', () => {
    const { container } = render(
      <LiveHeaderMedia mediaCollection={[] as MediaCollection[]} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    {
      title: 'Should NOT autoplay for Level 1 warnings and above.',
      playCalls: 0,
      warning: [
        {
          warning_code: 'D1',
          short_description: 'some upsetting scenes',
        },
        {
          warning_code: 'D2',
          short_description: 'upsetting scenes',
        },
        {
          warning_code: 'L1',
          short_description: 'some strong language',
        },
      ],
    },
    {
      title: 'Should autoplay for below L1 warnings.',
      playCalls: 1,
      warning: [
        {
          warning_code: 'D1',
          short_description: 'some upsetting scenes',
        },
        {
          warning_code: 'D2',
          short_description: 'upsetting scenes',
        },
      ],
    },
  ])('$title', ({ warning, playCalls }) => {
    const mediaBlock = fixtureData[0];
    mediaBlock.model.version.warnings = {
      warning_text: '',
      warning,
    };

    window.mediaPlayers = {
      p0gh4n67: {
        play: jest.fn(),
        pause: jest.fn(),
      },
    } as unknown as Record<string, Player>;

    render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);

    expect(window.mediaPlayers.p0gh4n67.play).toHaveBeenCalledTimes(playCalls);
  });

  describe('Event Tracking', () => {
    const eventTrackingData = { componentName: 'live-header-media' };

    describe('Click tracking', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

      it('should register click tracker', () => {
        render(
          <LiveHeaderMedia
            mediaCollection={fixtureData as MediaCollection[]}
          />,
        );
        expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });
    });

    describe('View tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker', () => {
        render(
          <LiveHeaderMedia
            mediaCollection={fixtureData as MediaCollection[]}
          />,
        );

        expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });
    });
  });

  describe('Text content states', () => {
    it.each([
      {
        title:
          'Displays correct text content in open state with no punctuation',
        inputTitle: 'Title with no punctuation',
        expectedResult:
          'Title with no punctuation, Contains some upsetting scenes.Watch',
      },
      {
        title: 'Displays correct text content in open state with punctuation',
        inputTitle: 'Title with punctuation!',
        expectedResult:
          'Title with punctuation! Contains some upsetting scenes.Watch',
      },
    ])('Open state - $title', ({ inputTitle, expectedResult }) => {
      const mediaBlock = fixtureData[0];
      mediaBlock.model.synopses.short = inputTitle;
      mediaBlock.model.version.warnings = {
        warning_text: 'Contains some upsetting scenes.',
        warning: [
          {
            warning_code: 'D1',
            short_description: 'some upsetting scenes',
          },
        ],
      };

      const { container } = render(
        <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
      );

      const mediaLoader = container.querySelector(
        'button[data-testid="watch-now-close-button"]',
      );

      expect(mediaLoader?.textContent).toEqual(expectedResult);
    });

    it.each([
      {
        title:
          'Displays correct text content in close state with no punctuation',
        inputTitle: 'Title with no punctuation',
        expectedResult:
          'Close video, Title with no punctuation, Contains some upsetting scenes.',
      },
      {
        title: 'Displays correct text content in close state with punctuation',
        inputTitle: 'Title with punctuation!',
        expectedResult:
          'Close video, Title with punctuation! Contains some upsetting scenes.',
      },
    ])('Close state - $title', ({ inputTitle, expectedResult }) => {
      const mediaBlock = fixtureData[0];
      mediaBlock.model.synopses.short = inputTitle;
      mediaBlock.model.version.warnings = {
        warning_text: 'Contains some upsetting scenes.',
        warning: [
          {
            warning_code: 'D1',
            short_description: 'some upsetting scenes',
          },
        ],
      };

      window.mediaPlayers = {
        p0gh4n67: {
          play: jest.fn(),
          pause: jest.fn(),
        },
      } as unknown as Record<string, Player>;

      const { container } = render(
        <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
      );

      const mediaLoader = container.querySelector(
        'button[data-testid="watch-now-close-button"]',
      );

      const playCloseButton = screen.getByTestId('watch-now-close-button');
      fireEvent.click(playCloseButton);

      expect(mediaLoader?.textContent).toEqual(expectedResult);
    });
  });
});
