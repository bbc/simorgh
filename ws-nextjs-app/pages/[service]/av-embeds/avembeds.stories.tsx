import React from 'react';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { MediaBlock } from '#app/components/MediaLoader/types';
import serbianCyrCps from '#data/serbian/av-embeds/cyr/srbija-68707945.json';
import { AV_EMBEDS } from '#app/routes/utils/pageTypes';
import AvEmbedsPage from './AvEmbedsPageLayout';

const Component = () => {
  return (
    <RequestContextProvider
      pathname="/pathname"
      pageType="avEmbeds"
      service="serbian"
    >
      <AvEmbedsPage
        pageData={{
          mediaBlock: serbianCyrCps.data.avEmbed.content.model
            .blocks as unknown as MediaBlock[],
          metadata: {
            caption:
              serbianCyrCps.data.avEmbed.content.model.blocks[0].model.blocks[2]
                .model.caption,
            headline: serbianCyrCps.data.avEmbed.promo.headlines.seoHeadline,
            imageUrl:
              serbianCyrCps.data.avEmbed.content.model.blocks[0].model.blocks[0]
                .model.imageUrl,
            language: serbianCyrCps.data.avEmbed.metadata.language,
            promoSummary:
              serbianCyrCps.data.avEmbed.promo.summary.blocks[0].model.blocks[0]
                .model.text,
            type: AV_EMBEDS,
          },
        }}
      />
    </RequestContextProvider>
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
