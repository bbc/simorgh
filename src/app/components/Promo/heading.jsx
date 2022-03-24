import styled from '@emotion/styled';

import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { C_EBON } from '@bbc/psammead-styles/colours';

import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

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
