import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import styled from 'styled-components';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import CpsOnwardJourney from '../CpsOnwardJourney';
import SkipLinkWrapper from '../../components/SkipLinkWrapper';
import { GridItemConstrainedMediumNoMargin } from '#lib/styledGrid';
import RecommendationsPromo from './RecommendationsPromo';
import RecommendationsPromoList from './RecommendationsPromoList';

const RecommendationsWrapper = styled.div`
  background-color: ${C_LUNAR};
  padding-bottom: ${GEL_SPACING};
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const CpsRecommendations = ({ items, parentColumns }) => {
  const { recommendations, translations, service } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled || !items.length) return null;

  const title = pathOr(
    'You may also be interested in',
    ['recommendationTitle'],
    translations,
  );

  const { text, endTextVisuallyHidden } = path(['skipLink'], recommendations);

  const skipLinkTerms = {
    '%title%': title,
  };

  const endTextId = 'end-of-recommendations';

  return (
    <GridItemConstrainedMediumNoMargin>
      <SkipLinkWrapper
        service={service}
        endTextId={endTextId}
        text={text}
        endTextVisuallyHidden={endTextVisuallyHidden}
        terms={skipLinkTerms}
      >
        <RecommendationsWrapper>
          <CpsOnwardJourney
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
          />
        </RecommendationsWrapper>
      </SkipLinkWrapper>
    </GridItemConstrainedMediumNoMargin>
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
