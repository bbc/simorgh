import React from 'react';
import { Helmet } from 'react-helmet';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import serbianCyrCps from '#data/serbian/av-embeds/cyr/srbija-68707945.json';
import { MediaBlock } from '#app/components/MediaLoader/types';
import AvEmbedsPage from './AvEmbedsPageLayout';

// @ts-expect-error Mocking require to prevent race condition.
window.require = jest.fn();

describe('AV Embeds Page', () => {
  it('should render the AV Embeds page', async () => {
    const { getByTestId } = await act(async () => {
      return render(
        <AvEmbedsPage
          pageData={{
            mediaBlock: serbianCyrCps.data.avEmbed.content.model
              .blocks as unknown as MediaBlock[],
            metadata: {
              language: serbianCyrCps.data.avEmbed.metadata.language,
              type: 'avEmbeds',
            },
          }}
        />,
      );
    });

    expect(getByTestId('avembeds-mediaplayer')).toBeInTheDocument();
  });

  it('should render og:url meta tag on AV Embeds page', async () => {
    await act(async () => {
      return render(
        <AvEmbedsPage
          pageData={{
            mediaBlock: serbianCyrCps.data.avEmbed.content.model
              .blocks as unknown as MediaBlock[],
            metadata: {
              language: serbianCyrCps.data.avEmbed.metadata.language,
              type: 'avEmbeds',
            },
          }}
        />,
        {
          id: 'serbian/cyr/srbija-68707945',
          service: 'serbian',
          variant: 'cyr',
        },
      );
    });

    const helmetMetaTags = Helmet.peek()?.metaTags;

    // @ts-expect-error - 'property' does not exist on type 'MetaTag'.
    const actual = helmetMetaTags.filter(tag => tag.property === 'og:url')[0]
      .content;

    expect(actual).toEqual(
      'https://www.test.bbc.com/serbian/cyr/av-embeds/srbija-68707945/vpid/p0cfmdwn',
    );
  });
});
