export const UNIVERSALLY_SUPPORTED_SPORTS = [
  'snooker',
  'darts',
  // not all football leagues have badges, but enough do that it is visually preferred to
  // always show the badge, even if a placeholder
  'football',
];

export const SUPPORTED_TOURNAMENT_URNS = {
  'rugby-union': [
    // Men's international tournaments
    'urn:bbc:sportsdata:rugby-union:tournament:six-nations',
    'urn:bbc:sportsdata:rugby-union:tournament:world-cup',
    'urn:bbc:sportsdata:rugby-union:tournament:rugby-championship',
    'urn:bbc:sportsdata:rugby-union:tournament:autumn-nations-cup',
    'urn:bbc:sportsdata:rugby-union:tournament:international-match',
    'urn:bbc:sportsdata:rugby-union:tournament:british-irish-lions',
    // Men's club tournaments
    'urn:bbc:sportsdata:rugby-union:tournament:english-premiership',
    'urn:bbc:sportsdata:rugby-union:tournament:premiership-rugby-cup',
    'urn:bbc:sportsdata:rugby-union:tournament:pro-tournament',
    'urn:bbc:sportsdata:rugby-union:tournament:top-14',
    'urn:bbc:sportsdata:rugby-union:tournament:super-rugby',
    'urn:bbc:sportsdata:rugby-union:tournament:european-challenge-cup',
    'urn:bbc:sportsdata:rugby-union:tournament:european-cup',
    // Women's international tournaments
    'urn:bbc:sportsdata:rugby-union:tournament:womens-six-nations',
    'urn:bbc:sportsdata:rugby-union:tournament:womens-international-match',
    'urn:bbc:sportsdata:rugby-union:tournament:womens-world-cup'
  ],
  basketball: [
    'urn:bbc:sportsdata:basketball:tournament:nba',
    'urn:bbc:sportsdata:basketball:tournament:bbl',
    'urn:bbc:sportsdata:basketball:tournament:bbl-cup',
    'urn:bbc:sportsdata:basketball:tournament:bbl-trophy'
  ],
  'american-football': ['urn:bbc:sportsdata:american-football:tournament:nfl'],
  'ice-hockey': ['urn:bbc:sportsdata:ice-hockey:tournament:nhl']
};
