import { css, Theme } from '@emotion/react';

const styles = {
  wrapper:
    (backgroundColour?: string) =>
    ({ spacings }: Theme) =>
      css({
        padding: `${spacings.DOUBLE}rem 0 ${spacings.QUINTUPLE}rem`,
        backgroundColor: backgroundColour || 'transparent',
      }),
  sectionLabel: ({ mq }: Theme) =>
    css({
      marginTop: 0,
      [mq.GROUP_3_MIN_WIDTH]: {
        [mq.GROUP_3_MAX_WIDTH]: {
          marginBottom: '1rem',
        },
      },
    }),
};

export default styles;
