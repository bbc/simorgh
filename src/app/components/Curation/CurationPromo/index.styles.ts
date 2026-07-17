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
  metadataAndTopicData: ({ fontSizes, mq }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 0,
      [mq.GROUP_3_MIN_WIDTH]: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    }),
  relatedTopicLink: ({
    fontSizes,
    fontVariants,
    isDarkUi,
    palette,
    spacings,
    mq,
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
        display: 'none',
        [mq.GROUP_3_MIN_WIDTH]: {
          display: 'inline-block',
        },
      },
    }),
};
