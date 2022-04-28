import styled from '@emotion/styled';
import { shape, string, bool } from 'prop-types';
import { C_SHADOW, C_LUNAR } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { getCanon, getTrafalgar } from '@bbc/gel-foundations/typography';
import { MEDIA_QUERY_TYPOGRAPHY } from '@bbc/gel-foundations/breakpoints';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { getSansBold, getSerifMedium } from '@bbc/psammead-styles/font-styles';

export const Headline = styled.h1`
  ${({ script }) => script && getCanon(script)};
  ${({ service }) => getSerifMedium(service)}
  color: ${({ darkMode }) => (darkMode ? C_LUNAR : C_SHADOW)};
  display: block; /* Explicitly set */
  margin: 0; /* Reset */
  padding: ${GEL_SPACING_QUAD} 0;
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding: ${GEL_SPACING_QUIN} 0;
  }
`;

Headline.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool,
};

Headline.defaultProps = {
  darkMode: false,
};

export const SubHeading = styled.h2`
  ${({ script }) => script && getTrafalgar(script)};
  ${({ service }) => getSansBold(service)}
  color: ${({ darkMode }) => (darkMode ? C_LUNAR : C_SHADOW)};
  margin: 0; /* Reset */
  padding: ${GEL_SPACING_TRPL} 0;
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-top: ${GEL_SPACING_QUAD};
  }
`;

SubHeading.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool,
};

SubHeading.defaultProps = {
  darkMode: false,
  tabIndex: '-1',
};
