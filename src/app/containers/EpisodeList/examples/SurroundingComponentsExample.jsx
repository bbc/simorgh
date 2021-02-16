/* eslint-disable react/prop-types */
import React from 'react';
import styled from '@emotion/styled';
import SectionLabel from '@bbc/psammead-section-label';
import { C_WHITE, C_MIDNIGHT_BLACK } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const Spacer = styled.aside`
  background: ${({ darkMode }) => (darkMode ? C_MIDNIGHT_BLACK : 'unset')};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;
const StyledSectionLabel = styled(SectionLabel)`
  margin-bottom: 0;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
  ${({ darkMode }) => darkMode && `color: ${C_WHITE}`}
`;

const SurroundingComponents = ({
  children,
  script,
  service,
  dir,
  darkMode,
}) => (
  <Spacer
    darkMode={darkMode}
    /* eslint-disable-next-line jsx-a11y/aria-role */
    role="complimentary"
    aria-labelledby="recent-episodes"
  >
    <StyledSectionLabel
      script={script}
      service={service}
      dir={dir}
      darkMode={darkMode}
      labelId="recent-episodes"
      {...(darkMode ? { backgroundColor: C_MIDNIGHT_BLACK } : {})}
    >
      Recent Episodes
    </StyledSectionLabel>
    {children}
  </Spacer>
);

export default SurroundingComponents;
