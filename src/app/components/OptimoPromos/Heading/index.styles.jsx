import { GEL_SPACING } from '#app/legacy/gel-foundations/src/spacings';
import { C_GREY_10 } from '#app/legacy/psammead-styles/src/colours';
import { getSerifMedium } from '#app/legacy/psammead-styles/src/font-styles';
import styled from '@emotion/styled';

export const TitleNoPadding = styled.div`
  color: ${C_GREY_10};
  margin: 0; /* Reset */
  ${({ service }) => getSerifMedium(service)}
`;

export const TitleWithPadding = styled(TitleNoPadding)`
  padding-bottom: ${GEL_SPACING};
`;
