import { css, Theme } from '@emotion/react';
import { flipXSelf, timeStamp } from 'happy-dom/lib/PropertySymbol';

const styles = {
  main: ({ spacings, mq }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  inner: css({
    maxWidth: '63rem',
    margin: '0 auto',
  }),
  margins: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
      [mq.GROUP_0_MAX_WIDTH]: {
        margin: `${spacings.TRIPLE}rem 0`,
      },
      [mq.GROUP_1_ONLY]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
      },
      [mq.GROUP_2_ONLY]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
      },
      [mq.GROUP_3_ONLY]: {
        margin: `${spacings.SEXTUPLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUINTUPLE}rem 0`,
      },
    }),

  timelineItem: {
    position: 'relative',

    marginBottom: '2rem',

    '::after': {
      content: '""',
      position: 'absolute',
      top: `24x`, // start from center of pulse
      left: '12px', // center of pulse
      width: '2px',
      height: 'calc(100% + 0.5rem)', // extend below the current item
      backgroundColor: '#006666',
      zIndex: 0,
    },
  },

  timelineItemLast: {
    position: 'relative',

    marginBottom: '2rem',
    '::after': {
      display: 'none', // no line after last item
    },
  },

  livesummary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
    zIndex: 1,
    margin: 0,
  },

  timeline: {
    paddingTop: '1rem',
  },

  livesummarydetails: {
    paddingTop: '2rem',
  },
  timeStamp: {
    paddingRight: '1rem',
  },
};

export default styles;
