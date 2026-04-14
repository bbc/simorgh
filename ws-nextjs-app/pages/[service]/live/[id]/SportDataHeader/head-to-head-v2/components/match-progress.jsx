import React from 'react';
import styled, { css } from '@bbc/web-styled';
import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
import { fontScaleDescription, SPACING_1, SPACING_2 } from '@bbc/web-gel-foundations';
import { getFallbackFootballPeriodLabel, isInProgressStatus } from '@bbc/web-sport-utils';
import { shouldShowScores } from './centre.jsx';
import Period from './period.jsx';

const MatchProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ isConciseView }) =>
    !isConciseView &&
    css`
      padding: ${SPACING_2} 0 ${SPACING_1};
      gap: ${SPACING_2};
    `}
`;

const AggregateScore = styled.div`
  ${fontScaleDescription}
  text-align: center;
  ${({ theme, isConciseView }) =>
    isConciseView &&
    css`
      padding: ${SPACING_1} 0;
      color: ${theme.colourPalette.secondary};
    `}
`;

const MatchProgress = ({ data, isConciseView }) => {
  const { home, away, periodLabel, status, multiLeg } = data;

  const shouldDisplayAggScore =
    multiLeg && multiLeg.leg > 1 && home.runningScores?.aggregate && away.runningScores?.aggregate;

  const fallbackPeriod =
    periodLabel &&
    getFallbackFootballPeriodLabel(
      periodLabel,
      status,
      home.runningScores,
      away.runningScores,
      home.fullName,
      away.fullName
    );

  const shouldDisplayPeriod = periodLabel && fallbackPeriod && shouldShowScores(status);

  if (!shouldDisplayAggScore && !shouldDisplayPeriod) {
    return null;
  }

  return (
    <MatchProgressWrapper isConciseView={isConciseView}>
      {shouldDisplayAggScore && (
        <>
          <VisuallyHidden>
            {`Aggregate score ${home.fullName} ${home.runningScores.aggregate} , ${away.fullName} ${away.runningScores.aggregate}`}
          </VisuallyHidden>
          <AggregateScore data-testid="agg-score" aria-hidden="true" isConciseView={isConciseView}>
            {`(Agg ${home.runningScores.aggregate}-${away.runningScores.aggregate})`}
          </AggregateScore>
        </>
      )}
      {shouldDisplayPeriod && (
        <>
          <VisuallyHidden>
            {`${fallbackPeriod.accessible}${
              isInProgressStatus(status) && periodLabel.value !== 'PENS' ? ' , in progress' : ''
            }`}
          </VisuallyHidden>
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
