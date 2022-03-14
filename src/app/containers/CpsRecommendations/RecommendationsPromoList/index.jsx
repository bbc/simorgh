import React, { forwardRef, useContext } from 'react';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, number, string } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import { OptimizelyContext } from '@optimizely/react-sdk';
import Grid from '../../../components/Grid';
import RecommendationsPromo from '../RecommendationsPromo';
import getEventTrackingData from './getEventTrackingData';

const getEventTrackingDataWithOptimizely = ({ item, index, optimizely }) => {
  const eventTrackingData = getEventTrackingData({ item, index });
  return {
    ...eventTrackingData,
    block: {
      ...eventTrackingData.block,
      ...(optimizely && { optimizely }),
    },
  };
};

const RecommendationsPromoListItem = forwardRef(
  ({ item, index, optimizely, showForVariation }, forwardedRef) => {
    const eventTrackingData = showForVariation
      ? getEventTrackingDataWithOptimizely({ item, index, optimizely })
      : getEventTrackingData({ item, index });
    const linkViewEventTracker = useViewTracker(eventTrackingData.link);
    const elementRefCallback = element => {
      linkViewEventTracker(element);
      forwardedRef(element);
    };

    return (
      <Grid
        item
        ref={elementRefCallback}
        columns={{
          group0: 1,
          group1: 1,
          group2: 1,
          group3: 1,
          group4: 1,
          group5: 1,
        }}
        as={StoryPromoLiBase}
        border={false}
        key={item.id || item.uri}
      >
        <RecommendationsPromo
          promo={item}
          eventTrackingData={eventTrackingData}
        />
      </Grid>
    );
  },
);

const RecommendationsPromoList = ({ promoItems, showForVariation }) => {
  const { optimizely } = useContext(OptimizelyContext);
  const eventTrackingData = showForVariation
    ? getEventTrackingDataWithOptimizely({ optimizely })
    : getEventTrackingData();
  const blockViewEventTracker = useViewTracker(eventTrackingData.block);

  return (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 1,
        group5: 1,
      }}
      as={StoryPromoUl}
      enableGelGutters
    >
      {promoItems.map((item, index) => (
        <RecommendationsPromoListItem
          key={item.id}
          ref={blockViewEventTracker}
          index={index}
          item={item}
          optimizely={optimizely}
          showForVariation={showForVariation}
        />
      ))}
    </Grid>
  );
};

RecommendationsPromoListItem.propTypes = {
  item: shape(storyItem).isRequired,
  index: number.isRequired,
  optimizely: shape({}).isRequired,
  showForVariation: string.optional,
};

RecommendationsPromoListItem.defaultProps = {
  showForVariation: null,
};

RecommendationsPromoList.propTypes = {
  promoItems: arrayOf(shape(storyItem)).isRequired,
  showForVariation: string.optional,
};

RecommendationsPromoList.defaultProps = {
  showForVariation: null,
};

export default RecommendationsPromoList;
