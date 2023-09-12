import { css, Theme } from '@emotion/react';

export default {
  headline: ({ spacings, mq }: Theme) =>
    css({
      display: 'block' /* Explicitly set */,
      padding: `${spacings.QUADRUPLE}rem 0`,
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `${spacings.QUINTUPLE}rem 0`,
      },
      '&:focus': {
        outline: 'none',
      },
      overflowWrap: 'anywhere',
      margin: 0 /* Reset */,
    }),
  subHeading: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.TRIPLE}rem 0`,
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingTop: `${spacings.QUADRUPLE}rem`,
      },
      margin: 0 /* Reset */,
    }),
};
