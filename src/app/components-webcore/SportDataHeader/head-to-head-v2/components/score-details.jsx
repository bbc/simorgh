import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';

const ScoreDetails = ({
  homeName,
  awayName,
  homeRunningScores,
  awayRunningScores,
}) => {
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

  return (
    <div css={styles.scoreDetailsWrapper()}>
      {shouldDisplayFT && (
        <>
          <VisuallyHiddenText>{`Full Time ${homeName} ${homeRunningScores.fulltime} , ${awayName} ${awayRunningScores.fulltime}`}</VisuallyHiddenText>

          <div
            css={styles.scoreDetailsScore()}
            aria-hidden="true"
          >{`FT ${homeRunningScores.fulltime}-${awayRunningScores.fulltime}`}</div>

          <span css={styles.scoreDetailsComma()}>,</span>
        </>
      )}
      {shouldDisplayHT && (
        <>
          <VisuallyHiddenText>{`Half Time ${homeName} ${homeRunningScores.halftime} , ${awayName} ${awayRunningScores.halftime}`}</VisuallyHiddenText>{' '}
          <div
            css={styles.scoreDetailsScore()}
            aria-hidden="true"
          >{`HT ${homeRunningScores.halftime}-${awayRunningScores.halftime}`}</div>
        </>
      )}
    </div>
  );
};

export default ScoreDetails;
