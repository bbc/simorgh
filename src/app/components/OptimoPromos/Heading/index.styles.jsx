import { GEL_SPACING } from '#app/legacy/gel-foundations/src/spacings';
import { C_GREY_10 } from '#app/legacy/psammead-styles/src/colours';
import { getSerifMedium } from '#app/legacy/psammead-styles/src/font-styles';
import styled from '@emotion/styled';

export default styled.h3`
  color: ${C_GREY_10};
  margin: 0; /* Reset */
  padding-bottom: ${({ as }) => (as === 'div' ? '0' : GEL_SPACING)};
  ${({ service }) => getSerifMedium(service)}
`;
