import { css, Theme } from '@emotion/react';

const styles = {
  list: ({ isLite, mq }: Theme) =>
    css({
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      gap: '1rem',

      [mq.GROUP_2_MAX_WIDTH]: {
        gridTemplateColumns: '1fr',
      },
      [mq.GROUP_3_ONLY]: {
        gridTemplateColumns: 'repeat(3, 1fr)',

        '& > li:nth-of-type(4)': {
          display: 'none',
        },
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },

      ...(isLite && {
        li: {
          '.promo-text': {
            width: '100%',
            paddingInlineStart: 0,
          },
        },
      }),
    }),

  item: ({ spacings, mq, palette }: Theme) =>
    css({
      verticalAlign: 'top',
      display: 'block',
      width: '100%',

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
        '& > h3 > a': {
          color: `${palette.WHITE}`,
          '&:visited': {
            color: `${palette.WHITE}`,
          },
        },

        '& > time.promo-timestamp': {
          color: `${palette.WHITE}`,
          '&:visited': {
            color: `${palette.WHITE}`,
          },
          [mq.GROUP_2_MAX_WIDTH]: {
            marginBottom: `${spacings.DOUBLE}rem`,
          },
        },
      },

      [mq.GROUP_2_MAX_WIDTH]: {
        borderTop: `1px ${palette.GREY_3} solid`,
        paddingTop: `${spacings.FULL}rem`,
      },

      [mq.GROUP_3_ONLY]: {
        marginBottom: `${spacings.DOUBLE}rem`,

        // Still need 3 columns when there is only 1 promo and so no list
        ':only-child': {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',

          // Place the promo in the first column
          '& > *': {
            gridColumn: '1 / span 1',
          },
        },
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${spacings.DOUBLE}rem`,

        // Still need 4 columns when there is only 1 promo and so no list
        ':only-child': {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',

          // Place the promo in the first column
          '& > *': {
            gridColumn: '1 / span 1',
          },
        },
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${spacings.DOUBLE}rem`,

        // Still need 4 columns when there is only 1 promo and so no list
        ':only-child': {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',

          // Place the promo in the first column
          '& > *': {
            gridColumn: '1 / span 1',
          },
        },
      },
    }),
};

export default styles;
