import React, { useState } from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import { Helmet } from 'react-helmet';
import useLocation from '#app/hooks/useLocation';
import { TV_PAGE } from '#app/routes/utils/pageTypes';
import MediaPlayer from '.';
import {
  aresMediaBlocks,
  onDemandTvBlocks,
  onDemandTvBlocksWithOverrides,
  aresMediaBlockWithTranscript,
} from './fixture';
import { MediaBlock } from './types';
import * as buildConfig from './utils/buildSettings';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('#app/hooks/useLocation');

describe('MediaLoader', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    (useLocation as jest.Mock).mockImplementation(() => ({ search: '' }));
    (useState as jest.Mock).mockImplementation(() => [false, () => false]);
  });

  describe('BUMP Loader', () => {
    it('Loads Ads, requireJS and Bump4 when Ads are enabled', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          showAdsBasedOnLocation: true,
          toggles: { ads: { enabled: true } },
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

    it('Adds a media player object to the window with a specified uniqueId', async () => {
      const mockRequire = jest.fn();
      const mockBump = {
        player: () => ({
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

    it('Displays a transcript when provided ', async () => {
      let container;

      await act(async () => {
        ({ container } = render(
          <MediaPlayer blocks={aresMediaBlockWithTranscript as MediaBlock[]} />,
          {
            id: 'testId',
          },
        ));
      });

      const details = (container as unknown as HTMLElement).querySelector(
        'summary',
      );
      expect(details?.textContent).toContain('Read transcript');
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
            atiData: {
              language: 'hi',
              pageTitle: 'दुनिया - BBC News हिंदी',
              pageIdentifier: 'hindi.bbc_hindi_tv.tv_programmes.w13xttlw.page',
              contentType: 'player-episode',
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
        'https://web-cdn.test.api.bbci.co.uk/ws/av-embeds/articles/cn8jgj8rjppo/p01k6msp/en-GB/amp',
      );
    });
  });
});
