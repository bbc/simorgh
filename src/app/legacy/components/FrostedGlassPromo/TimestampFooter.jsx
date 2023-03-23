import styled from '@emotion/styled';

import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_HLF_TRPL,
} from '#psammead/gel-foundations/src/spacings';

import PromoTimestamp from '#components/Promo/timestamp';

const StyledTimestamp = styled(PromoTimestamp)`
  ${({ service }) => service && getSansRegular(service)}
  color: ${props =>
    props.isAmp ? props.theme.palette.BLACK : props.theme.palette.GREY_3};

  font-size: 0.8125rem;
  padding: ${GEL_SPACING_HLF_TRPL} ${GEL_SPACING} 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 0.875rem;
    padding: ${GEL_SPACING_HLF_TRPL} ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
`;

export default StyledTimestamp;
