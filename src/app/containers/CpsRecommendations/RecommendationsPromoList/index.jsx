import React, { useContext } from 'react';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import { ServiceContext } from '#contexts/ServiceContext';
import Grid from '../../../components/Grid';
import RecommendationsPromo from '../RecommendationsPromo';

const RecommendationsPromoList = promoItems => {
  const { dir } = useContext(ServiceContext); // TODO pass in?

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
          {RecommendationsPromo(item)}
        </Grid>
      ))}
    </Grid>
  );
};

export default RecommendationsPromoList;
