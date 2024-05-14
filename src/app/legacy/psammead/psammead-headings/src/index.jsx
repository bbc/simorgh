import styled from '@emotion/styled';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import {
  getCanon,
  getTrafalgar,
} from '#psammead/gel-foundations/src/typography';
import { MEDIA_QUERY_TYPOGRAPHY } from '#psammead/gel-foundations/src/breakpoints';
import {
  getSansBold,
  getSerifMedium,
} from '#psammead/psammead-styles/src/font-styles';

export const Headline = styled.h1`
  ${({ script }) => script && getCanon(script)};
  ${({ service }) => getSerifMedium(service)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.GREY_10};
  display: block; /* Explicitly set */
  margin: 0; /* Reset */
  padding: ${GEL_SPACING_QUAD} 0;
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding: ${GEL_SPACING_QUIN} 0;
  }
`;

export const SubHeading = styled.h2`
  ${({ script }) => script && getTrafalgar(script)};
  ${({ service }) => getSansBold(service)}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.GREY_10};
  margin: 0; /* Reset */
  padding: ${GEL_SPACING_TRPL} 0;
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding-top: ${GEL_SPACING_QUAD};
  }
`;

SubHeading.defaultProps = {
  tabIndex: '-1',
};
