import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { MEDIA_QUERY_TYPOGRAPHY } from '@bbc/gel-foundations/breakpoints';
import OnDemandHeading from '.';

const StyledRadioHeadingContainer = styled(OnDemandHeading)`
  padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_DBL};

  /* We need a media query here to explicitly overwrite the Headline media query within Psammead  */
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_DBL};
  }
`;

export default StyledRadioHeadingContainer;
