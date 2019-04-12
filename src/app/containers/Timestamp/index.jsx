import React from 'react';
import { number } from 'prop-types';
import moment from 'moment-timezone';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import {
  formatDateNumeric,
  formatDate,
  formatDateAndTime,
  isValidDateTime,
  formatUnixTimestamp,
  isTenHoursAgoOrLess,
} from './timestampUtilities';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const isSameDay = (originalDay, comparedDay) =>
  moment(originalDay).isSame(comparedDay, 'day');

const isToday = timestamp => isSameDay(Date.now(), timestamp);

const timestampsWouldBeSame = (lastPublished, firstPublished) =>
  !isToday(lastPublished) && isSameDay(lastPublished, firstPublished);

const formatType = timestamp =>
  isToday(timestamp) ? formatDateAndTime : formatDate;

const isSecondTimeStampRequired = (firstPublished, lastPublished) => {
  if (
    lastPublished === firstPublished ||
    timestampsWouldBeSame(lastPublished, firstPublished)
  ) {
    return false;
  }
  return true;
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
      <Timestamp
        datetime={formatUnixTimestamp(firstPublished, formatDateNumeric)}
      >
        {firstPublishedString}
      </Timestamp>
      {isSecondTimeStampRequired(firstPublished, lastPublished) ? (
        <Timestamp
          datetime={formatUnixTimestamp(lastPublished, formatDateNumeric)}
        >
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
