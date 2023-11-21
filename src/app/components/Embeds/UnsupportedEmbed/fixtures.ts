export const sampleTelescopeProps = {
  locator: 'urn:bbc:telescope:vote:LDNXKfL',
  provider: 'telescope-vote',
  usageRights: { suitableForSyndication: true },
  blocks: [
    {
      id: '73f52c1a',
      type: 'aresTelescope',
      model: { isSignInRequired: false, wid: '15268' },
      position: [4, 1],
    },
  ],
};

export const samplePlayerRaterProps = {
  locator:
    'urn:bbc:sportembeds:player-rater:football.s-fakevent5rr212hn7343kbl',
  provider: 'player-rater',
  usageRights: {
    suitableForSyndication: false,
  },
};

export const sampleTeamSelectorProps = {
  locator: 'urn:bbc:sportembeds:team-selector:fts1693400043',
  provider: 'team-selector',
  usageRights: {
    suitableForSyndication: false,
  },
};
