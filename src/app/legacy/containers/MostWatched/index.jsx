import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import RelatedContentPromo from '../CpsRelatedContent/RelatedContentPromo';
import RelatedContentPromoList from '../CpsRelatedContent/RelatedContentPromoList';

const StyledCpsOnwardJourney = styled(CpsOnwardJourney)`
  @media (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: 0;
  }
`;

const MostWatched = ({ data = null, isMostWatchedPage = false }) => {
  const { mostWatched } = useContext(ServiceContext);
  const { header } = mostWatched;

  if (!data || !data.length) {
    return null;
  }

  const parentColumns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 20,
  };

  return (
    <StyledCpsOnwardJourney
      parentColumns={isMostWatchedPage ? parentColumns : undefined}
      labelId="most-watched-heading"
      data-e2e="most-watched"
      title={isMostWatchedPage ? '' : header}
      isMediaContent
      content={data}
      promoComponent={RelatedContentPromo}
      promoListComponent={RelatedContentPromoList}
      columnType="secondary"
    />
  );
};

export default MostWatched;
