import React, { Fragment } from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';

// if the date is invalid return null - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const formatDateTime = dateObj => {
  const fullYear = dateObj.getFullYear();
  const monthTwoDigit = dateObj.toLocaleDateString('en-GB', {
    month: '2-digit',
  });
  const dayTwoDigit = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
  });

  return `${fullYear}-${monthTwoDigit}-${dayTwoDigit}`;
};

const formatTimestamp = dateObj => {
  const fullYear = dateObj.getFullYear();
  const monthLong = dateObj.toLocaleDateString('en-GB', {
    month: 'long',
  });
  const dayNumeric = dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
  });

  return `${dayNumeric} ${monthLong} ${fullYear}`;
};

const tenHoursAgo = timestamp => {
  const now = Date.now();
  return now - timestamp >= 10 * 60 * 60 * 1000;
};

const updatedTimestamp = (dateObj, timestamp) => (
  <Timestamp datetime={formatDateTime(dateObj)} prefix="Updated">
    {timestamp}
  </Timestamp>
);

const TimestampContainer = ({ updated, published }) => {
  const updatedDateObject = new Date(updated);
  const publishedDateObject = new Date(published);

  if (
    !isValidDateTime(updatedDateObject) ||
    !isValidDateTime(publishedDateObject)
  ) {
    return null;
  }

  const firstTimestamp =
    updated === published ? updatedDateObject : publishedDateObject;

  let secondTimestamp;
  if (updated !== published) {
    secondTimestamp = tenHoursAgo(updated)
      ? updatedTimestamp(updatedDateObject, formatTimestamp(updatedDateObject))
      : updatedTimestamp(updatedDateObject, relativeTime(updated));
  }

  return (
    <Fragment>
      <Timestamp datetime={formatDateTime(firstTimestamp)}>
        {formatTimestamp(firstTimestamp)}
      </Timestamp>
      {secondTimestamp || null}
    </Fragment>
  );
};

TimestampContainer.propTypes = {
  updated: number.isRequired,
  published: number.isRequired,
};

export default TimestampContainer;
