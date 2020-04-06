import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import SocialEmbedContainer from '.';
import withContexts from './helper.jsx';
import { twitterBlock, twitterBlockNoEmbed } from './fixtures';

describe('SocialEmbedContainer', () => {
  describe('Canonical', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(SocialEmbedContainer, {
        isAmp: false,
        isEnabled: true,
      })({ blocks: [twitterBlock] }),
    );

    it('should not render when disabled', () => {
      const { container } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: false,
        })({ blocks: [twitterBlock] }),
      );
      expect(container.firstChild).toBeNull();
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
