import {
  firstHalf90Data,
  secondHalf90Data,
  firstHalfAggData,
  etFirstHalfData,
  inPensAetData,
  beforePensData,
  beforePensAetData,
  beforeEtData,
  inPens90Data,
  secondLegETData,
  secondLegAETInPensData,
} from './static-data/event/transformed/mid-event';
import { HeadToHeadV2 } from './head-to-head-v2';
import { shortNamesMap } from './storybook/helpers/short-name-map';
import {
  HeadToHeadV2Component,
  HeadToHeadV2ConciseComponent,
} from './storybook/helpers/base-component';

import venuesData from './static-data/premier-league-venues.json';

const { venues } = venuesData;

const getBaseDataWithEuropaLeagueTournament = baseData => ({
  ...baseData,
  tournamentDescriptionLabel: 'UEFA Europa Conference League',
});

// OPTIONAL - KEEP STORY ARGS SIMPLE
// export default {
//   title: 'Components/Live Page Sport Data Header/Head To Head V2 - Mid event',
//   component: HeadToHeadV2,
// };

// OPTIONAL - MORE COMPLEX STORY ARGS - USES SHORT NAMES MAP ETC, REDUCED FROM PS ORIGINAL
export default {
  title: 'Components/Live Page Sport Data Header/Head To Head V2 - Mid event',
  component: HeadToHeadV2,
  argTypes: {
    home: {
      options: Object.keys(shortNamesMap()),
      control: { type: 'select' },
    },
    away: {
      options: Object.keys(shortNamesMap()),
      control: { type: 'select' },
    },
    venue: {
      options: venues,
      control: { type: 'select' },
    },
    status: {
      table: { disable: true },
    },
    date: { control: 'date' },
  },
};

export const FirstHalfOf90Mins = HeadToHeadV2Component.bind({});
export const FirstHalfOf90MinsWithHomeScoreUnconfirmed =
  HeadToHeadV2Component.bind({});
export const SecondHalfOf90Mins = HeadToHeadV2Component.bind({});
export const InPenaltiesAfter90Mins = HeadToHeadV2Component.bind({});
export const ExtraTime = HeadToHeadV2Component.bind({});
export const InPenaltiesAfterExtraTime = HeadToHeadV2Component.bind({});
export const BeforePensAfterExtraTime = HeadToHeadV2Component.bind({});
export const BeforeEt = HeadToHeadV2Component.bind({});
export const FirstHalfOf90MinsSecondLeg = HeadToHeadV2Component.bind({});
export const ExtraTimeSecondLeg = HeadToHeadV2Component.bind({});
export const InPenaltiesAfterExtraTimeSecondLeg = HeadToHeadV2Component.bind(
  {},
);
export const BeforePens = HeadToHeadV2Component.bind({});
export const FirstHalfOf90MinsConcise = HeadToHeadV2ConciseComponent.bind({});
export const SecondHalfOf90MinsConcise = HeadToHeadV2ConciseComponent.bind({});
export const InPenaltiesAfter90MinsConcise = HeadToHeadV2ConciseComponent.bind(
  {},
);
export const ExtraTimeConcise = HeadToHeadV2ConciseComponent.bind({});
export const InPenaltiesAfterExtraTimeConcise =
  HeadToHeadV2ConciseComponent.bind({});
export const BeforePensConcise = HeadToHeadV2ConciseComponent.bind({});
export const BeforePensAfterExtraTimeConcise =
  HeadToHeadV2ConciseComponent.bind({});
export const BeforeEtConcise = HeadToHeadV2ConciseComponent.bind({});
export const FirstHalfOf90MinsSecondLegConcise =
  HeadToHeadV2ConciseComponent.bind({});
export const ExtraTimeSecondLegConcise = HeadToHeadV2ConciseComponent.bind({});
export const InPenaltiesAfterExtraTimeSecondLegConcise =
  HeadToHeadV2ConciseComponent.bind({});

// @ts-expect-error - PS copy and paste
FirstHalfOf90Mins.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: getBaseDataWithEuropaLeagueTournament(firstHalf90Data),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: firstHalf90Data.home.actions,
  awayActions: firstHalf90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
