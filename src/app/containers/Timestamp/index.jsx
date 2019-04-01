import React from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import {
  isValidDateTime,
  formatUnixTimestamp,
  isTenHoursAgoOrLess,
  isTwentyFourHoursAgoOrLess,
  shortAlphaNumeric,
  longNumeric,
  alphaNumericDatetime,
} from './timestampUtilities';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

// prettier-ignore
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // eslint-disable-line

const humanReadable = timestamp => {
  if (isTenHoursAgoOrLess(timestamp)) {
    return relativeTime(timestamp);
  }

  if (isTwentyFourHoursAgoOrLess(timestamp)) {
    return formatUnixTimestamp(timestamp, alphaNumericDatetime);
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
