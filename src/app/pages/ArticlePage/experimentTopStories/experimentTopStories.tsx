/** @jsx jsx */
import { jsx } from '@emotion/react';
import { OptimoBlock } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import TopStoriesSection from '../PagePromoSections/TopStoriesSection';
import styles from '../ArticlePage.styles';

export const experimentTopStoriesConfig = {
  topStoriesExperiment: {
    variants: {
      control: 50,
      show_at_halfway: 50,
    },
  },
};

export const ExperimentTopStories = ({
  topStoriesContent,
}: {
  topStoriesContent: TopStoryItem[];
}) => {
  return (
    <div
      css={styles.experimentTopStoriesAndFeaturesSection}
      data-testid="experiment-top-stories"
      data-vars-top-stories-position="experiment"
    >
      <TopStoriesSection content={topStoriesContent} />
    </div>
  );
};

export const insertExperimentTopStories = ({
  blocks,
  topStoriesContent,
}: {
  blocks: OptimoBlock[];
  topStoriesContent: TopStoryItem[] | undefined;
}) => {
  if (!topStoriesContent) return blocks;

  const experimentTopStoriesBlock = {
    type: 'experimentTopStories',
    model: topStoriesContent,
    id: 'experimentTopStories',
  };

  const halfway = Math.floor(blocks.length * 0.5);
  return blocks.splice(halfway, 0, experimentTopStoriesBlock);
};
