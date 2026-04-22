import { produce } from 'immer';
import preEventData from './pre-event.json';
import preEventNoTeamData from './pre-event-no-team.json';
import preEventNoTimeData from './pre-event-no-time.json';
import preEventDataOneHomeTeam from './pre-event-one-home-team.json';

const preEventWithRoundData = produce(preEventData, draft => {
  draft.data.event.round = {
    urn: '',
    name: 'Group A'
  };
  draft.data.event.participants[1].urn = 'urn:bbc:sportsdata:football:team:everton';
  draft.data.event.participants[1].name.fullName = 'Everton';
  draft.data.event.participants[1].name.shortName = 'Everton';
});

export { preEventData, preEventNoTeamData, preEventNoTimeData, preEventDataOneHomeTeam, preEventWithRoundData };
