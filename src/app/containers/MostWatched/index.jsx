import React, { useState, useEffect, useContext } from 'react';
import 'isomorphic-fetch';
import { arrayOf, shape, bool, string } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import StoryPromo from '../StoryPromo';
import Grid from '../../components/Grid';
import CpsOnwardJourney from '../CpsOnwardJourney';
import { getMostWatchedData, processMostWatched } from './utilities';

const MostWatched = ({ initialData, hasHeader }) => {
  const { dir, mostWatched, service } = useContext(ServiceContext);
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

  const singleTransform = promo => (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 2,
      }}
      enableGelGutters
      dir={dir}
    >
      <StoryPromo item={promo} dir={dir} />
    </Grid>
  );

  const listTransform = items => (
    <Grid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 8,
      }}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {items.map(item => (
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 8,
            group5: 8,
          }}
          as={StoryPromoLi}
          key={item.id || item.uri}
          dir={dir}
        >
          <StoryPromo
            item={item}
            dir={dir}
            displaySummary={false}
            isSingleColumnLayout
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <CpsOnwardJourney
      labelId="most-watched-heading"
      title={hasHeader ? header : ''}
      content={mostWatchedItems}
      singleTransform={singleTransform}
      listTransform={listTransform}
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
