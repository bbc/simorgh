import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import CpsOnwardJourney from '../CpsOnwardJourney';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import RecommendationsPromo from './RecommendationsPromo';
import RecommendationsPromoList from './RecommendationsPromoList';

const RecommendationsWrapper = styled.div`
  background-color: ${C_LUNAR};
  margin: ${GEL_SPACING_TRPL} 0;
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin: 0 0 ${GEL_SPACING_TRPL};
    padding: 0 0 ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING_TRPL};
    padding: ${GEL_SPACING_DBL} 0;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL};
  }
`;

const LabelComponent = styled(SectionLabel)`
  margin: 0;
  padding: 0;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING_DBL};
  }
`;

const CpsRecommendations = ({ items, parentColumns }) => {
  const { recommendations, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled || !items.length) return null;

  const title = pathOr(
    'You may also be interested in',
    ['recommendationTitle'],
    translations,
  );

  const { text, endTextVisuallyHidden } = path(['skipLink'], recommendations);

  const terms = {
    '%title%': title,
  };

  const endTextId = 'end-of-recommendations';

  const skipLinkProps = {
    endTextId,
    terms,
    text,
    endTextVisuallyHidden,
  };

  return (
    <GridItemMediumNoMargin>
      <RecommendationsWrapper>
        <CpsOnwardJourney
          LabelComponent={LabelComponent}
          labelId="recommendations-heading"
          title={title}
          content={items}
          parentColumns={parentColumns}
          promoComponent={RecommendationsPromo}
          promoListComponent={RecommendationsPromoList}
          sectionLabelOverrideAs="strong"
          sectionLabelBar={false}
          sectionLabelBackground={C_LUNAR}
          columnType="main"
          skipLink={skipLinkProps}
        />
      </RecommendationsWrapper>
    </GridItemMediumNoMargin>
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
