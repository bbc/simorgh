import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import styled from 'styled-components';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { C_LUNAR, C_GHOST } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';

import StoryPromo from '../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import CpsOnwardJourney from '../CpsOnwardJourney';
import Grid from '../../components/Grid';

const StyledStoryPromoWrapper = styled.div`
  > div {
    display: grid;
    margin: ${GEL_SPACING_HLF} ${GEL_SPACING_DBL};
    background-color: ${C_GHOST};
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      margin: ${GEL_SPACING_HLF} 0;
    }
  }
`;

const RecommendationsWrapper = styled.div`
  background-color: ${C_LUNAR};
  padding-bottom: ${GEL_SPACING};
`;

const CpsRecommendations = ({ items, parentColumns }) => {
  const { recommendations, dir } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled || !items.length) return null;

  const singleTransform = item => {
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
        enableGelGutters
        dir={dir}
      >
        <StyledStoryPromoWrapper>
          <StoryPromo
            item={item}
            dir={dir}
            isRecommendation
            displaySummary={false}
          />
        </StyledStoryPromoWrapper>
      </Grid>
    );
  };

  const listTransform = promoItems => (
    <Grid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 6,
        group5: 6,
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
            group4: 6,
            group5: 6,
          }}
          as={StoryPromoLiBase}
          border={false}
          key={item.id || item.uri}
          dir={dir}
        >
          {singleTransform(item)}
        </Grid>
      ))}
    </Grid>
  );

  const optionalLabelProps = {
    overrideHeadingAs: 'strong',
    bar: false,
    backgroundColor: C_LUNAR,
  };

  return (
    <RecommendationsWrapper>
      <CpsOnwardJourney
        labelId="recommendations-heading"
        title="Recommendations"
        content={items}
        parentColumns={parentColumns}
        singleTransform={singleTransform}
        listTransform={listTransform}
        optionalLabelProps={optionalLabelProps}
        mainColumn
      />
    </RecommendationsWrapper>
  );
};

export default CpsRecommendations;

CpsRecommendations.propTypes = {
  items: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

CpsRecommendations.defaultProps = {
  items: [],
  parentColumns: null,
};
