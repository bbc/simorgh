import parseUrn from './parse-urn';
import {
  SUPPORTED_TOURNAMENT_URNS,
  UNIVERSALLY_SUPPORTED_SPORTS,
} from './team-badge-config';

const shouldShowTeamBadges = (tournamentUrn: string) => {
  if (!tournamentUrn) {
    // some use cases (e.g. match preview) do not have tournament URNs
    // if a tournament urn isn't available, it's preferred to show the badges
    return true;
  }

  const { sport } = parseUrn(tournamentUrn);

  return (
    UNIVERSALLY_SUPPORTED_SPORTS.includes(sport) ||
    SUPPORTED_TOURNAMENT_URNS[sport]?.includes(tournamentUrn)
  );
};

export default shouldShowTeamBadges;
