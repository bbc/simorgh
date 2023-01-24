import React, { forwardRef, useContext } from 'react';
import {
  StoryPromoLiBase,
  StoryPromoUl,
} from '#psammead/psammead-story-promo-list/src';
import { arrayOf, shape, number, string, boolean } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { ServiceContext } from '../../../../contexts/ServiceContext';
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
  // 004_brasil_recommendations_experiment
  ({ item, index, service, optimizely, isArticle }, forwardedRef) => {
    const eventTrackingData =
      service === 'portuguese'
        ? getEventTrackingDataWithOptimizely({
            item,
            index,
            optimizely,
          })
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
          isArticle={isArticle}
        />
      </Grid>
    );
  },
);

const RecommendationsPromoList = ({ promoItems, isArticle }) => {
  // 004_brasil_recommendations_experiment
  const { service } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);
  const eventTrackingData =
    service === 'portuguese'
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
        // 004_brasil_recommendations_experiment
        <RecommendationsPromoListItem
          key={item.id}
          ref={blockViewEventTracker}
          index={index}
          item={item}
          optimizely={optimizely}
          service={service}
          isArticle={isArticle}
        />
      ))}
    </Grid>
  );
};

RecommendationsPromoListItem.propTypes = {
  item: shape(storyItem).isRequired,
  index: number.isRequired,
  service: string.isRequired,
  optimizely: shape({}).isRequired,
  isArticle: boolean,
};

RecommendationsPromoList.propTypes = {
  promoItems: arrayOf(shape(storyItem)).isRequired,
  isArticle: boolean,
};

RecommendationsPromoList.defaultProps = {
  isArticle: false,
};

export default RecommendationsPromoList;
