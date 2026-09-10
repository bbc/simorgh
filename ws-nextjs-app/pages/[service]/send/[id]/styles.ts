import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

const IMAGE_RECIPE = '1280xn';
const BACKGROUND_POSITION = 'center top / cover no-repeat';

export const fallbackBackground =
  'linear-gradient(200deg, #A20219 0%, #180109 54%, #180109 90%)';

export const buildImageBackground = (pageBackgroundTemplateUrl: string) => {
  const baseUrl = pageBackgroundTemplateUrl.replace('$recipe', IMAGE_RECIPE);
  const imageSet = `url(${baseUrl}.webp) type('image/webp'), url(${baseUrl}) type('image/png')`;

  return [
    `url(${baseUrl}) ${BACKGROUND_POSITION}`,
    `-webkit-image-set(${imageSet}) ${BACKGROUND_POSITION}`,
    `image-set(${imageSet}) ${BACKGROUND_POSITION}`,
  ];
};

export default {
  background:
    (background: string | string[]) =>
    ({ mq }: Theme) =>
      css({
        display: 'none',

        [mq.GROUP_3_MIN_WIDTH]: {
          display: 'block',
          position: 'absolute',
          inset: 0,
          background,
        },
      }),
  backgroundFixed: ({ mq }: Theme) =>
    css({
      [mq.GROUP_3_MIN_WIDTH]: {
        backgroundAttachment: 'fixed',
      },
    }),
  grid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      position: 'relative',

      [mq.GROUP_3_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        columnGap: `${spacings.FULL}rem`,
      },
    }),
  primaryColumn: ({ mq, spacings }: Theme) =>
    css({
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 8',
        paddingBottom: `${spacings.QUADRUPLE}rem`,
      },
    }),
  mainContent: ({ spacings, palette, mq }: Theme) =>
    css({
      background: palette.WHITE,
      outline: `${pixelsToRem(1)}rem transparent solid`,
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.FULL}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem`,
      },
    }),
  screenContainer: () =>
    css({
      '.no-js &': {
        display: 'none',
      },
    }),
};
