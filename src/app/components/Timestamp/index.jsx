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
  const dateTime = new Date(timestamp * 1000);

  return dateTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const StyledTimestamp = styled.span`
  ${T_BREVIER};
  color: ${C_RHINO};
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const Timestamp = ({ timestamp }) => {
  if (!timestamp) {
    return null;
  }

  const formattedTimestamp = formatTimestamp(timestamp);

  return (
    <StyledTimestamp>
      <time dateTime={timestamp}>{formattedTimestamp}</time>
    </StyledTimestamp>
  );
};

Timestamp.propTypes = {
  timestamp: number.isRequired,
};

export default Timestamp;
