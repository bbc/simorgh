import { css, Theme } from '@emotion/react';

// Border uses grey-5
const styles = {
  wrapper: ({ palette, spacings }: Theme) =>
    css({
      display: 'flex',
      padding: '0.5rem',
      marginBottom: '2rem',
      width: '100%',    
    }),

  textExample: ({ palette, spacings }: Theme) =>
    css({
      alignSelf: 'flex-end',
    }),
};

export default styles;
