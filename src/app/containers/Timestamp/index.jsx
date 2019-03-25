import React, { Fragment } from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';

// if the date is invalid return null - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const leadingZero = val => (val < 10 ? `0${val}` : val);

const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]; // eslint-disable-line

// 2019-03-22
const longNumeric = {
  month: date => leadingZero(date.getMonth() + 1),
  day: date => leadingZero(date.getDate()),
  year: date => date.getFullYear(),
  reverse: true,
  separator: '-',
};

// 22 March 2019
const shortAlphaNumeric = {
  month: date => months[date.getMonth()],
  day: date => date.getDate(),
  year: date => date.getFullYear(),
  reverse: false,
  separator: ' ',
};

const formatUnixTimestamp = (milliseconds, formatType) => {
  const dateObj = new Date(milliseconds);
  const year = formatType.year(dateObj);
  const month = formatType.month(dateObj);
  const day = formatType.day(dateObj);

  const orderedDate = formatType.reverse
    ? [year, month, day]
    : [day, month, year];

  return orderedDate.join(formatType.separator);
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

const defaultTimestamp = published => (
  <Timestamp datetime={formatUnixTimestamp(new Date(published), longNumeric)}>
    {formatUnixTimestamp(new Date(published), shortAlphaNumeric)}
  </Timestamp>
);

const hasBeenUpdated = (updated, published) => updated !== published;

const updatedTimestamp = (updated, published) => {
  if (!hasBeenUpdated(updated, published)) {
    return null;
  }

  // return absolute or relative secondary timestamp depending on <= 10 hours
  return timestampWithPrefixUpdated(
    formatUnixTimestamp(updated, longNumeric),
    isTenHoursAgoOrLess(updated)
      ? formatUnixTimestamp(updated, shortAlphaNumeric)
      : relativeTime(updated),
  );
};

const TimestampContainer = ({ updated, published }) => {
  if (
    !isValidDateTime(new Date(updated)) ||
    !isValidDateTime(new Date(published))
  ) {
    return null;
  }

  return (
    <Fragment>
      {defaultTimestamp(published)}
      {updatedTimestamp(updated, published)}
    </Fragment>
  );
};

TimestampContainer.propTypes = {
  updated: number.isRequired,
  published: number.isRequired,
};

export default TimestampContainer;
