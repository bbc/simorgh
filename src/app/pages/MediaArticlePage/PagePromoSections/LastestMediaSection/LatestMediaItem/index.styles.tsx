import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import Promo from '#components/OptimoPromos';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#app/legacy/psammead/gel-foundations/src/breakpoints';

export const styles = {
  promoWrapper: ({ mq, spacings }: Theme) =>
    css({
      borderBottom: `${spacings.FULL}rem solid transparent`,
      borderTop: `${spacings.FULL}rem solid transparent`,
      height: '100%',
      [mq.GROUP_3_ONLY]: {
        borderBottom: `0rem`,
        borderTop: `0rem`,
      },
    }),
  textWrapper: ({ mq }: Theme) =>
    css({
      width: '67%',
      display: 'inline-block',
      verticalAlign: 'top',
      paddingInlineStart: '0.5rem',
      [mq.GROUP_3_ONLY]: {
        width: '100%',
      },
    }),
  promoTitle: ({ mq, fontSizes }: Theme) =>
    css({
      ...fontSizes.pica,
      [mq.GROUP_3_ONLY]: {
        marginTop: `0.75rem`,
      },
    }),
};

export const StyledTimestamp = styled(Promo.Timestamp)`
  padding-top: ${props => props.theme.spacings.FULL}rem;
`;

export const StyledPromoTitle = styled(Promo.Title)`
  ${props => styles.promoTitle(props.theme)}
`;

export const ImageWrapper = styled.div`
  width: 33%;
  display: inline-block;
  vertical-align: top;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    width: 100%;
  }
`;
