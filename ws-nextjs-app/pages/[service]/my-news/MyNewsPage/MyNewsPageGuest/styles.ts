import { css, Theme } from '@emotion/react';

const styles = {
  heading: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.TRIPLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  actionButtonsContainer: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: `${spacings.FULL}rem`,
      marginTop: `${spacings.DOUBLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      flexWrap: 'wrap',
      [mq.GROUP_1_MAX_WIDTH]: {
        flexDirection: 'row',
      },
    }),
};

export default styles;
