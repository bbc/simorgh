import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import { T_BREVIER } from '../../lib/constants/typography';
import {
  C_RHINO,
  GEL_SPACING_DBL,
  FF_NEWS_SANS_REG,
} from '../../lib/constants/styles';

const formatTimestamp = timestamp => {
  const dateObj = new Date(timestamp * 1000);

  // if the date is invalid return null - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
  if (
    isNaN(dateObj) // eslint-disable-line no-restricted-globals
  ) {
    return {};
  }

  const fullYear = dateObj.getFullYear();
  const monthLong = dateObj.toLocaleDateString('en-GB', {
    month: 'long',
  });
  const monthTwoDigit = dateObj.toLocaleDateString('en-GB', {
    month: '2-digit',
  });
  const dayNumeric = dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
  });
  const dayTwoDigit = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
  });

  const dateTime = `${fullYear}-${monthTwoDigit}-${dayTwoDigit}`;
  const formattedTimestamp = `${dayNumeric} ${monthLong} ${fullYear}`;

  return {
    dateTime,
    formattedTimestamp,
  };
};

const StyledTimestamp = styled.span`
  ${T_BREVIER};
  color: ${C_RHINO};
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const Timestamp = ({ timestamp }) => {
  const { formattedTimestamp, dateTime } = formatTimestamp(timestamp);

  if (!formattedTimestamp || !formattedTimestamp) {
    return null;
  }

  return (
    <StyledTimestamp>
      <time dateTime={dateTime}>{formattedTimestamp}</time>
    </StyledTimestamp>
  );
};

Timestamp.propTypes = {
  timestamp: number.isRequired,
};

export default Timestamp;
