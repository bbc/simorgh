import React, { useContext } from 'react';
import 'isomorphic-fetch';
import { arrayOf, shape, bool, string } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import StoryPromo from '../StoryPromo';
import Grid from '../../components/Grid';
import CpsOnwardJourney from '../CpsOnwardJourney';

const MostWatched = ({ data, hasHeader }) => {
  const { dir, mostWatched } = useContext(ServiceContext);
  const { header, hasMostWatched } = mostWatched;

  const { enabled } = useToggle('mostWatched');
  const isMostWatchedEnabled = enabled && hasMostWatched;

  if (!isMostWatchedEnabled || !data) {
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
      content={data}
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
  data: shape(mostWatchedDataProp),
  hasHeader: bool,
};

MostWatched.defaultProps = {
  data: null,
  hasHeader: true,
};

export default MostWatched;
