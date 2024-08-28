import React from 'react';
import {
  act,
  render,
} from '#components/react-testing-library-with-providers';
import serbianCyrCps from '#data/serbian/av-embeds/cyr/srbija-68707945.json';
import { MediaBlock } from '#components/MediaLoader/types';
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
              assetId: 'srbija-68707945',
              language: serbianCyrCps.data.avEmbed.metadata.language,
              mediaId: null,
              mediaDelimiter: null,
              service: serbianCyrCps.data.avEmbed.metadata.service,
              type: 'avEmbeds',
              variant: serbianCyrCps.data.avEmbed.metadata.variant,
            },
            promo: serbianCyrCps.data.avEmbed.promo,
          }}
        />,
      );
    });

    expect(getByTestId('avembeds-mediaplayer')).toBeInTheDocument();
  });
});
