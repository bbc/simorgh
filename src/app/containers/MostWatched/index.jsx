import React, { useState, useEffect, useContext } from 'react';
import 'isomorphic-fetch';
import { arrayOf, shape, bool, string } from 'prop-types';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import CpsOnwardJourney from '../CpsOnwardJourney';
import { getMostWatchedData, processMostWatched } from './utilities';
import RelatedContentPromo from '../CpsRelatedContent/RelatedContentPromo';
import RelatedContentPromoList from '../CpsRelatedContent/RelatedContentPromoList';

const MostWatched = ({ initialData, hasHeader }) => {
  const { mostWatched, service } = useContext(ServiceContext);
  const { variant, isAmp } = useContext(RequestContext);

  const defaultMostWatchedConfig = {
    header: 'Most Watched',
    numberOfItems: 10,
    hasMostWatched: false,
  };

  const { header, numberOfItems, hasMostWatched } =
    mostWatched || defaultMostWatchedConfig;

  const { enabled } = useToggle('mostWatched');

  const isMostWatchedEnabled = enabled && hasMostWatched;

  const visibleItems = processMostWatched({
    data: initialData,
    numberOfItems,
    isAmp,
    service,
  });

  const [mostWatchedItems, setMostWatchedItems] = useState(visibleItems);

  useEffect(() => {
    getMostWatchedData({ service, variant }).then(data => {
      const processedData = processMostWatched({
        data,
        numberOfItems,
        isAmp,
        service,
      });
      setMostWatchedItems(processedData);
    });
  }, [numberOfItems, isAmp, service, variant]);

  if (!isMostWatchedEnabled || !mostWatchedItems) {
    return null;
  }

  return (
    <CpsOnwardJourney
      labelId="most-watched-heading"
      title={hasHeader ? header : ''}
      isMapContent
      content={mostWatchedItems}
      promoComponent={RelatedContentPromo}
      promoListComponent={RelatedContentPromoList}
      columnType="secondary"
    />
  );
};

const mostWatchedItem = {
  promo: shape(storyItem),
};

const mostWatchedDataProp = {
  lastRecordTimeStamp: string.isRequired,
  records: arrayOf(shape(mostWatchedItem)),
};

MostWatched.propTypes = {
  initialData: shape(mostWatchedDataProp),
  hasHeader: bool,
};

MostWatched.defaultProps = {
  initialData: null,
  hasHeader: true,
};

export default MostWatched;
