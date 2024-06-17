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

const MostWatched = ({ data = null }) => {
  const { mostWatched } = useContext(ServiceContext);
  const { header } = mostWatched;

  if (!data || !data.length) {
    return null;
  }

  return (
    <StyledCpsOnwardJourney
      parentColumns={undefined}
      labelId="most-watched-heading"
      data-e2e="most-watched"
      title={header}
      isMediaContent
      content={data}
      promoComponent={RelatedContentPromo}
      promoListComponent={RelatedContentPromoList}
      columnType="secondary"
    />
  );
};

export default MostWatched;
