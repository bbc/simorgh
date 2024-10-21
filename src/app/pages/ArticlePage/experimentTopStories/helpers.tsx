/** @jsx jsx */
import { jsx } from '@emotion/react';
import { OptimoBlock } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import TopStoriesSection from '../PagePromoSections/TopStoriesSection';
import styles from './index.styles';

export const experimentTopStoriesConfig = {
  topStoriesExperiment: {
    variants: {
      control: 50,
      show_at_halfway: 50,
    },
  },
};

const enableExperimentTopStories = ({
  topStoriesContent,
  isAmp,
  service,
  id,
}: {
  topStoriesContent: TopStoryItem[] | undefined;
  isAmp: boolean;
  service: string;
  id: string | null;
}) => {
  if (!topStoriesContent || !isAmp || !service || !id) return false;
  const newsTestAsset = 'c6v11qzyv8po';
  const newsAsset = 'cz7xywn940ro';
  const sportAsset = 'cpgw0xjmpd3o';
  const experimentAssets = [newsAsset, newsTestAsset, sportAsset];
  const experimentServices = ['news', 'sport'];

  return (
    isAmp &&
    id &&
    experimentServices.includes(service) &&
    experimentAssets.includes(id)
  );
};

const insertExperimentTopStories = ({
  blocks,
  topStoriesContent,
}: {
  blocks: OptimoBlock[];
  topStoriesContent: TopStoryItem[];
}) => {
  const insertIndex = Math.floor(blocks.length * 0.5); // halfway index of blocks array
  const experimentTopStoriesBlock = {
    type: 'experimentTopStories',
    model: topStoriesContent,
    id: `experimentTopStories-${insertIndex}`,
  };

  const blocksClone = [...blocks];
  blocksClone.splice(insertIndex, 0, experimentTopStoriesBlock);
  return blocksClone;
};

export const getExperimentTopStories = ({
  blocks,
  topStoriesContent,
  isAmp,
  service,
  id,
}: {
  blocks: OptimoBlock[];
  topStoriesContent: TopStoryItem[] | undefined;
  isAmp: boolean;
  service: string;
  id: string | null;
}) => {
  if (!topStoriesContent)
    return {
      transformedBlocks: blocks,
      shouldEnableExperimentTopStories: false,
    };

  const shouldEnableExperimentTopStories = enableExperimentTopStories({
    topStoriesContent,
    isAmp,
    service,
    id,
  });

  const transformedBlocks =
    shouldEnableExperimentTopStories && blocks.length > 2
      ? insertExperimentTopStories({
          blocks,
          topStoriesContent,
        })
      : blocks;

  return {
    transformedBlocks,
    shouldEnableExperimentTopStories,
  };
};

export const ExperimentTopStories = ({
  topStoriesContent,
}: {
  topStoriesContent: TopStoryItem[];
}) => {
  return (
    <div
      css={styles.experimentTopStoriesSection}
      data-testid="experiment-top-stories"
      data-vars-top-stories-position="experiment"
    >
      <TopStoriesSection content={topStoriesContent} />
    </div>
  );
};
