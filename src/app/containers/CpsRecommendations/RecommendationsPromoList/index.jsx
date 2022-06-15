import React, { forwardRef } from 'react';
import {
  StoryPromoLiBase,
  StoryPromoUl,
} from '#legacy/psammead-story-promo-list/src';
import { arrayOf, shape, number } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import Grid from '../../../components/Grid';
import RecommendationsPromo from '../RecommendationsPromo';
import getEventTrackingData from './getEventTrackingData';

const RecommendationsPromoListItem = forwardRef(
  ({ item, index }, forwardedRef) => {
    const eventTrackingData = getEventTrackingData({ item, index });
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

const RecommendationsPromoList = ({ promoItems }) => {
  const eventTrackingData = getEventTrackingData();
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
        />
      ))}
    </Grid>
  );
};

RecommendationsPromoListItem.propTypes = {
  item: shape(storyItem).isRequired,
  index: number.isRequired,
};

RecommendationsPromoList.propTypes = {
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

export default RecommendationsPromoList;
