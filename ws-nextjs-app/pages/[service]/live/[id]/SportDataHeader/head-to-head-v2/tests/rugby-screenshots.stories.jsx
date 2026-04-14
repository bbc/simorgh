import React from 'react';
import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
import Heading from '@bbc/web-components/heading/index.js';
import { Stack } from '@bbc/web-gel-layouts';
import { produce } from 'immer';
import { HeadToHeadV2 } from '../head-to-head-v2.jsx';
import {
  awayKeyEventsData,
  homeKeyEventsData,
  rugbyUnionPostEvent,
  rugbyUnionPreEvent
} from '../static-data/transformed/rugby-event/index.js';
import { cancelledRugbyUnionEvent } from '../static-data/transformed/rugby-event/rugby-union-cancelled-event.js';
import { rugbyUnionMidEvent } from '../static-data/transformed/rugby-event/rugby-union-mid-event.js';

export default {
  title: 'Components/Presentation/Head To Head V2/Rugby Events/tests',
  component: HeadToHeadV2,
  parameters: {
    chromatic: {
      viewports: BREAKPOINT_VIEWPORTS
    }
  },
  globals: {
    corePalette: 'lightAlternative',
    servicePalette: 'sportLight',
    fontPalette: 'sansSimple'
  }
};

const getPostEventData = groupedActions => ({
  ...rugbyUnionPostEvent,
  groupedActions
});

const rugbyUnionHalfTimeEvent = produce(rugbyUnionMidEvent, draft => {
  draft.status = 'Intermission';
  draft.periodLabel = { value: 'HT', accessible: 'Half time' };
});

const testCases = [
  { title: 'Pre Event', eventData: rugbyUnionPreEvent },
  { title: 'Mid Event', eventData: rugbyUnionMidEvent },
  { title: 'Half Time', eventData: rugbyUnionHalfTimeEvent },
  { title: 'Cancelled Event', eventData: cancelledRugbyUnionEvent },
  { title: 'Post Event with No Grouped Actions', eventData: getPostEventData([]) },
  { title: 'Post Event with undefined Grouped Actions', eventData: getPostEventData(undefined) },
  {
    title: 'Post Event with Home and Away Grouped Actions',
    eventData: getPostEventData([
      {
        groupName: { fullName: 'Tries', shortName: 'TRIES' },
        homeTeamActions: ['Cokanasiga', 'Dunn'],
        awayTeamActions: ['Capon', 'Batley', 'MacGinty']
      },
      {
        groupName: { fullName: 'Conversions', shortName: 'CONS' },
        homeTeamActions: ['Russell (3)'],
        awayTeamActions: ['MacGinty (6)', 'Janse van Rensburg']
      },
      {
        groupName: { fullName: 'Penalties', shortName: 'PENS' },
        homeTeamActions: ['Russell (2)'],
        awayTeamActions: ['MacGinty']
      }
    ])
  },
  {
    title: 'One Grouped Action',
    eventData: getPostEventData([
      {
        groupName: { fullName: 'Tries', shortName: 'TRIES' },
        homeTeamActions: ['Cokanasiga', 'Dunn'],
        awayTeamActions: ['Capon', 'Batley', 'MacGinty']
      }
    ])
  },
  {
    title: 'Multiple Players in Group Actions',
    eventData: getPostEventData([
      {
        groupName: { fullName: 'Tries', shortName: 'TRIES' },
        homeTeamActions: ['Cokanasiga', 'Dunn', 'De Glanville', 'Coetzee', 'du Toit', 'Penalty'],
        awayTeamActions: ['Capon', 'Batley', 'MacGinty', 'Heward', 'Williams', 'Harding', 'Bradbury', 'Lane']
      },
      {
        groupName: { fullName: 'Conversions', shortName: 'CONS' },
        homeTeamActions: ['Russell (3)'],
        awayTeamActions: ['MacGinty (6)', 'Janse van Rensburg']
      }
    ])
  },
  {
    title: 'Grouped Home Actions',
    eventData: getPostEventData([
      {
        groupName: { fullName: 'Tries', shortName: 'TRIES' },
        homeTeamActions: ['Cokanasiga', 'Dunn', 'De Glanville'],
        awayTeamActions: []
      },
      {
        groupName: { fullName: 'Conversions', shortName: 'CONS' },
        homeTeamActions: ['Russell (3)'],
        awayTeamActions: []
      }
    ])
  },
  {
    title: 'Grouped Away Actions',
    eventData: getPostEventData([
      {
        groupName: { fullName: 'Tries', shortName: 'TRIES' },
        homeTeamActions: [],
        awayTeamActions: ['Capon', 'Batley', 'MacGinty', 'Heward', 'Williams', 'Harding', 'Bradbury', 'Lane']
      },
      {
        groupName: { fullName: 'Conversions', shortName: 'CONS' },
        homeTeamActions: [],
        awayTeamActions: ['MacGinty (6)', 'Janse van Rensburg']
      }
    ])
  },
  {
    title: 'Grouped Actions with Long Player Name',
    eventData: getPostEventData([
      {
        groupName: { fullName: 'Conversions', shortName: 'CONS' },
        homeTeamActions: ['Russell (3)'],
        awayTeamActions: ['MacGinty (6)', 'Janse van Rensburg', 'PlayerWithExtremelyLongSurname']
      },
      {
        groupName: { fullName: 'Penalties', shortName: 'PENS' },
        homeTeamActions: ['Russell (2)'],
        awayTeamActions: ['MacGinty']
      }
    ])
  },
  {
    title:
      'Key and Grouped Actions (this scenario should not occur, however both actions will be displayed if they are provided to the component)',
    eventData: {
      ...rugbyUnionPostEvent,
      home: { ...rugbyUnionPostEvent.home, actions: homeKeyEventsData },
      away: { ...rugbyUnionPostEvent.away, actions: awayKeyEventsData }
    }
  },
  {
    title: 'With Badges',
    eventData: produce(rugbyUnionPreEvent, draft => {
      draft.tournament.urn = 'urn:bbc:sportsdata:rugby-union:tournament:six-nations';
      draft.home.fullName = 'Wales';
      draft.home.shortName = 'Wales';
      draft.home.urn = 'urn:bbc:sportsdata:rugby-union:team:wales';
      draft.away.fullName = 'Italy';
      draft.away.shortName = 'Italy';
      draft.away.urn = 'urn:bbc:sportsdata:rugby-union:team:italy';
    })
  }
];

export const Tests = () => (
  <Stack spacing={4}>
    {testCases.map(({ title, eventData }, idx) => (
      <React.Fragment key={idx}>
        <Heading level="1" fontScale="indexHeadlineLarge">
          {title}
        </Heading>
        <Heading level="2" fontScale="description">
          Full view
        </Heading>
        <HeadToHeadV2 data={eventData} isConciseView={false} />
        <Heading level="2" fontScale="description">
          Concise view
        </Heading>
        <HeadToHeadV2 data={eventData} isConciseView />
      </React.Fragment>
    ))}
  </Stack>
);
