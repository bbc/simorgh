import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import Promo from '#components/OptimoPromos';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';

export const styles = {
  gridOuter: ({ mq, spacings }: Theme) =>
    css({
      borderBottom: `${spacings.FULL}rem solid transparent`,
      borderTop: `${spacings.FULL}rem solid transparent`,
      height: '100%',
      [mq.GROUP_3_ONLY]: {
        width: '100%',
        borderBottom: `0rem`,
        borderTop: `0rem`,
      },
    }),
  gridInner: ({ mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      columnGap: '0.75rem',
      [mq.GROUP_3_ONLY]: {
        gridTemplateColumns: '1fr',
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

// export const StyledPromoTitle = styled(Promo.Title)`
//   font-size: ${props => props.theme.fontSizes.pica};
//   @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
//     margin-top: 0.75rem;
//   }
// `;

export const StyledPromoTitle = styled(Promo.Title)`
  ${props => styles.promoTitle(props.theme)}
`;

export const PlaceholderWrapper = styled.div`
  display: 'flex';
  flexwrap: 'wrap';
`;
