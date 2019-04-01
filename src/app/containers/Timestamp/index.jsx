import React from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import {
  isValidDateTime,
  leadingZero,
  formatUnixTimestamp,
  isTenHoursAgoOrLess,
  isTwentyFourHoursAgoOrLess,
  months,
} from './timestampUtilities';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

// 2019-03-22
const longNumeric = {
  day: date => leadingZero(date.getDate()),
  month: date => leadingZero(date.getMonth() + 1),
  year: date => date.getFullYear(),
  format: (d, m, y) => [y, m, d].join('-'),
};

// 22 March 2019
const shortAlphaNumeric = {
  day: date => date.getDate(),
  month: date => months[date.getMonth()],
  year: date => date.getFullYear(),
  format: (d, m, y) => [d, m, y].join(' '),
};

const humanReadable = timestamp => {
  if (isTenHoursAgoOrLess(timestamp)) {
    return relativeTime(timestamp);
  }

  if (isTwentyFourHoursAgoOrLess(timestamp)) {
    return formatUnixTimestamp(timestamp, shortAlphaNumeric);
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
