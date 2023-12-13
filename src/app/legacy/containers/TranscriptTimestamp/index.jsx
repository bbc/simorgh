import React from 'react';
import { string } from 'prop-types';
import styled from '@emotion/styled';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';

const StyledTime = styled('time')`
  padding-inline-end: ${GEL_SPACING_DBL};
`;

const TranscriptTimestamp = ({ text }) => {
  return <StyledTime>{text}</StyledTime>;
};

TranscriptTimestamp.propTypes = {
  text: string.isRequired,
};

export default TranscriptTimestamp;
