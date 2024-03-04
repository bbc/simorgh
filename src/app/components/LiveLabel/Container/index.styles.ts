import { css, Theme } from '@emotion/react';

const styles = {
  liveLabelContainer: ({ palette }: Theme) =>
    css({
      display: 'inline-flex',
      verticalAlign: 'top',
      alignItems: 'center',
      color: palette.LIVE_LIGHT,
    }),
};

export default styles;
