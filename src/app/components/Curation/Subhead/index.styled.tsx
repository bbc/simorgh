import styled from '@emotion/styled';

import { getDoublePica } from '../../../legacy/psammead/gel-foundations/src/typography';

import { getSansBold } from '../../../legacy/psammead/psammead-styles/src/font-styles';

import { Services } from '../../../models/types/global';

type Props = {
  service: Services;
  script: object;
};

export default styled.h2<Props>`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getDoublePica(script)}
  color: ${props => props.theme.palette.GREY_10};
  a {
    color: ${props => props.theme.palette.GREY_10};
    text-decoration: none;
    display: inline-block;
  }

  span {
    display: inline-block;
    position: relative;
  }
  a:visited {
    color: ${props => props.theme.palette.GREY_10};
  }
  a:hover,
  a:focus {
    color: ${props => props.theme.palette.POSTBOX};
    span {
      text-decoration: underline;
    }
  }
  svg {
    margin-inline-start: 0.5rem;
    fill: currentColor;
    width: ${14 / 16}rem;
    height: ${14 / 16}rem;
    position: relative;
  }
`;
