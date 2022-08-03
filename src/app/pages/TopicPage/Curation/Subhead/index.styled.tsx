import styled from '@emotion/styled';

import { getDoublePica } from '../../../../legacy/psammead/gel-foundations/src/typography';

import { getSansBold } from '../../../../legacy/psammead/psammead-styles/src/font-styles';
import { C_GREY_10 } from '../../../../legacy/psammead/psammead-styles/src/colours';

export const H2 = styled.h2<{ service: string; script: string }>`
  ${({ service }) => getSansBold(service)}
  color: ${C_GREY_10};
  ${({ script }) => getDoublePica(script)}
`;

export const Link = styled.a``;
