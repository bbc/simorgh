import React, { useContext } from 'react';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { ServiceContext } from '#contexts/ServiceContext';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';

const RelatedContentPromoList = items => {
  const { dir } = useContext(ServiceContext); // TODO pass in?
  const isMapContent = false; // TODO pass in
  return (
    <Grid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 8,
      }}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {items.map(item => (
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: isMapContent ? 8 : 4,
            group5: isMapContent ? 8 : 4,
          }}
          as={StoryPromoLi}
          key={item.id || item.uri}
          dir={dir}
        >
          <StoryPromo
            item={item}
            dir={dir}
            displaySummary={false}
            isSingleColumnLayout={isMapContent}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RelatedContentPromoList;
