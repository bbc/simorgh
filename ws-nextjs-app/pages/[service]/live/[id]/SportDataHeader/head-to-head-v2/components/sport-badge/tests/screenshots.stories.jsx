import React from 'react';
import orderBy from 'lodash/orderBy.js';
import { parseUrn } from '@bbc/web-sport-utils';
import styled from '@bbc/web-styled';
import { BREAKPOINT_GROUP_6, BREAKPOINT_MINS, createSize, SPACING_1 } from '@bbc/web-gel-foundations';
import { Stack } from '@bbc/web-gel-layouts';
import Heading from '@bbc/web-components/heading/index.js';
import SportTable from '@bbc/web-components/sport-table/index.js';

import SportBadge from '../index.js';
import BadgesMap from '../badges-map.js';
import { americanFootball } from '../mappings/american-football.js';
import basketball from '../mappings/basketball.js';
import englishFootball from '../mappings/football-english-domestic.js';
import europeanFootball from '../mappings/football-european-domestic.js';
import footballWorldwideDomestic from '../mappings/football-worldwide-domestic.js';
import internationalFootball from '../mappings/international-football.js';
import netball from '../mappings/netball.js';
import scottishFootball from '../mappings/football-scottish-domestic.js';
import rugbyUnion from '../mappings/rugby-union.js';
import iceHockey from '../mappings/ice-hockey.js';
import mdx from '../sport-badge.mdx';

const COUNTRY_URN_REGEX = /urn:bbc:sportsdata:(?<sport>.+):country:(?<country>.+)/;

const MAX_TEAM_BADGES_TABLE_ROWS = 20;

export default {
  title: 'Components/Data/Sport Badge',
  component: SportBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdx
    },
    chromatic: {
      viewports: [BREAKPOINT_MINS[BREAKPOINT_GROUP_6]]
    }
  }
};

const safeParseUrn = urn => {
  try {
    return parseUrn(urn);
  } catch {
    return null;
  }
};

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_chunk
const chunk = (input, size) =>
  input.reduce(
    (arr, item, idx) => (idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]),
    []
  );

const TeamBadgesIdWrapper = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${createSize(128)};
`;

const TeamBadgesIdCellComponent = ({ value }) => <TeamBadgesIdWrapper>{value}</TeamBadgesIdWrapper>;

const SportBadgeCellComponent = ({ value }) => <SportBadge id={value} size={42} />;

const TeamBadgesTablesWrapper = styled.div`
  display: flex;
  gap: ${SPACING_1};
