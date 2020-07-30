import styled from 'styled-components';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import OnDemandHeading from '.';

const StyledRadioHeadingContainer = styled(OnDemandHeading)`
  padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_DBL};
`;

export default StyledRadioHeadingContainer;
