import { css } from '@emotion/react';

const styles = {
  list: css({
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  }),
  item: ({ spacings, mq }) =>
    css({
      verticalAlign: 'top',
      display: 'inline-block',
      marginBottom: `${spacings.DOUBLE}rem`,
      width: '100%',
      [mq.GROUP_2_MAX_WIDTH]: {
        borderTop: '1px #e6e8ea solid',
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
