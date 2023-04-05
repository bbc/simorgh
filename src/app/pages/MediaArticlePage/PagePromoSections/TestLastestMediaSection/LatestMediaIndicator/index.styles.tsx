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
        position: 'relative',
        backgroundColor: 'PaleGreen',
        maxWidth: '22%',
        height: '20%',
        top: '-20%',
        '& time': {
          margin: 'auto',
        },
      },
      [mq.GROUP_2_ONLY]: {
        position: 'relative',
        backgroundColor: 'PaleGreen',
        maxWidth: '22%',
        height: '20%',
        top: '-20%',
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
