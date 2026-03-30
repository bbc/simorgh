import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

export default {
  list: () =>
    css({
      listStyle: 'none',
      padding: 0,
      margin: 0,
    }),

  listWithImage: () =>
    css({
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
    }),

  author: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      display: 'inline-block',
    }),

  jobRole: ({ palette, isDarkUi }: Theme) =>
    css({ color: isDarkUi ? palette.GREY_2 : palette.GREY_6 }),

  imageWrapper: ({ palette }: Theme) =>
    css({
      gridRow: '1 / 3',
      display: 'inline-flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: `${pixelsToRem(64)}rem`,
      height: `${pixelsToRem(64)}rem`,
      backgroundColor: `${palette.GREY_2}`,
      overflow: 'visible',
      marginInlineEnd: `${pixelsToRem(8)}rem`,
      writingMode: 'horizontal-tb',
    }),

  imageSrc: () =>
    css({
      width: `${pixelsToRem(64)}rem`,
      height: `${pixelsToRem(64)}rem`,
      borderRadius: '48px',
    }),

  contributorTextWrapper: () =>
    css({
      display: `block`,
    }),

  nameAlignEnd: () =>
    css({
      alignSelf: 'end',
    }),

  roleAlignStart: () =>
    css({
      alignSelf: 'start',
    }),
};
