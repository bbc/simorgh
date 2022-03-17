import styled from '@emotion/styled';

import { getSerifMedium } from '#legacy/psammead-styles/font-styles';
import { GEL_SPACING } from '#legacy/gel-foundations/spacings';
import { getBodyCopy } from '#legacy/gel-foundations/typography';
import { C_EBON } from '#legacy/psammead-styles/colours';

import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/breakpoints';

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
