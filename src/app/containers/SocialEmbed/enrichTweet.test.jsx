import React from 'react';
import { render, waitFor } from '@testing-library/react';
import EnrichTweet from './enrichTweet';
import withContexts from './testHelper';
import { twitterBlock } from './fixtures';
import SocialEmbedContainer from '.';

describe('EnrichTweet', () => {
  it('should call twitter api to enrich tweets after initial render', async () => {
    global.twttr = {
      widgets: {
        load: jest.fn(),
      },
    };

    const socialEmbed = <SocialEmbedContainer blocks={[twitterBlock]} />;

    render(
      withContexts(EnrichTweet, {
        isAmp: false,
        isEnabled: true,
      })({ children: socialEmbed }),
    );

    await waitFor(() => {
      expect(global.twttr.widgets.load).toHaveBeenCalled();
    });
  });
});
