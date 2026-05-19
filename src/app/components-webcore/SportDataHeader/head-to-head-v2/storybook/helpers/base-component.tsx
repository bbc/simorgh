import moment from 'moment';
import { HeadToHeadV2 } from '../../head-to-head-v2';
import type { HeadToHeadV2Data } from '../../types';
import { shortNamesMap } from './short-name-map';

type Team = HeadToHeadV2Data['home'];

type StoryArgs = {
  home: string;
  homeScore?: string;
  homeScoreUnconfirmed?: string;
  away: string;
  awayScore?: string;
  awayScoreUnconfirmed?: string;
  venue: string;
  tournament: { name: string; urn: string };
  date: string;
  baseData: HeadToHeadV2Data;
  homeActions?: Team['actions'];
  awayActions?: Team['actions'];
  onwardJourneyLink?: string;
};

const buildTeamObject = ({
  team,
  score,
  scoreUnconfirmed,
  actions,
  alignment,
  data,
}: {
  team: string;
  score?: string;
  scoreUnconfirmed?: string;
  actions?: Team['actions'];
  alignment: 'home' | 'away';
  data: HeadToHeadV2Data;
}): Team => {
  return {
    ...data[alignment],
    fullName: team,
    shortName: shortNamesMap(team),
    urn: `urn:bbc:sportsdata:football:team:${team.toLowerCase().split(' ').join('-')}`,
    actions,
    ...(score && { score, scoreUnconfirmed }),
  };
};

export const HeadToHeadV2ConciseComponent = (args: StoryArgs) => {
  const {
    home,
    homeScore,
    homeScoreUnconfirmed,
    away,
    awayScore,
    awayScoreUnconfirmed,
    venue,
    tournament,
    date,
    baseData,
    homeActions,
    awayActions,
  } = args;

  const matchDate = moment(date).locale('en').format('D MMM YYYY');
  const day = new Date(date).toLocaleString('en-gb', { weekday: 'short' });
  const matchTime = moment(date).locale('en').format('HH:mm');

  const updatedStoryBookControls: HeadToHeadV2Data = {
    ...baseData,
    date: `${day} ${matchDate}`,
    time: { displayTimeUK: matchTime, accessibleTime: matchTime },
    venue: { name: venue },
    tournament: {
      ...baseData.tournament,
      name: tournament.name,
      urn: tournament.urn,
    },
    home: buildTeamObject({
      team: home,
      score: homeScore,
      scoreUnconfirmed: homeScoreUnconfirmed,
      actions: homeActions,
      alignment: 'home',
      data: baseData,
    }),
    away: buildTeamObject({
      team: away,
      score: awayScore,
      scoreUnconfirmed: awayScoreUnconfirmed,
      actions: awayActions,
      alignment: 'away',
      data: baseData,
    }),
  };

  return (
    <HeadToHeadV2
      data={updatedStoryBookControls}
      isConciseView
      shouldShowActions={false}
    />
  );
};

export const HeadToHeadV2Component = (args: StoryArgs) => {
  const {
    home,
    homeScore,
    homeScoreUnconfirmed,
    away,
    awayScore,
    awayScoreUnconfirmed,
    venue,
    tournament,
    date,
    baseData,
    homeActions,
    awayActions,
  } = args;

  const matchDate = moment(date).locale('en').format('D MMM YYYY');
  const day = new Date(date).toLocaleString('en-gb', { weekday: 'short' });
  const matchTime = moment(date).locale('en').format('HH:mm');

  const updatedStoryBookControls: HeadToHeadV2Data = {
    ...baseData,
    date: `${day} ${matchDate}`,
    time: { displayTimeUK: matchTime, accessibleTime: matchTime },
    venue: { name: venue },
    tournament: {
      ...baseData.tournament,
      name: tournament.name,
      urn: tournament.urn,
    },
    home: buildTeamObject({
      team: home,
      score: homeScore,
      scoreUnconfirmed: homeScoreUnconfirmed,
      actions: homeActions,
      alignment: 'home',
      data: baseData,
    }),
    away: buildTeamObject({
      team: away,
      score: awayScore,
      scoreUnconfirmed: awayScoreUnconfirmed,
      actions: awayActions,
      alignment: 'away',
      data: baseData,
    }),
  };

  return (
    <HeadToHeadV2
      data={updatedStoryBookControls}
      isConciseView={false}
      shouldShowActions={false}
    />
  );
};
