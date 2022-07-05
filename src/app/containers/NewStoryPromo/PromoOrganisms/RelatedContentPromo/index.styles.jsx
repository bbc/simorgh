import styled from '@emotion/styled';

import { StoryPromoUlBase } from '#containers/NewStoryPromoList';
import { GEL_SPACING } from '#app/legacy/gel-foundations/src/spacings';

export default styled(StoryPromoUlBase)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${GEL_SPACING};
  min-height: 0;
`;
