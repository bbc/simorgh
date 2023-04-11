import { css } from '@emotion/react';

const styles = {
  main: ({ spacings, mq }) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      /* stylelint-disable-next-line selector-type-no-unknown */
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  inner: css({
    maxWidth: '63rem',
    margin: '0 auto',
  }),
  inline: ({ mq }) =>
    css({
      /* stylelint-disable-next-line selector-type-no-unknown */
      [mq.GROUP_4_MIN_WIDTH]: {
        alignItems: 'center',
        display: 'flex',
      },
    }),
  title: ({ spacings, mq }) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
      /* stylelint-disable selector-type-no-unknown */
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `${spacings.QUADRUPLE} 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.SEXTUPLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUINTUPLE}rem 0 ${spacings.SEXTUPLE}rem 0`,
      },
      /* stylelint-enable */
    }),
};

export default styles;
