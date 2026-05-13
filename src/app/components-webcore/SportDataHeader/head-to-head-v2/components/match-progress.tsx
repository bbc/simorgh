import { getFallbackFootballPeriodLabel } from '../helpers/event-summary';
import { isInProgressStatus } from '../helpers/event-status-groups';
import { shouldShowScores } from './centre';
import Period from './period';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';
import type { HeadToHeadV2Data } from '../types';

interface MatchProgressProps {
  data: HeadToHeadV2Data;
  isConciseView: boolean;
}

const MatchProgress = ({ data, isConciseView }: MatchProgressProps) => {
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
    <div css={styles.matchProgressWrapper(isConciseView)}>
      {shouldDisplayAggScore && (
        <>
          <VisuallyHiddenText>
            {`Aggregate score ${home.fullName} ${home.runningScores?.aggregate} , ${away.fullName} ${away.runningScores?.aggregate}`}
          </VisuallyHiddenText>
          <div
            css={styles.aggregateScore}
            data-testid="agg-score"
            aria-hidden="true"
          >
            {`(Agg ${home.runningScores?.aggregate}-${away.runningScores?.aggregate})`}
          </div>
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
          />
        </>
      )}
    </div>
  );
};

export default MatchProgress;
