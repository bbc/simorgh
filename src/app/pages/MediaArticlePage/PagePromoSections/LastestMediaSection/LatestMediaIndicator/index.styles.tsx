import styled from '@emotion/styled';
import Promo from '#components/OptimoPromos';
import { css, Theme } from '@emotion/react';

export const styles = {
  placeholderInfo: ({ mq, fontSizes, fontVariants, palette }: Theme) =>
    css({
      width: '100%',
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      display: 'flex',
      minWidth: '5rem',
      padding: '0.5rem 0.125rem 0.5rem 0.125rem',
      [mq.GROUP_3_ONLY]: {
        padding: '0.5rem',
        position: 'absolute',
        backgroundColor: palette.WHITE,
        maxWidth: '4.125rem',
        height: '2.5rem',
        transform: 'translateY(-2.5rem)',
        '& time': {
          margin: 'auto',
        },
      },
      [mq.GROUP_2_ONLY]: {
        padding: '0.5rem',
        position: 'absolute',
        backgroundColor: palette.WHITE,
        maxWidth: '4.125rem',
        height: '2.125rem',
        transform: 'translateY(-2.125rem)',
        '& time': {
          margin: 'auto',
        },
      },
    }),
  time: ({ palette, mq }: Theme) =>
    css({
      color: palette.GREY_2,
      [mq.GROUP_2_ONLY]: {
        color: palette.EBON,
      },
      [mq.GROUP_3_ONLY]: {
        color: palette.EBON,
      },
    }),
  promoMediaIndicator: ({ palette, mq }: Theme) =>
    css({
      svg: {
        color: palette.GREY_2,
        fill: 'currentColor',
        [mq.GROUP_2_ONLY]: {
          color: palette.EBON,
        },
        [mq.GROUP_3_ONLY]: {
          color: palette.EBON,
        },
      },
    }),
};

export const StyledPromoMediaIndicator = styled(Promo.MediaIndicator)`
  ${props => styles.promoMediaIndicator(props.theme)}
`;
