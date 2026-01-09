import { OPERA_MINI_CLASSNAME } from '#app/lib/utilities/addOperaMiniClassScript';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  link: ({ fontSizes, fontVariants, isDarkUi, palette }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.serifBold,
      display: 'inline-block',
      textDecoration: 'none',
      overflowX: 'hidden',
      overflowY: 'hidden',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
      color: isDarkUi ? palette.GREY_10 : palette.GREY_8,
      '&:visited': {
        color: palette.GREY_6,
      },
    }),
  promoBox: ({ isDarkUi, mq, palette, spacings }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: isDarkUi ? palette.GREY_3 : palette.WHITE,
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
      color: isDarkUi ? palette.GREY_6 : undefined,
    }),
  chevron: () =>
    css({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      insetInlineEnd: `${pixelsToRem(12)}rem`,
    }),
};
