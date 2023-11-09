import { css, Theme } from '@emotion/react';

const styles = {
  sectionLabel: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_3_ONLY]: {
        marginBottom: `${spacings.DOUBLE}rem`,
      },
    }),
};

export default styles;
