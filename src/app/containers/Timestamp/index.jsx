import React, { Fragment } from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';

// if the date is invalid return null - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const formatDateTime = milliseconds => {
  const dateObj = new Date(milliseconds);
  const fullYear = dateObj.getFullYear();
  const monthTwoDigit = dateObj.toLocaleDateString('en-GB', {
    month: '2-digit',
  });
  const dayTwoDigit = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
  });

  return `${fullYear}-${monthTwoDigit}-${dayTwoDigit}`;
};

const formatTimestamp = milliseconds => {
  const dateObj = new Date(milliseconds);
  const fullYear = dateObj.getFullYear();
  const monthLong = dateObj.toLocaleDateString('en-GB', {
    month: 'long',
  });
  const dayNumeric = dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
  });

  return `${dayNumeric} ${monthLong} ${fullYear}`;
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

  if (isTenHoursAgo(updated)) {
    return timestampWithPrefixUpdated(
      formatDateTime(updated),
      formatTimestamp(updated),
    );
  }

  return timestampWithPrefixUpdated(
    formatDateTime(updated),
    relativeTime(updated),
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
      <Timestamp datetime={formatDateTime(new Date(published))}>
        {formatTimestamp(new Date(published))}
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
