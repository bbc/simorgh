import React from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';

const MediaStoryPromoLi = styled(StoryPromoLi)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    border-bottom: 0.0625rem solid ${C_LUNAR};
    padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
`;

const MostWatchedOl = styled.ol.attrs({
  role: 'list',
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const RelatedContentPromoList = ({ promoItems, dir, isMediaContent }) => {
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
      as={isMediaContent ? MostWatchedOl : StoryPromoUl}
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
            group4: isMediaContent ? 8 : 4,
            group5: isMediaContent ? 8 : 4,
          }}
          as={isMediaContent ? MediaStoryPromoLi : StoryPromoLi}
          key={item.id || item.uri}
          dir={dir}
        >
          <StoryPromo
            item={item}
            dir={dir}
            displaySummary={false}
            isSingleColumnLayout={isMediaContent}
          />
        </Grid>
      ))}
    </Grid>
  );
};

RelatedContentPromoList.propTypes = {
  dir: string.isRequired,
  isMediaContent: bool,
  promoItems: arrayOf(shape(storyItem)).isRequired,
};

RelatedContentPromoList.defaultProps = {
  isMediaContent: false,
};

export default RelatedContentPromoList;
