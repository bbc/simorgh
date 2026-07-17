import { Translations } from '#app/models/types/translations';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from '../index.styles';
import type { RunningScores } from '../types';

interface ScoreDetailsProps {
  homeName: string;
  awayName: string;
  homeRunningScores?: RunningScores;
  awayRunningScores?: RunningScores;
  translations?: Translations['sport'];
}

const ScoreDetails = ({
  homeName,
  awayName,
  homeRunningScores,
  awayRunningScores,
  translations,
}: ScoreDetailsProps) => {
  const shouldDisplayHT = Boolean(
    homeRunningScores?.halftime && awayRunningScores?.halftime,
  );
  const shouldDisplayFT = Boolean(
    homeRunningScores?.fulltime &&
    awayRunningScores?.fulltime &&
    homeRunningScores?.extratime &&
    awayRunningScores?.extratime,
  );

  if (!shouldDisplayFT && !shouldDisplayHT) {
    return null;
  }

  const { ft = 'FT', ht = 'HT' } = translations || {};
  const ftAccessible = ft === 'FT' ? 'Full Time' : ft;
  const htAccessible = ht === 'HT' ? 'Half Time' : ht;

  return (
    <div css={styles.scoreDetailsWrapper}>
      {shouldDisplayFT && (
        <>
          <VisuallyHiddenText>{`${ftAccessible} ${homeName} ${homeRunningScores?.fulltime} , ${awayName} ${awayRunningScores?.fulltime}`}</VisuallyHiddenText>

          <div
            css={styles.scoreDetailsScore}
            aria-hidden="true"
          >{`${ft} ${homeRunningScores?.fulltime}-${awayRunningScores?.fulltime}`}</div>

          <span css={styles.scoreDetailsComma}>,</span>
        </>
      )}
      {shouldDisplayHT && (
        <>
          <VisuallyHiddenText>{`${htAccessible} ${homeName} ${homeRunningScores?.halftime} , ${awayName} ${awayRunningScores?.halftime}`}</VisuallyHiddenText>{' '}
          <div
            css={styles.scoreDetailsScore}
            aria-hidden="true"
          >{`${ht} ${homeRunningScores?.halftime}-${awayRunningScores?.halftime}`}</div>
        </>
      )}
    </div>
  );
};

export default ScoreDetails;
