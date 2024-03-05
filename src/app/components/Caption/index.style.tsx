import { Theme, css } from '@emotion/react';

export default {
  captionStyles: ({
    mq,
    fontVariants,
    fontSizes,
    isDarkUi,
    palette,
    spacings,
  }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.longPrimer,
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
      marginTop: spacings.FULL,
      paddingLeft: spacings.FULL,
      paddingRight: spacings.FULL,
      width: `calc(100% - ${spacings.FULL})`,
      [mq.GROUP_4_MIN_WIDTH]: {
        width: '100%',
        margin: `${spacings.FULL} 0 0 `,
      },
      ' & > span > p': {
        paddingBottom: spacings.TRIPLE,
        margin: 0,
      },
      '& > span > p:last-child': { paddingBottom: 0 },
    }),
};
