import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';
import styles from './index.styles';
import type { EventStatus } from '../types';
import type { RunningScores } from './actions';

interface PeriodLabel {
  value: string;
  accessible: string;
}

interface PeriodProps {
  labels: PeriodLabel;
  status: EventStatus;
  homeRunningScores?: RunningScores;
  awayRunningScores?: RunningScores;
  isConciseView?: boolean;
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
    <div css={styles.period()} aria-hidden="true">
      <div>{period.value}</div>
    </div>
  );
};

export default Period;
