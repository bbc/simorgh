import React from 'react';
import { number } from 'prop-types';
import Timestamp from '../../components/Timestamp';

const formatTimestamp = timestamp => {
  const dateTime = new Date(timestamp * 1000);
  const day = dateTime.toLocaleString('en-GB', {
    day: 'numeric',
  });
  const month = dateTime.toLocaleString('en-GB', {
    month: 'long',
  });
  const year = dateTime.toLocaleString('en-GB', {
    year: 'numeric',
  });

  return `${day} ${month} ${year}`;
};

const TimestampContainer = ({ timestamp }) => {
  const formattedTimestamp = formatTimestamp(timestamp);

  if (timestamp) {
    return (
      <Timestamp>
        <time dateTime={timestamp}>{formattedTimestamp}</time>
      </Timestamp>
    );
  }

  return null;
};

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
};

export default TimestampContainer;
