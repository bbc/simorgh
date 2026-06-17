import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { isLiveStatus } from '../helpers/event-status-groups';
import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';
import styles from '../index.styles';
import type { EventStatusType, RunningScores } from '../types';

interface PeriodLabels {
  value: string;
  accessible: string;
  translation?: string;
}

interface PeriodProps {
  labels: PeriodLabels;
  status: EventStatusType;
  homeRunningScores?: RunningScores;
  awayRunningScores?: RunningScores;
}

const Period = ({
  labels,
  status,
  homeRunningScores,
  awayRunningScores,
}: PeriodProps) => {
  const { translations } = use(ServiceContext);

  const period = getFallbackFootballPeriodLabel({
    labels,
    status,
    homeRunningScores,
    awayRunningScores,
    translations: translations?.sport,
  });

  const periodValue = period?.translation || period?.value;
  return (
    <div css={styles.period({ isLive: isLiveStatus(status) })} aria-hidden="true">
      <div>{periodValue}</div>
    </div>
  );
};

export default Period;
