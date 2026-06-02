import { screen } from '@testing-library/react';
import { render } from '#app/components/react-testing-library-with-providers';
import { service as afriqueServiceConfig } from '#app/lib/config/services/afrique';
import translateSportData from './translateSportData';
import HeadToHeadV2 from '../head-to-head-v2';
import { HeadToHeadV2Data } from '../types';

const originalData = {
  urn: 'urn:bbc:sportsdata:football:event:s-3y91hnyfjh24yxjhm77a7hy50',
  home: {
    id: 'ej5er0oyngdw138yuumwqbyqt',
    fullName: 'England',
    shortName: 'England',
    urn: 'urn:bbc:sportsdata:football:team:england',
    runningScores: {
      halftime: '0',
      fulltime: '1',
      aggregate: '1',
    },
    scoreUnconfirmed: '1',
    actions: [
      {
        playerUrn:
          'urn:bbc:sportsdata:football:player:s-2bmeynv0dhsc8sjfuaprkexre',
        playerName: 'J. Rowe',
        actionType: 'goal',
        actions: [
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "90'",
              accessible: '90 minutes',
            },
          },
        ],
      },
    ],
    score: '1',
  },
  away: {
    id: 'b496gs285it6bheuikox6z9mj',
    fullName: 'Germany',
    shortName: 'Germany',
    urn: 'urn:bbc:sportsdata:football:team:germany',
    runningScores: {
      halftime: '1',
      fulltime: '3',
      aggregate: '3',
    },
    scoreUnconfirmed: '3',
    actions: [
      {
        playerUrn:
          'urn:bbc:sportsdata:football:player:s-8qys6qtdwgsycxducl062zld5',
        playerName: 'E. Konsa',
        actionType: 'goal',
        actions: [
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "44'",
              accessible: '44 minutes',
            },
          },
        ],
      },
      {
        playerUrn:
          'urn:bbc:sportsdata:football:player:s-5m0j33eoa5c8pqlr0tdf7undh',
        playerName: 'O. Watkins',
        actionType: 'goal',
        actions: [
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "51'",
              accessible: '51 minutes',
            },
          },
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "90'+4",
              accessible: '90 minutes plus 4',
            },
          },
        ],
      },
    ],
    score: '3',
  },
  time: {
    accessibleTime: '20:00',
    displayTimeUK: '20:00',
    timeCertainty: true,
  },
  date: 'Thu 9 Apr 2026',
  tournament: {
    id: '4c1nfi2j1m731hcay25fcgndq',
    name: 'UEFA Europa League',
    disambiguatedName: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
    thingsGuid: '2afbdda7-71d4-544d-bcc6-d9ff50314b2a',
  },
  stage: {
    id: '7wxuj38kqm8bz3cmi15vu4w7o',
    name: 'Quarter-finals',
    urn: '',
  },
  multiLeg: {
    leg: 1,
    relatedMatchId: 's-9ur6e6w5f4ahyxph7ef4rks2c',
  },
  period: 'ft',
  venue: {
    id: '2nrn0y55nz9ee7p9adzbb7fta',
    urn: 'urn:bbc:sportsdata:football:venue:s-2nrn0y55nz9ee7p9adzbb7fta',
    name: "Stadio Renato Dall'Ara",
    shortName: "Stadio Renato Dall'Ara",
  },
  attendance: { value: 31142 },
  status: 'PostEvent',
  periodLabel: { value: 'FT', accessible: 'Full time' },
  winner: 'away',
  tournamentDescriptionLabel: 'UEFA Europa League - Quarter-finals',
  groupedActions: [
    {
      groupName: { fullName: 'Assists', shortName: 'Assists' },
      homeTeamActions: ["J. Lucumí (90')"],
      awayTeamActions: ["Y. Tielemans (44', 90'+4)", "E. Buendía (51')"],
    },
  ],
  accessibleEventSummary: 'Bologna 1 , Aston Villa 3 at Full time',
  sportDiscipline: 'football',
};

