/** @jsxImportSource @emotion/react */
import SportBadge from './sport-badge/index';
import TeamName from './team-name';
import styles from './index.styles';

interface TeamProps {
  alignment: 'home' | 'away';
  name: string;
  shortName: string;
  urn?: string;
  isConciseView?: boolean;
  shouldHideBadges?: boolean;
  badgePlaceholderFallbackType?: 'badge' | 'flag';
}

const Team = ({
  alignment,
  name,
  shortName,
  urn,
  isConciseView,
  shouldHideBadges,
  badgePlaceholderFallbackType,
}: TeamProps) => {
  const size = isConciseView
    ? { small: 20, medium: 24, large: 24 }
    : { small: 40, medium: 44, large: 44 };
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
            id={urn}
            size={size}
            isConciseView={isConciseView}
            placeholderFallbackType={badgePlaceholderFallbackType}
          />
        )}
      </div>
    );
  }
  return (
    <div css={styles.team(isConciseView, shouldHideBadges, 'away')}>
      {!shouldHideBadges && (
        <SportBadge
          id={urn}
          size={size}
          isConciseView={isConciseView}
          placeholderFallbackType={badgePlaceholderFallbackType}
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
