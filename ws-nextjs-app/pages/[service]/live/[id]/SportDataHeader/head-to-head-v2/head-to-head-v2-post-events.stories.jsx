import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import {
  postEventData,
  postEventAETData,
  postEventAgg90Data,
  postEventPens90Data,
  postEventPensAetData,
  postEventPensAetAggData,
  finishedAetAggData
} from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/post-event/index.js';

import mdx from './head-to-head-v2.mdx';
import metadata from './metadata.json';
import { HeadToHeadV2 } from './head-to-head-v2.jsx';
import { shortNamesMap } from './storybook/helpers/short-name-map.js';
import { HeadToHeadV2Component, HeadToHeadV2ConciseComponent } from './storybook/helpers/base-component.jsx';

import venuesData from './static-data/premier-league-venues.json';

const { venues } = venuesData;

export default {
  title: 'Components/Presentation/Head To Head V2/Post Events',
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
  },
  args: {
    isView: false
  }
};

export const FullTimeAfter90Mins = HeadToHeadV2Component.bind({});
export const AfterExtraTime = HeadToHeadV2Component.bind({});
export const FullTimeAfter90MinsSecondLeg = HeadToHeadV2Component.bind({});
export const PenaltiesAfter90Mins = HeadToHeadV2Component.bind({});
export const PenaltiesAfterExtraTime = HeadToHeadV2Component.bind({});
export const PenaltiesAfterExtraTimeSecondLeg = HeadToHeadV2Component.bind({});
export const AfterExtraTimeSecondLeg = HeadToHeadV2Component.bind({});
export const FullTimeAfter90MinsConcise = HeadToHeadV2ConciseComponent.bind({});
export const AfterExtraTimeConcise = HeadToHeadV2ConciseComponent.bind({});
export const FullTimeAfter90MinsSecondLegConcise = HeadToHeadV2ConciseComponent.bind({});
export const PenaltiesAfter90MinsConcise = HeadToHeadV2ConciseComponent.bind({});
export const PenaltiesAfterExtraTimeConcise = HeadToHeadV2ConciseComponent.bind({});
export const PenaltiesAfterExtraTimeSecondLegConcise = HeadToHeadV2ConciseComponent.bind({});
export const AfterExtraTimeSecondLegConcise = HeadToHeadV2ConciseComponent.bind({});

FullTimeAfter90Mins.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: postEventData.home.actions,
  awayActions: postEventData.away.actions
};

AfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventAETData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: postEventAETData.home.actions,
  awayActions: postEventAETData.away.actions
};

FullTimeAfter90MinsSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventAgg90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: postEventAgg90Data.home.actions,
  awayActions: postEventAgg90Data.away.actions
};

PenaltiesAfter90Mins.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPens90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'League Cup', urn: 'urn:bbc:sportsdata:football:tournament:league-cup' },
  homeActions: postEventPens90Data.home.actions,
  awayActions: postEventPens90Data.away.actions
};

PenaltiesAfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: postEventPensAetData.home.actions,
  awayActions: postEventPensAetData.away.actions
};

PenaltiesAfterExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventPensAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: postEventPensAetAggData.home.actions,
  awayActions: postEventPensAetAggData.away.actions
};

AfterExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '4',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: finishedAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: finishedAetAggData.home.actions,
  awayActions: finishedAetAggData.away.actions
};

FullTimeAfter90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: postEventData.home.actions,
  awayActions: postEventData.away.actions
};

AfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventAETData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: postEventAETData.home.actions,
  awayActions: postEventAETData.away.actions
};

FullTimeAfter90MinsSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventAgg90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: postEventAgg90Data.home.actions,
  awayActions: postEventAgg90Data.away.actions
};

PenaltiesAfter90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPens90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'League Cup', urn: 'urn:bbc:sportsdata:football:tournament:league-cup' },
  homeActions: postEventPens90Data.home.actions,
  awayActions: postEventPens90Data.away.actions
};

PenaltiesAfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'FA Cup', urn: 'urn:bbc:sportsdata:football:tournament:fa-cup' },
  homeActions: postEventPensAetData.home.actions,
  awayActions: postEventPensAetData.away.actions
};

PenaltiesAfterExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventPensAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: postEventPensAetAggData.home.actions,
  awayActions: postEventPensAetAggData.away.actions
};

AfterExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '4',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: finishedAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'UEFA Europa League', urn: 'urn:bbc:sportsdata:football:tournament:europa-league' },
  homeActions: finishedAetAggData.home.actions,
  awayActions: finishedAetAggData.away.actions
};
