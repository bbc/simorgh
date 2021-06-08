import React, { forwardRef } from 'react';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, string } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import Grid from '../../../components/Grid';
import RecommendationsPromo from '../RecommendationsPromo';

const getAdId = url => url.split('/')[1];
const BLOCK_LEVEL_EVENT_TRACKING_DATA = {
  componentName: 'wsoj',
};

const PromoItem = forwardRef(({ item, dir, index }, ref) => {
  const { id, uri } = item;
  const eventTrackingData = {
    block: BLOCK_LEVEL_EVENT_TRACKING_DATA,
    link: {
      componentName: encodeURIComponent(item.headlines.headline),
      url: getAdId(item.locators.assetUri), // TODO
      format: `CHD=promo::${index + 1}`,
    },
  };
  const linkViewTracker = useViewTracker(eventTrackingData.link);
  const refCallback = element => {
    linkViewTracker(element);
    ref(element);
  };

  return (
    <Grid
      item
      ref={refCallback}
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
      key={id || uri}
    >
      <RecommendationsPromo
        promo={item}
        dir={dir}
        eventTrackingData={BLOCK_LEVEL_EVENT_TRACKING_DATA}
      />
    </Grid>
  );
});

const RecommendationsPromoList = ({ promoItems, dir }) => {
  const blockViewTracker = useViewTracker({
    componentName: 'wsoj',
  });

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
        <PromoItem ref={blockViewTracker} index={index} item={item} dir={dir} />
      ))}
    </Grid>
  );
};

RecommendationsPromoList.propTypes = {
  dir: string.isRequired,
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

export default RecommendationsPromoList;
