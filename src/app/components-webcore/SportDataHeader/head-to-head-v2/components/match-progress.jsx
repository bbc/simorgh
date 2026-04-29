// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
// import {
//   fontScaleDescription,
//   SPACING_1,
//   SPACING_2,
// } from '@bbc/web-gel-foundations';
import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';
import { isInProgressStatus } from '../helpers/event-status-groups.js';
import { shouldShowScores } from './centre.jsx';
import Period from './period.jsx';

// eslint-disable-next-line import/no-relative-packages
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const MatchProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ isConciseView }) =>
    !isConciseView &&
    css`
      padding: 8px 0 4px;
      gap: 8px;
    `}
`;

const AggregateScore = styled.div`
  font-size: 14px;
  line-height: 1.2857142857142858;
  text-align: center;
  ${
    '' /* ${({ theme, isConciseView }) =>
    isConciseView &&
    css`
      padding: '4px 0';
      color: ${theme.colourPalette.secondary};
    `} */
  }
`;

const MatchProgress = ({ data, isConciseView }) => {
  const { home, away, periodLabel, status, multiLeg } = data;

  const shouldDisplayAggScore =
    multiLeg &&
    multiLeg.leg > 1 &&
    home.runningScores?.aggregate &&
    away.runningScores?.aggregate;

  const fallbackPeriod =
    periodLabel &&
    getFallbackFootballPeriodLabel(
      periodLabel,
      status,
      home.runningScores,
      away.runningScores,
      home.fullName,
      away.fullName,
    );

  const shouldDisplayPeriod =
    periodLabel && fallbackPeriod && shouldShowScores(status);

  if (!shouldDisplayAggScore && !shouldDisplayPeriod) {
    return null;
  }

  return (
    <MatchProgressWrapper isConciseView={isConciseView}>
      {shouldDisplayAggScore && (
        <>
          <VisuallyHiddenText>
            {`Aggregate score ${home.fullName} ${home.runningScores.aggregate} , ${away.fullName} ${away.runningScores.aggregate}`}
          </VisuallyHiddenText>
          <AggregateScore
            data-testid="agg-score"
            aria-hidden="true"
            isConciseView={isConciseView}
          >
            {`(Agg ${home.runningScores.aggregate}-${away.runningScores.aggregate})`}
          </AggregateScore>
        </>
      )}
      {shouldDisplayPeriod && (
        <>
          <VisuallyHiddenText>
            {`${fallbackPeriod.accessible}${
              isInProgressStatus(status) && periodLabel.value !== 'PENS'
                ? ' , in progress'
                : ''
            }`}
          </VisuallyHiddenText>
          <Period
            status={status}
            labels={periodLabel}
            homeRunningScores={home.runningScores}
            awayRunningScores={away.runningScores}
            isConciseView={isConciseView}
          />
        </>
      )}
    </MatchProgressWrapper>
  );
};

export default MatchProgress;
