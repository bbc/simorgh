import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  headingStyles: ({ spacings, mq, fontSizes }: Theme) =>
    css({
      padding: `${spacings.FULL}rem 0 ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_ONLY]: {
        paddingTop: 0,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        ...fontSizes.doublePica,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.DOUBLE}rem`,
      },
    }),
  bodyStyles: ({ spacings, palette, mq, fontVariants }: Theme) =>
    css({
      color: palette.GREY_10,
      backgroundColor: palette.GREY_2,
      border: `solid ${pixelsToRem(3)}rem transparent`,
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem 0 ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      },
      '& li': {
        paddingInlineStart: `${pixelsToRem(3)}rem`,
        '&:last-child': {
          marginBottom: 0,
        },
      },
      '& ul': {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
        marginBottom: 0,
      },
      '& p': {
        paddingBottom: 0,
      },
      '& a': {
        color: palette.GREY_10,
        ...fontVariants.sansBold,
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`,
        '&:visited': {
          color: palette.GREY_6,
        },
      },
    }),
};
