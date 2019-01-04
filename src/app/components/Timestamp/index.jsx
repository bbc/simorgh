import React from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { GEL_BREVIER } from '@bbc/gel-foundations/typography';
import { C_RHINO } from '@bbc/psammead-styles/colours';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';

const StyledTimestamp = styled.time`
  ${GEL_BREVIER};
  color: ${C_RHINO};
  display: block;
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const Timestamp = ({ children, datetime }) => (
  <StyledTimestamp dateTime={datetime}>{children}</StyledTimestamp>
);

Timestamp.propTypes = {
  children: node.isRequired,
  datetime: string.isRequired,
};

export default Timestamp;
