// import React from 'react';
// import styled, { css } from '@bbc/web-styled';

import styled from '@emotion/styled';
// import { css } from '@emotion/react';

// import {
//   GROUP_3,
//   SPACING_2,
//   SPACING_5,
//   SPACING_6,
//   fontEmphasised,
//   SPACING_1,
//   SPACING_4,
//   SPACING_3,
//   fontScaleBody,
//   fontScaleDescription,
//   createSize
// } from '@bbc/web-gel-foundations';
// import VisuallyHidden from '@bbc/web-components/visually-hidden/index.js';
import { ActionGrid, GRID_AREAS } from './action-grid';

// eslint-disable-next-line import/no-relative-packages
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../utilities/pixelsToRem';

const GroupedEventsWrapper = styled.div`
  margin: 8px 24px 0;
`;

const ActionWrapper = styled.div`
  ${
    '' /* ${({ theme }) => css`
    border-top: ${createSize(1)} solid ${theme.colourPalette.border.decorativeSubtle};
  `}; */
  }

  border-top: ${pixelsToRem(1)}rem solid #505050;
`;

const GroupLabel = styled.div`
  grid-area: ${GRID_AREAS.centreText};
  ${'' /* ${fontEmphasised} */}
  font-family: ReithSans, Helvetica, Arial, freesans, sans-serif;
  font-weight: 700;
  font-feature-settings: 'ss01' off;

  text-align: center;
  ${'' /* ${fontScaleBody} */}
  font-size: 1rem;
  line-height: 1.375;

  padding: 8px 0 4px;

  @media (min-width: ${pixelsToRem(600)}rem) {
    padding: 8px 0 20px;
  }
`;

const GroupedHomeEvent = styled.div`
  grid-area: ${GRID_AREAS.homeText};
  text-align: right;

  ${'' /* ${fontScaleDescription} */}
  font-size: 14px;
  line-height: 1.2857142857142858;

  padding: 0 16px 12px 0;

  @media (min-width: ${pixelsToRem(600)}rem) {
    ${'' /* ${fontScaleBody} */}
    font-size: 1rem;
    line-height: 1.375;

    padding: 8px 0 20px;
  }
`;

const GroupedAwayEvent = styled.div`
  grid-area: ${GRID_AREAS.awayText};
  text-align: left;

  ${'' /* ${fontScaleDescription} */}
  font-size: 14px;
  line-height: 1.2857142857142858;

  padding: 0 0 12px 16px;

  @media (min-width: ${pixelsToRem(600)}rem) {
    ${'' /* ${fontScaleBody} */}
    font-size: 1rem;
    line-height: 1.375;
    padding: 8px 0 20px;
  }
`;

const Actions = ({ teamActions, teamAccessibleActions }) => {
  if (teamAccessibleActions?.length) {
    return (
      <>
        <span aria-hidden>{teamActions.join(', ')}</span>
        <VisuallyHiddenText>
          {teamAccessibleActions.join(', ')}
        </VisuallyHiddenText>
      </>
    );
  }

  return teamActions.join(', ');
};

// eslint-disable-next-line import/prefer-default-export
export const GroupedEvents = ({ groupedEvents, homeName, awayName }) => (
  <GroupedEventsWrapper>
    {groupedEvents.map(
      ({
        groupName,
        homeTeamActions,
        homeTeamAccessibleActions,
        awayTeamActions,
        awayTeamAccessibleActions,
      }) => (
        <ActionWrapper key={groupName.fullName}>
          <ActionGrid>
            <GroupLabel>{groupName.fullName}</GroupLabel>
            <GroupedHomeEvent>
              {homeTeamActions.length > 0 && (
                <>
                  <VisuallyHiddenText>{`${homeName},`}</VisuallyHiddenText>
                  <Actions
                    teamActions={homeTeamActions}
                    teamAccessibleActions={homeTeamAccessibleActions}
                  />
                </>
              )}
            </GroupedHomeEvent>
            <GroupedAwayEvent>
              {awayTeamActions.length > 0 && (
                <>
                  <VisuallyHiddenText>{`${awayName},`}</VisuallyHiddenText>
                  <Actions
                    teamActions={awayTeamActions}
                    teamAccessibleActions={awayTeamAccessibleActions}
                  />
                </>
              )}
            </GroupedAwayEvent>
          </ActionGrid>
        </ActionWrapper>
      ),
    )}
  </GroupedEventsWrapper>
);
