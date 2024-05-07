import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
  background: () =>
    css({
      position: 'relative',
      background: 'rgb(100, 5, 5)',
    }),
  gradient: () =>
    css({
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage:
        'url("https://static.files.bbci.co.uk/core/website/assets/static/container-background-masks/billboard-ambient.d267649a6871ef14d172.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      mixBlendMode: 'soft-light',
    }),
  grid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      [mq.GROUP_3_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: '1rem',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        columnGap: `${spacings.FULL}rem`,
      },
    }),
  primaryColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 8',
        paddingBottom: '2rem',
      },
    }),
  mainContent: ({ spacings, palette, mq }: Theme) =>
    css({
      background: palette.WHITE,
      padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '35rem',
      },
    }),
  description: ({ palette, spacings }: Theme) =>
    css({
      borderBottom: `1px solid ${palette.GREY_5}`,
      marginBottom: `${spacings.QUADRUPLE}rem`,
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),
};
