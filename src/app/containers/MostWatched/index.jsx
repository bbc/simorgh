import React, { useContext } from 'react';
import 'isomorphic-fetch';
import { arrayOf, shape, bool } from 'prop-types';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import RelatedContentPromo from '../CpsRelatedContent/RelatedContentPromo';
import RelatedContentPromoList from '../CpsRelatedContent/RelatedContentPromoList';

const MostWatched = ({ data, hasHeader }) => {
  const { mostWatched } = useContext(ServiceContext);
  const { header } = mostWatched;

  if (!data || !data.length) {
    return null;
  }

  return (
    <CpsOnwardJourney
      labelId="most-watched-heading"
      title={hasHeader ? header : ''}
      isMapContent
      content={data}
      promoComponent={RelatedContentPromo}
      promoListComponent={RelatedContentPromoList}
      columnType="secondary"
    />
  );
};

const mostWatchedItem = {
  promo: shape(storyItem),
};

MostWatched.propTypes = {
  data: arrayOf(shape(mostWatchedItem)),
  hasHeader: bool,
};

MostWatched.defaultProps = {
  data: null,
  hasHeader: true,
};

export default MostWatched;
