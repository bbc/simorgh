/* eslint-disable no-console */
import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '../../../../components/react-testing-library-with-providers';
import {
  ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '../../../../routes/utils/pageTypes';

import { CanonicalSocialEmbed, AmpSocialEmbed } from './index';
import fixtures from './fixtures';
import * as useScript from './Canonical/useScript';

const useScriptSpy = jest.spyOn(useScript, 'default');
const mockOnRender = jest.fn();

describe('CanonicalSocialEmbed', () => {
  const { error } = global.console;

  beforeEach(() => {
    global.console.error = jest.fn();
  });

  afterEach(() => {
    global.console.error = error;
  });
  describe('Facebook', () => {
    const facebookSocialEmbed = (
      <CanonicalSocialEmbed
        provider={fixtures.facebook.source}
        oEmbed={fixtures.facebook.embed.oembed}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
      />
    );
    it('should render Facebook for Optimo article pages', async () => {
      const { unmount } = render(facebookSocialEmbed, {
        pageType: ARTICLE_PAGE,
      });

      const button = screen.getByTestId('banner-button');

      fireEvent.click(button);

      expect(
        document.querySelector(
          'head script[src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v15.0"]',
        ),
      ).toBeTruthy();
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v15.0"]',
        ),
      ).toBeFalsy();
    });

    it('should not render Facebook for CPS pages', async () => {
      render(facebookSocialEmbed, {
        pageType: STORY_PAGE,
      });
      expect(
        document.querySelector(
          'head script[src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v15.0"]',
        ),
      ).toBeFalsy();

      const fallbackTitle = screen.getByTestId('social-embed-fallback-title');

      expect(fallbackTitle).toBeInTheDocument();
      expect(fallbackTitle.textContent).toEqual(
        "Sorry but we're having trouble displaying this content",
      );
    });

    it('should not render Facebook for Correspondent pages', async () => {
      render(facebookSocialEmbed, {
        pageType: CORRESPONDENT_STORY_PAGE,
      });
      expect(
        document.querySelector(
          'head script[src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v15.0"]',
        ),
      ).toBeFalsy();

      const fallbackTitle = screen.getByTestId('social-embed-fallback-title');

      expect(fallbackTitle).toBeInTheDocument();
      expect(fallbackTitle.textContent).toEqual(
        "Sorry but we're having trouble displaying this content",
      );
    });
  });

  describe('Twitter', () => {
    const twitterSocialEmbed = (
      <CanonicalSocialEmbed
        provider={fixtures.twitter.source}
        oEmbed={fixtures.twitter.embed.oembed}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
        onRender={mockOnRender}
      />
    );
    it('should render correctly for Twitter', async () => {
      const { container, unmount } = render(twitterSocialEmbed);

      const button = screen.getByTestId('banner-button');
      fireEvent.click(button);

      expect(container.firstChild).toMatchSnapshot();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeTruthy();
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeFalsy();
    });

    it('should call twitter api to enrich tweets after initial render', async () => {
      global.twttr = {
        widgets: {
          load: jest.fn(),
        },
      };

      render(twitterSocialEmbed);
      const button = screen.getByTestId('banner-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(global.twttr.widgets.load).toHaveBeenCalled();
      });
    });

    it('should bind the onRender prop to the rendered event', async () => {
      useScriptSpy.mockReturnValueOnce(true);

      global.twttr = {
        widgets: {
          load: jest.fn(),
        },
        events: {
          bind: jest.fn(),
        },
      };
      global.twttr.ready = cb => cb(global.twttr);

      render(twitterSocialEmbed);
      const button = screen.getByTestId('banner-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(global.twttr.widgets.load).toHaveBeenCalled();
        expect(global.twttr.events.bind).toHaveBeenCalledWith(
          'rendered',
          mockOnRender,
        );
      });
    });
  });

  describe('Instagram', () => {
    const instagramEmbed = (
      <CanonicalSocialEmbed
        provider={fixtures.instagram.source}
        oEmbed={fixtures.instagram.embed.oembed}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
        onRender={mockOnRender}
      />
    );

    it('should render correctly for Instagram', async () => {
      const { container, unmount } = render(instagramEmbed);

      const button = screen.getByTestId('banner-button');

      fireEvent.click(button);

      expect(container.firstChild).toMatchSnapshot();
      expect(
        document.querySelector(
          'head script[src="https://www.instagram.com/embed.js"]',
        ),
      ).toBeTruthy();
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://www.instagram.com/embed.js"]',
        ),
      ).toBeFalsy();
    });

    it('should call instagram api to enrich instgram post after initial render', async () => {
      global.instgrm = {
        Embeds: {
          process: jest.fn(),
        },
      };

      render(instagramEmbed);

      const button = screen.getByTestId('banner-button');

      fireEvent.click(button);

      await waitFor(() => {
        expect(global.instgrm.Embeds.process).toHaveBeenCalled();
      });
    });

    it('should not invoke the onRender prop and should log an error', async () => {
      useScriptSpy.mockReturnValueOnce(true);
      render(instagramEmbed);

      const button = screen.getByTestId('banner-button');

      fireEvent.click(button);

      expect(console.error).toHaveBeenCalledWith(
        'onRender callback function not implemented for Instagram',
      );
      await waitFor(() => {
        expect(mockOnRender).not.toHaveBeenCalled();
      });
    });
  });

  describe('YouTube', () => {
    const youtubeEmbed = (
      <CanonicalSocialEmbed
        provider={fixtures.youtube.source}
        oEmbed={fixtures.youtube.embed.oembed}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
        caption={{
          textPrefixVisuallyHidden: 'Video caption, ',
          text: 'Warning: Third party content may contain adverts',
        }}
        onRender={mockOnRender}
      />
    );

    it('should render correctly for YouTube', async () => {
      const { container } = render(youtubeEmbed);

      const button = screen.getByTestId('banner-button');

      fireEvent.click(button);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should not invoke the onRender prop and should log an error', async () => {
      useScriptSpy.mockReturnValueOnce(true);
      render(youtubeEmbed);

      const button = screen.getByTestId('banner-button');

      fireEvent.click(button);

      expect(console.error).toHaveBeenCalledWith(
        'onRender callback function not implemented for YouTube',
      );
      await waitFor(() => {
        expect(mockOnRender).not.toHaveBeenCalled();
      });
    });
  });

  it('should render a notice when the provider is unsupported', () => {
    const { container } = render(
      <CanonicalSocialEmbed
        provider="unknown"
        oEmbed={fixtures.twitter.embed.oembed}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a notice when there is no oEmbed response', () => {
    const { container } = render(
      <CanonicalSocialEmbed
        provider={fixtures.twitter.source}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkTextSuffixVisuallyHidden: ', external',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('AmpSocialEmbed', () => {
  Object.values(fixtures).forEach(fixture => {
    const { source: provider, id, embed } = fixture;
    const caption =
      provider === 'youtube'
        ? {
            text: 'Warning: Third party content may contain adverts',
          }
        : null;

    it(`should render correctly for ${embed.oembed.provider_name}`, () => {
      const { container } = render(
        <AmpSocialEmbed
          provider={provider}
          id={id}
          skipLink={{
            text: 'Skip %provider_name% content',
            endTextId: 'skip-%provider%-content',
            endTextVisuallyHidden: 'End of %provider_name% content',
          }}
          fallback={{
            text: "Sorry but we're having trouble displaying this content",
            linkText: 'View content on %provider_name%',
            linkHref: 'embed-url',
            warningText:
              'Warning: BBC is not responsible for third party content',
          }}
          service="news"
          caption={caption}
        />,
      );

      const hasConsentBanner =
        embed.oembed.provider_name === 'youtube' ||
        embed.oembed.provider_name === 'facebook' ||
        embed.oembed.provider_name === 'instagram';

      if (hasConsentBanner) {
        const button = screen.getByTestId('banner-button');
        fireEvent.click(button);
      }

      expect(container).toMatchSnapshot();
    });
  });

  it('should render a notice when the provider is unsupported', () => {
    const { container } = render(
      <AmpSocialEmbed
        provider="unknown"
        id={fixtures.twitter.id}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render null when no social embed ID is provided', () => {
    const { container } = render(
      <AmpSocialEmbed
        provider="unknown"
        id={undefined}
        skipLink={{
          text: 'Skip %provider_name% content',
          endTextId: 'skip-%provider%-content',
          endTextVisuallyHidden: 'End of %provider_name% content',
        }}
        fallback={{
          text: "Sorry but we're having trouble displaying this content",
          linkText: 'View content on %provider_name%',
          linkHref: 'embed-url',
          warningText:
            'Warning: BBC is not responsible for third party content',
        }}
        service="news"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
