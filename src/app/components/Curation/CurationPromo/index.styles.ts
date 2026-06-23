import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  promo: ({ isLite }: Theme) =>
    css({
      ...(isLite && {
        '.promo-image': {
          display: 'none',
        },
      }),
    }),
  icon: ({ isLite, spacings, mq }: Theme) =>
    css({
      ...(isLite && {
        [mq.GROUP_2_MAX_WIDTH]: {
          marginTop: `${spacings.FULL}rem`,
        },
      }),
    }),
  image: () =>
    css({
      position: 'relative',
    }),
  metadataAndTopicData: ({ palette, fontSizes }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      color: palette.GREY_10,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 0,
    }),
  relatedTopicLink: ({ fontSizes, fontVariants, palette, spacings }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      color: palette.GREY_10,
      display: 'inline-flex',
      alignItems: 'center',
      marginTop: 0,
      textDecoration: 'none',
      zIndex: 1,
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
      '&::after': {
        content: '""',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        backgroundColor: palette.GREY_10,
        marginInline: `${spacings.HALF}rem`,
        border: `${pixelsToRem(1)}rem solid transparent`,
      },
    }),
};
