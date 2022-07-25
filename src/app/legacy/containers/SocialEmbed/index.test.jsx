import React from 'react';
import { render } from '@testing-library/react';
import loggerMock from '#testHelpers/loggerMock';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import SocialEmbedContainer from '.';
import withContexts from './common/testHelper';
import { twitterBlock } from './common/fixtures';

/* eslint-disable react/prop-types */
jest.mock('react-lazyload', () => {
  return function MockedLazyload({ children }) {
    return <>{children}</>;
  };
});

describe('SocialEmbedContainer', () => {
  afterEach(() => {
    loggerMock.info.mockClear();
  });

  describe('Canonical', () => {
    it('should render and unmount correctly', () => {
      const { container, unmount } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: true,
        })({
          blocks: [twitterBlock],
          source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
        }),
      );
      expect(container.firstChild).toMatchSnapshot();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeTruthy();
      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        normalisedProvider: 'twitter',
        href: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
      });
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeFalsy();
    });

    it('should render the correct skip link text when indexOfType is provided (means this is one of multiple e.g. Twitter embeds in the article)', () => {
      const { getByText } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: true,
        })({
          blocks: [twitterBlock],
          source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
        }),
      );

      expect(getByText('End of Twitter content, 1')).toBeInTheDocument();
    });

    it('should render the correct skip link text when indexOfType is not provided (means this is the only e.g. Twitter embed in the article)', () => {
      const { queryByText } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: true,
        })({
          blocks: [
            {
              type: 'renditions',
              model: {
                locator:
                  'urn:bbc:optimo:social:2777c9b9-b3d3-4d53-b36c-be749aa528c9',
                blocks: [
                  {
                    type: 'aresOEmbed',
                    model: {
                      oembed: {
                        version: '1.0',
                        author_name: 'BBC News (UK)',
                        author_url: 'https://twitter.com/BBCNews',
                        provider_name: 'Twitter',
                        provider_url: 'https://twitter.com',
                        url: 'https://twitter.com/BBCNews/status/1384138850478346243',
                        html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Greta Thunberg says meeting fellow climate campaigner Sir David Attenborough was &quot;indescribable&quot; <a href="https://t.co/xz93WmAdfR">https://t.co/xz93WmAdfR</a></p>&mdash; BBC News (UK) (@BBCNews) <a href="https://twitter.com/BBCNews/status/1384138850478346243?ref_src=twsrc%5Etfw">April 19, 2021</a></blockquote>\n',
                        width: 550,
                      },
                    },
                  },
                ],
              },
            },
          ],
          source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
        }),
      );

      expect(queryByText('End of Twitter content, 1')).not.toBeInTheDocument();
      expect(queryByText('End of Twitter content')).toBeInTheDocument();
    });
  });

  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(SocialEmbedContainer, {
        isAmp: true,
        isEnabled: true,
      })({
        blocks: [twitterBlock],
        source: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
      }),
    );
  });
});
