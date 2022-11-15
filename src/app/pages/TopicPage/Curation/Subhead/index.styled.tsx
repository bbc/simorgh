import styled from '@emotion/styled';

import { getDoublePica } from '../../../../legacy/psammead/gel-foundations/src/typography';

import { getSansBold } from '../../../../legacy/psammead/psammead-styles/src/font-styles';
import {
  C_POSTBOX,
  C_GREY_10,
} from '../../../../legacy/psammead/psammead-styles/src/colours';

import { Services } from '../../../../models/types/global';

type Props = {
  service: Services;
  script: object;
};

export default styled.h2<Props>`
  ${({ service }) => getSansBold(service)}
  ${({ script }) => getDoublePica(script)}
  color: ${C_GREY_10};
  a {
    color: ${C_GREY_10};
    text-decoration: none;
    display: inline-block;
  }

  span {
    display: inline-block;
    position: relative;
  }
  a:visited {
    color: ${C_GREY_10};
  }
  a:hover,
  a:focus {
    color: ${C_POSTBOX};
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
