// import React from 'react';
// import styled, { css } from '@bbc/web-styled';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

// import { createSize, GROUP_3 } from '@bbc/web-gel-foundations';
// import {
//   isCalledOffStatus,
//   isInProgressStatus,
//   isResultStatus,
// } from '@bbc/web-sport-utils';
import {
  isCalledOffStatus,
  isInProgressStatus,
  isResultStatus,
} from '../helpers/event-status-groups';

import Time from './fixture-time';
import Score from './score';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

// ensures team names / badges line up down the page across "HH:mm", "TBC", single-digit and double-digit scores
// it is acceptable for the badges/team names to be spaced more widely for triple-digit+ scores, as these are very rare
const getCentreMinWidthPx = maxScoreLength =>
  maxScoreLength && maxScoreLength > 1
    ? { desktop: 106, mobile: 90 }
    : { desktop: 85, mobile: 77 };

const StyledCentre = styled.div`
  display: flex;
  flex-direction: column;
  align-self: space-evenly;

  ${({ maxScoreLength }) => css`
    min-width: ${pixelsToRem(getCentreMinWidthPx(maxScoreLength).mobile)}rem;
    @media (min-width: ${pixelsToRem(600)}rem) {
      min-width: ${pixelsToRem(getCentreMinWidthPx(maxScoreLength).desktop)}rem;
    }
  `}
`;

export const shouldShowScores = statusGroup =>
  isInProgressStatus(statusGroup) ||
  isResultStatus(statusGroup) ||
  isCalledOffStatus(statusGroup) ||
  statusGroup === 'Postponed';

const Played = ({ data, isConciseView }) => (
  <Score
    status={data.status}
    home={data.home.score}
    homeScoreUnconfirmed={data.home.scoreUnconfirmed}
    away={data.away.score}
    awayScoreUnconfirmed={data.away.scoreUnconfirmed}
    isConciseView={isConciseView}
  />
);

const Centre = ({ data, isConciseView, maxScoreLength }) => {
  const { status } = data;

  return (
    <StyledCentre isConciseView={isConciseView} maxScoreLength={maxScoreLength}>
      {shouldShowScores(status) ? (
        <Played data={data} isConciseView={isConciseView} />
      ) : (
        <Time time={data.time} isConciseView={isConciseView} />
      )}
    </StyledCentre>
  );
};

export default Centre;
