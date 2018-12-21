import React from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';

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

const TimestampContainer = ({ timestamp }) => {
  const dateObj = new Date(timestamp);

  if (!isValidDateTime(dateObj)) {
    return null;
  }

  return (
    <Timestamp
      datetime={formatDateTime(dateObj)}
      datetimeText={formatTimestamp(dateObj)}
    />
  );
};

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
};

export default TimestampContainer;
