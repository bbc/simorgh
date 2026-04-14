import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import cancelledEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/cancelled.json';
import postponedEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/postponed.json';
import abandonedEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/abandoned.json';
import suspendedEventData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/suspended.json';
import { preEventData } from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/pre-event/index.js';
import { HeadToHeadV2Component, HeadToHeadV2ConciseComponent } from './storybook/helpers/base-component.jsx';
import mdx from './head-to-head-v2.mdx';
import metadata from './metadata.json';
import HeadToHead from './head-to-head-v2.jsx';
import { shortNamesMap } from './storybook/helpers/short-name-map.js';
import venuesData from './static-data/premier-league-venues.json';

const { venues } = venuesData;

export default {
  title: 'Components/Presentation/Head To Head V2',
  component: HeadToHead,
  tags: ['autodocs'],
  parameters: {
    metadata,
    docs: {
      description: {
        component: 'The `Head To Head V2` component is used to render event data.'
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

export const CancelledEvent = HeadToHeadV2Component.bind({});
export const PostponedEvent = HeadToHeadV2Component.bind({});
export const AbandonedEvent = HeadToHeadV2Component.bind({});
export const SuspendedEvent = HeadToHeadV2Component.bind({});
export const CancelledEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const PostponedEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const AbandonedEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const SuspendedEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const EventWithOnwardJourneyHoverConcise = HeadToHeadV2ConciseComponent.bind({});

CancelledEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: cancelledEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: cancelledEventData.home.actions,
  awayActions: cancelledEventData.away.actions
};

PostponedEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: postponedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: postponedEventData.home.actions,
  awayActions: postponedEventData.away.actions
};

AbandonedEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: abandonedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: abandonedEventData.home.actions,
  awayActions: abandonedEventData.away.actions
};

SuspendedEvent.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: suspendedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: suspendedEventData.home.actions,
  awayActions: suspendedEventData.away.actions
};

CancelledEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: cancelledEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: cancelledEventData.home.actions,
  awayActions: cancelledEventData.away.actions
};

PostponedEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: postponedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: postponedEventData.home.actions,
  awayActions: postponedEventData.away.actions
};

AbandonedEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: abandonedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: abandonedEventData.home.actions,
  awayActions: abandonedEventData.away.actions
};

SuspendedEventConcise.args = {
  home: 'Fulham',
  away: 'Liverpool',
  baseData: suspendedEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  homeActions: suspendedEventData.home.actions,
  awayActions: suspendedEventData.away.actions
};

EventWithOnwardJourneyHoverConcise.args = {
  home: 'Arsenal',
  away: 'Aston Villa',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: { name: 'Premier League', urn: 'urn:bbc:sportsdata:football:tournament:premier-league' },
  tipoTopicId: 'cvp5j5ndx5nt',
  onwardJourneyLink: '/sport/football/live/cvp5j5ndx5nt'
};

EventWithOnwardJourneyHoverConcise.parameters = {
  pseudo: {
    visited: true,
    hover: true
  }
};
