import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { LUNAR } from '../../../../components/ThemeProvider/palette';

const promoListDefaultProps = {
  border: true,
};

export const StoryPromoLiBase = styled.li`
  ${({ border }) =>
    border &&
    `
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      border-bottom: 0.0625rem solid ${LUNAR};
    }
  `}

  &:last-child {
    border: none;
  }
`;

StoryPromoLiBase.defaultProps = {
  role: 'listitem',
  ...promoListDefaultProps,
};

export const StoryPromoLi = styled(StoryPromoLiBase)`
  padding: ${GEL_SPACING} 0 ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: 0 0 ${GEL_SPACING_TRPL};
  }
  &:first-child {
    padding-top: 0;

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-top: ${GEL_SPACING_DBL};
    }
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

StoryPromoLi.defaultProps = promoListDefaultProps;

export const StoryPromoUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

StoryPromoUl.defaultProps = {
  role: 'list',
};
