import moment from 'moment';
import { HeadToHeadV2 } from '../../head-to-head-v2';
import { shortNamesMap } from './short-name-map';

export const HeadToHeadV2ConciseComponent = args => {
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

  // Swapped out a PS function for moment.
  const matchDate = moment(date).locale('en').format('D MMM YYYY');
  const day = new Date(date).toLocaleString('en-gb', { weekday: 'short' });
  const matchTime = moment(date).locale('en').format('HH:mm');

  const buildTeamObject = (
    team,
    score,
    scoreUnconfirmed,
    actions,
    alignment,
    data,
  ) => {
    const { runningScores } = data[alignment];
    const obj = {};
    if (score) {
      obj.score = score;
      obj.scoreUnconfirmed = scoreUnconfirmed;
    }
    return {
      ...obj,
      fullName: team,
      shortName: shortNamesMap(team),
      urn: `urn:bbc:sportsdata:football:team:${team.toLowerCase().split(' ').join('-')}`,
      actions,
      runningScores,
    };
  };

  const updatedStoryBookControls = {
    ...baseData,
    date: `${day} ${matchDate}`,
    time: { displayTimeUK: matchTime, accessibleTime: matchTime },
    venue: {
      name: venue,
    },
    tournament: {
      name: tournament.name,
      urn: tournament.urn,
    },
    home: buildTeamObject(
      home,
      homeScore,
      homeScoreUnconfirmed,
      homeActions,
      'home',
      baseData,
    ),
    away: buildTeamObject(
      away,
      awayScore,
      awayScoreUnconfirmed,
      awayActions,
      'away',
      baseData,
    ),
  };

  return (
    <HeadToHeadV2
      data={updatedStoryBookControls}
      renderEventSummaryHeading
      isConciseView
    />
  );
};

export const HeadToHeadV2Component = args => {
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
    onwardJourneyLink,
  } = args;
  // Swapped out a PS function for moment.
  const matchDate = moment(date).locale('en').format('D MMM YYYY');
  const day = new Date(date).toLocaleString('en-gb', { weekday: 'short' });
  const matchTime = moment(date).locale('en').format('HH:mm');

  const buildTeamObject = (
    team,
    score,
    scoreUnconfirmed,
    actions,
    alignment,
    data,
  ) => {
    const { runningScores } = data[alignment];
    const obj = {};
    if (score) {
      obj.score = score;
      obj.scoreUnconfirmed = scoreUnconfirmed;
    }

    return {
      ...obj,
      fullName: team,
      shortName: shortNamesMap(team),
      urn: `urn:bbc:sportsdata:football:team:${team.toLowerCase().split(' ').join('-')}`,
      actions,
      runningScores,
    };
  };

  const updatedStoryBookControls = {
    ...baseData,
    date: `${day} ${matchDate}`,
    time: { displayTimeUK: matchTime, accessibleTime: matchTime },
    venue: {
      name: venue,
    },
    tournament: {
      name: tournament.name,
      urn: tournament.urn,
    },
    home: buildTeamObject(
      home,
      homeScore,
      homeScoreUnconfirmed,
      homeActions,
      'home',
      baseData,
    ),
    away: buildTeamObject(
      away,
      awayScore,
      awayScoreUnconfirmed,
      awayActions,
      'away',
      baseData,
    ),
    onwardJourneyLink,
  };

  return (
    <HeadToHeadV2 data={updatedStoryBookControls} renderEventSummaryHeading />
  );
};
