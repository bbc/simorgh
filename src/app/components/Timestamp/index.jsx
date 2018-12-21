import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { GEL_BREVIER } from '@bbc/gel-foundations/typography';
import { C_RHINO } from '@bbc/psammead-styles/colours';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';

const StyledTimestamp = styled.div`
  ${GEL_BREVIER};
  color: ${C_RHINO};
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const Timestamp = ({ datetime, datetimeText }) => (
  <StyledTimestamp>
    <time dateTime={datetime}>{datetimeText}</time>
  </StyledTimestamp>
);

Timestamp.propTypes = {
  datetime: string.isRequired,
  datetimeText: string.isRequired,
};

export default Timestamp;
