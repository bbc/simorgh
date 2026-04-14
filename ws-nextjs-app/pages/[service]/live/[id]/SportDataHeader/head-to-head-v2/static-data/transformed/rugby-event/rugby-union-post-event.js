export const rugbyUnionPostEvent = {
  id: 'EVP4244795',
  date: 'Sat 28 Oct 2023',
  status: 'PostEvent',
  period: 'FT',
  periodLabel: { value: 'FT', accessible: 'Full time' },
  tournament: {
    id: 'TOP475',
    name: 'United Rugby Championship',
    urn: 'urn:bbc:sportsdata:rugby-union:tournament:pro-tournament'
  },
  sport: 'rugby-union',
  urn: 'urn:bbc:sportsdata:rugby-union:event:EVP4244795',
  groupedActions: [
    { groupName: { fullName: 'Tries', shortName: 'TRIES' }, homeTeamActions: ['Aungier'], awayTeamActions: [] },
    {
      groupName: { fullName: 'Conversions', shortName: 'CONS' },
      homeTeamActions: ['Hanrahan'],
      awayTeamActions: []
    },
    {
      groupName: { fullName: 'Penalties', shortName: 'PENS' },
      homeTeamActions: ['Hanrahan (5)'],
      awayTeamActions: ['Butler (3)']
    },
    { groupName: { fullName: 'Drop Goal', shortName: 'DG' }, homeTeamActions: ['Hansen'], awayTeamActions: [] }
  ],
  home: {
    id: 'TMP73763',
    urn: 'urn:bbc:sportsdata:rugby-union:team:connacht',
    fullName: 'Connacht',
    shortName: 'Connacht',
    alignment: 'home',
    runningScores: { halftime: '3', fulltime: '22' },
    score: '22'
  },
  away: {
    id: 'TMP73758',
    urn: 'urn:bbc:sportsdata:rugby-union:team:munster',
    fullName: 'Munster',
    shortName: 'Munster',
    runningScores: { halftime: '6', fulltime: '9' },
    score: '9'
  },
  venue: { name: 'The Sportsground' },
  eventGroupingLabel: 'United Rugby Championship',
  tournamentDescriptionLabel: 'United Rugby Championship',
  accessibleEventSummary: 'Connacht 22 , Munster 9 at Full time , Connacht win 22 - 9'
};

export const homeKeyEventsData = [
  {
    playerId: 'csvqjyuk06gzvjm408513nydx',
    playerName: 'Aungier',
    actionType: 'Try',
    actions: [
      {
        type: 'Try',
        typeLabel: {
          value: 'Try',
          accessible: 'Try'
        },
        timeLabel: {
          value: "27'",
          accessible: '27 minutes'
        }
      }
    ]
  },
  {
    actionType: 'card',
    actions: [
      {
        timeLabel: {
          accessible: '74 minutes',
          value: "74'"
        },
        type: 'Two Yellow Cards',
        typeLabel: {
          accessible: 'Two Yellow Cards',
          value: 'Two Yellow Cards'
        }
      }
    ],
    playerId: 'e6la6wx7o6x7k4srpq8tdsafp',
    playerName: 'J. Stephens'
  }
];

export const awayKeyEventsData = [
  {
    playerId: 'd8j2thx',
    playerName: 'Butler',
    actionType: 'Try',
    actions: [
      {
        type: 'Try',
        typeLabel: {
          value: 'Try',
          accessible: 'Try'
        },
        timeLabel: {
          value: "13'",
          accessible: '13 minutes'
        }
      },
      {
        type: 'Penalty',
        typeLabel: {
          value: 'Penalty',
          accessible: 'Penalty'
        },
        timeLabel: {
          value: "30'",
          accessible: '30 minutes'
        }
      }
    ]
  }
];
