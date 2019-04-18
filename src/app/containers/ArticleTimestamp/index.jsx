import React from 'react';
import { number } from 'prop-types';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';
import Timestamp from '../Timestamp';
import { formatDateNumeric } from './timeFormats';
import {
  isValidDateTime,
  isTenHoursAgoOrLess,
  relativeTime,
  formatType,
} from './timestampUtilities';

const ArticleTimestamp = ({ firstPublished, lastPublished }) => {
  const isRelative = lastPublished === firstPublished 
    && isTenHoursAgoOrLess(firstPublished);

  if (!isValidDateTime(new Date(firstPublished)) || !isValidDateTime(new Date(lastPublished)))
  {
    return null;
  }

  return(
    <GridItemConstrainedMedium>
      <Timestamp
        timestamp={firstPublished}
        dateTimeFormat={formatDateNumeric}
        format={formatType(firstPublished)}
        time={ isRelative ? relativeTime(firstPublished) : null }
      />
      {
        firstPublished !== lastPublished ? (
          <Timestamp
            timestamp={lastPublished}
            dateTimeFormat={formatDateNumeric}
            format={formatType(lastPublished)}
            time={
              isTenHoursAgoOrLess(lastPublished) ?
                relativeTime(lastPublished) : null
            }
            prefix='Updated'
          />
        ) : null
      }
    </GridItemConstrainedMedium>
  );
}

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
}

export default ArticleTimestamp;
