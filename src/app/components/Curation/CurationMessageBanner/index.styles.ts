import { css, Theme } from '@emotion/react';

const styles = {
  container: () =>
    css({
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }),
  heading: ({ palette }: Theme) =>
    css({
      paddingTop: '1.5rem',
      paddingBottom: '0.5rem',
      color: palette.WHITE,
    }),
};
export default styles;
