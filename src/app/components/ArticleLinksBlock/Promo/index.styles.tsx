import { OPERA_MINI_CLASSNAME } from '#app/lib/utilities/addOperaMiniClassScript';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  link: ({ fontSizes, fontVariants, isDarkUi, palette }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.serifBold,
      display: 'inline-block',
      verticalAlign: 'middle',
      textDecoration: 'none',
      overflowX: 'hidden',
      overflowY: 'hidden',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical',
      color: isDarkUi ? palette.GREY_2 : palette.GREY_8,

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },

      '&:visited': {
        color: palette.GREY_6,
      },

      '&::before': {
        bottom: 0,
        content: '""',
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
    }),
  promoBox: ({ isDarkUi, mq, palette, spacings }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: isDarkUi ? palette.GREY_7 : palette.WHITE,
      padding: `${spacings.DOUBLE}rem`,
      paddingInlineEnd: `${pixelsToRem(38)}rem`,
      height: 'auto',
      display: 'block',
      width: '100%',
      [`.${OPERA_MINI_CLASSNAME} &`]: {
        position: 'relative',
        backgroundColor: isDarkUi ? palette.GREY_3 : palette.WHITE,
        padding: `${spacings.DOUBLE}rem`,
        marginBottom: `${spacings.DOUBLE}rem`,
        width: `calc(100% - ${spacings.FULL}rem)`,
        [mq.GROUP_2_MIN_WIDTH]: {
          width: `calc(50% - ${spacings.DOUBLE}rem)`,
        },
      },
    }),
  timestamp: ({ isDarkUi, palette, spacings }: Theme) =>
    css({
      marginTop: `${spacings.FULL}rem`,
      color: isDarkUi ? palette.GREY_1 : undefined,
    }),
  chevron: () =>
    css({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      insetInlineEnd: `${pixelsToRem(12)}rem`,
      fill: 'currentColor',
    }),
};
