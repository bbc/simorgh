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
import styles from './index.styles';
import type { HeadToHeadV2Data, EventStatus } from '../types';

export const shouldShowScores = (statusGroup: EventStatus | string): boolean =>
  isInProgressStatus(statusGroup) ||
  isResultStatus(statusGroup) ||
  isCalledOffStatus(statusGroup) ||
  statusGroup === 'Postponed';

interface PlayedProps {
  data: HeadToHeadV2Data;
  isConciseView?: boolean;
}

const Played = ({ data, isConciseView }: PlayedProps) => (
  <Score
    status={data.status}
    home={data.home.score}
    homeScoreUnconfirmed={data.home.scoreUnconfirmed}
    away={data.away.score}
    awayScoreUnconfirmed={data.away.scoreUnconfirmed}
    isConciseView={isConciseView}
  />
);

interface CentreProps {
  data: HeadToHeadV2Data;
  isConciseView?: boolean;
  maxScoreLength?: number;
}

const Centre = ({ data, isConciseView, maxScoreLength }: CentreProps) => {
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
