import SportBadge from './sport-badge/index';
import TeamName from './team-name';
import styles from '../index.styles';
import type { Alignment, BadgeSize } from '../types';

interface TeamProps {
  alignment: Alignment;
  name: string;
  shortName: string;
  isConciseView: boolean;
  imageUrl: string | null;
  urn: string;
}

const Team = ({
  alignment,
  name,
  shortName,
  isConciseView,
  imageUrl,
  urn,
}: TeamProps) => {
  const size: BadgeSize = isConciseView
    ? { small: 20, medium: 24, large: 24 }
    : { small: 40, medium: 44, large: 44 };

  const shouldHideBadges = !imageUrl;

  if (alignment === 'home') {
    return (
      <div css={styles.team(isConciseView, shouldHideBadges, 'home')}>
        <TeamName
          fullName={name}
          shortName={shortName}
          isConciseView={isConciseView}
          shouldHideBadges={shouldHideBadges}
        />
        {!shouldHideBadges && (
          <SportBadge
            urn={urn}
            src={imageUrl}
            size={size}
            isConciseView={isConciseView}
          />
        )}
      </div>
    );
  }
  return (
    <div css={styles.team(isConciseView, shouldHideBadges, 'away')}>
      {!shouldHideBadges && (
        <SportBadge
          urn={urn}
          src={imageUrl}
          size={size}
          isConciseView={isConciseView}
        />
      )}
      <TeamName
        fullName={name}
        shortName={shortName}
        isConciseView={isConciseView}
        shouldHideBadges={shouldHideBadges}
      />
    </div>
  );
};

export default Team;
