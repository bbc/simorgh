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
  metadataAndTopicData: ({ fontSizes }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
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
      display: 'inline-block',
      maxWidth: '100%',
      marginTop: 0,
      marginBottom: `${spacings.FULL}rem`,
      textDecoration: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      zIndex: 1,
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
};
