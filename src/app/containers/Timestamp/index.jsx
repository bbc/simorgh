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

const isTenHoursAgo = milliseconds => {
  const now = Date.now();
  return now - milliseconds >= 10 * 60 * 60 * 1000;
};

const updatedTimestamp = (dateObj, milliseconds) => (
  <Timestamp datetime={formatDateTime(dateObj)} prefix="Updated">
    {milliseconds}
  </Timestamp>
);

const hasBeenUpdated = (updated, published) => updated !== published;

const createSecondTimestamp = (updated, dateObj) =>
  isTenHoursAgo(updated)
    ? updatedTimestamp(dateObj.updated, formatTimestamp(dateObj.updated))
    : updatedTimestamp(dateObj.updated, relativeTime(updated));

const TimestampContainer = ({ updated, published }) => {
  const dateObj = {
    updated: new Date(updated),
    published: new Date(published),
  };

  if (
    !isValidDateTime(dateObj.updated) ||
    !isValidDateTime(dateObj.published)
  ) {
    return null;
  }

  const publishDate = dateObj.published;
  let secondTimestampComponent;

  if (hasBeenUpdated(updated, published)) {
    secondTimestampComponent = createSecondTimestamp(updated, dateObj);
  } else {
    secondTimestampComponent = null;
  }

  return (
    <Fragment>
      <Timestamp datetime={formatDateTime(publishDate)}>
        {formatTimestamp(publishDate)}
      </Timestamp>
      {secondTimestampComponent}
    </Fragment>
  );
};

TimestampContainer.propTypes = {
  updated: number.isRequired,
  published: number.isRequired,
};

export default TimestampContainer;