const translatedData = {
  urn: 'urn:bbc:sportsdata:football:event:s-3y91hnyfjh24yxjhm77a7hy50',
  home: {
    id: 'ej5er0oyngdw138yuumwqbyqt',
    fullName: 'Angleterre',
    shortName: 'Angleterre',
    urn: 'urn:bbc:sportsdata:football:team:england',
    runningScores: {
      halftime: '0',
      fulltime: '1',
      aggregate: '1',
    },
    scoreUnconfirmed: '1',
    actions: [
      {
        playerUrn:
          'urn:bbc:sportsdata:football:player:s-2bmeynv0dhsc8sjfuaprkexre',
        playerName: 'J. Rowe',
        actionType: 'goal',
        actions: [
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "90'",
              accessible: '90 minutes',
            },
          },
        ],
      },
    ],
    score: '1',
  },
  away: {
    id: 'b496gs285it6bheuikox6z9mj',
    fullName: 'Allemagne',
    shortName: 'Allemagne',
    urn: 'urn:bbc:sportsdata:football:team:germany',
    runningScores: {
      halftime: '1',
      fulltime: '3',
      aggregate: '3',
    },
    scoreUnconfirmed: '3',
    actions: [
      {
        playerUrn:
          'urn:bbc:sportsdata:football:player:s-8qys6qtdwgsycxducl062zld5',
        playerName: 'E. Konsa',
        actionType: 'goal',
        actions: [
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "44'",
              accessible: '44 minutes',
            },
          },
        ],
      },
      {
        playerUrn:
          'urn:bbc:sportsdata:football:player:s-5m0j33eoa5c8pqlr0tdf7undh',
        playerName: 'O. Watkins',
        actionType: 'goal',
        actions: [
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "51'",
              accessible: '51 minutes',
            },
          },
          {
            type: 'Goal',
            typeLabel: { value: 'Goal', accessible: 'Goal' },
            timeLabel: {
              value: "90'+4",
              accessible: '90 minutes plus 4',
            },
          },
        ],
      },
    ],
    score: '3',
  },
  time: {
    accessibleTime: '20:00',
    displayTimeUK: '20:00',
    timeCertainty: true,
  },
  date: 'Thu 9 Apr 2026',
  tournament: {
    id: '4c1nfi2j1m731hcay25fcgndq',
    name: 'UEFA Europa League',
    disambiguatedName: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
    thingsGuid: '2afbdda7-71d4-544d-bcc6-d9ff50314b2a',
  },
  stage: {
    id: '7wxuj38kqm8bz3cmi15vu4w7o',
    name: 'Quarter-finals',
    urn: '',
  },
  multiLeg: {
    leg: 1,
    relatedMatchId: 's-9ur6e6w5f4ahyxph7ef4rks2c',
  },
  period: 'ft',
  venue: {
    id: '2nrn0y55nz9ee7p9adzbb7fta',
    urn: 'urn:bbc:sportsdata:football:venue:s-2nrn0y55nz9ee7p9adzbb7fta',
    name: "Stadio Renato Dall'Ara",
    shortName: "Stadio Renato Dall'Ara",
  },
  attendance: { value: 31142 },
  status: 'PostEvent',
  periodLabel: { value: 'FT', accessible: 'Full time' },
  winner: 'away',
  tournamentDescriptionLabel: 'UEFA Europa League - Quarter-finals',
  groupedActions: [
    {
      groupName: { fullName: 'Assists', shortName: 'Assists' },
      homeTeamActions: ["J. Lucumí (90')"],
      awayTeamActions: ["Y. Tielemans (44', 90'+4)", "E. Buendía (51')"],
    },
  ],
  accessibleEventSummary: 'Bologna 1 , Aston Villa 3 at Full time',
  sportDiscipline: 'football',
};

// example pre game

const originalDataPreEvent = {
  id: '78bis3qan491aqnwxn71ix6oq',
  eventGroupingLabel: 'England - Premier League',
  startDateTime: '2022-08-06T11:30:00Z',
  tournamentId: '2kwbbcootiqqgmrzs6o5inle5',
  status: 'PreEvent',
  periodLabel: { value: 'Scheduled', accessible: 'Scheduled' },
  venue: { name: 'Craven Cottage', shortName: 'Craven Cottage' },
  tournament: {
    id: '2kwbbcootiqqgmrzs6o5inle5',
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:2kwbbcootiqqgmrzs6o5inle5',
  },
  tournamentDescriptionLabel: 'Premier League',
  home: {
    fullName: 'Fulham',
    shortName: 'Fulham',
    urn: 'urn:bbc:sportsdata:football:team:fulham',
    actions: [],
  },
  away: {
    fullName: 'Liverpool',
    shortName: 'Liverpool',
    urn: 'urn:bbc:sportsdata:football:team:liverpool',
    actions: [],
  },
  time: {
    accessibleTime: '12:30',
    displayTimeUK: '12:30',
    timeCertainty: true,
  },
  date: 'Sat 6 Aug 2022',
  accessibleEventSummary: 'Fulham versus Liverpool kick off 12:30',
  tipoTopicId: 'cvp5j5ndx5nt',
  onwardJourneyLink: '/sport/football/live/cvp5j5ndx5nt',
};

// example mid game

// example post game - inc pens

describe('translateSportData', () => {
  it('should translate the sport data correctly', () => {
    const result = translateSportData(
      originalData as unknown as HeadToHeadV2Data,
      afriqueServiceConfig.default.translations,
      'persian', // typify
    );
    expect(result).toStrictEqual(translatedData);
  });

  // tidy
  it('should handle pre event', () => {
    const result = translateSportData(
      originalDataPreEvent as unknown as HeadToHeadV2Data,
      afriqueServiceConfig.default.translations,
      'persian', // typify
    );
    expect(result).toStrictEqual(originalDataPreEvent);
  });

  it('should render the translated team names correctly', () => {
    render(
      <HeadToHeadV2
        initialSportData={originalData as unknown as HeadToHeadV2Data}
      />,
      {
        service: 'afrique',
      },
    );

    expect(screen.getAllByText('Angleterre').length).toBeGreaterThan(0);
    expect(screen.queryByText('England')).not.toBeInTheDocument();
  });

  it('should return the data unchanged if no translations are available', () => {
    render(
      <HeadToHeadV2
        initialSportData={originalData as unknown as HeadToHeadV2Data}
      />,
      {
        service: 'cymrufyw',
      },
    );

    expect(screen.queryAllByText('England').length).toBeGreaterThan(0);
  });
});
