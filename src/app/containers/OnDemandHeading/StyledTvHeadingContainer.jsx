import styled from 'styled-components';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import OnDemandHeading from '.';

const StyledTvHeadingContainer = styled(OnDemandHeading)`
  padding: ${GEL_SPACING} 0;

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} 0;
  }
`;

export default StyledTvHeadingContainer;
