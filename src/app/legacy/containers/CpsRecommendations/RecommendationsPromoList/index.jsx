import React, { forwardRef, useContext } from 'react';
import {
  StoryPromoLiBase,
  StoryPromoUl,
} from '#psammead/psammead-story-promo-list/src';
import useViewTracker from '#hooks/useViewTracker';
import { OptimizelyContext } from '@optimizely/react-sdk';
import Grid from '../../../components/Grid';
import RecommendationsPromo from '../RecommendationsPromo';
import getEventTrackingData from './getEventTrackingData';

const RecommendationsPromoListItem = forwardRef(
  ({ item, index, optimizely }, forwardedRef) => {
    const eventTrackingData = getEventTrackingData({
      item,
      index,
      optimizely,
    });

    const linkViewEventTracker = useViewTracker(eventTrackingData.link);
    const elementRefCallback = element => {
      linkViewEventTracker(element);
      forwardedRef(element);
    };

    return (
      <Grid
        item
        {...elementRefCallback}
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
  const { optimizely } = useContext(OptimizelyContext);

  const eventTrackingData = getEventTrackingData({ optimizely });
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
          {...blockViewEventTracker}
          index={index}
          item={item}
          optimizely={optimizely}
        />
      ))}
    </Grid>
  );
};

export default RecommendationsPromoList;
