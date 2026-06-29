/* eslint-disable import/prefer-default-export */
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import GroupedEvents from './grouped-events';
import ActionGrid from './action-grid';
import ScoreDetails from './score-details';
import { KeyEvents } from './key-events';
import type { HeadToHeadV2Data } from '../types';

interface ActionsProps {
  data: HeadToHeadV2Data;
}

export const Actions = ({ data }: ActionsProps) => {
  const { translations } = use(ServiceContext);
  const sport = translations?.sport;
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
          translations={sport}
        />
        {hasKeyEvents && (
          <KeyEvents
            homeKeyEvents={homeKeyEvents}
            awayKeyEvents={awayKeyEvents}
            homeName={data.home.fullName}
            awayName={data.away.fullName}
            keyEventsTitle={sport?.keyEventsTitle}
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
