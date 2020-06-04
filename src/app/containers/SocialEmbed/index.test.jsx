import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import loggerMock from '#testHelpers/loggerMock';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import SocialEmbedContainer from '.';
import withContexts from './testHelper';
import { twitterBlock, twitterBlockNoEmbed } from './fixtures';

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
        })({ blocks: [twitterBlock] }),
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
        href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
      });
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeFalsy();
    });

    it('should not render when disabled', () => {
      const { container } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: false,
        })({ blocks: [twitterBlock] }),
      );
      expect(container.firstChild).toBeNull();
      expect(loggerMock.info).not.toHaveBeenCalled();
    });

    shouldMatchSnapshot(
      'should render correctly without an embed block',
      withContexts(SocialEmbedContainer, {
        isAmp: false,
        isEnabled: true,
      })({ blocks: [twitterBlockNoEmbed] }),
    );
  });

  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(SocialEmbedContainer, {
        isAmp: true,
        isEnabled: true,
      })({ blocks: [twitterBlock] }),
    );
  });
});
