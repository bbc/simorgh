import mundoLiveFixture from '#data/mundo/live/c7dkx155e626t.json';
import LiveHeaderMedia from '.';
import {
  BumpType,
  MediaCollection,
  Player,
  PlayerConfig,
} from '../MediaLoader/types';
import {
  act,
  screen,
  render,
  fireEvent,
} from '../react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

// Jest hoists module factories above imports, so this reference must be
// initialized by the factory before the tests use it.
// eslint-disable-next-line no-var
var mockLogger: { error: jest.Mock };

jest.mock('../../hooks/useViewTracker', () => ({
  __esModule: true,
  ...jest.requireActual('../../hooks/useViewTracker'),
}));

jest.mock('../../hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  ...jest.requireActual('../../hooks/useClickTrackerHandler'),
}));

jest.mock('../../lib/logger.node', () => {
  mockLogger = { error: jest.fn() };
  return jest.fn(() => mockLogger);
});

const fixtureData = mundoLiveFixture.data.mediaCollections;
const REQUIRE_JS_SRC =
  'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js';

type MockRequire = jest.Mock<unknown, unknown[]> & {
  config: jest.Mock;
};

const createMockRequire = (): MockRequire => {
  const mockRequire = jest.fn() as MockRequire;
  mockRequire.config = jest.fn();
  return mockRequire;
};

const createMockPlayer = (): jest.Mocked<Player> => ({
  currentTime: jest.fn(),
  dispatchEvent: jest.fn(),
  load: jest.fn(),
  play: jest.fn(),
  playlist: jest.fn(),
  pause: jest.fn(),
  previous: jest.fn(),
  next: jest.fn(),
  bind: jest.fn(),
  loadPlugin: jest.fn(),
  queuePlaylist: jest.fn(),
  setPreviousPlaylist: jest.fn(),
  settings: jest.fn(),
});

const createMockBump = (
  player = createMockPlayer(),
): jest.Mocked<BumpType> => ({
  player: jest.fn(
    (_div: HTMLDivElement | null, _config: PlayerConfig) => player,
  ),
});

