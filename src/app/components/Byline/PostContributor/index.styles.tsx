import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

export default {
  list: () => css({ listStyle: 'none', padding: 0, margin: 0 }),

  author: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      display: 'inline-block',
    }),

  jobRole: ({ palette, isDarkUi }: Theme) =>
    css({ color: isDarkUi ? palette.GREY_2 : palette.GREY_6 }),

  imageWrapper: ({ palette }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: `${pixelsToRem(64)}rem`,
      height: `${pixelsToRem(64)}rem`,
      backgroundColor: `${palette.GREY_2}`,
      overflow: 'visible',
    }),

  imageLtr: () =>
    css([
      {
        float: 'left',
        marginRight: `${pixelsToRem(8)}rem`,
      },
    ]),

  imageRtl: () =>
    css([
      {
        float: 'right',
        marginLeft: `${pixelsToRem(8)}rem`,
      },
    ]),

  imageSrc: () =>
    css({
      width: `${pixelsToRem(64)}rem`,
      height: `${pixelsToRem(64)}rem`,
      borderRadius: '48px',
    }),

  displayBlock: () =>
    css({
      display: `block`,
    }),

  displayFlex: () =>
    css({
      display: `flex`,
      alignItems: 'center',
    }),
};
