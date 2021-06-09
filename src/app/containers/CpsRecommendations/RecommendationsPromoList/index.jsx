import React, { forwardRef } from 'react';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, string, number } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import Grid from '../../../components/Grid';
import RecommendationsPromo from '../RecommendationsPromo';
import getEventTrackingData from './getEventTrackingData';

const RecommendationsPromoListItem = forwardRef(
  ({ item, dir, index }, forwardedRef) => {
    const eventTrackingData = getEventTrackingData({ item, index });
    const linkViewTrackerRef = useViewTracker(eventTrackingData.link);
    const ref = element => {
      linkViewTrackerRef(element);
      forwardedRef(element);
    };

    return (
      <Grid
        item
        ref={ref}
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
          dir={dir}
          eventTrackingData={eventTrackingData}
        />
      </Grid>
    );
  },
);

const RecommendationsPromoList = ({ promoItems, dir }) => {
  const eventTrackingData = getEventTrackingData();
  const blockViewTrackerRef = useViewTracker(eventTrackingData.block);

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
          ref={blockViewTrackerRef}
          index={index}
          item={item}
          dir={dir}
        />
      ))}
    </Grid>
  );
};

RecommendationsPromoListItem.propTypes = {
  dir: string.isRequired,
  item: storyItem.isRequired,
  index: number.isRequired,
};

RecommendationsPromoList.propTypes = {
  dir: string.isRequired,
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

export default RecommendationsPromoList;
