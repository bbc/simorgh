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

const StyledTimestamp = styled.span`
  ${GEL_BREVIER};
  color: ${C_CLOUD_DARK};
  display: block;
  font-family: ${GEL_FF_REITH_SANS};
  &:nth-child(1) {
    padding-bottom: ${GEL_SPACING_HLF};
  }
  &:last-child {
    padding-bottom: ${GEL_SPACING_DBL};
  }
`;

const Timestamp = ({ children, datetime, prefix, suffix }) => {
  if (prefix || suffix) {
    return (
      <StyledTimestamp>
        {prefix}
        <time dateTime={datetime}>{children}</time>
        {suffix}
      </StyledTimestamp>
    );
  }

  return (
    <StyledTimestamp as="time" dateTime={datetime}>
      {children}
    </StyledTimestamp>
  );
};

Timestamp.propTypes = {
  children: node.isRequired,
  datetime: string.isRequired,
  prefix: node,
  suffix: node,
};

Timestamp.defaultProps = {
  prefix: null,
  suffix: null,
};

export default Timestamp;
