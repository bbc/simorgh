import { Theme, css } from '@emotion/react';
// import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  listItem: () =>
    css({
      listStyleType: 'none',
    }),
  orderedList: () =>
    css({
      marginBlock: 0,
      paddingInline: 0,
    }),
  heading: ({ mq, spacings }: Theme) =>
    css({
      padding: `${spacings.DOUBLE}rem 0 ${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem 0 ${spacings.DOUBLE}rem`,
      },
    }),
  subHeading: ({ mq, spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
    }),
};
