import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import pidginLivePageBlock from './fixtureData';
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
        240, // Group 0
        360, // Group 1
        400, // Group 2
        600, // Group 3
      ],
    },
  },
};

export const WithLivePage = () => (
  // @ts-expect-error partial data for storybook
  <Component blocks={[pidginLivePageBlock]} />
);

WithLivePage.globals = {
  service: { service: 'pidgin', variant: 'default' },
};
