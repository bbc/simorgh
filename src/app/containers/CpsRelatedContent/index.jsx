import React, { useContext } from 'react';
import { arrayOf, shape, number, bool, string, elementType } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import omit from 'ramda/src/omit';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
import { OptimizelyContext } from '@optimizely/react-sdk';
import withOptimizelyProvider from '#app/containers/PageHandlers/withOptimizelyProvider';

import CpsOnwardJourney from '../CpsOnwardJourney';
import RelatedContentPromo from './RelatedContentPromo';
import RelatedContentPromoList from './RelatedContentPromoList';

const getEventTrackingData = optimizely => ({
  block: {
    componentName: 'related-content',
    ...(optimizely && { optimizely }),
  },
});

const removeTimestampFromRecommendations = recommendations =>
  recommendations.map(recommendation => omit(['timestamp'], recommendation));

const StyledCpsOnwardJourney = styled(CpsOnwardJourney)`
  margin-bottom: ${GEL_SPACING_DBL};
`;

const CpsRelatedContent = ({
  content,
  recommendations,
  parentColumns,
  isMediaContent,
  isStoryPage,
  title: _title,
  sectionLabelBackground,
  imageComponent,
}) => {
  const { translations } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);

  const promoVariation = useOptimizelyVariation(OPTIMIZELY_CONFIG.featureId);

  const isInExperimentVariation =
    promoVariation !== null && promoVariation === 'variation_2' && isStoryPage;

  const eventTrackingData = getEventTrackingData(
    isInExperimentVariation && optimizely,
  );

  const translationPath = isInExperimentVariation
    ? ['Recommended stories', ['recommendationTitle']]
    : ['Related Content', ['relatedContent']];

  const title = _title || pathOr(...translationPath, translations);

  return (
    <StyledCpsOnwardJourney
      labelId="related-content-heading"
      title={title}
      content={
        isInExperimentVariation
          ? removeTimestampFromRecommendations(recommendations)
          : content
      }
      isMediaContent={isMediaContent}
      parentColumns={parentColumns}
      promoComponent={RelatedContentPromo}
      promoListComponent={RelatedContentPromoList}
      columnType="secondary"
      eventTrackingData={eventTrackingData}
      sectionLabelBackground={sectionLabelBackground}
      imageComponent={imageComponent}
    />
  );
};

CpsRelatedContent.propTypes = {
  // We Reuse the front page story item blocks
  // Both pages use CPS, so the data schema is the same
  // This can be found under CPS ARES payloads: relatedContent.groups[0].promos
  content: arrayOf(shape(storyItem)),
  recommendations: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
  isMediaContent: bool,
  isStoryPage: bool,
  title: string,
  sectionLabelBackground: string,
  imageComponent: elementType,
};

CpsRelatedContent.defaultProps = {
  content: [],
  recommendations: [],
  parentColumns: null,
  isMediaContent: false,
  isStoryPage: false,
  title: null,
  sectionLabelBackground: undefined,
  imageComponent: undefined,
};

export default withOptimizelyProvider(CpsRelatedContent);
