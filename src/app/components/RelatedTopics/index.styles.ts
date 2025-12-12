import { css, Theme } from '@emotion/react';

const styles = {
  wrapper:
    (backgroundColour?: string) =>
    ({ spacings }: Theme) =>
      css({
        padding: `0 0 ${spacings.QUINTUPLE}rem`,
        backgroundColor: backgroundColour || 'transparent',
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
