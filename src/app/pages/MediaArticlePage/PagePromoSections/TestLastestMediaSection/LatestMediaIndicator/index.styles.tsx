import styled from '@emotion/styled';
import Promo from '#components/OptimoPromos';
import { css, Theme } from '@emotion/react';

export const styles = {
  placeholderInfo: ({ mq, fontSizes, fontVariants }: Theme) =>
    css({
      width: '100%',
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      backgroundColor: 'LightCyan',
      display: 'flex',
      minWidth: '5rem',
      padding: '0.5rem',
      [mq.GROUP_3_ONLY]: {
        position: 'absolute',
        backgroundColor: 'PaleGreen',
        maxWidth: '4.125rem',
        height: '2.5rem',
        transform: 'translateY(-2.5rem)',
        '& time': {
          margin: 'auto',
        },
      },
      [mq.GROUP_2_ONLY]: {
        position: 'absolute',
        backgroundColor: 'PaleGreen',
        maxWidth: '4.125rem',
        height: '2.125rem',
        transform: 'translateY(-2.125rem)',
        '& time': {
          margin: 'auto',
        },
      },
    }),
};

export const StyledPromoMediaIndicator = styled(Promo.MediaIndicator)`
  border: blue solid 2px;
`;

export const StyledTime = styled.time`
  padding: ${props => props.theme.spacings.HALF};
  top: 0.09rem;
`;
