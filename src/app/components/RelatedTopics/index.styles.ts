import { css, Theme } from '@emotion/react';

const styles = {
  wrapper: ({ spacings, palette }: Theme) =>
    css({
      padding: `0 0 ${spacings.QUINTUPLE}rem`,
      backgroundColor: palette.GREY_2,
    }),
  sectionLabel: ({ mq }: Theme) =>
    css({
      marginTop: 0,
      [mq.GROUP_3_ONLY]: {
        marginBottom: '1rem',
      },
    }),
};

export default styles;
