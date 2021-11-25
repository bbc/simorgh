import styled from '@emotion/styled';

import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';

import Timestamp from '../../containers/StoryPromo/Timestamp';

const StyledTimestamp = styled(Timestamp)`
  ${({ service }) => service && getSansRegular(service)}
  color: white;

  font-size: 0.8125rem;
  padding: 0.625rem ${GEL_SPACING} 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 0.875rem;
    padding: 0.625rem ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
`;

export default StyledTimestamp;
