import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';

const PADDING = `
  padding-bottom: ${GEL_SPACING_HLF};
  &:last-child {
    padding-bottom: ${GEL_SPACING_DBL};
  }
`;

const StyledTimestamp = styled.time`
  ${({ theme: { fontSizes } }) => fontSizes.brevier}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.GREY_6};
  display: block;
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular}
  ${props => props.padding && PADDING}
`;

const Timestamp = ({ children, datetime, padding = true, className = '' }) => (
  <StyledTimestamp
    dateTime={datetime}
    padding={padding}
    suppressHydrationWarning
    {...(className ? { className } : undefined)}
  >
    {children}
  </StyledTimestamp>
);

export default Timestamp;
