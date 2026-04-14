import React from 'react';
import styled, { css } from '@bbc/web-styled';
import {
  createSize,
  fontEmphasised,
  GROUP_3,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  // eslint-disable-next-line no-restricted-imports
  fontWeights
} from '@bbc/web-gel-foundations';
import { getScoreColourStyle, getStyledLineColour } from '../helpers/colour-styles.js';
import { fixedHeightConciseView } from '../helpers/concise-styles.jsx';

const HOME_SCORE = 'home_score';
const VERTICAL_LINE = 'vertical_line';
const AWAY_SCORE = 'away_score';

const MATCH_STATUS_LETTERS = {
  Postponed: 'P',
  Cancelled: 'C'
};

const StyledScore = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: '${HOME_SCORE}  ${VERTICAL_LINE}  ${AWAY_SCORE}';
  font-weight: ${fontWeights.medium};
  align-items: center;
  color: ${({ theme, status, isConciseView }) => getScoreColourStyle({ theme, status, isConciseView })};

  font-size: ${createSize(40)};
  line-height: 1.1;
  padding-left: ${SPACING_1};
  padding-right: ${SPACING_1};
  @media (min-width: ${GROUP_3}) {
    font-size: ${createSize(50)};
    line-height: 1.08;
    padding-left: ${SPACING_6};
    padding-right: ${SPACING_6};
  }

  ${({ isConciseView, theme }) =>
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
    `}
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
  ${({ theme, status, isConciseView }) => css`
    border-left: ${createSize(2)} solid ${getStyledLineColour({ theme, status, isConciseView })};
  `};
  display: inline-block;
  margin: 0 ${SPACING_4};
  grid-area: ${VERTICAL_LINE};

  height: ${createSize(38)};
  @media (min-width: ${GROUP_3}) {
    height: ${createSize(44)};
  }

  ${({ isConciseView }) =>
    isConciseView &&
    css`
      height: ${createSize(24)};
      margin: 0 ${SPACING_2};
      @media (min-width: ${GROUP_3}) {
        height: ${createSize(28)};
        margin: 0 ${SPACING_3};
      }
    `}
`;

const Score = ({ status, home, homeScoreUnconfirmed, away, awayScoreUnconfirmed, isConciseView }) => {
  const matchStatusLetter = MATCH_STATUS_LETTERS[status];
  const homeScore = homeScoreUnconfirmed || home;
  const awayScore = awayScoreUnconfirmed || away;

  return (
    <StyledScore data-testid="score" aria-hidden="true" status={status} isConciseView={isConciseView}>
      <HomeScore>{matchStatusLetter || homeScore}</HomeScore>
      <VerticalLine status={status} isConciseView={isConciseView} />
      <AwayScore>{matchStatusLetter || awayScore}</AwayScore>
    </StyledScore>
  );
};

export default Score;