describe('liveMediaStream', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogger.error.mockClear();
    window.requirejs = createMockRequire();
    window.mediaPlayers = {};
  });

  it('waits for RequireJS before loading a cold-start player', async () => {
    delete window.requirejs;

    const coldStartMediaCollection = fixtureData.map(
      (mediaCollectionItem, index) =>
        index === 0
          ? {
              ...mediaCollectionItem,
              model: {
                ...mediaCollectionItem.model,
                version: {
                  ...mediaCollectionItem.model.version,
                  warnings: {
                    warning_text: '',
                    warning: [
                      {
                        warning_code: 'D1',
                        short_description: 'some upsetting scenes',
                      },
                    ],
                  },
                },
              },
            }
          : mediaCollectionItem,
    ) as MediaCollection[];

    const mockRequire = createMockRequire();
    const mockPlayer = createMockPlayer();
    const mockBump = createMockBump(mockPlayer);

    const { container } = render(
      <LiveHeaderMedia mediaCollection={coldStartMediaCollection} />,
    );
    const playCloseButton = screen.getByTestId('watch-now-close-button');

    expect(container.querySelector('figure')).not.toBeInTheDocument();
    expect(
      document.querySelector(`script[src="${REQUIRE_JS_SRC}"]`),
    ).not.toBeInTheDocument();

    fireEvent.click(playCloseButton);

    const requireScript = document.querySelector(
      `script[src="${REQUIRE_JS_SRC}"]`,
    );
    expect(requireScript).toBeInTheDocument();
    expect(mockRequire).not.toHaveBeenCalled();
    expect(mockBump.player).not.toHaveBeenCalled();
    expect(mockLogger.error).not.toHaveBeenCalled();

    fireEvent.click(playCloseButton);
    expect(mockPlayer.play).not.toHaveBeenCalled();
    window.requirejs = mockRequire;

    await act(async () => {
      requireScript?.dispatchEvent(new Event('load'));
      await Promise.resolve();
    });

    expect(mockRequire.config).toHaveBeenCalledWith({
      paths: { 'bump-4': 'https://emp.bbci.co.uk/emp/bump-4/bump-4' },
      waitSeconds: 30,
    });
    expect(mockRequire).toHaveBeenCalledTimes(1);
    expect(mockRequire.config.mock.invocationCallOrder[0]).toBeLessThan(
      mockRequire.mock.invocationCallOrder[0],
    );
    expect(mockBump.player).not.toHaveBeenCalled();

    const loadBump = mockRequire.mock.calls[0][1] as (Bump: BumpType) => void;
    await act(async () => loadBump(mockBump));

    expect(mockBump.player).toHaveBeenCalledTimes(1);
    expect(mockPlayer.load).toHaveBeenCalledTimes(1);
    expect(mockPlayer.play).not.toHaveBeenCalled();

    expect(window.mediaPlayers).toEqual(
      expect.objectContaining({ p0gh4n67: mockPlayer }),
    );

    fireEvent.click(playCloseButton);

    expect(mockPlayer.play).toHaveBeenCalledTimes(1);
    expect(mockBump.player).toHaveBeenCalledTimes(1);
    expect(mockRequire).toHaveBeenCalledTimes(1);
  });

  it('autoplays a still-open player exactly once after readiness', async () => {
    const mockRequire = createMockRequire();
    const mockPlayer = createMockPlayer();
    const mockBump = createMockBump(mockPlayer);
    const autoplayMediaCollection = fixtureData.map(
      (mediaCollectionItem, index) =>
        index === 0
          ? {
              ...mediaCollectionItem,
              model: {
                ...mediaCollectionItem.model,
                version: {
                  ...mediaCollectionItem.model.version,
                  warnings: {
                    warning_text: '',
                    warning: [
                      {
                        warning_code: 'D1',
                        short_description: 'some upsetting scenes',
                      },
                    ],
                  },
                },
              },
            }
          : mediaCollectionItem,
    ) as MediaCollection[];
    delete window.requirejs;

    render(<LiveHeaderMedia mediaCollection={autoplayMediaCollection} />);

    fireEvent.click(screen.getByTestId('watch-now-close-button'));
    const requireScript = document.querySelector(
      `script[src="${REQUIRE_JS_SRC}"]`,
    );
    expect(requireScript).toBeInTheDocument();
    expect(mockRequire).not.toHaveBeenCalled();

    window.requirejs = mockRequire;
    await act(async () => {
      requireScript?.dispatchEvent(new Event('load'));
      await Promise.resolve();
    });

    await act(async () => Promise.resolve());

    expect(mockRequire.config.mock.invocationCallOrder[0]).toBeLessThan(
      mockRequire.mock.invocationCallOrder[0],
    );
    expect(mockRequire).toHaveBeenCalledTimes(1);

    const loadBump = mockRequire.mock.calls[0][1] as (Bump: BumpType) => void;
    await act(async () => loadBump(mockBump));

    expect(mockBump.player).toHaveBeenCalledTimes(1);
    expect(mockPlayer.load).toHaveBeenCalledTimes(1);
    expect(mockPlayer.play).not.toHaveBeenCalled();

    const playlistLoadedHandler = mockPlayer.bind.mock.calls.find(
      ([event]) => event === 'playlistLoaded',
    )?.[1];

    expect(playlistLoadedHandler).toEqual(expect.any(Function));

    await act(async () => {
      playlistLoadedHandler?.({});
    });

    expect(mockPlayer.play).toHaveBeenCalledTimes(1);
  });

  it('Loads the media player when the watch button is clicked.', () => {
    const { container } = render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = container.querySelector(
      'button[data-testid="watch-now-close-button"]',
    );

    expect(playCloseButton).toBeInTheDocument();
    expect(container.querySelector('figure')).not.toBeInTheDocument();

    fireEvent.click(playCloseButton as HTMLButtonElement);

    expect(container.querySelector('figure')).toBeInTheDocument();
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
