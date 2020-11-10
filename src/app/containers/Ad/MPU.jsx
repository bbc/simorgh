import React from 'react';
import { GEL_GROUP_1_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import styled from 'styled-components';
import { NEGATIVE_MARGIN } from '#lib/styles.const';
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
