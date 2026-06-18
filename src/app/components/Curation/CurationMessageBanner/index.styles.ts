import { css, Theme } from '@emotion/react';

const styles = {
  container: () =>
    css({
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }),
  textWrap: ({ mq }: Theme) =>
    css({
      [mq.GROUP_3_ONLY]: {
        width: '66%',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: '75%',
      },
    }),
  heading: ({ palette }: Theme) =>
    css({
      paddingTop: '1.5rem',
      paddingBottom: '0.5rem',
      color: palette.WHITE,
    }),
  paragraph: ({ palette }: Theme) =>
    css({
      paddingBottom: '1rem',
      color: palette.WHITE,
    }),
};
export default styles;
