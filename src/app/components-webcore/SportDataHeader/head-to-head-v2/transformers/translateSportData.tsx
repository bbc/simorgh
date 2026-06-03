import { Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';
import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { HeadToHeadV2Data } from '../types';

const translateTeamName = (
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

const handleExtraTime = (
  label: string | undefined,
  sportTranslations: Translations['sport'],
) => {
  const extraTimeMatch = label?.trim().match(/^(\d+'(?:\+\d+)?)\s*ET$/);

  if (!extraTimeMatch) {
    return undefined;
  }

  const [, minuteLabel] = extraTimeMatch;
  return `${minuteLabel} ${sportTranslations?.et || 'ET'}`;
};

const translatePeriodLabel = (
  label: string | undefined,
  sportTranslations: Translations['sport'],
) => {
  const extraTimePeriodLabel = handleExtraTime(label, sportTranslations);

  if (extraTimePeriodLabel) {
    return extraTimePeriodLabel;
  }

  const periodLabelLookup = {
    HT: sportTranslations?.ht,
    FT: sportTranslations?.ft,
    ET: sportTranslations?.et,
    AET: sportTranslations?.afterExtraTime,
    PENS: sportTranslations?.penaltyAbbreviation,
  };

  return periodLabelLookup[label as keyof typeof periodLabelLookup];
};

const translateGroupedActionsName = (
  groupedActionName: string,
  sportTranslations: Translations['sport'],
) => {
  const groupedActionsLookup = {
    Assists: sportTranslations?.assists,
    Penalties: sportTranslations?.penalties,
  };
  return (
    groupedActionsLookup[
      groupedActionName as keyof typeof groupedActionsLookup
    ] || groupedActionName
  );
};

const translateRunningScores = (
  runningScores: Record<string, string>,
  numerals: [string],
) => {
  const scoreFields = new Set([
    'halftime',
    'fulltime',
    'aggregate',
    'extratime',
    'penaltyShootout',
  ]);

  return Object.fromEntries(
    Object.entries(runningScores).map(([key, value]) => [
      key,
      scoreFields.has(key) ? translateScore(value, numerals) : value,
    ]),
  );
};

const translateSportData = (
  data: HeadToHeadV2Data,
  translations: Translations,
  service: Services,
) => {
  const numerals: [string] = getServiceNumerals(service);
  const sportTranslations = translations?.sport;

  if (!sportTranslations) {
    return data;
  }

  const homeTeamTranslation = translateTeamName(
    data.home?.urn,
    sportTranslations,
  );
  const awayTeamTranslation = translateTeamName(
    data.away?.urn,
    sportTranslations,
  );

  const periodLabelTranslation = translatePeriodLabel(
    data.periodLabel?.value,
    sportTranslations,
  );

  const groupedActionsTranslation = data.groupedActions?.map(group => {
    const translatedGroupName = translateGroupedActionsName(
      group.groupName.fullName,
      sportTranslations,
    );

    return {
      ...group,
      groupName: {
        fullName: translatedGroupName,
        shortName: translatedGroupName,
      },
    };
  });

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
      ...(data.home.runningScores && {
        runningScores: translateRunningScores(
          data.home.runningScores,
          numerals,
        ),
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
        runningScores: translateRunningScores(
          data.away.runningScores,
          numerals,
        ),
      }),
    },
    ...(data.periodLabel && {
      periodLabel: {
        ...(periodLabelTranslation && { translation: periodLabelTranslation }),
        ...data.periodLabel,
      },
    }),
    ...(data.groupedActions && {
      groupedActions: groupedActionsTranslation,
    }),
  };
};

export default translateSportData;
