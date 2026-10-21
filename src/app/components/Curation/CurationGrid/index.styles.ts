import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  videoCollection: ({ mq, palette, spacings }: Theme) =>
    css({
      '.promo-image': {
        position: 'relative',
        'div div:last-child': {
          position: 'absolute',
          bottom: 0,
          insetInlineStart: 0,
          zIndex: 1,
          div: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: palette.WHITE,
            svg: {
              position: 'static',
              color: palette.GREY_10,
            },
            time: {
              margin: 0,
              color: palette.GREY_10,
            },
          },
        },
        [mq.GROUP_0_MAX_WIDTH]: {
          width: '100%',
          display: 'inline-block',
          verticalAlign: 'top',
          paddingBottom: `${spacings.FULL}rem`,
          // 'div div:last-child': {
          //   div: {
          //     width: `${pixelsToRem(77)}rem`,
          //     height: `${pixelsToRem(34)}rem`,
          //   },
          // },
        },
      },
      '.promo-text': {
        h3: {
          paddingBottom: `${spacings.FULL}rem`,
          marginBottom: 0,
          fontWeight: 'bold',
        },
        time: {
          fontSize: `${pixelsToRem(13)}rem`,
          paddingBottom: `${spacings.DOUBLE}rem`,
        },
        [mq.GROUP_0_MAX_WIDTH]: {
          h3: {
            fontSize: `${pixelsToRem(15)}rem`,
          },
        },
        [mq.GROUP_1_MAX_WIDTH]: {
          h3: {
            fontSize: `${pixelsToRem(16)}rem`,
          },
        },
        [mq.GROUP_2_MAX_WIDTH]: {
          h3: {
            fontSize: `${pixelsToRem(18)}rem`,
          },
        },
      },
    }),
  videoCollectionList: ({ mq }: Theme) =>
    css({
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: `${pixelsToRem(16)}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: `${pixelsToRem(16)}rem`,
      },
    }),

  list: ({ isLite }: Theme) =>
    css({
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      ...(isLite && {
        li: {
          '.promo-text': {
            width: '100%',
            paddingInlineStart: 0,
          },
        },
      }),
    }),

  listStretchHeight: ({ mq }: Theme) =>
    css({
      [mq.GROUP_2_MIN_WIDTH]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
      },
    }),

  item: ({ spacings, mq, palette }: Theme) =>
    css({
      '.promo-image': {
        [mq.GROUP_2_MAX_WIDTH]: {
          width: '33%',
          display: 'inline-block',
          verticalAlign: 'top',
        },
        'div div:last-child': {
          [mq.GROUP_1_MAX_WIDTH]: {
            position: 'relative',
          },
          div: {
            padding: `${spacings.FULL}rem`,
            [mq.GROUP_4_MIN_WIDTH]: {
              padding: '0.75rem',
            },
            svg: {
              margin: 0,
              [mq.GROUP_4_MIN_WIDTH]: {
                width: `${spacings.TRIPLE}rem`,
                height: `${spacings.TRIPLE}rem`,
              },
            },
            time: {
              marginInlineStart: `${spacings.FULL}rem`,
              padding: '0',
            },
          },
        },
      },
      '.promo-text': {
        [mq.GROUP_2_MAX_WIDTH]: {
          width: '67%',
          display: 'inline-block',
          verticalAlign: 'top',
          paddingInlineStart: `${spacings.FULL}rem`,
        },
      },
      verticalAlign: 'top',
      display: 'inline-block',
      marginBottom: `${spacings.DOUBLE}rem`,
      width: '100%',

      [mq.GROUP_2_MAX_WIDTH]: {
        borderTop: `1px ${palette.GREY_3} solid`,
        paddingTop: `${spacings.FULL}rem`,
      },
      [mq.GROUP_3_ONLY]: {
        marginInlineEnd: `${spacings.DOUBLE}rem`,
        marginBottom: `${spacings.TRIPLE}rem`,
        width: `calc(50% - 0.5rem)`,
        '&:nth-of-type(2n)': {
          marginInlineEnd: 0,
        },
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineEnd: `${spacings.DOUBLE}rem`,
        marginBottom: '2.125rem',
        width: 'calc(25% - 0.75rem)',
        '&:nth-of-type(4n)': {
          marginInlineEnd: 0,
        },
      },
    }),
};

export default styles;
