import { Theme, css } from '@emotion/react';
import {
  MARGIN_ABOVE_400PX,
  MARGIN_BELOW_400PX,
} from '../ThemeProvider/spacings';

export default {
  captionStyles: ({ mq, isDarkUi, palette, spacings }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
      marginTop: `${spacings.FULL}rem`,
      marginInline: `${MARGIN_BELOW_400PX} 0`,
      paddingInline: `${MARGIN_BELOW_400PX}`,
      width: `calc(100% - ${spacings.FULL}rem)`,
      borderInlineStart: `0.0625rem solid ${
        isDarkUi ? palette.GREY_3 : palette.METAL
      }`,
      [mq.GROUP_2_ONLY]: {
        width: `calc(100% - ${MARGIN_ABOVE_400PX})`,
        marginInline: `${MARGIN_ABOVE_400PX} 0`,
        paddingInline: `${spacings.FULL}rem ${MARGIN_ABOVE_400PX}`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: '100%',
        margin: `${spacings.FULL}rem 0 0 `,
        paddingInline: `${spacings.FULL}rem 0`,
      },
      ' & > span > p': {
        paddingBottom: `${spacings.TRIPLE}rem`,
        margin: 0,
      },
      '& > span > p:last-child': { paddingBottom: 0 },
    }),
};
