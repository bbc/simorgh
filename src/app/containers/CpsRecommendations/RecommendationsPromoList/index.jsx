import React from 'react';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, string } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import Grid from '../../../components/Grid';
import RecommendationsPromo from '../RecommendationsPromo';

const RecommendationsPromoList = ({ promoItems, dir }) => {
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
      dir={dir}
    >
      {promoItems.map(item => (
        <Grid
          item
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
          dir={dir}
        >
          {RecommendationsPromo({ promo: item, dir })}
        </Grid>
      ))}
    </Grid>
  );
};

RecommendationsPromoList.propTypes = {
  dir: string.isRequired,
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

export default RecommendationsPromoList;
