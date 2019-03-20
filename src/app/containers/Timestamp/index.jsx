import React, { Fragment } from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';

// if the date is invalid return null - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const longNumeric = {
  locale: 'en-GB',
  month: '2-digit',
  day: '2-digit',
  reverse: true,
  separator: '-',
};

const shortAlphaNumeric = {
  locale: 'en-GB',
  month: 'long',
  day: 'numeric',
  reverse: false,
  separator: ' ',
};

const formatUnixTimestamp = (milliseconds, formatType) => {
  const dateObj = new Date(milliseconds);
  const fullYear = dateObj.getFullYear();
  const month = dateObj.toLocaleDateString('en-GB', {
    month: formatType.month,
  });
  const day = dateObj.toLocaleDateString('en-GB', {
    day: formatType.day,
  });

  const orderedDate = formatType.reverse
    ? [day, month, fullYear].reverse()
    : [day, month, fullYear];

  return orderedDate.join(formatType.separator);
};

const isTenHoursAgo = milliseconds => {
  const now = Date.now();
  return now - milliseconds >= 10 * 60 * 60 * 1000;
};

const timestampWithPrefixUpdated = (datetime, updateTime) => (
  <Timestamp datetime={datetime} prefix="Updated">
    {updateTime}
  </Timestamp>
);

const hasBeenUpdated = (updated, published) => updated !== published;

const updatedTimestamp = (updated, published) => {
  if (!hasBeenUpdated(updated, published)) {
    return null;
  }

  return timestampWithPrefixUpdated(
    formatUnixTimestamp(updated, longNumeric),
    isTenHoursAgo(updated)
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
      <Timestamp
        datetime={formatUnixTimestamp(new Date(published), longNumeric)}
      >
        {formatUnixTimestamp(new Date(published), shortAlphaNumeric)}
      </Timestamp>
      {updatedTimestamp(updated, published)}
    </Fragment>
  );
};

TimestampContainer.propTypes = {
  updated: number.isRequired,
  published: number.isRequired,
};

export default TimestampContainer;
