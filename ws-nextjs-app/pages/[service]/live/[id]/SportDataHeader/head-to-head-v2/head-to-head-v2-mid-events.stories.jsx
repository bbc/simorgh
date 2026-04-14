import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
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
  secondLegAETInPensData
} from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/mid-event/index.js';

import mdx from './head-to-head-v2.mdx';
import metadata from './metadata.json';
import { HeadToHeadV2 } from './head-to-head-v2.jsx';
import { shortNamesMap } from './storybook/helpers/short-name-map.js';
import { HeadToHeadV2Component, HeadToHeadV2ConciseComponent } from './storybook/helpers/base-component.jsx';

import venuesData from './static-data/premier-league-venues.json';

const { venues } = venuesData;

const getBaseDataWithEuropaLeagueTournament = baseData => ({
  ...baseData,
  tournamentDescriptionLabel: 'UEFA Europa Conference League'
});

export default {
  title: 'Components/Presentation/Head To Head V2/Mid Event',
  component: HeadToHeadV2,
  tags: ['autodocs'],
  parameters: {
    metadata,
    docs: {
      description: {
        component: 'The `Head to Head V2` component is used to render event data.'
      },
      page: mdx
    },
    chromatic: {
      viewports: [375, ...BREAKPOINT_VIEWPORTS]
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  },
  globals: {
    corePalette: 'lightAlternative',
    servicePalette: 'sportLight',
    fontPalette: 'sansSimple'
  },
  argTypes: {
    home: {
      options: Object.keys(shortNamesMap()),
      control: { type: 'select' }
    },
    away: {
      options: Object.keys(shortNamesMap()),
      control: { type: 'select' }
    },
    venue: {
      options: venues,
      control: { type: 'select' }
    },
    status: {
      table: { disable: true }
    },
    date: { control: 'date' }
  }
};

export const FirstHalfOf90Mins = HeadToHeadV2Component.bind({});
export const FirstHalfOf90MinsWithHomeScoreUnconfirmed = HeadToHeadV2Component.bind({});
export const SecondHalfOf90Mins = HeadToHeadV2Component.bind({});
export const InPenaltiesAfter90Mins = HeadToHeadV2Component.bind({});
export const ExtraTime = HeadToHeadV2Component.bind({});
export const InPenaltiesAfterExtraTime = HeadToHeadV2Component.bind({});
export const BeforePensAfterExtraTime = HeadToHeadV2Component.bind({});
export const BeforeEt = HeadToHeadV2Component.bind({});
export const FirstHalfOf90MinsSecondLeg = HeadToHeadV2Component.bind({});
export const ExtraTimeSecondLeg = HeadToHeadV2Component.bind({});
export const InPenaltiesAfterExtraTimeSecondLeg = HeadToHeadV2Component.bind({});
export const BeforePens = HeadToHeadV2Component.bind({});
export const FirstHalfOf90MinsConcise = HeadToHeadV2ConciseComponent.bind({});
export const SecondHalfOf90MinsConcise = HeadToHeadV2ConciseComponent.bind({});
export const InPenaltiesAfter90MinsConcise = HeadToHeadV2ConciseComponent.bind({});
export const ExtraTimeConcise = HeadToHeadV2ConciseComponent.bind({});
export const InPenaltiesAfterExtraTimeConcise = HeadToHeadV2ConciseComponent.bind({});
export const BeforePensConcise = HeadToHeadV2ConciseComponent.bind({});
export const BeforePensAfterExtraTimeConcise = HeadToHeadV2ConciseComponent.bind({});
export const BeforeEtConcise = HeadToHeadV2ConciseComponent.bind({});
export const FirstHalfOf90MinsSecondLegConcise = HeadToHeadV2ConciseComponent.bind({});
export const ExtraTimeSecondLegConcise = HeadToHeadV2ConciseComponent.bind({});
export const InPenaltiesAfterExtraTimeSecondLegConcise = HeadToHeadV2ConciseComponent.bind({});

FirstHalfOf90Mins.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: getBaseDataWithEuropaLeagueTournament(firstHalf90Data),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: firstHalf90Data.home.actions,
  awayActions: firstHalf90Data.away.actions
};

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
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: firstHalf90Data.home.actions,
  awayActions: firstHalf90Data.away.actions
};

