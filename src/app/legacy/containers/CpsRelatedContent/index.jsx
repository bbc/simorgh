import React, { useContext } from 'react';
import { arrayOf, shape, number, bool, string, elementType } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '../../../contexts/ServiceContext';

import CpsOnwardJourney from '../CpsOnwardJourney';
import RelatedContentPromo from './RelatedContentPromo';
import RelatedContentPromoList from './RelatedContentPromoList';

const getEventTrackingData = () => ({
  block: {
    componentName: 'related-content',
  },
});

const StyledCpsOnwardJourney = styled(CpsOnwardJourney)`
  margin-bottom: ${GEL_SPACING_DBL};
`;

const CpsRelatedContent = ({
  content,
  parentColumns,
  isMediaContent,
  title: _title,
  sectionLabelBackground,
  imageComponent,
}) => {
  const { translations } = useContext(ServiceContext);

  const eventTrackingData = getEventTrackingData();

  const translationPath = ['Related Content', ['relatedContent']];

  const title = _title || pathOr(...translationPath, translations);

  return (
    <StyledCpsOnwardJourney
      labelId="related-content-heading"
      title={title}
      content={content}
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
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
  isMediaContent: bool,
  title: string,
  sectionLabelBackground: string,
  imageComponent: elementType,
};

CpsRelatedContent.defaultProps = {
  content: [],
  parentColumns: null,
  isMediaContent: false,
  title: null,
  sectionLabelBackground: undefined,
  imageComponent: undefined,
};

export default CpsRelatedContent;
