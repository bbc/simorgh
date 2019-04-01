import React from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

// if the date is invalid return null - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const leadingZero = val => (val < 10 ? `0${val}` : val);

const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]; // eslint-disable-line

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

const formatUnixTimestamp = (milliseconds, formatType) => {
  const dateObj = new Date(milliseconds);
  const day = formatType.day(dateObj);
  const month = formatType.month(dateObj);
  const year = formatType.year(dateObj);

  return formatType.format(day, month, year);
};

const isTenHoursAgoOrLess = milliseconds => {
  const now = Date.now();
  return now - milliseconds >= 10 * 60 * 60 * 1000;
};

const timestampWithPrefixUpdated = (datetime, updateTime) => (
  <Timestamp datetime={datetime} prefix="Updated ">
    {updateTime}
  </Timestamp>
);

const defaultTimestamp = firstPublished => (
  <Timestamp
    datetime={formatUnixTimestamp(new Date(firstPublished), longNumeric)}
  >
    {formatUnixTimestamp(new Date(firstPublished), shortAlphaNumeric)}
  </Timestamp>
);

const hasBeenlastPublished = (lastPublished, firstPublished) =>
  lastPublished !== firstPublished;

const updatedTimestamp = (lastPublished, firstPublished) => {
  if (!hasBeenlastPublished(lastPublished, firstPublished)) {
    return null;
  }

  // return absolute or relative secondary timestamp depending on <= 10 hours
  return timestampWithPrefixUpdated(
    formatUnixTimestamp(lastPublished, longNumeric),
    isTenHoursAgoOrLess(lastPublished)
      ? formatUnixTimestamp(lastPublished, shortAlphaNumeric)
      : relativeTime(lastPublished),
  );
};

const TimestampContainer = ({ lastPublished, firstPublished }) => {
  if (
    !isValidDateTime(new Date(lastPublished)) ||
    !isValidDateTime(new Date(firstPublished))
  ) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      {defaultTimestamp(firstPublished)}
      {updatedTimestamp(lastPublished, firstPublished)}
    </GridItemConstrainedMedium>
  );
};

TimestampContainer.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default TimestampContainer;
