import React from 'react';
import { GroupedEvents } from './grouped-events.jsx';
import { ActionGrid } from './action-grid.jsx';
import ScoreDetails from './score-details.jsx';
import { KeyEvents } from './key-events.jsx';

export const Actions = ({ data }) => {
  const homeKeyEvents = data.home?.actions || [];
  const awayKeyEvents = data.away?.actions || [];

  const hasGroupedEvents = data.groupedActions && data.groupedActions.length > 0;
  const hasKeyEvents = homeKeyEvents.length > 0 || awayKeyEvents.length > 0;

  return (
    <>
      <ActionGrid>
        <ScoreDetails
          homeName={data.home.fullName}
          awayName={data.away.fullName}
          homeRunningScores={data.home.runningScores}
          awayRunningScores={data.away.runningScores}
        />
        {hasKeyEvents && (
          <KeyEvents
            homeKeyEvents={homeKeyEvents}
            awayKeyEvents={awayKeyEvents}
            homeName={data.home.fullName}
            awayName={data.away.fullName}
          />
        )}
      </ActionGrid>
      {hasGroupedEvents && (
        <GroupedEvents
          groupedEvents={data.groupedActions}
          homeName={data.home.fullName}
          awayName={data.away.fullName}
        />
      )}
    </>
  );
};
