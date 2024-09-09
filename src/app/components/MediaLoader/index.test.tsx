import React, { useState } from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import { Helmet } from 'react-helmet';
import useLocation from '#app/hooks/useLocation';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import MediaPlayer from '.';
import { aresMediaBlocks, onDemandTvBlocks } from './fixture';
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
    it('should render metadata tags when media player is embedded', async () => {
      await act(async () => {
        render(
          <MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} embedded />,
          {
            id: 'cn8jgj8rjppo',
          },
        );
      });

      const helmetMetaTags = Helmet.peek().metaTags;

      expect(helmetMetaTags[0]).toEqual({
        property: 'og:url',
        content: '/ws/av-embeds/articles/cn8jgj8rjppo/p01k6msp/en-GB',
      });
    });
  });

  describe('Config', () => {
    it('should use the counterNameOverride when rendering On Demand TV', async () => {
      const buildConfigSpy = jest.spyOn(buildConfig, 'default');
      await act(async () => {
        render(
          <MediaPlayer
            blocks={onDemandTvBlocks as MediaBlock[]}
            pageIdentifierOverride="hindi.bbc_hindi_tv.tv.w172zm8b4tlpzxh.page"
            embedded
          />,
          { service: 'hindi' },
        );
      });
      expect(buildConfigSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          counterName: 'hindi.bbc_hindi_tv.tv.w172zm8b4tlpzxh.page',
        }),
      );
    });
    it('should use the counterName from the RequestContext', async () => {
      const buildConfigSpy = jest.spyOn(buildConfig, 'default');
      await act(async () => {
        render(
          <RequestContextProvider
            pageType="media"
            pathname="/hindi/bbc_hindi_tv/tv_programmes/w13xttlw"
            service="hindi"
            counterName="hindi.bbc_hindi_tv.tv.w172zm8b4tlpzxh.page"
          >
            <MediaPlayer blocks={onDemandTvBlocks as MediaBlock[]} embedded />
          </RequestContextProvider>,
          { service: 'hindi' },
        );
      });
      expect(buildConfigSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          counterName: 'hindi.bbc_hindi_tv.tv.w172zm8b4tlpzxh.page',
        }),
      );
    });
  });
});
