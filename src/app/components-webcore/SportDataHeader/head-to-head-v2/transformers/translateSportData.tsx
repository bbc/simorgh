import { Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';
import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { HeadToHeadV2Data } from '../types';

const fetchTeamNameTranslation = (
  urn: string | undefined,
  sportTranslations: Translations['sport'],
) => {
  const teamIdentifier = urn?.split(':').pop();
  return teamIdentifier
    ? sportTranslations?.worldCupTeamNames?.[teamIdentifier]
    : undefined;
};

const translateScore = (score: string, numerals: [string]) => {
  return score?.replace(/\d/g, digit => numerals[Number(digit)] ?? digit);
};

const getRunningScores = (
  runningScores: Record<string, string>,
  numerals: [string],
) => {
  const scoreFields = [
    'halftime',
    'fulltime',
    'aggregate',
    'extratime',
    'penaltyShootout',
  ]; // check if others

  const translatedRunningScores = Object.fromEntries(
    scoreFields
      .filter(key => runningScores?.[key] != null)
      .map(key => [key, translateScore(runningScores[key], numerals)]),
  );
  return translatedRunningScores;
};

const translateSportData = (
  data: HeadToHeadV2Data,
  translations: Translations,
  service: Services,
) => {
  const numerals: [string] = getServiceNumerals(service); // check type
  const sportTranslations = translations?.sport;
  const homeTeamTranslation = fetchTeamNameTranslation(
    data.home?.urn,
    sportTranslations,
  );
  const awayTeamTranslation = fetchTeamNameTranslation(
    data.away?.urn,
    sportTranslations,
  );

  return {
    ...data,
    home: {
      ...data.home,
      fullName: homeTeamTranslation || data.home.fullName,
      shortName: homeTeamTranslation || data.home.shortName,
      ...(data.home.score && {
        score: translateScore(data.home.score, numerals),
      }),
      ...(data.home.scoreUnconfirmed && {
        scoreUnconfirmed: translateScore(data.home.scoreUnconfirmed, numerals),
      }),
      ...(data.away.runningScores && {
        runningScores: getRunningScores(data.away.runningScores, numerals),
      }),
    },
    away: {
      ...data.away,
      fullName: awayTeamTranslation || data.away.fullName,
      shortName: awayTeamTranslation || data.away.shortName,
      ...(data.away.score && {
        score: translateScore(data.away.score, numerals),
      }),
      ...(data.away.scoreUnconfirmed && {
        scoreUnconfirmed: translateScore(data.away.scoreUnconfirmed, numerals),
      }),
      ...(data.away.runningScores && {
        runningScores: getRunningScores(data.away.runningScores, numerals),
      }),
    },
  };
};

export default translateSportData;
