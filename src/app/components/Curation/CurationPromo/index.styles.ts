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
  metadataAndTopicData: ({ fontSizes }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 0,
    }),
  relatedTopicLink: ({
    fontSizes,
    fontVariants,
    isDarkUi,
    palette,
    spacings,
  }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
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
        width: `${pixelsToRem(2)}rem`,
        height: `${pixelsToRem(2)}rem`,
        borderRadius: '50%',
        backgroundColor: isDarkUi ? palette.GREY_3 : palette.GREY_6,
        marginInline: `${spacings.HALF}rem`,
        border: `${pixelsToRem(1)}rem solid transparent`,
      },
    }),
};
