import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';
import styles from './index.styles';
import type { EventStatusType, RunningScores } from '../types';

interface PeriodLabels {
  value: string;
  accessible: string;
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
  const period = getFallbackFootballPeriodLabel(
    labels,
    status,
    homeRunningScores,
    awayRunningScores,
  );
  return (
    <div css={styles.period} aria-hidden="true">
      <div>{period.value}</div>
    </div>
  );
};

export default Period;
