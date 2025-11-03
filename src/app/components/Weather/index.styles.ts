import { css, Theme } from '@emotion/react';

const styles = {
  container: ({ palette, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      border: `1px solid ${palette.GREY_3}`,
      borderRadius: '8px',
      padding: spacings.DOUBLE,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      maxWidth: '100%',
      margin: '0 auto',
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: spacings.TRIPLE,
      },
    }),

  header: ({ fontSizes, fontVariants, spacings }: Theme) =>
    css({
      ...fontSizes.greatPrimer,
      ...fontVariants.sansBold,
      marginBottom: spacings.DOUBLE,
    }),

  dayContainer: ({ palette, spacings }: Theme) =>
    css({
      marginBottom: spacings.TRIPLE,
      border: `1px solid ${palette.GREY_2}`,
      borderRadius: '6px',
      backgroundColor: palette.GREY_1,
      overflow: 'hidden',
      '&:last-child': {
        marginBottom: 0,
      },
    }),

  dayHeader: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      backgroundColor: palette.GREY_2,
      color: palette.GREY_10,
      padding: spacings.DOUBLE,
      margin: 0,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${palette.GREY_3}`,
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: palette.GREY_3,
      },
      '&:focus': {
        outline: `2px solid ${palette.POSTBOX}`,
        outlineOffset: '2px',
      },
    }),

  dayContent: ({ spacings }: Theme) =>
    css({
      padding: spacings.DOUBLE,
    }),

  daySummary: ({ palette, spacings }: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      gap: spacings.FULL,
      alignItems: 'center',
      marginBottom: spacings.DOUBLE,
      padding: spacings.FULL,
      backgroundColor: palette.GREY_1,
      borderRadius: '4px',
    }),

  summaryItem: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      gap: spacings.HALF,
      minWidth: 100,
    }),

  summaryLabel: ({ fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      fontSize: '0.875rem',
    }),

  summaryValue: ({ fontVariants }: Theme) =>
    css({
      ...fontVariants.sansRegular,
    }),

  weatherIcon: ({ spacings }: Theme) =>
    css({
      marginRight: spacings.FULL,
      width: 48,
      height: 48,
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
    }),

  hourlyReports: ({ spacings }: Theme) =>
    css({
      display: 'grid',
      gap: spacings.FULL,
    }),

  hourlyReport: ({ palette, spacings, mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: '80px 48px 1fr auto auto',
      alignItems: 'center',
      padding: spacings.FULL,
      backgroundColor: palette.WHITE,
      borderRadius: '4px',
      gap: spacings.FULL,
      border: `1px solid ${palette.GREY_2}`,
      [mq.GROUP_2_MIN_WIDTH]: {
        gridTemplateColumns: '100px 48px 2fr auto auto',
      },
    }),

  timeSlot: ({ fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansBold,
      color: palette.GREY_10,
      fontSize: '0.95rem',
    }),

  temperature: ({ fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansBold,
      color: palette.GREY_10,
      fontSize: '1.1rem',
    }),

  precipitation: ({ fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      color: palette.GREY_8,
      fontSize: '0.95rem',
      textAlign: 'center',
      position: 'relative',
      display: 'inline-block',
      width: '40px',
      height: '40px',
      marginRight: '20px',
      span: {
        position: 'absolute',
        bottom: 0,
        color: '#3789c6',
        fontSize: '0.8rem !important',
      },
      img: {
        position: 'absolute',
        top: 0,
      },
    }),

  windInfoContainer: ({}: Theme) =>
    css({
      position: 'relative',
    }),

  windInfo: ({ fontVariants, palette, mq }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      color: palette.GREY_8,
      fontSize: '0.7rem !important',
      [mq.GROUP_1_MAX_WIDTH]: {
        display: 'none',
      },
      position: 'absolute',
      top: '11px',
      left: 0,
      display: 'inline-block',
      width: '40px',
      height: '40px',
      textAlign: 'center',
    }),

  expandIcon: ({ palette }: Theme) =>
    css({
      color: palette.GREY_8,
      fontSize: '1.2rem',
      transition: 'transform 0.2s',
      marginLeft: 'auto',
      '&.expanded': {
        transform: 'rotate(180deg)',
      },
    }),

  loading: ({ fontVariants, spacings }: Theme) =>
    css({
      padding: spacings.QUADRUPLE,
      textAlign: 'center',
      ...fontVariants.sansRegular,
    }),

  error: ({ fontVariants, palette, spacings }: Theme) =>
    css({
      padding: spacings.DOUBLE,
      backgroundColor: palette.POSTBOX,
      color: palette.WHITE,
      borderRadius: '4px',
      ...fontVariants.sansRegular,
    }),
  headerGroup: ({ spacings }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacings.FULL,
  }),
  headerDate: ({ fontVariants }: Theme) => ({
    ...fontVariants.sansBold,
    fontSize: '1rem',
  }),
  headerTemp: ({ fontVariants, palette }: Theme) => ({
    ...fontVariants.sansBold,
    color: palette.GREY_10,
    fontSize: '1rem',
    margin: '0 10px 0 0',
  }),
};

export default styles;
