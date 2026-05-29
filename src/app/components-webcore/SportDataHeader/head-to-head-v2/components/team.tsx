import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import SportBadge from './sport-badge/index';
import TeamName from './team-name';
import styles from '../index.styles';
import type {
  Alignment,
  BadgePlaceholderFallbackType,
  BadgeSize,
} from '../types';

interface TeamProps {
  alignment: Alignment;
  name: string;
  shortName: string;
  urn?: string;
  isConciseView: boolean;
  shouldHideBadges: boolean;
  badgePlaceholderFallbackType?: BadgePlaceholderFallbackType;
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
  const { translations } = use(ServiceContext);

  const teamIdentifier = urn?.split(':').pop();
  const teamTranslation = teamIdentifier
    ? translations?.[teamIdentifier]
    : undefined;
  const fullNameTranslation = teamTranslation || name;
  const shortNameTranslation = teamTranslation || shortName;

  const size: BadgeSize = isConciseView
    ? { small: 20, medium: 24, large: 24 }
    : { small: 40, medium: 44, large: 44 };
  if (alignment === 'home') {
    return (
      <div css={styles.team(isConciseView, shouldHideBadges, 'home')}>
        <TeamName
          fullName={fullNameTranslation}
          shortName={shortNameTranslation}
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
        fullName={fullNameTranslation}
        shortName={shortNameTranslation}
        isConciseView={isConciseView}
        shouldHideBadges={shouldHideBadges}
      />
    </div>
  );
};

export default Team;
