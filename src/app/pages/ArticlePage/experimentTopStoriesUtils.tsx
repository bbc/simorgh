/** @jsx jsx */
import { jsx } from '@emotion/react';
import { OptimoBlock } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import styles from './ArticlePage.styles';

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

  const halfway = (blocks.length / 2, 10) + 1;
  const blocksBeforeInsertIndex = blocks.slice(0, halfway);
  const blocksAfterInsertIndex = blocks.slice(halfway, blocks.length);

  return [
    ...blocksBeforeInsertIndex,
    experimentTopStoriesBlock,
    ...blocksAfterInsertIndex,
  ];
};
