import React from 'react';
import { number } from 'prop-types';
import moment from 'moment-timezone';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import {
  longNumeric,
  dateOnly,
  dateAndTime,
  isValidDateTime,
  formatUnixTimestamp,
  isTenHoursAgoOrLess,
} from './timestampUtilities';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const isToday = timestamp => {
  const today = moment(Date.now());
  return today.isSame(timestamp, 'day');
};

const formatType = timestamp => (isToday(timestamp) ? dateAndTime : dateOnly);

const isSecondTimeStampRequired = (firstPublished, lastPublished) => {
  if (lastPublished !== firstPublished) {
    return !(
      moment(lastPublished).isBefore(Date.now, 'day') &&
      moment(lastPublished).isSame(firstPublished, 'day')
    );
  }
  return false;
};

const humanReadable = ({ timestamp, shouldMakeRelative }) =>
  shouldMakeRelative
    ? relativeTime(timestamp)
    : formatUnixTimestamp(timestamp, formatType(timestamp));

const TimestampContainer = ({ lastPublished, firstPublished }) => {
  if (
    !isValidDateTime(new Date(lastPublished)) ||
    !isValidDateTime(new Date(firstPublished))
  ) {
    return null;
  }

  const firstPublishedString = humanReadable({
    timestamp: firstPublished,
    shouldMakeRelative:
      lastPublished === firstPublished && isTenHoursAgoOrLess(firstPublished),
  });

  const lastPublishedString = `Updated ${humanReadable({
    timestamp: lastPublished,
    shouldMakeRelative: isTenHoursAgoOrLess(lastPublished),
  })}`;

  return (
    <GridItemConstrainedMedium>
      <Timestamp datetime={formatUnixTimestamp(firstPublished, longNumeric)}>
        {firstPublishedString}
      </Timestamp>
      {isSecondTimeStampRequired(firstPublished, lastPublished) ? (
        <Timestamp datetime={formatUnixTimestamp(lastPublished, longNumeric)}>
          {lastPublishedString}
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
