import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import Promo from '#components/OptimoPromos';
import { BORDER_SPACING } from '../../constants';

export const styles = {
  borderBottom: ({ mq }: Theme) =>
    css({
      width: '100%',
    }),
  gridOuter: ({ mq }: Theme) =>
    css({
      border: `${BORDER_SPACING} solid transparent`,
      height: '100%',
      [mq.GROUP_3_ONLY]: {
        width: '100%',
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
