import styled from '@emotion/styled';

import { getDoublePica } from '../../../../legacy/psammead/gel-foundations/src/typography';

import { getSansBold } from '../../../../legacy/psammead/psammead-styles/src/font-styles';
import {
  C_POSTBOX,
  C_GREY_10,
} from '../../../../legacy/psammead/psammead-styles/src/colours';

export default styled.a<{ service: string; script: string }>`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getDoublePica(script)}
  color: ${C_GREY_10};
  text-decoration: none;
  display: inline-block;

  span {
    display: inline-block;
    position: relative;
  }
  &:hover,
  &:focus {
    color: ${C_POSTBOX};
    span::after {
      bottom: ${3 / 16}rem;
      content: '';
      background: ${C_POSTBOX};
      width: 100%;
      height: ${2 / 16}rem;
      position: absolute;
      left: 0;
    }
  }
  svg {
    margin-inline-start: 0.5rem;
    fill: currentColor;
    height: ${7 / 8}rem;
    position: relative;
  }
`;
