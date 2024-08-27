import React from 'react';
import { MediaBlock } from '#app/components/MediaLoader/types';
import serbianCyrCps from '#data/serbian/av-embeds/cyr/srbija-68707945.json';
import AvEmbedsPage from './AvEmbedsPageLayout';

const Component = () => {
  return (
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
    />
  );
};

export default {
  title: 'Pages/AvEmbeds Page',
  Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Example = () => <Component />;
