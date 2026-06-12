const URN_CATEGORIES = [
  'tournament-collection',
  'tournament',
  'team',
  'stage',
  'round',
  'event',
] as const;

type UrnCategory = (typeof URN_CATEGORIES)[number];

type ParsedUrn =
  | { rawValue: string; sport: string; category: UrnCategory; id: string }
  | { rawValue: string; sport: string };

const URN_REGEX = new RegExp(
  `^urn:bbc:sportsdata:(?<sport>[\\w-]+)(?::(?<category>${URN_CATEGORIES.join('|')}):(?<id>[\\w-/]+))?$`,
);

const parseUrn = (rawUrnValue: string): ParsedUrn => {
  if (!rawUrnValue) {
    throw new Error('URN must be supplied');
  }

  const urnMatcher = rawUrnValue.match(URN_REGEX);

  if (!urnMatcher?.groups) {
    throw new Error('URN is malformed');
  }

  const { sport, category, id } = urnMatcher.groups;

  if (category) {
    return {
      rawValue: rawUrnValue,
      sport,
      category: category as UrnCategory,
      id,
    };
  }

  return {
    rawValue: rawUrnValue,
    sport,
  };
};

export default parseUrn;
