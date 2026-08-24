import { useState } from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import { Helmet } from 'react-helmet';
import useLocation from '#app/hooks/useLocation';
import { HOME_PAGE, TOPIC_PAGE, TV_PAGE } from '#app/routes/utils/pageTypes';
import MediaPlayer from '.';
import {
  aresMediaBlocks,
  livePageAudioClipMediaBlock,
  onDemandTvBlocks,
  onDemandTvBlocksWithOverrides,
} from './fixture';
import { MediaBlock } from './types';
import * as buildConfig from './utils/buildSettings';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

jest.mock('#app/hooks/useLocation');

describe('MediaLoader', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    (useLocation as jest.Mock).mockImplementation(() => ({ search: '' }));
    (useState as jest.Mock).mockImplementation(() => [false, () => false]);
  });

  describe('BUMP Loader', () => {
    it('Loads Ads, requireJS and Bump4 when Preroll Ads are enabled', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          showAdsBasedOnLocation: true,
          toggles: { preroll: { enabled: true } },
        });
      });

      const helmetScriptTags = Helmet.peek().scriptTags;

      const adScript = helmetScriptTags.find(tag =>
        tag?.src?.endsWith('dotcom-bootstrap.js'),
      )?.src;

      const adScriptLegacy = helmetScriptTags.find(tag =>
        tag?.src?.endsWith('dotcom-bootstrap-legacy.js'),
      )?.src;

      const requireScript = helmetScriptTags.find(tag =>
        tag?.src?.endsWith('require.js'),
      )?.src;

      const bumpScript = helmetScriptTags.find(tag =>
        tag?.innerHTML?.includes('bump-4'),
      )?.innerHTML;

      expect(adScript).toEqual(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js',
      );

      expect(adScriptLegacy).toEqual(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap-legacy.js',
      );

      expect(requireScript).toEqual(
        'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js',
      );

      expect(bumpScript).toContain('https://emp.bbci.co.uk/emp/bump-4/bump-4');
    });

    it('Loads requireJS and Bump4 when Ads are disabled', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
        });
      });

      const helmetScriptTags = Helmet.peek().scriptTags;

      const requireScript = helmetScriptTags.find(tag =>
        tag?.src?.endsWith('require.js'),
      )?.src;

      const bumpScript = helmetScriptTags.find(tag =>
        tag?.innerHTML?.includes('bump-4'),
      )?.innerHTML;

      expect(requireScript).toEqual(
        'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js',
      );

      expect(bumpScript).toContain('https://emp.bbci.co.uk/emp/bump-4/bump-4');
    });

    it('Calls Bump when the component loads', async () => {
      const mockRequire = jest.fn();

      window.requirejs = mockRequire;

      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
        });
      });

      expect(mockRequire.mock.calls[0][0]).toStrictEqual(['bump-4']);
    });

    it('Loads the player immediately with autoplay disabled when requested', async () => {
      const mockRequire = jest.fn();
      const mockPlayer = {
        load: jest.fn(),
      };
      const mockBump = {
        player: jest.fn(() => mockPlayer),
      };

      window.requirejs = mockRequire;
      (useState as jest.Mock).mockImplementation(initialValue => [
        initialValue,
        jest.fn(),
      ]);

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

      const callbackFn = mockRequire.mock.calls[0][1];
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
      const mockRequire = jest.fn();
      const mockBump = {
        player: () => ({
          bind: jest.fn(),
          load: jest.fn(),
        }),
      };

      window.requirejs = mockRequire;

      await act(async () => {
        render(
          <MediaPlayer
            blocks={aresMediaBlocks as MediaBlock[]}
            uniqueId="testId"
          />,
          {
            id: 'testId',
          },
        );
      });

      const callbackFn = mockRequire.mock.calls[0][1];
      callbackFn(mockBump);

      expect(window.mediaPlayers.testId).not.toBeNull();
    });

    it('adds and removes fullscreen classes on fake fullscreen enter/exit events', async () => {
      const mockRequire = jest.fn();
      const bind = jest.fn();
      const mockBump = {
        player: () => ({
          bind,
          load: jest.fn(),
        }),
      };

      window.requirejs = mockRequire;

      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
        });
      });

      const callbackFn = mockRequire.mock.calls[0][1];
      callbackFn(mockBump);

      const enterFakeFullscreen = bind.mock.calls.find(
        ([event]) => event === 'enterFakeFullscreen',
      )?.[1];
      const exitFakeFullscreen = bind.mock.calls.find(
        ([event]) => event === 'exitFakeFullscreen',
      )?.[1];

      expect(typeof enterFakeFullscreen).toBe('function');
      expect(typeof exitFakeFullscreen).toBe('function');

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
      const mockRequire = jest.fn();
      const bind = jest.fn();
      const mockBump = {
        player: () => ({
          bind,
          load: jest.fn(),
        }),
      };

      window.requirejs = mockRequire;

      await act(async () => {
        render(
          <MediaPlayer
            blocks={aresMediaBlocks as MediaBlock[]}
            eventMapping={{ enterFakeFullscreen: onEnterFakeFullscreen }}
          />,
          {
            id: 'testId',
          },
        );
      });

      const callbackFn = mockRequire.mock.calls[0][1];
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
      const mockRequire = jest.fn();
      const bind = jest.fn();
      const mockBump = {
        player: () => ({
          bind,
          load: jest.fn(),
        }),
      };

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

      const callbackFn = mockRequire.mock.calls[0][1];
      callbackFn(mockBump);

      const fakeFullscreenBindings = bind.mock.calls.filter(([event]) =>
        ['enterFakeFullscreen', 'exitFakeFullscreen'].includes(event),
      );

      expect(fakeFullscreenBindings).toHaveLength(0);
    });

    it('does not reinitialise the player when fake fullscreen state changes', async () => {
      // Use the real useState implementation here so entering fake fullscreen
      // actually triggers a MediaLoader re-render, reproducing the scenario
      // that previously caused the Bump player to be torn down and
      // recreated mid-playback (closing iOS fake fullscreen immediately).
      (useState as jest.Mock).mockImplementation(
        jest.requireActual('react').useState,
      );

      const mockRequire = jest.fn();
      const bind = jest.fn();
      const load = jest.fn();
      const mockBump = {
        player: () => ({
          bind,
          load,
        }),
      };

      window.requirejs = mockRequire;

      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          pageType: LIVE_PAGE,
        });
      });

      const callbackFn = mockRequire.mock.calls[0][1];
      callbackFn(mockBump);

      expect(mockRequire).toHaveBeenCalledTimes(1);
      expect(load).toHaveBeenCalledTimes(1);

      const enterFakeFullscreen = bind.mock.calls.find(
        ([event]) => event === 'enterFakeFullscreen',
      )?.[1];

      act(() => {
        enterFakeFullscreen({});
      });

      expect(mockRequire).toHaveBeenCalledTimes(1);
      expect(load).toHaveBeenCalledTimes(1);
    });
  });

  describe('Placeholder', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [true, () => true]);
    });

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
});
