import React, { useContext } from 'react';
import { arrayOf, shape, bool } from 'prop-types';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import RelatedContentPromo from '../CpsRelatedContent/RelatedContentPromo';
import RelatedContentPromoList from '../CpsRelatedContent/RelatedContentPromoList';

const MostWatched = ({ data, hasHeader }) => {
  const { mostWatched } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);
  const { header } = mostWatched;

  if (isAmp || !data || !data.length) {
    return null;
  }

  return (
    <CpsOnwardJourney
      labelId="most-watched-heading"
      data-e2e="most-watched"
      title={hasHeader ? header : ''}
      isMapContent
      content={data}
      promoComponent={RelatedContentPromo}
      promoListComponent={RelatedContentPromoList}
      columnType="secondary"
    />
  );
};

MostWatched.propTypes = {
  data: arrayOf(shape(storyItem)),
  hasHeader: bool,
};

MostWatched.defaultProps = {
  data: null,
  hasHeader: true,
};

export default MostWatched;
