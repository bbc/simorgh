import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';

interface TeamNameProps {
  fullName: string;
  shortName: string;
  isConciseView: boolean;
  shouldHideBadges: boolean;
}

const TeamName = ({
  fullName,
  shortName,
  isConciseView,
  shouldHideBadges,
}: TeamNameProps) => (
  <div css={styles.teamNameWrapper(isConciseView, shouldHideBadges)}>
    <span css={styles.mobileValue} aria-hidden="true">
      {shortName}
    </span>
    <span css={styles.desktopValue} aria-hidden="true">
      {fullName}
    </span>
    <VisuallyHiddenText>
      {fullName === 'TBC' ? 'Team to be confirmed' : fullName}
    </VisuallyHiddenText>
  </div>
);

export default TeamName;
