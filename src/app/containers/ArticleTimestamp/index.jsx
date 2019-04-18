import React from 'react';
import Timestamp from '../Timestamp';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

// Pull out utility functions to a module of their own
const isTenHoursAgoOrLess = (milliseconds) => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};

const isValidDateTime = (timestamp) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(timestamp) || timestamp === null) {
    return false;
  }
  return !isNaN(new Date(timestamp)); // eslint-disable-line no-restricted-globals
}

const ArticleTimestamp = ({ firstPublished, lastPublished }) => {
  const isRelative = lastPublished === firstPublished && isTenHoursAgoOrLess(firstPublished);

  if (!isValidDateTime(new Date(firstPublished)) || !isValidDateTime(new Date(lastPublished)))
  {
    return null;
  }

  return(
    <GridItemConstrainedMedium>
      <Timestamp
        timestamp={firstPublished}
        dateTimeFormat='D MMMM YYYY' // - make this be used by TimestampContainer
        isRelative={isRelative}
      />
      {
        firstPublished !== lastPublished ? (
          <Timestamp
            timestamp={lastPublished}
            dateTimeFormat='D MMMM YYYY' // - make this be used by TimestampContainer
            isRelative={isTenHoursAgoOrLess(lastPublished)}
            prefix='Updated' // add space after prefix
          />
        ) : null
      }
    </GridItemConstrainedMedium>
  );
}

export default ArticleTimestamp;
