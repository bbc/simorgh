import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  mediaIcon: ({ palette, fontVariants, fontSizes, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: palette.WHITE,
      border: 'none',
      color: palette.BLACK,
      cursor: 'pointer',
      ...fontVariants.sansRegular,
      ...fontSizes.minion,
      padding: `${spacings.FULL}rem`,
      position: 'absolute',
      bottom: '0',
      left: '0',
      zIndex: '2',
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
      [`@media (max-width: ${pixelsToRem(300)}rem)`]: {
        display: 'none',
      },
    }),
  item: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      lineHeight: `${spacings.DOUBLE}rem`,
    }),
  iconWrapper: ({ palette }: Theme) =>
    css({
      '& > svg': {
        color: palette.BLACK,
        fill: 'currentcolor',
        margin: '0',
      },
    }),
  timeDuration: ({ spacings }: Theme) =>
    css({
      margin: `0 0 0 ${spacings.FULL}rem`,
    }),
};

export default styles;
