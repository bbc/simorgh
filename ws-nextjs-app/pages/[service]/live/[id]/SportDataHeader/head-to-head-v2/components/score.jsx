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

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

const HOME_SCORE = 'home_score';
const VERTICAL_LINE = 'vertical_line';
const AWAY_SCORE = 'away_score';

const MATCH_STATUS_LETTERS = {
  Postponed: 'P',
  Cancelled: 'C',
};

const StyledScore = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: '${HOME_SCORE}  ${VERTICAL_LINE}  ${AWAY_SCORE}';
  font-weight: 500;
  align-items: center;
  ${
    '' /* color: ${({ theme, status, isConciseView }) =>
    getScoreColourStyle({ theme, status, isConciseView })}; */
  }
  color: '#F8F8F8';

  font-size: '${pixelsToRem(40)}rem';
  line-height: 1.1;
  padding-left: 4px;
  padding-right: 4px;

  @media (min-width: '${pixelsToRem(600)}rem') {
    font-size: '${pixelsToRem(50)}rem';
    line-height: 1.08;
    padding-left: '24px';
    padding-right: '24px';
  }

  ${
    '' /* ${({ isConciseView, theme }) =>
    isConciseView &&
    css`
      ${fontEmphasised({ theme })}

      ${fixedHeightConciseView}
      font-size: ${createSize(20)};
      line-height: 1.2;
      padding-left: ${SPACING_3};
      padding-right: ${SPACING_3};

      @media (min-width: ${GROUP_3}) {
        font-size: ${createSize(20)};
        line-height: 1.2;
        padding-left: ${SPACING_4};
        padding-right: ${SPACING_4};
      }
    `} */
  }
`;

const HomeScore = styled.div`
  grid-area: ${HOME_SCORE};
  text-align: right;
`;

const AwayScore = styled.div`
  grid-area: ${AWAY_SCORE};
  text-align: left;
`;

export const VerticalLine = styled.div`
  ${
    '' /* ${({ theme, status, isConciseView }) => css`
    border-left: ${createSize(2)} solid
      ${getStyledLineColour({ theme, status, isConciseView })};
  `}; */
  }
  border-left: '${pixelsToRem(2)}rem solid #FFD230';
  display: inline-block;
  margin: '0 16px';
  grid-area: ${VERTICAL_LINE};

  height: '${pixelsToRem(38)}rem';
  @media (min-width: '${pixelsToRem(600)}rem') {
    height: '${pixelsToRem(44)}rem';
  }

  ${
    '' /* ${({ isConciseView }) =>
    isConciseView &&
    css`
      height: ${createSize(24)};
      margin: 0 ${SPACING_2};
      @media (min-width: ${GROUP_3}) {
        height: ${createSize(28)};
        margin: 0 ${SPACING_3};
      }
    `} */
  }
`;

const Score = ({
  status,
  home,
  homeScoreUnconfirmed,
  away,
  awayScoreUnconfirmed,
  isConciseView,
}) => {
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
