/** @jsx jsx */
import { jsx } from '@emotion/react';
import { OptimoBlock } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { buildATIEventTrackUrl } from '#app/components/ATIAnalytics/atiUrl';
import { Services, Environments } from '#app/models/types/global';
import TopStoriesSection from '../PagePromoSections/TopStoriesSection';
import styles from './index.styles';

const experimentName = 'topStoriesExperiment';
export const experimentTopStoriesConfig = {
  [experimentName]: {
    variants: {
      control: 50,
      show_at_halfway: 50,
    },
  },
};

const ARTICLE_LENGTH_THRESHOLD = 10;
const enableExperimentTopStories = ({
  isAmp,
  service,
  id,
  blocksLength,
}: {
  isAmp: boolean;
  service: string;
  id: string | null;
  blocksLength: number;
}) => {
  if (!isAmp || !service || !id || blocksLength < ARTICLE_LENGTH_THRESHOLD) {
    return false;
  }

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
  const insertIndex = Math.floor((blocks.length - 1) * 0.5); // halfway index of blocks array, -1 accounts for 'wsoj' block which is never rendered on PS articles
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
  const shouldEnableExperimentTopStories = enableExperimentTopStories({
    isAmp,
    service,
    id,
    blocksLength: blocks.length,
  });

  if (!topStoriesContent || !shouldEnableExperimentTopStories)
    return {
      transformedBlocks: blocks,
      shouldEnableExperimentTopStories: false,
    };

  const transformedBlocks = insertExperimentTopStories({
    blocks,
    topStoriesContent,
  });

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
      data-experiment="position:articleBody"
    >
      <TopStoriesSection content={topStoriesContent} />
    </div>
  );
};

const getStatsDestinationKey = ({
  env,
  service,
}: {
  service: Services;
  env: Environments;
}) => {
  if (env !== 'live') {
    return service === 'news' ? 'NEWS_PS_TEST' : 'SPORT_PS_TEST';
  }

  return service === 'news' ? 'NEWS_PS' : 'SPORT_PS';
};

// SOURCE_URL and VARIANT(${experimentName}) are replaced with their actual values via AMP's variable substitution: https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md
const buildTopStoriesEventUrl = ({
  type,
  env,
  service,
  atiAnalyticsProducerId,
}: {
  type: 'view' | 'click';
  env: Environments;
  service: Services;
  atiAnalyticsProducerId: string;
}) => {
  return buildATIEventTrackUrl({
    campaignID: 'article',
    componentName: `${type === 'view' ? 'top-stories-section' : 'top-stories-promo'}`,
    pageIdentifier: 'SOURCE_URL',
    platform: 'amp',
    producerId: atiAnalyticsProducerId,
    statsDestination: `${getStatsDestinationKey({ env, service })}`,
    variant: `${experimentName}:VARIANT(${experimentName})`,
    type,
  });
};

export const getExperimentAnalyticsConfig = ({
  env,
  service,
  atiAnalyticsProducerId,
}: {
  env: Environments;
  service: Services;
  atiAnalyticsProducerId: string;
}) => {
  return {
    requests: {
      topStoriesView: buildTopStoriesEventUrl({
        type: 'view',
        env,
        service,
        atiAnalyticsProducerId,
      }),
      topStoriesClick: buildTopStoriesEventUrl({
        type: 'click',
        env,
        service,
        atiAnalyticsProducerId,
      }),
    },
    triggers: {
      articleBodyView: {
        on: 'visible',
        request: 'topStoriesView',
        visibilitySpec: {
          selector: `div[data-experiment='position:articleBody'] > section[aria-labelledby='top-stories-heading']`,
          visiblePercentageMin: 20,
          totalTimeMin: 500,
          continuousTimeMin: 200,
        },
      },
      secondaryColumnView: {
        on: 'visible',
        request: 'topStoriesView',
        visibilitySpec: {
          selector: `div[data-experiment='position:secondaryColumn'] > section[aria-labelledby='top-stories-heading']`,
          visiblePercentageMin: 20,
          totalTimeMin: 500,
          continuousTimeMin: 200,
        },
      },
      topStoriesPromoClick: {
        on: 'click',
        request: 'topStoriesClick',
        selector: `a[aria-labelledby*='top-stories-promo']`,
      },
    },
  };
};
