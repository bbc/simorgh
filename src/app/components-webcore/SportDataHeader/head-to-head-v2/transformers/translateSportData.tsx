import { Translations } from '#app/models/types/translations';
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

const translateSportData = (
  data: HeadToHeadV2Data,
  translations: Translations,
) => {
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
    },
    away: {
      ...data.away,
      fullName: awayTeamTranslation || data.away.fullName,
      shortName: awayTeamTranslation || data.away.shortName,
    },
  };
};

export default translateSportData;
