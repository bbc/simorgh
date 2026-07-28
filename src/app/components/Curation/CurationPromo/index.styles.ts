import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

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
  liveLabel: ({ isDarkUi, palette }: Theme) => {
    const liveColour = isDarkUi ? palette.LIVE_LIGHT : palette.LIVE_DARK;

    return css({
      svg: {
        color: liveColour,
      },
      'span[role="text"] > span:first-of-type': {
        color: liveColour,
      },
    });
  },
  metadataAndTopicData: ({ fontSizes, spacings }: Theme) =>
    css({
      ...fontSizes.longPrimer,

      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      columnGap: `${spacings.FULL + spacings.HALF}rem`,
      rowGap: `${spacings.FULL}rem`,
      overflow: 'hidden',
      marginBottom: `${spacings.FULL}rem`,
      minWidth: 0,
      '&:focus-within': {
        overflow: 'visible',
        '.promo-timestamp::before': {
          display: 'none',
        },
      },
      '.promo-timestamp': {
        position: 'relative',
        flexShrink: 1,
        minWidth: 0,
        maxWidth: '100%',
        whiteSpace: 'normal',
        overflowWrap: 'anywhere',
        '&::before': {
          content: '""',
          position: 'absolute',
          insetInlineStart: `-${spacings.FULL}rem`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${pixelsToRem(2)}rem`,
          height: `${pixelsToRem(2)}rem`,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          border: `${pixelsToRem(1)}rem solid transparent`,
        },
      },
    }),
  relatedTopicLink: ({ fontSizes, fontVariants, isDarkUi, palette }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
      display: 'block',
      flexShrink: 0,
      minWidth: 0,
      maxWidth: '100%',
      margin: 0,
      textDecoration: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
      zIndex: 1,
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
};
