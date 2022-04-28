import styled from '@emotion/styled';
import { oneOf } from 'prop-types';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

const SKIP_LINK_COLOR = '#333';
const SKIP_LINK_BORDER = '0.1875rem'; // 3px
const TOP_BOTTOM_SPACING = '0.75rem'; // 12px

const SkipLink = styled.a`
  position: absolute;
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  width: 1px;
  overflow: hidden;
  padding: ${TOP_BOTTOM_SPACING} ${GEL_SPACING};
  background-color: ${C_WHITE};
  border: ${SKIP_LINK_BORDER} solid #000;
  color: ${SKIP_LINK_COLOR};
  text-decoration: none;
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSansRegular(service)};

  &:focus {
    clip-path: none;
    clip: auto;
    height: auto;
    width: auto;
    top: 0;
    ${({ dir }) => `
      ${dir === 'ltr' ? 'left' : 'right'}: 0;
    `}

    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      top: ${GEL_SPACING};
    }
  }

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING};
  }
`;

SkipLink.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
};

SkipLink.defaultProps = { dir: 'ltr' };

export default SkipLink;
