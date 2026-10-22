import { StrictMode } from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import { Helmet } from 'react-helmet';
import useLocation from '#app/hooks/useLocation';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import {
  HOME_PAGE,
  LIVE_PAGE,
  TOPIC_PAGE,
  TV_PAGE,
} from '#app/routes/utils/pageTypes';
import MediaPlayer from '.';
import {
  aresMediaBlocks,
  livePageAudioClipMediaBlock,
  onDemandTvBlocks,
  onDemandTvBlocksWithOverrides,
} from './fixture';
import { BumpType, MediaBlock, Player, PlayerConfig } from './types';
import { fakeFullscreenStyles } from './index.styles';
import * as buildConfig from './utils/buildSettings';

// Jest hoists module factories above imports, so this reference must be
// initialized by the factory before the tests use it.
// eslint-disable-next-line no-var
var mockLogger: { error: jest.Mock };

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

const loadRequireJsScript = async () => {
  const requireScript = Array.from(document.scripts).find(
    script => script.getAttribute('src') === REQUIRE_JS_SRC,
  );

  if (!requireScript) return;

  await act(async () => {
    requireScript.dispatchEvent(new Event('load'));
    await Promise.resolve();
  });
};

jest.mock('./utils/buildSettings', () => ({
  __esModule: true,
  ...jest.requireActual('./utils/buildSettings'),
}));

jest.mock('../../lib/logger.node', () => {
  mockLogger = { error: jest.fn() };
  return jest.fn(() => mockLogger);
});

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

jest.mock('#app/hooks/useLocation');

