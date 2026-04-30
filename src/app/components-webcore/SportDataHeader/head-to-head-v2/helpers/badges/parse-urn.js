const URN_CATEGORIES = [
  'tournament-collection',
  'tournament',
  'team',
  'stage',
  'round',
  'event',
];

const URN_REGEX = new RegExp(
  `^urn:bbc:sportsdata:(?<sport>[\\w-]+)(?::(?<category>${URN_CATEGORIES.join('|')}):(?<id>[\\w-/]+))?$`,
);

/**
 * @type {typeof import('./parse-urn.d.ts').parseUrn}
 */
const parseUrn = rawUrnValue => {
  if (!rawUrnValue) {
    throw new Error('URN must be supplied');
  }

  const urnMatcher = rawUrnValue.match(URN_REGEX);

  if (!urnMatcher || !urnMatcher.groups) {
    throw new Error('URN is malformed');
  }

  const { sport, category, id } = urnMatcher.groups;

  if (category) {
    return {
      rawValue: rawUrnValue,
      sport,
      category,
      id,
    };
  }

  return {
    rawValue: rawUrnValue,
    sport,
  };
};

export default parseUrn;
