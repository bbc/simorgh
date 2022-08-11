import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { C_WHITE } from '#psammead/psammead-styles/src/colours';
import styled from '@emotion/styled';

export const MediaIndicatorWrapper = styled.div`
  display: inline-block;
  padding-right: ${GEL_SPACING};
`;

export const MediaIndicatorAlignment = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  > svg {
    @media screen and (-ms-high-contrast: active) {
      fill: ${C_WHITE};
    }
  }
`;
