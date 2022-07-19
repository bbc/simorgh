import styled from '@emotion/styled';

import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { C_EBON } from '#psammead/psammead-styles/src/colours';

import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';

const Heading = styled.h2`
  ${({ service }) => getSerifMedium(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${C_EBON};
  margin-top: 0;
  margin-bottom: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    font-size: 1.125rem;
    line-height: 1.22;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    font-size: 1rem;
    line-height: 1.25;
  }
`;

export default Heading;
