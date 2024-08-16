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
