import React from 'react';
import styled from 'styled-components';
import { C_PEBBLE } from '@bbc/psammead-styles/colours';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { arrayOf, bool, shape, string } from 'prop-types';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';

const Bar = styled.div`
  margin-top: 20px;
  border-top: 0.0625rem solid ${C_PEBBLE};
  z-index: -1;
`;

const RelatedContentPromoList = ({ promoItems, dir, isMapContent }) => {
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
      {promoItems.map(item => (
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
          <Bar />
        </Grid>
      ))}
    </Grid>
  );
};

RelatedContentPromoList.propTypes = {
  dir: string.isRequired,
  isMapContent: bool,
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

RelatedContentPromoList.defaultProps = {
  isMapContent: false,
};

export default RelatedContentPromoList;
