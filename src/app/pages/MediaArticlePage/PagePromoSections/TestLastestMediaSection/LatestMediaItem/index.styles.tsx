import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import Promo from '#components/OptimoPromos';

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
      gridTemplateColumns: 'repeat(2, 1fr)',
      [mq.GROUP_3_ONLY]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    }),
};

export const StyledTimestamp = styled(Promo.Timestamp)`
  padding-top: ${props => props.theme.spacings.FULL};
`;

export const StyledPromoTitle = styled(Promo.Title)`
  font-size: ${props => props.theme.fontSizes.pica};
`;

export const PlaceholderWrapper = styled.div`
  display: 'flex';
  flexwrap: 'wrap';
`;
