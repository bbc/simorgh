import { css, Theme } from '@emotion/react';

const styles = {
  liveLabelPulse: ({ spacings, palette }: Theme) =>
    css({
      width: `${spacings.TRIPLE}rem`,
      height: `${spacings.TRIPLE}rem`,
      color: palette.LIVE_LIGHT,
      verticalAlign: '0',
    }),
  liveLabelTextWithImage: ({ palette }: Theme) =>
    css({
      'span:first-child': { color: palette.LIVE_LIGHT },
    }),
  liveLabelTextWithoutImage: ({ mq, palette }: Theme) =>
    css({
      'span:first-child': {
        display: 'inline-flex',
        color: palette.LIVE_LIGHT,
        'overflow-wrap': 'anywhere',
        [mq.GROUP_4_MIN_WIDTH]: {
          width: 'calc(100% / 3  - 2.25rem)',
        },
        [mq.GROUP_5_MIN_WIDTH]: {
          width: 'calc(25% - 2.25rem)',
        },
      },
    }),
};

export default styles;
