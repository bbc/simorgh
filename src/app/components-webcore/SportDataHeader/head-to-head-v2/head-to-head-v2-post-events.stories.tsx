// import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
// import { INITIAL_VIEWPORTS } from 'storybook/viewport';

// import mdx from './head-to-head-v2.mdx';
// import metadata from './metadata.json';
import { HeadToHeadV2 } from './head-to-head-v2';
import {
  finishedAetAggData,
  postEventAETData,
  postEventAgg90Data,
  postEventData,
  postEventPens90Data,
  postEventPensAetAggData,
  postEventPensAetData,
} from './static-data/event/transformed/post-event';
import venuesData from './static-data/premier-league-venues.json';
import {
  HeadToHeadV2Component,
  HeadToHeadV2ConciseComponent,
} from './storybook/helpers/base-component';
import { SHORT_NAMES } from './storybook/helpers/short-name-map';

const { venues } = venuesData;

export default {
  title: 'Components/Live Page Sport Data Header/Head To Head V2 - Post event',
  component: HeadToHeadV2,
  parameters: { chromatic: { disable: true } },
  // tags: ['autodocs'],
  // parameters: {
  //   metadata,
  //   docs: {
  //     description: {
  //       component:
  //         'The `Head to Head V2` component is used to render event data.',
  //     },
  //     page: mdx,
  //   },
  //   chromatic: {
  //     viewports: [375, ...BREAKPOINT_VIEWPORTS],
  //   },
  //   viewport: {
  //     viewports: INITIAL_VIEWPORTS,
  //   },
  // },
  // globals: {
  //   corePalette: 'lightAlternative',
  //   servicePalette: 'sportLight',
  //   fontPalette: 'sansSimple',
  // },
  argTypes: {
    home: {
      options: Object.keys(SHORT_NAMES),
      control: { type: 'select' },
    },
    away: {
      options: Object.keys(SHORT_NAMES),
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
  args: {
    isView: false,
  },
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
export const FullTimeAfter90MinsSecondLegConcise =
  HeadToHeadV2ConciseComponent.bind({});
export const PenaltiesAfter90MinsConcise = HeadToHeadV2ConciseComponent.bind(
  {},
);
export const PenaltiesAfterExtraTimeConcise = HeadToHeadV2ConciseComponent.bind(
  {},
);
export const PenaltiesAfterExtraTimeSecondLegConcise =
  HeadToHeadV2ConciseComponent.bind({});
export const AfterExtraTimeSecondLegConcise = HeadToHeadV2ConciseComponent.bind(
  {},
);

// @ts-expect-error - PS copy and paste
FullTimeAfter90Mins.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: postEventData.home.actions,
  awayActions: postEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
AfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventAETData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: postEventAETData.home.actions,
  awayActions: postEventAETData.away.actions,
};

// @ts-expect-error - PS copy and paste
FullTimeAfter90MinsSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventAgg90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: postEventAgg90Data.home.actions,
  awayActions: postEventAgg90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
PenaltiesAfter90Mins.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPens90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'League Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:league-cup',
  },
  homeActions: postEventPens90Data.home.actions,
  awayActions: postEventPens90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
PenaltiesAfterExtraTime.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: postEventPensAetData.home.actions,
  awayActions: postEventPensAetData.away.actions,
};

// @ts-expect-error - PS copy and paste
PenaltiesAfterExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventPensAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: postEventPensAetAggData.home.actions,
  awayActions: postEventPensAetAggData.away.actions,
};

// @ts-expect-error - PS copy and paste
AfterExtraTimeSecondLeg.args = {
  home: 'Arsenal',
  homeScore: '4',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: finishedAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: finishedAetAggData.home.actions,
  awayActions: finishedAetAggData.away.actions,
};

// @ts-expect-error - PS copy and paste
FullTimeAfter90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: postEventData.home.actions,
  awayActions: postEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
AfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventAETData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: postEventAETData.home.actions,
  awayActions: postEventAETData.away.actions,
};

// @ts-expect-error - PS copy and paste
FullTimeAfter90MinsSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventAgg90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: postEventAgg90Data.home.actions,
  awayActions: postEventAgg90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
PenaltiesAfter90MinsConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPens90Data,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'League Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:league-cup',
  },
  homeActions: postEventPens90Data.home.actions,
  awayActions: postEventPens90Data.away.actions,
};

// @ts-expect-error - PS copy and paste
PenaltiesAfterExtraTimeConcise.args = {
  home: 'Arsenal',
  homeScore: '1',
  away: 'Aston Villa',
  awayScore: '1',
  baseData: postEventPensAetData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'FA Cup',
    urn: 'urn:bbc:sportsdata:football:tournament:fa-cup',
  },
  homeActions: postEventPensAetData.home.actions,
  awayActions: postEventPensAetData.away.actions,
};

// @ts-expect-error - PS copy and paste
PenaltiesAfterExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '2',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: postEventPensAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: postEventPensAetAggData.home.actions,
  awayActions: postEventPensAetAggData.away.actions,
};

// @ts-expect-error - PS copy and paste
AfterExtraTimeSecondLegConcise.args = {
  home: 'Arsenal',
  homeScore: '4',
  away: 'Aston Villa',
  awayScore: '2',
  baseData: finishedAetAggData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'UEFA Europa League',
    urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
  },
  homeActions: finishedAetAggData.home.actions,
  awayActions: finishedAetAggData.away.actions,
};
