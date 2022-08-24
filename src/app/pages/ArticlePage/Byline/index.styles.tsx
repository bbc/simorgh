import styled from '@emotion/styled';
import {
  getBodyCopy,
  getBrevier,
} from '../../../legacy/psammead/gel-foundations/src/typography';
import {
  C_GREY_6,
  C_GREY_10,
  C_GREY_5,
  C_POSTBOX,
} from '../../../legacy/psammead/psammead-styles/src/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_HLF,
} from '../../../legacy/psammead/gel-foundations/src/spacings';
import { getSansBold } from '../../../legacy/psammead/psammead-styles/src/font-styles';
import { RightChevron } from '../../../components/icons';

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

export const AuthorChavron = styled(RightChevron)`
  vertical-align: middle;
  margin: 0 ${GEL_SPACING_HLF};
  color: ${C_GREY_10};
  fill: currentColor;
`;

export const TwitterChavron = styled(RightChevron)`
  vertical-align: middle;
  margin: 0 ${GEL_SPACING_HLF};
  color: ${C_POSTBOX};
  fill: currentColor;
  width: ${GEL_SPACING};
  height: ${GEL_SPACING};
`;

export const TwitterLink = styled(JobRole)`
  position: static;
  color: ${C_POSTBOX};
  display: inline-block;
  vertical-align: middle;

  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:before {
    bottom: 0;
    content: '';
    left: 0;
    overflow: hidden;
    right: 0;
    top: 0;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding-bottom: 2rem;
  }
`;

export const ParentSpan = styled.span`
  position: relative;
`;
