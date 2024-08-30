import { css, Theme } from '@emotion/react';
import { BORDER_SPACING } from '../constants';

export default {
  relatedContentSection: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.HALF}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0 ${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: 0,
      },
    }),
  promoItem: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      margin: 0,
      width: '100%',
      height: 'inherit',
      padding: `calc(${spacings.HALF}rem - ${BORDER_SPACING})`,

      [mq.GROUP_2_MIN_WIDTH]: {
        width: '50%',
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        width: '33.33%',
      },
    }),

  relatedContentGrid: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      margin: `calc(-${spacings.HALF}rem + ${BORDER_SPACING})`,
    }),

  singleItemWrapper: ({ spacings, mq }: Theme) =>
    css({
      width: '100%',
      margin: `0 -${spacings.HALF}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        width: '50%',
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        width: '33.33%',
      },
    }),
};
