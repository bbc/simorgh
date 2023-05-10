import { css, Theme } from '@emotion/react';

export default {
  singleItemWrapper: ({ spacings, mq }: Theme) =>
    css({
      width: '100%',
      margin: `0 -${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        width: '50%',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '33.33%',
      },
    }),
  singleItemWrapperFullWidth: ({ mq }: Theme) =>
    css({
      width: '100%',

      [mq.GROUP_3_MIN_WIDTH]: {
        width: '75%',
      },
    }),
  relatedContentGrid: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      margin: `calc(-${spacings.FULL}rem + 0.1875rem)`,
    }),
  promoItem: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      margin: 0,
      width: '100%',
      height: 'inherit',
      padding: `calc(${spacings.FULL}rem - 0.1875rem)`,

      [mq.GROUP_2_MIN_WIDTH]: {
        width: '50%',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '33.33%',
      },
    }),
  promoItemFullWidth: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      margin: 0,
      width: '100%',
      height: 'inherit',
      padding: `calc(${spacings.FULL}rem - 0.1875rem)`,

      [mq.GROUP_3_MIN_WIDTH]: {
        width: '75%',
      },
    }),
  relatedContentSection: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0 ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: 0,
      },
    }),
};
