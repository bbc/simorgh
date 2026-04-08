import { css, Theme } from '@emotion/react';
/** Temporary css styling until UX work is complete */
const styles = {
  buttonWrapper: ({ mq }: Theme) =>
    css({
      display: 'flex',
      marginTop: '1rem',
      marginBottom: '1rem',
      padding: '1rem',
      marginLeft: '0.5rem',
      [mq.GROUP_4_MIN_WIDTH]: {
        marginLeft: 0,
      },
    }),
};

export default styles;
