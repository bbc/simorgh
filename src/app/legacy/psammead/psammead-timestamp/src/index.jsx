import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { getBrevier } from '#psammead/gel-foundations/src/typography';

const PADDING = `
  padding-bottom: ${GEL_SPACING_HLF};
  &:last-child {
    padding-bottom: ${GEL_SPACING_DBL};
  }
`;

const StyledTimestamp = styled.time`
  ${({ script, typographyFunc }) =>
    script && typographyFunc && typographyFunc(script)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.GREY_6};
  display: block;
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular}
  ${props => props.padding && PADDING}
`;

const Timestamp = ({
  children,
  datetime,
  typographyFunc = getBrevier,
  script,
  padding = true,
  service,
  className = '',
}) => (
  <StyledTimestamp
    dateTime={datetime}
    typographyFunc={typographyFunc}
    script={script}
    padding={padding}
    service={service}
    suppressHydrationWarning
    {...(className ? { className } : undefined)}
  >
    {children}
  </StyledTimestamp>
);

export default Timestamp;
