import styled from '@emotion/styled';
import {
  getBodyCopy,
  getBrevier,
} from '../../../legacy/psammead/gel-foundations/src/typography';
import {
  C_GREY_6,
  C_GREY_10,
  C_GREY_5,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import { GEL_SPACING_DBL } from '../../../legacy/psammead/gel-foundations/src/spacings';
import { getSansBold } from '../../../legacy/psammead/psammead-styles/src/font-styles';

interface Props {
  service: string;
  script: any;
}

export const Author = styled.span<Props>`
  color: ${C_GREY_10};
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getBodyCopy(script)};
  display: inline-block;
  vertical-align: middle;
`;

export const JobRole = styled.span<Props>`
  color: ${C_GREY_6};
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getBrevier(script)}
`;

export const LineBreak = styled.hr`
  border-color: ${C_GREY_5};
  width: ${40 / 16}rem;
  margin: ${GEL_SPACING_DBL} 0;
`;

export const BylineList = styled.ul`
  list-style: none;
  padding: 0;
`;