describe('MediaLoader', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    mockLogger.error.mockClear();

    (useLocation as jest.Mock).mockImplementation(() => ({ search: '' }));
    window.requirejs = createMockRequire();
    window.mediaPlayers = {};
  });

  describe('BUMP Loader', () => {
    it('coordinates simultaneously mounted loaders from a cold RequireJS start', async () => {
      delete window.requirejs;

      const mockRequire = createMockRequire();
      const firstPlayer = createMockPlayer();
      const secondPlayer = createMockPlayer();
      const mockBump = createMockBump(firstPlayer);
      mockBump.player
        .mockReturnValueOnce(firstPlayer)
        .mockReturnValueOnce(secondPlayer);

      await act(async () => {
        render(
          <>
            <MediaPlayer
              blocks={aresMediaBlocks as MediaBlock[]}
              uniqueId="first"
            />
            <MediaPlayer
              blocks={aresMediaBlocks as MediaBlock[]}
              uniqueId="second"
            />
          </>,
          {
            id: 'testId',
            pageType: LIVE_PAGE,
          },
        );
      });

      expect(
        document.querySelectorAll(`script[src="${REQUIRE_JS_SRC}"]`),
      ).toHaveLength(1);
      expect(mockRequire).not.toHaveBeenCalled();

      window.requirejs = mockRequire;
      await loadRequireJsScript();

      expect(mockRequire.config).toHaveBeenCalledTimes(1);
      expect(mockRequire).toHaveBeenCalledTimes(2);

      const loadBumpCallbacks = mockRequire.mock.calls.map(
        ([, callback]) => callback as (Bump: BumpType) => void,
      );
      await act(async () => {
        loadBumpCallbacks.forEach(callback => callback(mockBump));
      });

      expect(firstPlayer.load).toHaveBeenCalledTimes(1);
      expect(secondPlayer.load).toHaveBeenCalledTimes(1);
      expect(window.mediaPlayers).toEqual({
        first: firstPlayer,
        second: secondPlayer,
      });
    });

    it('cancels a stale readiness wait when player props change', async () => {
      delete window.requirejs;

      const mockRequire = createMockRequire();
      const mockPlayer = createMockPlayer();
      const mockBump = createMockBump(mockPlayer);
      const initialBlocks = aresMediaBlocks as MediaBlock[];
      const updatedBlocks = [...initialBlocks];

      const { rerender } = render(
        <MediaPlayer blocks={initialBlocks} uniqueId="testId" />,
        {
          id: 'testId',
          pageType: LIVE_PAGE,
        },
      );

      rerender(<MediaPlayer blocks={updatedBlocks} uniqueId="testId" />);

      window.requirejs = mockRequire;
      await loadRequireJsScript();

      expect(mockRequire.config).toHaveBeenCalledTimes(1);
      expect(mockRequire).toHaveBeenCalledTimes(1);

      const loadBump = mockRequire.mock.calls[0][1] as (Bump: BumpType) => void;
      await act(async () => loadBump(mockBump));

      expect(mockBump.player).toHaveBeenCalledTimes(1);
      expect(mockPlayer.load).toHaveBeenCalledTimes(1);
    });

    it('cancels a pending readiness wait when the loader unmounts', async () => {
      delete window.requirejs;

      const mockRequire = createMockRequire();
      const mockBump = createMockBump();
      const { unmount } = render(
        <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />,
        {
          id: 'testId',
          pageType: LIVE_PAGE,
        },
      );

      unmount();
      window.requirejs = mockRequire;
      await loadRequireJsScript();

      expect(mockRequire).not.toHaveBeenCalled();
      expect(mockBump.player).not.toHaveBeenCalled();
    });

    it('does not initialize twice under StrictMode', async () => {
      const mockRequire = createMockRequire();
      const mockBump = createMockBump();
      window.requirejs = mockRequire;

      render(
        <StrictMode>
          <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />
        </StrictMode>,
        {
          id: 'testId',
          pageType: LIVE_PAGE,
        },
      );

      await act(async () => Promise.resolve());

      expect(mockRequire.config).toHaveBeenCalledTimes(1);
      expect(mockRequire).toHaveBeenCalledTimes(1);

      const loadBump = mockRequire.mock.calls[0][1] as (Bump: BumpType) => void;
      await act(async () => loadBump(mockBump));

      expect(mockBump.player).toHaveBeenCalledTimes(1);
    });

    it('cancels player continuation while waiting for an ad tag', async () => {
      const mockRequire = createMockRequire();
      const mockPlayer = createMockPlayer();
      const mockBump = createMockBump(mockPlayer);
      let resolveAdTag: (adTag: string) => void = () => undefined;
      const adTag = new Promise<string>(resolve => {
        resolveAdTag = resolve;
      });

      window.requirejs = mockRequire;

      const { rerender } = render(
        <MediaPlayer
          blocks={aresMediaBlocks as MediaBlock[]}
          uniqueId="testId"
        />,
        {
          id: 'testId',
          pageType: LIVE_PAGE,
          showAdsBasedOnLocation: true,
          toggles: { preroll: { enabled: true } },
        },
      );
      await loadRequireJsScript();

      window.dotcom.ads.getAdTag = jest.fn(() => adTag);
      const loadBump = mockRequire.mock.calls[0][1] as (Bump: BumpType) => void;
      await act(async () => loadBump(mockBump));

      rerender(
        <MediaPlayer
          blocks={aresMediaBlocks as MediaBlock[]}
          uniqueId="testId"
          eventMapping={{ pause: jest.fn() }}
        />,
      );

      await act(async () => {
        resolveAdTag('test-ad-tag');
        await adTag;
      });

      expect(mockPlayer.load).not.toHaveBeenCalled();
      expect(window.mediaPlayers.testId).toBeUndefined();
    });

    it('Loads Ads, requireJS and Bump4 when Preroll Ads are enabled', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          pageType: LIVE_PAGE,
          showAdsBasedOnLocation: true,
          toggles: { preroll: { enabled: true } },
        });
      });
      await loadRequireJsScript();

      const helmetScriptTags = Helmet.peek().scriptTags;

      const adScript = helmetScriptTags.find(tag =>
        tag?.src?.endsWith('dotcom-bootstrap.js'),
      )?.src;

      const adScriptLegacy = helmetScriptTags.find(tag =>
        tag?.src?.endsWith('dotcom-bootstrap-legacy.js'),
      )?.src;

      const requireScript = Array.from(document.scripts).find(script =>
        script.src.endsWith('require.js'),
      )?.src;

      expect(adScript).toEqual(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js',
      );

      expect(adScriptLegacy).toEqual(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap-legacy.js',
      );

      expect(requireScript).toEqual(REQUIRE_JS_SRC);
    });

    it('Loads requireJS and Bump4 when Ads are disabled', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          pageType: LIVE_PAGE,
        });
      });
      await loadRequireJsScript();

      const requireScript = Array.from(document.scripts).find(script =>
        script.src.endsWith('require.js'),
      )?.src;

      expect(requireScript).toEqual(REQUIRE_JS_SRC);
    });

    it('Calls Bump when the component loads', async () => {
      const mockRequire = createMockRequire();

      window.requirejs = mockRequire;

      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          pageType: LIVE_PAGE,
        });
      });

      await loadRequireJsScript();

      expect(mockRequire.mock.calls[0][0]).toStrictEqual(['bump-4']);
      expect(mockRequire.config).toHaveBeenCalledWith({
        paths: { 'bump-4': 'https://emp.bbci.co.uk/emp/bump-4/bump-4' },
        waitSeconds: 30,
      });
    });

    it('configures RequireJS once for simultaneously mounted loaders', async () => {
      const mockRequire = createMockRequire();
      window.requirejs = mockRequire;

      await act(async () => {
        render(
          <>
            <MediaPlayer
              blocks={aresMediaBlocks as MediaBlock[]}
              uniqueId="first"
            />
            <MediaPlayer
              blocks={aresMediaBlocks as MediaBlock[]}
              uniqueId="second"
            />
          </>,
          {
            id: 'testId',
            pageType: LIVE_PAGE,
          },
        );
      });

      await loadRequireJsScript();

      expect(mockRequire.config).toHaveBeenCalledTimes(1);
      expect(mockRequire).toHaveBeenCalledTimes(2);
    });

    it('initializes a remounted loader when RequireJS is cached', async () => {
      const mockRequire = createMockRequire();
      window.requirejs = mockRequire;

      const { unmount } = render(
        <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />,
        {
          id: 'testId',
          pageType: LIVE_PAGE,
        },
      );

      await loadRequireJsScript();
      expect(mockRequire).toHaveBeenCalledTimes(1);

      unmount();

      render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
        id: 'testId',
        pageType: LIVE_PAGE,
      });
      await act(async () => Promise.resolve());

      expect(mockRequire.config).toHaveBeenCalledTimes(1);
      expect(mockRequire).toHaveBeenCalledTimes(2);
    });

    it('Loads the player immediately with autoplay disabled when requested', async () => {
      const mockRequire = createMockRequire();
      const mockPlayer = createMockPlayer();
      const mockBump = createMockBump(mockPlayer);

      window.requirejs = mockRequire;

      let container;

      await act(async () => {
        ({ container } = render(
          <MediaPlayer
            blocks={aresMediaBlocks as MediaBlock[]}
            loadPlayerOnInitialRender
          />,
          {
            id: 'testId',
            pageType: TOPIC_PAGE,
          },
        ));
      });
      await loadRequireJsScript();

      expect(
        (container as unknown as HTMLElement).querySelector(
          '[data-e2e="media-loader__placeholder"]',
        ),
      ).not.toBeInTheDocument();
      expect(
        (container as unknown as HTMLElement).querySelector(
          '[data-e2e="media-player"]',
        ),
      ).toBeInTheDocument();

      const callbackFn = mockRequire.mock.calls[0][1] as (
        Bump: BumpType,
      ) => void;
      await act(async () => callbackFn(mockBump));

      expect(mockBump.player).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({ autoplay: false }),
      );
      const inSituPlayerConfig = mockBump.player.mock.calls[0][1];
      expect(inSituPlayerConfig).not.toHaveProperty('preload');
      expect(mockPlayer.load).toHaveBeenCalledTimes(1);
    });

    it('Adds a media player object to the window with a specified uniqueId', async () => {
      const mockRequire = createMockRequire();
      const mockBump = createMockBump();

      window.requirejs = mockRequire;

      await act(async () => {
        render(
          <MediaPlayer
            blocks={aresMediaBlocks as MediaBlock[]}
            uniqueId="testId"
          />,
          {
            id: 'testId',
            pageType: LIVE_PAGE,
          },
        );
      });
      await loadRequireJsScript();

      const callbackFn = mockRequire.mock.calls[0][1] as (
        Bump: BumpType,
      ) => void;
      callbackFn(mockBump);

      expect(window.mediaPlayers.testId).not.toBeNull();
    });

    it('adds and removes fullscreen classes on fake fullscreen enter/exit events', async () => {
      const mockRequire = createMockRequire();
      const mockPlayer = createMockPlayer();
      const { bind } = mockPlayer;
      const mockBump = createMockBump(mockPlayer);

      window.requirejs = mockRequire;

      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          pageType: LIVE_PAGE,
        });
      });
      await loadRequireJsScript();

      const callbackFn = mockRequire.mock.calls[0][1] as (
        Bump: BumpType,
      ) => void;
      callbackFn(mockBump);

      const enterFakeFullscreen = bind.mock.calls.find(
        ([event]) => event === 'enterFakeFullscreen',
      )?.[1];
      const exitFakeFullscreen = bind.mock.calls.find(
        ([event]) => event === 'exitFakeFullscreen',
      )?.[1];

      expect(typeof enterFakeFullscreen).toBe('function');
      expect(typeof exitFakeFullscreen).toBe('function');
      if (!enterFakeFullscreen || !exitFakeFullscreen) {
        throw new Error('Expected fake fullscreen handlers to be bound');
      }

      act(() => {
        enterFakeFullscreen({});
      });

      expect(document.documentElement.classList).toContain(
        'simorgh-player-fullscreen',
      );
      expect(document.body.classList).toContain('simorgh-player-fullscreen');

      act(() => {
        exitFakeFullscreen({});
      });

      expect(document.documentElement.classList).not.toContain(
        'simorgh-player-fullscreen',
      );
      expect(document.body.classList).not.toContain(
        'simorgh-player-fullscreen',
      );
    });

    it('composes caller fake fullscreen handlers with internal fullscreen handlers', async () => {
      const onEnterFakeFullscreen = jest.fn();
      const mockRequire = createMockRequire();
      const mockPlayer = createMockPlayer();
      const { bind } = mockPlayer;
      const mockBump = createMockBump(mockPlayer);

      window.requirejs = mockRequire;

      await act(async () => {
        render(
          <MediaPlayer
            blocks={aresMediaBlocks as MediaBlock[]}
            eventMapping={{ enterFakeFullscreen: onEnterFakeFullscreen }}
          />,
          {
            id: 'testId',
            pageType: LIVE_PAGE,
          },
        );
      });
      await loadRequireJsScript();

      const callbackFn = mockRequire.mock.calls[0][1] as (
        Bump: BumpType,
      ) => void;
      callbackFn(mockBump);

      const enterFakeFullscreenBindings = bind.mock.calls.filter(
        ([event]) => event === 'enterFakeFullscreen',
      );

      expect(enterFakeFullscreenBindings).toHaveLength(2);

      act(() => {
        enterFakeFullscreenBindings.forEach(([, handler]) => handler({}));
      });

      expect(onEnterFakeFullscreen).toHaveBeenCalled();
      expect(document.documentElement.classList).toContain(
        'simorgh-player-fullscreen',
      );
    });

    it('does not bind fake fullscreen handlers for audio players', async () => {
      const mockRequire = createMockRequire();
      const mockPlayer = createMockPlayer();
      const { bind } = mockPlayer;
      const mockBump = createMockBump(mockPlayer);

      window.requirejs = mockRequire;

      await act(async () => {
        render(
          <MediaPlayer
            blocks={[livePageAudioClipMediaBlock] as MediaBlock[]}
          />,
          {
            id: 'testId',
            pageType: LIVE_PAGE,
          },
        );
      });
      await loadRequireJsScript();

      const callbackFn = mockRequire.mock.calls[0][1] as (
        Bump: BumpType,
      ) => void;
      callbackFn(mockBump);

      const fakeFullscreenBindings = bind.mock.calls.filter(([event]) =>
        ['enterFakeFullscreen', 'exitFakeFullscreen'].includes(event),
      );

      expect(fakeFullscreenBindings).toHaveLength(0);
    });
  });

  describe('Placeholder', () => {
    it('Displays a placeholder image and playbutton', async () => {
      let container;

      await act(async () => {
        ({ container } = render(
          <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />,
          {
            id: 'testId',
          },
        ));
      });

      const button = (container as unknown as HTMLElement).querySelector(
        'button',
      );
      expect(button?.textContent).toBe(
        'Contains strong language and adult humour. Play video, "Five things ants can teach us about management", Duration 3,1103:11',
      );
    });
    it('Displays a caption when provided ', async () => {
      let container;

      await act(async () => {
        ({ container } = render(
          <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />,
          {
            id: 'testId',
          },
        ));
      });

      const caption = (container as unknown as HTMLElement).querySelectorAll(
        'span',
      );
      expect(caption[3]?.textContent).toBe('This is a caption!');
    });
  });

  describe('Metadata', () => {
    it('should render metadata tags when media player is not embedded', async () => {
      await act(async () => {
        render(
          <MediaPlayer
            blocks={aresMediaBlocks as MediaBlock[]}
            embedded={false}
          />,
          {
            id: 'cn8jgj8rjppo',
          },
        );
      });

      const helmetMetaTags = Helmet.peek().metaTags;

      expect(helmetMetaTags).not.toBeNull();
    });

    it('should not render metadata tags when media player is embedded', async () => {
      await act(async () => {
        render(
          <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} embedded />,
          {
            id: 'cn8jgj8rjppo',
          },
        );
      });

      const helmetMetaTags = Helmet.peek().metaTags;

      expect(helmetMetaTags).toEqual([]);
    });
  });

  describe('Config', () => {
    it('should use the pageIdentifierOverride when rendering On Demand TV', async () => {
      const buildConfigSpy = jest.spyOn(buildConfig, 'default');
      await act(async () => {
        render(
          <MediaPlayer
            blocks={onDemandTvBlocksWithOverrides as MediaBlock[]}
            embedded
          />,
          { service: 'hindi' },
        );
      });

      expect(buildConfigSpy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          counterName: 'hindi.bbc_hindi_tv.tv.w172zm8b4tlpzxh.page',
        }),
      );
      expect(buildConfigSpy.mock.calls[0][0].blocks).toEqual(
        expect.arrayContaining([
          {
            model: {
              language: 'hi',
              pageIdentifierOverride:
                'hindi.bbc_hindi_tv.tv.w172zm8b4tlpzxh.page',
              pageTitleOverride: 'दुनिया',
            },
            type: 'mediaOverrides',
          },
        ]),
      );
    });

    it('should use the pageIdentifier from the EventTrackingContext when overrides are not present', async () => {
      const buildConfigSpy = jest.spyOn(buildConfig, 'default');
      await act(async () => {
        render(
          <MediaPlayer blocks={onDemandTvBlocks as MediaBlock[]} embedded />,
          {
            service: 'hindi',
            pageMetadata: {
              atiAnalytics: {
                language: 'hi',
                pageTitle: 'दुनिया - BBC News हिंदी',
                pageIdentifier:
                  'hindi.bbc_hindi_tv.tv_programmes.w13xttlw.page',
                contentType: 'player-episode',
              },
              type: TV_PAGE,
            },
            pageType: TV_PAGE,
            pathname: '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw',
            toggles: { eventTracking: { enabled: true } },
          },
        );
      });

      expect(buildConfigSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          counterName: 'hindi.bbc_hindi_tv.tv_programmes.w13xttlw.page',
        }),
      );
    });

    it.each([
      {
        pageName: 'Home',
        pageType: HOME_PAGE,
        pageTitle: 'BBC News عربي',
        pageIdentifier: 'arabic.page',
        contentType: 'index-home',
      },
      {
        pageName: 'Topic',
        pageType: TOPIC_PAGE,
        pageTitle: 'موضوع - BBC News عربي',
        pageIdentifier: 'arabic.topics.cz9mm6r1q5et.page',
        contentType: 'index-category',
      },
    ])(
      'should use the containing $pageName page identifier for in-situ media blocks',
      async ({ pageType, pageTitle, pageIdentifier, contentType }) => {
        const buildConfigSpy = jest.spyOn(buildConfig, 'default');

        await act(async () => {
          render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
            service: 'arabic',
            pageMetadata: {
              atiAnalytics: {
                language: 'ar',
                pageTitle,
                pageIdentifier,
                contentType,
              },
              type: pageType,
            },
            pageType,
            toggles: { eventTracking: { enabled: true } },
          });
        });

        expect(buildConfigSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            counterName: pageIdentifier,
          }),
        );
      },
    );

    it('passes a supplied holding image to the player configuration', async () => {
      const buildConfigSpy = jest.spyOn(buildConfig, 'default');
      const holdingImageURL =
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/promo-image.jpg.webp';

      await act(async () => {
        render(
          <MediaPlayer
            blocks={aresMediaBlocks as MediaBlock[]}
            holdingImageURL={holdingImageURL}
          />,
        );
      });

      expect(buildConfigSpy).toHaveBeenCalledWith(
        expect.objectContaining({ holdingImageURL }),
      );
    });
  });

  describe('AMP', () => {
    it('should render the AMP version of the media player', async () => {
      let container;

      await act(async () => {
        ({ container } = render(
          <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />,
          {
            id: 'cn8jgj8rjppo',
            isAmp: true,
          },
        ));
      });

      const ampPlayer = (container as unknown as HTMLElement).querySelector(
        'amp-iframe',
      );

      const ampIframeUrl = ampPlayer?.getAttribute('src');

      expect(ampPlayer).toBeInTheDocument();
      expect(ampIframeUrl).toEqual(
        'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/articles/cn8jgj8rjppo/p01k6msm/en-GB/amp',
      );
    });
  });

  describe('FakeFullscreenStyles', () => {
    const FAKE_FULLSCREEN_STYLE_ID = 'simorgh-fake-fullscreen-styles';

    const getFakeFullscreenStyleElements = () =>
      document.head.querySelectorAll(`style#${FAKE_FULLSCREEN_STYLE_ID}`);

    afterEach(() => {
      document
        .getElementById(FAKE_FULLSCREEN_STYLE_ID)
        ?.parentNode?.removeChild(
          document.getElementById(FAKE_FULLSCREEN_STYLE_ID) as HTMLElement,
        );
    });

    it('adds the fake fullscreen styles to the document head', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
        });
      });

      const styleElement = document.getElementById(FAKE_FULLSCREEN_STYLE_ID);

      expect(styleElement).toBeInTheDocument();
      expect(styleElement?.tagName).toBe('STYLE');
      expect(styleElement?.textContent).toBe(fakeFullscreenStyles);
    });

    it('only adds the fake fullscreen styles once when multiple players are rendered', async () => {
      await act(async () => {
        render(
          <>
            <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />
            <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />
          </>,
          {
            id: 'testId',
          },
        );
      });

      expect(getFakeFullscreenStyleElements()).toHaveLength(1);
    });

    it('does not add the fake fullscreen styles for audio players', async () => {
      await act(async () => {
        render(
          <MediaPlayer
            blocks={[livePageAudioClipMediaBlock] as MediaBlock[]}
          />,
          {
            id: 'testId',
            pageType: LIVE_PAGE,
          },
        );
      });

      expect(document.getElementById(FAKE_FULLSCREEN_STYLE_ID)).toBeNull();
    });
  });

  it('logs RequireJS configuration errors without initializing the player', async () => {
    const mockRequire = createMockRequire();
    const configurationError = new Error('Unable to configure RequireJS');
    mockRequire.config.mockImplementation(() => {
      throw configurationError;
    });
    window.requirejs = mockRequire;

    await act(async () => {
      render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
        id: 'testId',
        pageType: LIVE_PAGE,
      });
    });

    await loadRequireJsScript();

    expect(mockLogger.error).toHaveBeenCalledWith(
      MEDIA_PLAYER_STATUS,
      configurationError,
    );
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
    expect(mockRequire).not.toHaveBeenCalled();
  });
});
