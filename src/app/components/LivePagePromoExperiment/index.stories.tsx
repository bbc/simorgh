import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { topStoriesBlocksWithLiveItem } from '../TopBarOJs/helpers/fixtureData';
import metadata from './metadata.json';
import readme from './README.md';
import LivePagePromoExperiment from '.';

interface Props {
  blocks: TopStoryItem[];
}

const Component = ({ blocks }: Props) => (
  <LivePagePromoExperiment blocks={blocks} />
);

export default {
  title: 'Components/LivePagePromoExperiment',
  Component,
  parameters: {
    docs: { readme },
    metadata,
    chromatic: {
      viewports: [
        240, // Group 1
        360, // Group 1
        400, // Group 2
        600, // Group 3
        1008, // Group 4
      ],
    },
  },
};

export const WithLivePage = () => (
  // @ts-expect-error partial data for storybook
  <Component blocks={topStoriesBlocksWithLiveItem} />
);
