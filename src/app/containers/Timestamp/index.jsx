import React, { useContext } from 'react';
import { number } from 'prop-types';
import moment from 'moment-timezone';
import Timestamp from '@bbc/psammead-timestamp';
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
import { ServiceContext } from '../../contexts/ServiceContext';

const isSameDay = (dayToCompare, timestamp) => {
  const day = moment(dayToCompare);
  return day.isSame(timestamp, 'day');
};

const isToday = timestamp => isSameDay(Date.now(), timestamp);

const formatType = timestamps => {
  if (isToday(timestamps[0])) {
    if (timestamps.length > 1 && !isSameDay(timestamps[1], timestamps[0])) {
      return formatDate;
    }
    return formatDateAndTime;
  }
  return formatDate;
};

const humanReadable = ({
  timestamp,
  comparisonTimestamps,
  shouldMakeRelative,
}) =>
  shouldMakeRelative
    ? relativeTime(timestamp)
    : formatUnixTimestamp(timestamp, formatType(comparisonTimestamps));

const TimestampContainer = ({ lastPublished, firstPublished }) => {
  const { script, timezone } = useContext(ServiceContext);

  moment.tz.add(timezone);
  moment.tz.setDefault(timezone.split('|')[0]);

  if (
    !isValidDateTime(new Date(lastPublished)) ||
    !isValidDateTime(new Date(firstPublished))
  ) {
    return null;
  }

  const firstPublishedString = humanReadable({
    timestamp: firstPublished,
    comparisonTimestamps: [firstPublished],
    shouldMakeRelative:
      lastPublished === firstPublished && isTenHoursAgoOrLess(firstPublished),
  });

  const lastPublishedString = `Updated ${humanReadable({
    timestamp: lastPublished,
    comparisonTimestamps: [lastPublished, firstPublished],
    shouldMakeRelative: isTenHoursAgoOrLess(lastPublished),
  })}`;

  return (
    <GridItemConstrainedMedium>
      <Timestamp
        datetime={formatUnixTimestamp(firstPublished, formatDateNumeric)}
        script={script}
      >
        {firstPublishedString}
      </Timestamp>
      {lastPublished !== firstPublished ? (
        <Timestamp
          datetime={formatUnixTimestamp(lastPublished, formatDateNumeric)}
          script={script}
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
