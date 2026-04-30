// import { BREAKPOINT_VIEWPORTS } from '@bbc/web-gel-foundations';
// import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { preEventData } from './static-data/event/transformed/pre-event/index';

// import mdx from './head-to-head-v2.mdx';
// import metadata from './metadata.json';
import { HeadToHeadV2 } from './head-to-head-v2';
import { shortNamesMap } from './storybook/helpers/short-name-map';

import {
  HeadToHeadV2Component,
  HeadToHeadV2ConciseComponent,
} from './storybook/helpers/base-component';

import venuesData from './static-data/premier-league-venues.json';

const { venues } = venuesData;

export default {
  title: 'Components/Live Page Sport Data Header/Head To Head V2 - Pre Events',
  component: HeadToHeadV2,
  parameters: { chromatic: { disable: true } },
  // tags: ['autodocs'],
  // parameters: {
  //   metadata,
  //   docs: {
  //     description: {
  //       component:
  //         'The `Head to Head V2` container is used to render event data.',
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

export const PreEventConcise = HeadToHeadV2ConciseComponent.bind({});
export const PreEventConciseOneTeam = HeadToHeadV2ConciseComponent.bind({});
export const PreEventConciseNoTeams = HeadToHeadV2ConciseComponent.bind({});

// @ts-expect-error - PS copy and paste
PreEventConcise.args = {
  home: 'Arsenal',
  away: 'Aston Villa',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
};

// @ts-expect-error - PS copy and paste
PreEventConciseOneTeam.args = {
  home: 'TBC',
  away: 'Aston Villa',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'To be confirmed',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
};

// @ts-expect-error - PS copy and paste
PreEventConciseNoTeams.args = {
  home: 'TBC',
  away: 'TBC',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'To be confirmed',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
};

export const PreEvent = HeadToHeadV2Component.bind({});
export const PreEventOneTeam = HeadToHeadV2Component.bind({});
export const PreEventNoTeams = HeadToHeadV2Component.bind({});

// @ts-expect-error - PS copy and paste
PreEvent.args = {
  home: 'Arsenal',
  away: 'Aston Villa',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'Emirates Stadium',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
};

// @ts-expect-error - PS copy and paste
PreEventOneTeam.args = {
  home: 'TBC',
  away: 'Aston Villa',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'To be confirmed',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
};

// @ts-expect-error - PS copy and paste
PreEventNoTeams.args = {
  home: 'TBC',
  away: 'TBC',
  baseData: preEventData,
  date: new Date('2023-01-01T13:00:00Z'),
  venue: 'To be confirmed',
  tournament: {
    name: 'Premier League',
    urn: 'urn:bbc:sportsdata:football:tournament:premier-league',
  },
};
