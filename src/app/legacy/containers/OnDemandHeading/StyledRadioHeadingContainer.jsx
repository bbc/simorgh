import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import OnDemandHeading from '.';

const StyledRadioHeadingContainer = styled(OnDemandHeading)`
  padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_DBL};
  display: inline-block;

  /* We need a media query here to explicitly overwrite the same media query within psammead-headings' Headline  */
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_DBL};
  }

  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING};
  }
`;

export default StyledRadioHeadingContainer;
