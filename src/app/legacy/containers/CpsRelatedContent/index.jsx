import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
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
  content = [],
  parentColumns = null,
  isMediaContent = false,
  title: _title,
  sectionLabelBackground = undefined,
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
    />
  );
};

export default CpsRelatedContent;
