import React from 'react';
import loggerMock from '#testHelpers/loggerMock';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import SocialEmbedContainer from '.';
import {
  render,
  screen,
} from '../../../components/react-testing-library-with-providers';

import {
  twitterBlock,
  instagramBlock,
  youtubeBlockEmbed,
  tiktokBlockEmbed,
  facebookPostBlockEmbed,
  facebookVideoBlockEmbed,
} from './common/fixtures';

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
    it('should render a Twitter block and unmount correctly', () => {
      const { container, unmount } = render(
        <SocialEmbedContainer
          blocks={[twitterBlock]}
          source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeTruthy();
      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        provider: 'twitter',
        href: 'https://twitter.com/BBCNews/status/1384138850478346243?s=20',
      });
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeFalsy();
    });

    it('should render an Instagram block and unmount correctly', () => {
      const { container, unmount } = render(
        <SocialEmbedContainer
          blocks={[instagramBlock]}
          source="https://www.instagram.com/reel/CeWO3HcIE9w/?utm_source=ig_embed&ig_rid=b6b91062-7174-4784-9a99-139d52bc5b29"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(
        document.querySelector(
          'head script[src="https://www.instagram.com/embed.js"]',
        ),
      ).toBeTruthy();
      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        provider: 'instagram',
        href: 'https://www.instagram.com/reel/CeWO3HcIE9w/?utm_source=ig_embed&ig_rid=b6b91062-7174-4784-9a99-139d52bc5b29',
      });
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://www.instagram.com/embed.js"]',
        ),
      ).toBeFalsy();
    });

    it('should render a YouTube block and unmount correctly', () => {
      const { container, unmount } = render(
        <SocialEmbedContainer
          blocks={[youtubeBlockEmbed]}
          source="https://www.youtube.com/embed/1e05_rwHvOM?feature=oembed"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        provider: 'youtube',
        href: 'https://www.youtube.com/embed/1e05_rwHvOM?feature=oembed',
      });
      unmount();
    });

    it('should render a TikTok block and unmount correctly', () => {
      const { container, unmount } = render(
        <SocialEmbedContainer
          blocks={[tiktokBlockEmbed]}
          source="https://www.tiktok.com/@cuppymusic/video/7086167423639997701"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        provider: 'tiktok',
        href: 'https://www.tiktok.com/@cuppymusic/video/7086167423639997701',
      });
      unmount();
    });

    it('should render a Facebook Post block and unmount correctly', () => {
      const { container, unmount } = render(
        <SocialEmbedContainer
          blocks={[facebookPostBlockEmbed]}
          source="https://www.facebook.com/RickAstley/posts/545713756920775"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        provider: 'facebook',
        href: 'https://www.facebook.com/RickAstley/posts/545713756920775',
      });
      unmount();
    });

    it('should render a Facebook Video block and unmount correctly', () => {
      const { container, unmount } = render(
        <SocialEmbedContainer
          blocks={[facebookVideoBlockEmbed]}
          source="https://www.facebook.com/RickAstley/videos/1378590239249667"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(container.firstChild).toMatchSnapshot();

      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(SOCIAL_EMBED_RENDERED, {
        provider: 'facebook',
        href: 'https://www.facebook.com/RickAstley/videos/1378590239249667',
      });
      unmount();
    });

    it('should render the correct skip link text when indexOfType is provided (means this is one of multiple e.g. Twitter embeds in the article)', () => {
      render(
        <SocialEmbedContainer
          blocks={[twitterBlock]}
          source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(screen.getByText('End of Twitter content, 1')).toBeInTheDocument();
    });

    it('should render the correct skip link text when indexOfType is not provided (means this is the only e.g. Twitter embed in the article)', () => {
      render(
        <SocialEmbedContainer
          blocks={[
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
          ]}
          source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(
        screen.queryByText('End of Twitter content, 1'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('End of Twitter content')).toBeInTheDocument();
    });
  });

  describe('AMP', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <SocialEmbedContainer
          blocks={[twitterBlock]}
          source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
        />,
        { service: 'news', isAmp: false, pageType: ARTICLE_PAGE },
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
