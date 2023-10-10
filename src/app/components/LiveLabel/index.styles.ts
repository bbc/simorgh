import { css, Theme } from '@emotion/react';

const styles = {
  liveLabel: ({ palette, fontVariants }: Theme) =>
    css({
      color: palette.POSTBOX,
      display: 'inline-block',
      ...fontVariants.sansBold,
    }),
  textRtl: ({ spacings }: Theme) =>
    css({
      marginLeft: `${spacings.FULL}rem`,
    }),
  textLtr: ({ spacings }: Theme) =>
    css({
      marginRight: `${spacings.FULL}rem`,
    }),
};

export default styles;
