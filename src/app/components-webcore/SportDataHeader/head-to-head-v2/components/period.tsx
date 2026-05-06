// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

interface RunningScores {
  halftime?: string;
  fulltime?: string;
  extratime?: string;
  aggregate?: string;
  penaltyShootout?: string;
}

interface PeriodProps {
  labels: { value: string; accessible: string };
  status: string;
  homeRunningScores?: RunningScores;
  awayRunningScores?: RunningScores;
  isConciseView?: boolean;
}

const Period = ({ labels, status, homeRunningScores, awayRunningScores }: PeriodProps) => {
  const period = getFallbackFootballPeriodLabel(
    labels,
    status,
    homeRunningScores,
    awayRunningScores,
  );
  return (
    <StyledPeriod
      aria-hidden="true"
      status={status}
      isConciseView={isConciseView}
    >
      <div>{period.value}</div>
    </StyledPeriod>
  );
};

export default Period;
