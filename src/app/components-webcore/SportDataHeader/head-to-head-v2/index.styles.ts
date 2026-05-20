import { css, type Theme } from '@emotion/react';

import pixelsToRem from '../../../utilities/pixelsToRem';

// Constants for grid areas
export const GRID_AREAS = {
  homeText: 'home_text',
  awayText: 'away_text',
  centreText: 'centre_text',
} as const;

const HOME_SCORE = 'home_score';
const VERTICAL_LINE = 'vertical_line';
const AWAY_SCORE = 'away_score';

// Helper for centre min-width calculation
const getCentreMinWidthPx = (maxScoreLength?: number) =>
  maxScoreLength && maxScoreLength > 1
    ? { desktop: 106, mobile: 90 }
    : { desktop: 85, mobile: 77 };

// Shared key events styles
const keyEventsBase = css({
  paddingInline: `${pixelsToRem(16)}rem`,
  '@supports not (display: grid)': {
    display: 'inline-flex',
    width: '50%',
    boxSizing: 'border-box',
  },
});

export default {
  // ==================== Main Wrapper (Theme-based) ====================
  wrapper:
    ({ isConciseView }: { isConciseView?: boolean }) =>
    ({ palette }: Theme) =>
      css({
        background: isConciseView ? palette.GREY_15 : palette.GREY_16,
        borderLeft: `medium none ${palette.LIVE_CORE}`,
      }),
  container:
    ({ isConciseView }: { isConciseView?: boolean }) =>
    ({ mq, palette }: Theme) =>
      css({
        fontFamily: 'ReithSans, Helvetica, Arial, freesans, sans-serif',
        fontWeight: 400,
        fontFeatureSettings: "'ss01' off",
        color: palette.LUNAR_LIGHT,
        padding: isConciseView ? '8px' : '0',
        ...(!isConciseView && { paddingBottom: `${pixelsToRem(24)}rem` }),
        [mq.GROUP_2_MAX_WIDTH]: {
          paddingTop: isConciseView ? '8px' : '0',
          ...(!isConciseView && { paddingBottom: `${pixelsToRem(8)}rem` }),
        },
      }),

  // ==================== Action Grid ====================
  actionGrid: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
        '${GRID_AREAS.centreText}   ${GRID_AREAS.centreText}'
        '${GRID_AREAS.homeText}     ${GRID_AREAS.awayText}'`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      gridTemplateColumns: `1fr ${pixelsToRem(150)}rem 1fr`,
      gridTemplateAreas: `'${GRID_AREAS.homeText}   ${GRID_AREAS.centreText}   ${GRID_AREAS.awayText}'`,
    },
  }),

  // ==================== Action ====================
  actionList: (alignment: 'home' | 'away') =>
    css({
      listStyle: 'none',
      padding: 0,
      margin: 0,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBlockStart: `${pixelsToRem(4)}rem`,
        justifyContent: alignment === 'home' ? 'flex-end' : 'flex-start',
      },
    }),

  actionItem: (alignment: 'home' | 'away') =>
    css({
      fontFamily: 'ReithSans, Helvetica, Arial, freesans, sans-serif',
      fontWeight: 700,
      fontFeatureSettings: "'ss01' off",
      fontSize: `${pixelsToRem(14)}rem`,
      lineHeight: 1.2857142857142858,
      paddingBlockEnd: `${pixelsToRem(8)}rem`,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        fontSize: '1rem',
        lineHeight: 1.375,
        paddingBlockEnd: `${pixelsToRem(8)}rem`,
        ...(alignment === 'home'
          ? { paddingInlineStart: `${pixelsToRem(12)}rem` }
          : { paddingInlineEnd: `${pixelsToRem(12)}rem` }),
      },
    }),

  // ==================== Actions Time ====================
  textBlock: css({
    whiteSpace: 'nowrap',
  }),

  // ==================== Card ====================
  redCard: css({
    paddingInline: `${pixelsToRem(3.2)}rem`,
    display: 'inline-block',
    verticalAlign: 'bottom',
    width: `${pixelsToRem(11.2)}rem`,
    marginBlockEnd: `${pixelsToRem(-3.2)}rem`,
  }),

  yellowCard: css({
    paddingInline: `${pixelsToRem(3.2)}rem`,
    display: 'inline-block',
    verticalAlign: 'bottom',
    marginBlockEnd: `${pixelsToRem(-6.4)}rem`,
    width: `${pixelsToRem(16)}rem`,
  }),

  cardContainer: css({
    display: 'inline-block',
    boxSizing: 'content-box',
  }),

  // ==================== Centre ====================
  centre: (maxScoreLength?: number) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      minWidth: `${pixelsToRem(getCentreMinWidthPx(maxScoreLength).mobile)}rem`,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        minWidth: `${pixelsToRem(getCentreMinWidthPx(maxScoreLength).desktop)}rem`,
      },
    }),

  // ==================== Fixture Time ====================
  fixtureTime: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${pixelsToRem(40)}rem`,
    lineHeight: 1.125,
    fontWeight: 500,
    paddingInline: `${pixelsToRem(4)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      fontSize: `${pixelsToRem(50)}rem`,
      lineHeight: 1.08,
      paddingInline: `${pixelsToRem(32)}rem`,
    },
  }),

  // ==================== Footer ====================
  footer: css({
    fontSize: `${pixelsToRem(14)}rem`,
    lineHeight: 1.2857142857142858,
    paddingBlockEnd: `${pixelsToRem(16)}rem`,
    textAlign: 'center',
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      fontSize: '1rem',
      lineHeight: 1.375,
      paddingBlockEnd: `${pixelsToRem(8)}rem`,
    },
  }),

  footerTextWrapper: css({
    display: 'inline-block',
    fontSize: `${pixelsToRem(13)}rem`,
    '&:not(:first-child)': {
      marginInlineStart: `${pixelsToRem(8)}rem`,
    },
  }),

  venue: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBlockEnd: `${pixelsToRem(4)}rem`,
  }),

  attendanceValue: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  }),

  venueLabel: css({
    color: '#a8a8a8',
    paddingInlineEnd: `${pixelsToRem(4)}rem`,
  }),

  attendanceLabel: css({
    color: '#a8a8a8',
    paddingInlineEnd: `${pixelsToRem(4)}rem`,
  }),

  horizontalRule: css({
    width: `${pixelsToRem(12)}rem`,
    border: 'none',
    borderBlockStart: `${pixelsToRem(1)}rem solid #FFD230`,
    paddingBlockEnd: `${pixelsToRem(4)}rem`,
  }),

  // ==================== Grouped Events ====================
  groupedEventsWrapper: css({
    marginBlock: `${pixelsToRem(8)}rem 0`,
    marginInline: `${pixelsToRem(24)}rem`,
  }),

  actionWrapper: css({
    borderBlockStart: `${pixelsToRem(1)}rem solid #505050`,
  }),

  groupLabel: css({
    gridArea: GRID_AREAS.centreText,
    fontFamily: 'ReithSans, Helvetica, Arial, freesans, sans-serif',
    fontWeight: 700,
    fontFeatureSettings: "'ss01' off",
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 1.375,
    paddingBlock: `${pixelsToRem(8)}rem ${pixelsToRem(4)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      paddingBlock: `${pixelsToRem(8)}rem ${pixelsToRem(20)}rem`,
    },
  }),

  groupedHomeEvent: css({
    gridArea: GRID_AREAS.homeText,
    textAlign: 'end',
    fontSize: `${pixelsToRem(14)}rem`,
    lineHeight: 1.2857142857142858,
    paddingBlock: `0 ${pixelsToRem(12)}rem`,
    paddingInline: `0 ${pixelsToRem(16)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      fontSize: '1rem',
      lineHeight: 1.375,
      paddingBlock: `${pixelsToRem(8)}rem ${pixelsToRem(20)}rem`,
      paddingInline: 0,
    },
  }),

  groupedAwayEvent: css({
    gridArea: GRID_AREAS.awayText,
    textAlign: 'start',
    fontSize: `${pixelsToRem(14)}rem`,
    lineHeight: 1.2857142857142858,
    paddingBlock: `0 ${pixelsToRem(12)}rem`,
    paddingInline: `${pixelsToRem(16)}rem 0`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      fontSize: '1rem',
      lineHeight: 1.375,
      paddingBlock: `${pixelsToRem(8)}rem ${pixelsToRem(20)}rem`,
      paddingInline: 0,
    },
  }),

  // ==================== Head-to-Head Banner ====================
  gridContainer: (isConciseView?: boolean, shouldHideBadges?: boolean) =>
    css({
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: isConciseView ? 'center' : 'stretch',
      gridTemplateAreas: `
        'home_team         scores            away_team'
        'progress          progress          progress'`,
      ...(!isConciseView &&
        !shouldHideBadges && {
          [`@media (max-width: calc(${pixelsToRem(600)}rem - ${pixelsToRem(1)}rem))`]:
            {
              gridTemplateColumns: '1fr auto auto 1fr',
              gridTemplateAreas: `
              'home_team         scores            scores            away_team'
              'home_team         progress          progress          away_team'`,
            },
        }),
    }),

  teamHome: css({
    gridArea: 'home_team',
    display: 'flex',
    alignItems: 'stretch',
    '@supports not (display: grid)': {
      display: 'inline-block',
      width: '33%',
    },
  }),

  teamAway: css({
    gridArea: 'away_team',
    display: 'flex',
    alignItems: 'stretch',
    '@supports not (display: grid)': {
      display: 'inline-block',
      width: '33%',
    },
  }),

  scores: css({
    gridArea: 'scores',
    margin: 'auto',
    '@supports not (display: grid)': {
      display: 'inline-block',
      width: '33%',
    },
  }),

  matchProgressContainer: css({
    gridArea: 'progress',
  }),

  // ==================== Head-to-Head Header ====================
  headerWrapper: (isLive: boolean) =>
    css({
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: `${pixelsToRem(14)}rem`,
      lineHeight: 1.2857142857142858,
      paddingBlockEnd: `${pixelsToRem(16)}rem`,
      paddingBlockStart: isLive ? 0 : `${pixelsToRem(16)}rem`,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        flexDirection: 'row',
        fontSize: '1rem',
        lineHeight: 1.375,
        paddingBlockStart: isLive
          ? `${pixelsToRem(8)}rem`
          : `${pixelsToRem(24)}rem`,
      },
    }),

  dateWrapper: css({
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      flexDirection: 'row',
    },
  }),

  dateHeader: css({
    display: 'flex',
    justifyContent: 'center',
    paddingBlockEnd: `${pixelsToRem(4)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      paddingBlockEnd: 0,
    },
  }),

  interpunct: css({
    color: '#a8a8a8',
    display: 'none',
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      display: 'inline',
      paddingInline: `${pixelsToRem(8)}rem`,
    },
  }),

  tournamentHeader: css({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  }),

  date: css({
    color: '#a8a8a8',
    flexShrink: 0,
  }),

  competitionFormatter: css({
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: 0,
    flexShrink: 1,
  }),

  // ==================== Key Events ====================
  keyEventsHome: [
    keyEventsBase,
    css({
      textAlign: 'end',
      gridArea: GRID_AREAS.homeText,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        paddingInline: 0,
      },
    }),
  ],

  keyEventsAway: [
    keyEventsBase,
    css({
      gridArea: GRID_AREAS.awayText,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        paddingInline: 0,
      },
    }),
  ],

  // ==================== Match Progress ====================
  matchProgressWrapper: (isConciseView?: boolean) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      ...(!isConciseView && {
        paddingBlock: `${pixelsToRem(8)}rem ${pixelsToRem(4)}rem`,
        gap: `${pixelsToRem(8)}rem`,
      }),
    }),

  aggregateScore: css({
    fontSize: `${pixelsToRem(14)}rem`,
    lineHeight: 1.2857142857142858,
    textAlign: 'center',
  }),

  // ==================== Penalty Scores ====================
  penaltyScoresContainer: css({
    fontSize: '1rem',
    lineHeight: 1.375,
    textAlign: 'center',
    paddingBlock: `${pixelsToRem(4)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      paddingBlockEnd: `${pixelsToRem(8)}rem`,
    },
  }),

  winningTeamName: css({
    fontFamily: 'ReithSans, Helvetica, Arial, freesans, sans-serif',
    fontWeight: 700,
    fontFeatureSettings: "'ss01' off",
    color: '#FFD230',
  }),

  penaltiesText: css({
    color: '#A8A8A8',
  }),

  // ==================== Period ====================
  period: css({
    display: 'flex',
    justifyContent: 'center',
    color: '#FFD230',
    fontSize: '1rem',
    lineHeight: 1.375,
  }),

  // ==================== Score ====================
  score: css({
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateAreas: `'${HOME_SCORE}  ${VERTICAL_LINE}  ${AWAY_SCORE}'`,
    fontWeight: 500,
    alignItems: 'center',
    color: '#F8F8F8',
    fontSize: `${pixelsToRem(40)}rem`,
    lineHeight: 1.1,
    paddingInline: `${pixelsToRem(4)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      fontSize: `${pixelsToRem(50)}rem`,
      lineHeight: 1.08,
      paddingInline: `${pixelsToRem(24)}rem`,
    },
  }),

  homeScore: css({
    gridArea: HOME_SCORE,
    textAlign: 'end',
  }),

  awayScore: css({
    gridArea: AWAY_SCORE,
    textAlign: 'start',
  }),

  verticalLine: css({
    borderInlineStart: `${pixelsToRem(2)}rem solid #FFD230`,
    display: 'inline-block',
    marginInline: `${pixelsToRem(16)}rem`,
    gridArea: VERTICAL_LINE,
    height: `${pixelsToRem(38)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      height: `${pixelsToRem(44)}rem`,
    },
  }),

  // ==================== Score Details ====================
  scoreDetailsWrapper: css({
    gridArea: GRID_AREAS.centreText,
    display: 'flex',
    rowGap: `${pixelsToRem(8)}rem`,
    fontSize: `${pixelsToRem(14)}rem`,
    lineHeight: 1.2857142857142858,
    textAlign: 'center',
    color: '#F8F8F8',
    paddingBlock: `${pixelsToRem(4)}rem ${pixelsToRem(12)}rem`,
    flexDirection: 'row',
    justifyContent: 'center',
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      paddingBlock: `${pixelsToRem(4)}rem ${pixelsToRem(8)}rem`,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  }),

  scoreDetailsScore: css({
    color: '#A8A8A8',
  }),

  scoreDetailsComma: css({
    color: '#A8A8A8',
    paddingInlineEnd: `${pixelsToRem(4)}rem`,
    [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
      display: 'none',
    },
  }),

  // ==================== Team Name ====================
  teamNameWrapper: (isConciseView?: boolean, shouldHideBadges?: boolean) =>
    css({
      display: 'flex',
      gap: `${pixelsToRem(8)}rem`,
      alignItems: 'center',
      fontSize: '1rem',
      lineHeight: 1.375,
      padding: shouldHideBadges
        ? `0 ${pixelsToRem(8)}rem`
        : `0 0 ${pixelsToRem(8)}rem`,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        padding: 0,
        fontSize: '1.5rem',
        lineHeight: 1.1666666666666667,
      },
      ...(isConciseView && {
        fontSize: `${pixelsToRem(14)}rem`,
        lineHeight: 1.2857142857142858,
        padding: 0,
        [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
          fontSize: `${pixelsToRem(16)}rem`,
          lineHeight: 1.375,
        },
      }),
    }),

  mobileValue: css({
    [`@media (min-width: ${pixelsToRem(900)}rem)`]: {
      display: 'none',
    },
  }),

  desktopValue: css({
    display: 'none',
    [`@media (min-width: ${pixelsToRem(900)}rem)`]: {
      display: 'inline',
    },
  }),

  // ==================== Team ====================
  team: (
    isConciseView?: boolean,
    shouldHideBadges?: boolean,
    alignment?: 'home' | 'away',
  ) =>
    css({
      display: 'flex',
      gap: `${pixelsToRem(8)}rem`,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexGrow: 2,
      fontSize: '1rem',
      lineHeight: 1.375,
      flexDirection: isConciseView || shouldHideBadges ? 'row' : 'column',
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        gap: `${pixelsToRem(20)}rem`,
        flexDirection: 'row',
      },
      ...(isConciseView && {
        [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
          gap: `${pixelsToRem(12)}rem`,
        },
      }),
      ...(alignment === 'home' && {
        justifyContent: 'flex-end',
        textAlign: 'end',
        ...(!isConciseView &&
          !shouldHideBadges && {
            [`@media (max-width: calc(${pixelsToRem(600)}rem - ${pixelsToRem(1)}rem))`]:
              {
                justifyContent: 'flex-end',
                flexDirection: 'column-reverse',
                textAlign: 'center',
              },
          }),
      }),
      ...(alignment === 'away' && {
        justifyContent: 'flex-start',
        textAlign: 'start',
        ...(!isConciseView &&
          !shouldHideBadges && {
            [`@media (max-width: calc(${pixelsToRem(600)}rem - ${pixelsToRem(1)}rem))`]:
              {
                textAlign: 'center',
              },
          }),
      }),
    }),

  // ==================== Sport Badge ====================
  badgeContainer: (
    size: { small?: number; medium?: number; large?: number } | number = 20,
  ) => {
    const smallSize = typeof size === 'number' ? size : size.small || 20;
    const mediumSize = typeof size === 'number' ? size : size.medium || 20;
    const largeSize = typeof size === 'number' ? 27 : size.large || 27;

    return css({
      display: 'flex',
      justifyContent: 'center',
      flexShrink: 0,
      width: `${pixelsToRem(smallSize)}rem`,
      height: `${pixelsToRem(smallSize)}rem`,
      [`@media (min-width: ${pixelsToRem(600)}rem)`]: {
        width: `${pixelsToRem(mediumSize)}rem`,
        height: `${pixelsToRem(mediumSize)}rem`,
      },
      [`@media (min-width: ${pixelsToRem(900)}rem)`]: {
        width: `${pixelsToRem(largeSize)}rem`,
        height: `${pixelsToRem(largeSize)}rem`,
      },
    });
  },

  badgeImage: css({
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  }),
};
