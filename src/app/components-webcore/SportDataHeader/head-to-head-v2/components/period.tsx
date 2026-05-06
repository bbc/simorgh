/** @jsxImportSource @emotion/react */
import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';
import styles from './index.styles';

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
    <div css={styles.period()} aria-hidden="true">
      <div>{period.value}</div>
    </div>
  );
};

export default Period;
