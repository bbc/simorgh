import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import {
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
} from '../TopBarOJs/helpers/fixtureData';
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
  },
};

export const WithLivePage = () => (
  // @ts-expect-error partial data for storybook
  <Component blocks={topStoriesBlocksWithLiveItem} />
);

// @ts-expect-error partial data for storybook
export const WithoutLivePage = () => <Component blocks={topStoriesBlocks} />;
