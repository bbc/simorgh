import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

const styles = {
  embedDiv: ({ spacings, mq, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      maxWidth: '100%',
      margin: `0 ${spacings.FULL}rem ${spacings.TRIPLE}rem`,
      padding: `${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.TRIPLE}rem`,
      },
      [mq.FORCED_COLOURS]: {
        border: `${pixelsToRem(3)}rem solid transparent`,
      },
    }),
  errorLinkWrapper: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}rem`,
    }),
  inlineLink: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      color: palette.BLACK,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.BLACK}`,
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
    }),
};

export default styles;
