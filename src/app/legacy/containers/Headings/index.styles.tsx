import { css, Theme } from '@emotion/react';

export default {
  headline: ({ spacings, mq }: Theme) =>
    css({
      display: 'block' /* Explicitly set */,
      padding: `${spacings.QUADRUPLE}rem 0`,
      // check eq to MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGE
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `${spacings.QUINTUPLE}rem 0`,
      },
      '&:focus': {
        outline: 'none',
      },
      overflowWrap: 'anywhere',
    }),
  subHeading: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.TRIPLE}rem 0`,
      // check eq to MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingTop: `${spacings.QUADRUPLE}rem`,
      },
    }),
};
