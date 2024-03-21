import React, { useState } from 'react';
import { act } from '@testing-library/react-hooks';
import { Helmet } from 'react-helmet';
import useLocation from '#app/hooks/useLocation';
import MediaPlayer from '.';
import { aresMediaBlocks } from './fixture';
import { render } from '../react-testing-library-with-providers';
import { MediaBlock } from './types';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('#app/hooks/useLocation');

describe('MediaLoader', () => {
  describe('BUMP Loader', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      // @ts-expect-error Mocking require to prevent race condition.
      window.require = jest.fn();
      (useLocation as jest.Mock).mockImplementation(() => ({ search: '' }));
      (useState as jest.Mock).mockImplementation(() => [false, () => false]);
    });

    it('Loads Ads, requireJS and Bump4 when Ads are enabled', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
          showAdsBasedOnLocation: true,
          toggles: { ads: { enabled: true } },
        });
      });

      const adScript = Helmet.peek().scriptTags[0];
      const adScriptLegacy = Helmet.peek().scriptTags[1];
      const requireScript = Helmet.peek().scriptTags[2];
      const bumpScript = Helmet.peek().scriptTags[3];

      expect(adScript.src).toEqual(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js',
      );

      expect(adScriptLegacy.src).toEqual(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap-legacy.js',
      );

      expect(requireScript.src).toEqual(
        'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js',
      );

      expect(bumpScript.innerHTML).toContain(
        'https://emp.bbci.co.uk/emp/bump-4/bump-4',
      );
    });

    it('Loads requireJS and Bump4 when Ads are disabled', async () => {
      await act(async () => {
        render(<MediaPlayer blocks={aresMediaBlocks as MediaBlock[]} />, {
          id: 'testId',
        });
      });

      const requireScript = Helmet.peek().scriptTags[0];
      const bumpScript = Helmet.peek().scriptTags[1];

      expect(requireScript.src).toEqual(
        'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js',
      );

      expect(bumpScript.innerHTML).toContain(
        'https://emp.bbci.co.uk/emp/bump-4/bump-4',
      );
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

      const caption = (container as unknown as HTMLElement).querySelector('p');
      expect(caption?.textContent).toBe('This is a caption!');
    });
  });
});
