import React from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';
import {
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_BREVIER,
  GEL_FF_REITH_SANS,
} from '@bbc/gel-foundations/typography';
import { C_CLOUD_DARK } from '@bbc/psammead-styles/colours';

const StyledTimestamp = styled.time`
  ${GEL_BREVIER};
  color: ${C_CLOUD_DARK};
  display: block;
  font-family: ${GEL_FF_REITH_SANS};
  padding-bottom: ${GEL_SPACING_HLF};
  &:last-child {
    padding-bottom: ${GEL_SPACING_DBL};
  }
`;

const Timestamp = ({ children, datetime }) => (
  <StyledTimestamp dateTime={datetime}>{children}</StyledTimestamp>
);

Timestamp.propTypes = {
  children: node.isRequired,
  datetime: string.isRequired,
};

export default Timestamp;