FirstHalfOf90MinsWithHomeScoreUnconfirmed.args = {
  home: 'Arsenal',
  homeScore: '3',
  homeScoreUnconfirmed: '4',
  away: 'Aston Villa',
  awayScore: '0',
  awayScoreUnconfirmed: '0',
  baseData: getBaseDataWithEuropaLeagueTournament(firstHalf90Data),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: firstHalf90Data.home.actions,
  awayActions: firstHalf90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
SecondHalfOf90Mins.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: getBaseDataWithEuropaLeagueTournament(secondHalf90Data),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: secondHalf90Data.home.actions,
  awayActions: secondHalf90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
InPenaltiesAfter90Mins.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: getBaseDataWithEuropaLeagueTournament(inPens90Data),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'League Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:league-cup',
  },
  homeActions: inPens90Data.home.actions,
  awayActions: inPens90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
BeforePens.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: beforePensData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'League Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:league-cup',
  },
  homeActions: beforePensData.home.actions,
  awayActions: beforePensData.away.actions,
};

// @ts-expect-error - PS copy and paste
BeforeEt.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforeEtData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup - 3rd Round',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: beforeEtData.home.actions,
  awayActions: beforeEtData.away.actions,
};

// @ts-expect-error - PS copy and paste
ExtraTime.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: etFirstHalfData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup - 3rd Round',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: etFirstHalfData.home.actions,
  awayActions: etFirstHalfData.away.actions,
};

// @ts-expect-error - PS copy and paste
InPenaltiesAfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: getBaseDataWithEuropaLeagueTournament(inPensAetData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: inPensAetData.home.actions,
  awayActions: inPensAetData.away.actions,
};

// @ts-expect-error - PS copy and paste
BeforePensAfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforePensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: beforePensAetData.home.actions,
  awayActions: beforePensAetData.away.actions,
};

// @ts-expect-error - PS copy and paste
FirstHalfOf90MinsSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: getBaseDataWithEuropaLeagueTournament(firstHalfAggData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Champions League',
    urn: 'urn:bbc:sportsdata:football:tournament:champions-league',
  },
  homeActions: firstHalfAggData.home.actions,
  awayActions: firstHalfAggData.away.actions,
};

// @ts-expect-error - PS copy and paste
ExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: getBaseDataWithEuropaLeagueTournament(secondLegETData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: secondLegETData.home.actions,
  awayActions: secondLegETData.away.actions,
};

// @ts-expect-error - PS copy and paste
InPenaltiesAfterExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: getBaseDataWithEuropaLeagueTournament(secondLegAETInPensData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: secondLegAETInPensData.home.actions,
  awayActions: secondLegAETInPensData.away.actions,
};

// @ts-expect-error - PS copy and paste
FirstHalfOf90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: firstHalf90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: firstHalf90Data.home.actions,
  awayActions: firstHalf90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
SecondHalfOf90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: secondHalf90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: secondHalf90Data.home.actions,
  awayActions: secondHalf90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
InPenaltiesAfter90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: inPens90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'League Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:league-cup',
  },
  homeActions: inPens90Data.home.actions,
  awayActions: inPens90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
ExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: etFirstHalfData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup - 3rd Round',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: etFirstHalfData.home.actions,
  awayActions: etFirstHalfData.away.actions,
};

// @ts-expect-error - PS copy and paste
BeforeEtConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforeEtData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup - 3rd Round',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: beforeEtData.home.actions,
  awayActions: beforeEtData.away.actions,
};

// @ts-expect-error - PS copy and paste
BeforePensConcise.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: beforePensData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'League Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:league-cup',
  },
  homeActions: beforePensData.home.actions,
  awayActions: beforePensData.away.actions,
};

// @ts-expect-error - PS copy and paste
InPenaltiesAfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: inPensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: inPensAetData.home.actions,
  awayActions: inPensAetData.away.actions,
};

// @ts-expect-error - PS copy and paste
BeforePensAfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforePensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: beforePensAetData.home.actions,
  awayActions: beforePensAetData.away.actions,
};

// @ts-expect-error - PS copy and paste
FirstHalfOf90MinsSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: firstHalfAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Champions League',
    urn: 'urn:bbc:sportsdata:football:tournament:champions-league',
  },
  homeActions: firstHalfAggData.home.actions,
  awayActions: firstHalfAggData.away.actions,
};

// @ts-expect-error - PS copy and paste
ExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: secondLegETData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: secondLegETData.home.actions,
  awayActions: secondLegETData.away.actions,
};

// @ts-expect-error - PS copy and paste
InPenaltiesAfterExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: secondLegAETInPensData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: secondLegAETInPensData.home.actions,
  awayActions: secondLegAETInPensData.away.actions,
};
