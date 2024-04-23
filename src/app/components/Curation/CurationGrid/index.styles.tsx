import { css, Theme } from '@emotion/react';

const styles = {
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

          '[class*="ChildWrapper" i]': {
            position: 'relative',
          },
        },
      }),
    }),

  item: ({ spacings, mq, palette }: Theme) =>
    css({
      '.promo-image': {
        [mq.GROUP_2_MAX_WIDTH]: {
          width: '33%',
          display: 'inline-block',
          verticalAlign: 'top',
        },
        'div div:nth-child(2)': {
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
              marginLeft: `${spacings.FULL}rem`,
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
