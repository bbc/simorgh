import React from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import {
  longNumeric,
  shortAlphaNumeric,
  isValidDateTime,
  formatUnixTimestamp,
  isTenHoursAgoOrLess,
} from './timestampUtilities';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const humanReadable = timestamp => {
  if (isTenHoursAgoOrLess(timestamp)) {
    return relativeTime(timestamp);
  }
  return formatUnixTimestamp(timestamp, shortAlphaNumeric);
};

const TimestampContainer = ({ lastPublished, firstPublished }) => {
  if (
    !isValidDateTime(new Date(lastPublished)) ||
    !isValidDateTime(new Date(firstPublished))
  ) {
    return null;
  }

  const publishedDatetime = formatUnixTimestamp(firstPublished, longNumeric);
  const updatedDatetime = formatUnixTimestamp(lastPublished, longNumeric);

  return (
    <GridItemConstrainedMedium>
      <Timestamp datetime={publishedDatetime}>
        {humanReadable(firstPublished)}
      </Timestamp>
      {lastPublished !== firstPublished ? (
        <Timestamp datetime={updatedDatetime}>
          Updated {humanReadable(lastPublished)}
        </Timestamp>
      ) : null}
    </GridItemConstrainedMedium>
  );
};

TimestampContainer.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default TimestampContainer;