`;

const TeamBadgesList = () => {
  const testedIds = new Set();
  const groupedRows = [
    { groupName: 'American Football', badgeGroup: americanFootball },
    { groupName: 'Basketball', badgeGroup: basketball },
    { groupName: 'Netball', badgeGroup: netball },
    { groupName: 'Scottish Football', badgeGroup: scottishFootball },
    { groupName: 'Rugby Union', badgeGroup: rugbyUnion },
    { groupName: 'Ice Hockey', badgeGroup: iceHockey }
  ].map(({ groupName, badgeGroup }) => ({
    groupName,
    rows: orderBy(
      Object.entries(badgeGroup).map(([id, image]) => {
        testedIds.add(id);
        const urn = safeParseUrn(id);

        return { id, displayId: urn?.id ?? id, image };
      }),
      ['image']
    )
  }));

  return (
    <Stack spacing={2}>
      {groupedRows.map(({ groupName, rows }) => (
        <div key={groupName}>
          <Heading level="2" fontScale="indexHeadlineSmall">
            {groupName}
          </Heading>
          <TeamBadgesTablesWrapper>
            {chunk(rows, MAX_TEAM_BADGES_TABLE_ROWS).map((rowChunk, index) => (
              <div key={index}>
                <SportTable
                  accessibleCaption="Team badges"
                  columns={[
                    {
                      title: 'ID',
                      dataField: 'displayId',
                      CellComponent: TeamBadgesIdCellComponent
                    },
                    {
                      title: 'Badge',
                      dataField: 'id',
                      CellComponent: SportBadgeCellComponent
                    }
                  ]}
                  rows={rowChunk}
                />
              </div>
            ))}
          </TeamBadgesTablesWrapper>
        </div>
      ))}
    </Stack>
  );
};

const EnglishTeamBadgesList = () => {
  const testedIds = new Set();
  const groupedRows = [{ groupName: 'English Football', badgeGroup: englishFootball }].map(
    ({ groupName, badgeGroup }) => ({
      groupName,
      rows: orderBy(
        Object.entries(badgeGroup).map(([id, image]) => {
          testedIds.add(id);
          const urn = safeParseUrn(id);

          return { id, displayId: urn?.id ?? id, image };
        }),
        ['image']
      )
    })
  );

  return (
    <Stack spacing={2}>
      {groupedRows.map(({ groupName, rows }) => (
        <div key={groupName}>
          <Heading level="2" fontScale="indexHeadlineSmall">
            {groupName}
          </Heading>
          <TeamBadgesTablesWrapper>
            {chunk(rows, MAX_TEAM_BADGES_TABLE_ROWS).map((rowChunk, index) => (
              <div key={index}>
                <SportTable
                  accessibleCaption="Team badges"
                  columns={[
                    {
                      title: 'ID',
                      dataField: 'displayId',
                      CellComponent: TeamBadgesIdCellComponent
                    },
                    {
                      title: 'Badge',
                      dataField: 'id',
                      CellComponent: SportBadgeCellComponent
                    }
                  ]}
                  rows={rowChunk}
                />
              </div>
            ))}
          </TeamBadgesTablesWrapper>
        </div>
      ))}
    </Stack>
  );
};

const EuropeanTeamBadgesList = () => {
  const testedIds = new Set();
  const groupedRows = [{ groupName: 'European Football', badgeGroup: europeanFootball }].map(
    ({ groupName, badgeGroup }) => ({
      groupName,
      rows: orderBy(
        Object.entries(badgeGroup).map(([id, image]) => {
          testedIds.add(id);
          const urn = safeParseUrn(id);

          return { id, displayId: urn?.id ?? id, image };
        }),
        ['image']
      )
    })
  );

  return (
    <Stack spacing={2}>
      {groupedRows.map(({ groupName, rows }) => (
        <div key={groupName}>
          <Heading level="2" fontScale="indexHeadlineSmall">
            {groupName}
          </Heading>
          <TeamBadgesTablesWrapper>
            {chunk(rows, MAX_TEAM_BADGES_TABLE_ROWS).map((rowChunk, index) => (
              <div key={index}>
                <SportTable
                  accessibleCaption="Team badges"
                  columns={[
                    {
                      title: 'ID',
                      dataField: 'displayId',
                      CellComponent: TeamBadgesIdCellComponent
                    },
                    {
                      title: 'Badge',
                      dataField: 'id',
                      CellComponent: SportBadgeCellComponent
                    }
                  ]}
                  rows={rowChunk}
                />
              </div>
            ))}
          </TeamBadgesTablesWrapper>
        </div>
      ))}
    </Stack>
  );
};

const FootballWorldwideDomestic = () => {
  const testedIds = new Set();
  const groupedRows = [{ groupName: 'Football Worldwide Domestic', badgeGroup: footballWorldwideDomestic }].map(
    ({ groupName, badgeGroup }) => ({
      groupName,
      rows: orderBy(
        Object.entries(badgeGroup).map(([id, image]) => {
          testedIds.add(id);
          const urn = safeParseUrn(id);

          return { id, displayId: urn?.id ?? id, image };
        }),
        ['image']
      )
    })
  );

  return (
    <Stack spacing={2}>
      {groupedRows.map(({ groupName, rows }) => (
        <div key={groupName}>
          <Heading level="2" fontScale="indexHeadlineSmall">
            {groupName}
          </Heading>
          <TeamBadgesTablesWrapper>
            {chunk(rows, MAX_TEAM_BADGES_TABLE_ROWS).map((rowChunk, index) => (
              <div key={index}>
                <SportTable
                  accessibleCaption="Team badges"
                  columns={[
                    {
                      title: 'ID',
                      dataField: 'displayId',
                      CellComponent: TeamBadgesIdCellComponent
                    },
                    {
                      title: 'Badge',
                      dataField: 'id',
                      CellComponent: SportBadgeCellComponent
                    }
                  ]}
                  rows={rowChunk}
                />
              </div>
            ))}
          </TeamBadgesTablesWrapper>
        </div>
      ))}
    </Stack>
  );
};

const InternationalFlagsList = () => {
  const testedIds = new Set();
  const groupedRows = [{ groupName: 'International Football', badgeGroup: internationalFootball }].map(
    ({ groupName, badgeGroup }) => ({
      groupName,
      rows: orderBy(
        Object.entries(badgeGroup).map(([id, image]) => {
          testedIds.add(id);
          const urn = safeParseUrn(id);

          return { id, displayId: urn?.id ?? id, image };
        }),
        ['image']
      )
    })
  );

  return (
    <Stack spacing={2}>
      {groupedRows.map(({ groupName, rows }) => (
        <div key={groupName}>
          <Heading level="2" fontScale="indexHeadlineSmall">
            {groupName}
          </Heading>
          <TeamBadgesTablesWrapper>
            {chunk(rows, MAX_TEAM_BADGES_TABLE_ROWS).map((rowChunk, index) => (
              <div key={index}>
                <SportTable
                  accessibleCaption="Team badges"
                  columns={[
                    {
                      title: 'ID',
                      dataField: 'displayId',
                      CellComponent: TeamBadgesIdCellComponent
                    },
                    {
                      title: 'Badge',
                      dataField: 'id',
                      CellComponent: SportBadgeCellComponent
                    }
                  ]}
                  rows={rowChunk}
                />
              </div>
            ))}
          </TeamBadgesTablesWrapper>
        </div>
      ))}
    </Stack>
  );
};

const CountryBadgesList = () => (
  <SportTable
    accessibleCaption="Country badges"
    columns={[
      {
        title: 'Country',
        dataField: 'country'
      },
      {
        title: 'Formula 1',
        dataField: 'formula1'
      },
      {
        title: 'Athletics',
        dataField: 'athletics'
      },
      {
        title: 'Cycling',
        dataField: 'cycling'
      },
      {
        title: 'Golf',
        dataField: 'golf'
      },
      {
        title: 'Olympics',
        dataField: 'olympics'
      },
      {
        title: 'Paralympics',
        dataField: 'paralympics'
      }
    ]}
    rows={orderBy(
      Object.values(
        Object.keys(BadgesMap).reduce((result, id) => {
          const groups = id.match(COUNTRY_URN_REGEX)?.groups;
          if (!groups) {
            return result;
          }

          const { sport, country } = groups;
          return {
            ...result,
            [country]: {
              ...(result[country] ?? {}),
              [sport]: <SportBadge id={id} size={42} />,
              country
            }
          };
        }, {})
      ),
      ['country']
    )}
  />
);

const PlaceholderFallbackTypes = () => (
  <Stack>
    <div>
      <Heading level="1" fontScale="body">
        No fallback type set
      </Heading>
      <SportBadge id="some-unmapped-id" size={42} />
    </div>
    <div>
      <Heading level="1" fontScale="body">
        Badge fallback
      </Heading>
      <SportBadge id="some-unmapped-id" size={42} placeholderFallbackType="badge" />
    </div>
    <div>
      <Heading level="1" fontScale="body">
        Flag fallback
      </Heading>
      <SportBadge id="some-unmapped-id" size={42} placeholderFallbackType="flag" />
    </div>
  </Stack>
);

export {
  EnglishTeamBadgesList,
  EuropeanTeamBadgesList,
  FootballWorldwideDomestic,
  TeamBadgesList,
  CountryBadgesList,
  PlaceholderFallbackTypes,
  InternationalFlagsList
};
