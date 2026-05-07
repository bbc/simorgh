import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';
import styles from './index.styles';

const Period = ({ labels, status, homeRunningScores, awayRunningScores }) => {
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
