// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
// import { css } from '@emotion/react';

// import {
//   createSize,
//   fontEmphasised,
//   GROUP_3,
//   SPACING_1,
//   SPACING_2,
//   SPACING_3,
//   SPACING_4,
//   SPACING_6,
//   // eslint-disable-next-line no-restricted-imports
//   fontWeights,
// } from '@bbc/web-gel-foundations';
// import {
//   getScoreColourStyle,
//   getStyledLineColour,
// } from '../helpers/colour-styles.js';
// import { fixedHeightConciseView } from '../helpers/concise-styles.jsx';

import pixelsToRem from '../../../../utilities/pixelsToRem';

const HOME_SCORE = 'home_score';
const VERTICAL_LINE = 'vertical_line';
const AWAY_SCORE = 'away_score';

const MATCH_STATUS_LETTERS: Record<string, string> = {
  Postponed: 'P',
  Cancelled: 'C',
};

interface ScoreProps {
  status: string;
  home?: string;
  homeScoreUnconfirmed?: string;
  away?: string;
  awayScoreUnconfirmed?: string;
  isConciseView?: boolean;
}

const Score = ({
  status,
  home,
  homeScoreUnconfirmed,
  away,
  awayScoreUnconfirmed,
<<<<<<< HEAD:src/app/components-webcore/SportDataHeader/head-to-head-v2/components/score.jsx
  isConciseView,
}) => {
=======
}: ScoreProps) => {
>>>>>>> df1467c11d (Convert to ts):src/app/components-webcore/SportDataHeader/head-to-head-v2/components/score.tsx
  const matchStatusLetter = MATCH_STATUS_LETTERS[status];
  const homeScore = homeScoreUnconfirmed || home;
  const awayScore = awayScoreUnconfirmed || away;

  return (
    <StyledScore
      data-testid="score"
      aria-hidden="true"
      status={status}
      isConciseView={isConciseView}
    >
      <HomeScore>{matchStatusLetter || homeScore}</HomeScore>
      <VerticalLine status={status} isConciseView={isConciseView} />
      <AwayScore>{matchStatusLetter || awayScore}</AwayScore>
    </StyledScore>
  );
};

export default Score;
