import React from 'react';
import styled from '@emotion/styled';
import { NEGATIVE_MARGIN } from '#lib/styles.const';
import { GEL_GROUP_1_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import BaseAdContainer from '.';

const AdContainer = styled(BaseAdContainer)`
  ${NEGATIVE_MARGIN}
  /* MPU gets misaligned with the original padding at smaller breakpoints */
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: 0;
  }
`;

export default props => {
  return <AdContainer slotType="mpu" {...props} />;
};
