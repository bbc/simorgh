import { css, Theme } from '@emotion/react';
import { BORDER_SPACING_DBL } from '../constants';

export default {
  sectionLabel: ({ mq }: Theme) =>
    css({
      marginTop: 0,

      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: 0,
      },
    }),
  topStoriesSection: ({ spacings, mq }: Theme) =>
    css({
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: `0 ${spacings.FULL}rem`,
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        [mq.GROUP_3_MAX_WIDTH]: {
          padding: `0 ${spacings.DOUBLE}rem`,
        },
      },
    }),
  promoList: ({ spacings, mq }: Theme) =>
    css({
      [mq.GROUP_3_ONLY]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: `calc(${spacings.DOUBLE}rem - ${BORDER_SPACING_DBL})`,
      },
    }),
  promoItem: ({ mq }: Theme) =>
    css({
      [mq.GROUP_3_ONLY]: {
        height: 'inherit',
        flexGrow: 1,
        flexBasis: 0,
        margin: 0,
      },
    }),
};