SecondHalfOf90Mins.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: getBaseDataWithEuropaLeagueTournament(secondHalf90Data),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: secondHalf90Data.home.actions,
  awayActions: secondHalf90Data.away.actions
};

InPenaltiesAfter90Mins.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: getBaseDataWithEuropaLeagueTournament(inPens90Data),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'League Cup', urn: 'urn:bbc:sportsdata:football:tournament:league-cup' },
  homeActions: inPens90Data.home.actions,
  awayActions: inPens90Data.away.actions
};

BeforePens.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: beforePensData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'League Cup', urn: 'urn:bbc:sportsdata:football:tournament:league-cup' },
  homeActions: beforePensData.home.actions,
  awayActions: beforePensData.away.actions
};

BeforeEt.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforeEtData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup - 3rd Round', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: beforeEtData.home.actions,
  awayActions: beforeEtData.away.actions
};

ExtraTime.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: etFirstHalfData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup - 3rd Round', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: etFirstHalfData.home.actions,
  awayActions: etFirstHalfData.away.actions
};

InPenaltiesAfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: getBaseDataWithEuropaLeagueTournament(inPensAetData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: inPensAetData.home.actions,
  awayActions: inPensAetData.away.actions
};

BeforePensAfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforePensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: beforePensAetData.home.actions,
  awayActions: beforePensAetData.away.actions
};

FirstHalfOf90MinsSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: getBaseDataWithEuropaLeagueTournament(firstHalfAggData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Champions League', urn: 'urn:bbc:sportsdata:football:tournament:champions-league' },
  homeActions: firstHalfAggData.home.actions,
  awayActions: firstHalfAggData.away.actions
};

ExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: getBaseDataWithEuropaLeagueTournament(secondLegETData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: secondLegETData.home.actions,
  awayActions: secondLegETData.away.actions
};

InPenaltiesAfterExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: getBaseDataWithEuropaLeagueTournament(secondLegAETInPensData),
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: secondLegAETInPensData.home.actions,
  awayActions: secondLegAETInPensData.away.actions
};

FirstHalfOf90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: firstHalf90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: firstHalf90Data.home.actions,
  awayActions: firstHalf90Data.away.actions
};

SecondHalfOf90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: secondHalf90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: secondHalf90Data.home.actions,
  awayActions: secondHalf90Data.away.actions
};

InPenaltiesAfter90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: inPens90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'League Cup', urn: 'urn:bbc:sportsdata:football:tournament:league-cup' },
  homeActions: inPens90Data.home.actions,
  awayActions: inPens90Data.away.actions
};

ExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: etFirstHalfData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup - 3rd Round', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: etFirstHalfData.home.actions,
  awayActions: etFirstHalfData.away.actions
};

BeforeEtConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforeEtData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup - 3rd Round', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: beforeEtData.home.actions,
  awayActions: beforeEtData.away.actions
};

BeforePensConcise.args = {
  home: 'Arsenal',
  homeScore: '3',
  away: 'Aston Villa',
  awayScore: '3',
  baseData: beforePensData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'League Cup', urn: 'urn:bbc:sportsdata:football:tournament:league-cup' },
  homeActions: beforePensData.home.actions,
  awayActions: beforePensData.away.actions
};

InPenaltiesAfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: inPensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: inPensAetData.home.actions,
  awayActions: inPensAetData.away.actions
};

BeforePensAfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: beforePensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: beforePensAetData.home.actions,
  awayActions: beforePensAetData.away.actions
};

FirstHalfOf90MinsSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '0',
  away: 'Aston Villa',
  awayScore: '0',
  baseData: firstHalfAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Champions League', urn: 'urn:bbc:sportsdata:football:tournament:champions-league' },
  homeActions: firstHalfAggData.home.actions,
  awayActions: firstHalfAggData.away.actions
};

ExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: secondLegETData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: secondLegETData.home.actions,
  awayActions: secondLegETData.away.actions
};

InPenaltiesAfterExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: secondLegAETInPensData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: secondLegAETInPensData.home.actions,
  awayActions: secondLegAETInPensData.away.actions
};
