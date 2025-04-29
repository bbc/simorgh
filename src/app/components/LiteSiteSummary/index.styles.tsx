import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  outerContainer: ({ palette, mq, spacings }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      backgroundColor: `${palette.WHITE}`,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  container: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.DOUBLE}rem 0 0 0`,
      maxWidth: '63.4rem',
      position: 'relative',
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem 0 ${spacings.FULL}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 auto`,
      },
    }),
  message: ({ spacings, mq }: Theme) =>
    css({
      marginBottom: `${spacings.HALF}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        marginBottom: `${spacings.FULL}rem`,
      },
    }),
  bottomLinkSpacing: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.HALF}rem 0 ${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.FULL}rem 0 ${spacings.DOUBLE}rem`,
      },
    }),
  topLinkSpacing: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.FULL + spacings.HALF}rem 0 ${spacings.FULL + spacings.HALF}rem`,
    }),
  singleLinkSpacing: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.FULL + spacings.HALF}rem 0 ${spacings.FULL + spacings.HALF}rem`,
      marginBottom: `${spacings.FULL + spacings.HALF}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        marginBottom: `${spacings.HALF}rem`,
      },
    }),
};
