import { Theme, css } from '@emotion/react';
import {
  MARGIN_ABOVE_400PX,
  MARGIN_BELOW_400PX,
} from '../ThemeProvider/spacings';

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
      marginTop: `${spacings.FULL}rem`,
      paddingLeft: MARGIN_BELOW_400PX,
      paddingRight: MARGIN_BELOW_400PX,
      width: `calc(100% - ${spacings.FULL}rem)`,
      [mq.GROUP_4_MIN_WIDTH]: {
        width: '100%',
        margin: `${spacings.FULL}rem 0 0 `,
      },
      ' & > span > p': {
        paddingBottom: `${spacings.TRIPLE}rem`,
        margin: 0,
      },
      '& > span > p:last-child': { paddingBottom: 0 },
    }),
  rtlStyles: ({ spacings, palette, isDarkUi, mq }: Theme) =>
    css({
      marginRight: MARGIN_BELOW_400PX,
      borderRight: `0.0625rem solid ${
        isDarkUi ? palette.GREY_3 : palette.METAL
      }`,
      [mq.GROUP_2_ONLY]: {
        width: `calc(100% - ${MARGIN_ABOVE_400PX}`,
        marginRight: MARGIN_ABOVE_400PX,
        paddingRight: `${spacings.FULL}rem`,
        paddingLeft: MARGIN_ABOVE_400PX,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingRight: `${spacings.FULL}rem`,
        paddingLeft: 0,
      },
    }),
  ltrStyles: ({ spacings, palette, isDarkUi, mq }: Theme) =>
    css({
      marginLeft: MARGIN_BELOW_400PX,
      borderLeft: `0.0625rem solid ${
        isDarkUi ? palette.GREY_3 : palette.METAL
      }`,
      [mq.GROUP_2_ONLY]: {
        width: `calc(100% - ${MARGIN_ABOVE_400PX})`,
        marginLeft: MARGIN_ABOVE_400PX,
        paddingRight: MARGIN_ABOVE_400PX,
        paddingLeft: `${spacings.FULL}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingRight: 0,
        paddingLeft: `${spacings.FULL}rem`,
      },
    }),
};
