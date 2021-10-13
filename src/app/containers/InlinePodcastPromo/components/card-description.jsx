import styled from '@emotion/styled';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { C_METAL } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_HLF_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const CardDescription = styled.p`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  width: 235px;
  height: auto;
  line-height: 1.2;
  color: ${C_METAL};
  overflow-wrap: break-word;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 5rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    width: 5.56rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    width: 7.18rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    width: 9.06rem;
    margin: ${GEL_SPACING_HLF} 10px ${GEL_SPACING} 10px;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 14.68rem;
    margin: ${GEL_SPACING_HLF} 10px ${GEL_SPACING_HLF_TRPL} 10px;
  }
`;

export default CardDescription;
