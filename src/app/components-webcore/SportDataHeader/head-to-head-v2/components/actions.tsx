/* eslint-disable import/prefer-default-export */

import type { HeadToHeadV2Data } from '../types';
import ActionGrid from './action-grid';
import GroupedEvents from './grouped-events';
import { KeyEvents } from './key-events';
import ScoreDetails from './score-details';

interface ActionsProps {
  data: HeadToHeadV2Data;
}

export const Actions = ({ data }: ActionsProps) => {
  const homeKeyEvents = data.home?.actions || [];
  const awayKeyEvents = data.away?.actions || [];

  const hasGroupedEvents =
    data.groupedActions && data.groupedActions.length > 0;
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
      {hasGroupedEvents && data.groupedActions && (
        <GroupedEvents
          groupedEvents={data.groupedActions}
          homeName={data.home.fullName}
          awayName={data.away.fullName}
        />
      )}
    </>
  );
};
