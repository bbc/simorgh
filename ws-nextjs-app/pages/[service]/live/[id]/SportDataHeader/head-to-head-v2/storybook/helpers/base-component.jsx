import React from 'react';
import { formatDate } from '@bbc/web-gel-date-formatter';
import HeadToHeadV2 from '@bbc/web-components/head-to-head-v2/index.js';
import { shortNamesMap } from './short-name-map.js';

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
    awayActions
  } = args;
  const matchDate = formatDate(date, 'd MMM yyyy');
  const day = new Date(date).toLocaleString('en-gb', { weekday: 'short' });
  const matchTime = formatDate(date, 'HH:mm');

  const buildTeamObject = (team, score, scoreUnconfirmed, actions, alignment, data) => {
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
      runningScores
    };
  };

  const updatedStoryBookControls = {
    ...baseData,
    date: `${day} ${matchDate}`,
    time: { displayTimeUK: matchTime, accessibleTime: matchTime },
    venue: {
      name: venue
    },
    tournament: {
      name: tournament.name,
      urn: tournament.urn
    },
    home: buildTeamObject(home, homeScore, homeScoreUnconfirmed, homeActions, 'home', baseData),
    away: buildTeamObject(away, awayScore, awayScoreUnconfirmed, awayActions, 'away', baseData)
  };

  return <HeadToHeadV2 data={updatedStoryBookControls} renderEventSummaryHeading isConciseView={'true'} />;
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
    onwardJourneyLink
  } = args;
  const matchDate = formatDate(date, 'd MMM yyyy');
  const day = new Date(date).toLocaleString('en-gb', { weekday: 'short' });
  const matchTime = formatDate(date, 'HH:mm');

  const buildTeamObject = (team, score, scoreUnconfirmed, actions, alignment, data) => {
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
      runningScores
    };
  };

  const updatedStoryBookControls = {
    ...baseData,
    date: `${day} ${matchDate}`,
    time: { displayTimeUK: matchTime, accessibleTime: matchTime },
    venue: {
      name: venue
    },
    tournament: {
      name: tournament.name,
      urn: tournament.urn
    },
    home: buildTeamObject(home, homeScore, homeScoreUnconfirmed, homeActions, 'home', baseData),
    away: buildTeamObject(away, awayScore, awayScoreUnconfirmed, awayActions, 'away', baseData),
    onwardJourneyLink
  };

  return <HeadToHeadV2 data={updatedStoryBookControls} renderEventSummaryHeading />;
};
