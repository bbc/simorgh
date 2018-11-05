import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import { T_BREVIER } from '../../lib/constants/typography';
import {
  C_RHINO,
  GEL_SPACING_DBL,
  FF_NEWS_SANS_REG,
} from '../../lib/constants/styles';
import localiseTimestamp from '../LocalisedTimestamp';

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

const StyledTimestamp = styled.div`
  ${T_BREVIER};
  color: ${C_RHINO};
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const Timestamp = ({ timestamp }) => {
  const dateObj = new Date(timestamp);

  if (!isValidDateTime(dateObj)) {
    return null;
  }

  const localised = localiseTimestamp(timestamp, 'en');
  const localisedRelative = localiseTimestamp(timestamp, 'en', 1514826000000);
  const localisedFa = localiseTimestamp(timestamp, 'fa');
  const localisedFaRelative = localiseTimestamp(timestamp, 'en', 1514826000000);

  return (
    <StyledTimestamp>
      <time dateTime={formatDateTime(dateObj)}>{formatTimestamp(dateObj)}</time>
      <br />
      {localised}
      <br />
      {localisedRelative}
      <br />
      <span dir="rtl">{localisedFa}</span>
      <br />
      <span dir="rtl">{localisedFaRelative}</span>
    </StyledTimestamp>
  );
};

Timestamp.propTypes = {
  timestamp: number.isRequired,
};

export default Timestamp;
