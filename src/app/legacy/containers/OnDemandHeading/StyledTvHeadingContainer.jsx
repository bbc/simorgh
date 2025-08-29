import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import OnDemandHeading from '.';

const StyledTvHeadingContainer = styled(OnDemandHeading)`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    ${({ isLite }) => (isLite ? `padding: ${GEL_SPACING} 0 !important` : '')}
  }
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    ${({ isLite }) => (isLite ? 'padding: 0' : `padding: ${GEL_SPACING} 0;`)}
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ${({ isLite }) =>
      isLite ? 'padding: 0' : `padding: ${GEL_SPACING_DBL} 0;`}
  }
`;

export default StyledTvHeadingContainer;
