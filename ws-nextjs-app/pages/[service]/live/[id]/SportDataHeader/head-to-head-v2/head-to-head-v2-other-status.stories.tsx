// import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
// import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import cancelledEventData from './static-data/event/transformed/cancelled.json';
import postponedEventData from './static-data/event/transformed/postponed.json';
import abandonedEventData from './static-data/event/transformed/abandoned.json';
import suspendedEventData from './static-data/event/transformed/suspended.json';
import { preEventData } from './static-data/event/transformed/pre-event/index';
import {
  HeadToHeadV2Component,
  HeadToHeadV2ConciseComponent,
} from './storybook/helpers/base-component';
// import mdx from './head-to-head-v2.mdx';
// import metadata from './metadata.json';
import HeadToHead from './head-to-head-v2';
import { shortNamesMap } from './storybook/helpers/short-name-map';
import venuesData from './static-data/premier-league-venues.json';

const { venues } = venuesData;

export default {
  title:
    'Components/Live Page Sport Data Header/Head To Head V2 - Other status',
  component: HeadToHead,
  // tags: ['autodocs'],
  // parameters: {
  //   metadata,
  //   docs: {
  //     description: {
  //       component:
  //         'The `Head To Head V2` component is used to render event data.',
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
  globals: {
    corePalette: 'lightAlternative',
    servicePalette: 'sportLight',
    fontPalette: 'sansSimple',
  },
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

export const CancelledEvent = HeadToHeadV2Component.bind({});
export const PostponedEvent = HeadToHeadV2Component.bind({});
export const AbandonedEvent = HeadToHeadV2Component.bind({});
export const SuspendedEvent = HeadToHeadV2Component.bind({});
export const CancelledEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const PostponedEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const AbandonedEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const SuspendedEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const EventWithOnwardJourneyHoverConcise =
  HeadToHeadV2ConciseComponent.bind({});

// @ts-expect-error - PS copy and paste
CancelledEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: cancelledEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  // @ts-expect-error - PS copy and paste
  homeActions: cancelledEventData.home.actions,
  // @ts-expect-error - PS copy and paste
  awayActions: cancelledEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
PostponedEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: postponedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  // @ts-expect-error - PS copy and paste
  homeActions: postponedEventData.home.actions,
  // @ts-expect-error - PS copy and paste
  awayActions: postponedEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
AbandonedEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: abandonedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  // @ts-expect-error - PS copy and paste
  homeActions: abandonedEventData.home.actions,
  // @ts-expect-error - PS copy and paste
  awayActions: abandonedEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
SuspendedEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: suspendedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: suspendedEventData.home.actions,
  awayActions: suspendedEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
CancelledEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: cancelledEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  // @ts-expect-error - PS copy and paste
  homeActions: cancelledEventData.home.actions,
  // @ts-expect-error - PS copy and paste
  awayActions: cancelledEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
PostponedEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: postponedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  // @ts-expect-error - PS copy and paste
  homeActions: postponedEventData.home.actions,
  // @ts-expect-error - PS copy and paste
  awayActions: postponedEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
AbandonedEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: abandonedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  // @ts-expect-error - PS copy and paste
  homeActions: abandonedEventData.home.actions,
  // @ts-expect-error - PS copy and paste
  awayActions: abandonedEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
SuspendedEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: suspendedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  homeActions: suspendedEventData.home.actions,
  awayActions: suspendedEventData.away.actions,
};

// @ts-expect-error - PS copy and paste
EventWithOnwardJourneyHoverConcise.args = {
  home: 'Arsenal',
  away: 'Aston Villa',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
  tipoTopicId: 'cvp5j5ndx5nt',
  onwardJourneyLink: '/sport/football/live/cvp5j5ndx5nt',
};

// @ts-expect-error - PS copy and paste
EventWithOnwardJourneyHoverConcise.parameters = {
  pseudo: {
    visited: true,
    hover: true,
  },
};
