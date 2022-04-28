import styled from '@emotion/styled';
import { oneOf, shape, string } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_TRPL,
  GEL_MARGIN_ABOVE_400PX,
  GEL_MARGIN_BELOW_400PX,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { C_METAL, C_GREY_6 } from '@bbc/psammead-styles/colours';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

const rtlStyles = `
  margin-right: ${GEL_MARGIN_BELOW_400PX};
  border-right: 1px solid ${C_METAL};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    width: calc(100% - ${GEL_MARGIN_ABOVE_400PX});
    margin-right: ${GEL_MARGIN_ABOVE_400PX};
    padding-right: ${GEL_SPACING};
    padding-left: ${GEL_MARGIN_ABOVE_400PX};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-right: ${GEL_SPACING};
    padding-left: 0;
  }
`;

const ltrStyles = `
  margin-left: ${GEL_MARGIN_BELOW_400PX};
  border-left: 1px solid ${C_METAL};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    width: calc(100% - ${GEL_MARGIN_ABOVE_400PX});
    margin-left: ${GEL_MARGIN_ABOVE_400PX};
    padding-right: ${GEL_MARGIN_ABOVE_400PX};
    padding-left: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-right: 0;
    padding-left: ${GEL_SPACING};
  }
`;

const Caption = styled.figcaption`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${C_GREY_6};
  margin-top: ${GEL_SPACING};
  padding-left: ${GEL_MARGIN_BELOW_400PX};
  padding-right: ${GEL_MARGIN_BELOW_400PX};
  width: 100%;
  width: calc(100% - ${GEL_SPACING});
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: 100%;
    margin: ${GEL_SPACING} 0 0;
  }
  & > p {
    padding-bottom: ${GEL_SPACING_TRPL};
    margin: 0; /* reset */
  }
  & > p:last-child {
    padding-bottom: 0;
  }
  ${({ dir }) => (dir === 'rtl' ? rtlStyles : ltrStyles)}
`;

Caption.propTypes = {
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['ltr', 'rtl']),
  service: string.isRequired,
};

Caption.defaultProps = {
  dir: 'ltr',
};

export default Caption;
