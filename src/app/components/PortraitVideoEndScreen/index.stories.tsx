import portraitVideoArticle from '#data/portuguese/articles/cn7v03e37eko.json';
import { LatestMedia } from '#app/pages/MediaArticlePage/PagePromoSections/LatestMediaSection/types';
import PortraitVideoEndScreen from '.';

const Component = () => (
  <div
    style={{
      position: 'relative',
      width: '315px',
      aspectRatio: '9 / 16',
      backgroundColor: 'black',
    }}
  >
    <PortraitVideoEndScreen
      content={
        portraitVideoArticle.data.secondaryData.latestMedia as LatestMedia[]
      }
      onReplay={() => undefined}
    />
  </div>
);

export default {
  title: 'Components/PortraitVideoEndScreen',
  Component,
  parameters: {
    chromatic: {
      viewports: [400, 600, 1008],
    },
  },
};

export const Example = Component;
