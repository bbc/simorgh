import React from 'react';
import styled, { css } from '@bbc/web-styled';
import {
  GROUP_3,
  SPACING_2,
  SPACING_5,
  SPACING_6,
  fontEmphasised,
  SPACING_1,
  SPACING_4,
  SPACING_3,
  fontScaleBody,
  fontScaleDescription,
  createSize
} from '@bbc/web-gel-foundations';
import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
import { ActionGrid, GRID_AREAS } from './action-grid.jsx';

const GroupedEventsWrapper = styled.div`
  margin: ${SPACING_2} ${SPACING_6} 0;
`;

const ActionWrapper = styled.div`
  ${({ theme }) => css`
    border-top: ${createSize(1)} solid ${theme.colourPalette.border.decorativeSubtle};
  `};
`;

const GroupLabel = styled.div`
  grid-area: ${GRID_AREAS.centreText};
  ${fontEmphasised}
  text-align: center;
  ${fontScaleBody}
  padding: ${SPACING_2} 0 ${SPACING_1};

  @media (min-width: ${GROUP_3}) {
    padding: ${SPACING_2} 0 ${SPACING_5};
  }
`;

const GroupedHomeEvent = styled.div`
  grid-area: ${GRID_AREAS.homeText};
  text-align: right;

  ${fontScaleDescription}
  padding: 0 ${SPACING_4} ${SPACING_3} 0;

  @media (min-width: ${GROUP_3}) {
    ${fontScaleBody}
    padding: ${SPACING_2} 0 ${SPACING_5};
  }
`;

const GroupedAwayEvent = styled.div`
  grid-area: ${GRID_AREAS.awayText};
  text-align: left;

  ${fontScaleDescription}
  padding: 0 0 ${SPACING_3} ${SPACING_4};

  @media (min-width: ${GROUP_3}) {
    ${fontScaleBody}
    padding: ${SPACING_2} 0 ${SPACING_5};
  }
`;

const Actions = ({ teamActions, teamAccessibleActions }) => {
  if (teamAccessibleActions?.length) {
    return (
      <>
        <span aria-hidden>{teamActions.join(', ')}</span>
        <VisuallyHidden>{teamAccessibleActions.join(', ')}</VisuallyHidden>
      </>
    );
  }

  return teamActions.join(', ');
};

export const GroupedEvents = ({ groupedEvents, homeName, awayName }) => (
  <GroupedEventsWrapper>
    {groupedEvents.map(
      ({ groupName, homeTeamActions, homeTeamAccessibleActions, awayTeamActions, awayTeamAccessibleActions }) => (
        <ActionWrapper key={groupName.fullName}>
          <ActionGrid>
            <GroupLabel>{groupName.fullName}</GroupLabel>
            <GroupedHomeEvent>
              {homeTeamActions.length > 0 && (
                <>
                  <VisuallyHidden>{`${homeName},`}</VisuallyHidden>
                  <Actions teamActions={homeTeamActions} teamAccessibleActions={homeTeamAccessibleActions} />
                </>
              )}
            </GroupedHomeEvent>
            <GroupedAwayEvent>
              {awayTeamActions.length > 0 && (
                <>
                  <VisuallyHidden>{`${awayName},`}</VisuallyHidden>
                  <Actions teamActions={awayTeamActions} teamAccessibleActions={awayTeamAccessibleActions} />
                </>
              )}
            </GroupedAwayEvent>
          </ActionGrid>
        </ActionWrapper>
      )
    )}
  </GroupedEventsWrapper>
);
