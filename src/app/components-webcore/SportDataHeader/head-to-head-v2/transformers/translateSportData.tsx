import { Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';
import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { WesternArabic } from '#app/legacy/psammead/psammead-locales/src/numerals';
import { HeadToHeadV2Data, Team } from '../types';

const translateDigits = (value: string, numerals: string[]) =>
  value.replace(/\d/g, digit => numerals[Number(digit)] ?? digit);

// Recursively translates minute labels within grouped actions, which can be nested objects or arrays
const translateGroupActionMinutes = <T,>(obj: T, numerals: string[]): T => {
  if (typeof obj === 'string') {
    return translateDigits(obj, numerals) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => translateGroupActionMinutes(item, numerals)) as T;
  }

  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        translateGroupActionMinutes(value, numerals),
      ]),
    ) as T;
  }

  return obj;
};

const translateMinutes = (label: string | undefined, numerals: string[]) => {
  if (!label) {
    return label;
  }

  const match = label.trim().match(/^(\d+)(?:'(\+\d+)?)?(?:\s*(.*))?$/);

  if (!match) {
    return label;
  }

  const [, minutes, addedMinutes, suffix] = match;

  const translatedMinutes = translateDigits(minutes, numerals);
  const translatedAddedMinutes = addedMinutes
    ? translateDigits(addedMinutes, numerals)
    : undefined;
  const translatedTime = translatedAddedMinutes
    ? `${translatedMinutes}'${translatedAddedMinutes}`
    : `${translatedMinutes}'`;

  return suffix ? `${translatedTime} ${suffix}` : translatedTime;
};

const handleExtraTimeLabel = (
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
  numerals: string[],
) => {
  if (!label) return null;

  const extraTimeLabel = handleExtraTimeLabel(label, sportTranslations);

  const periodLabelLookup = {
    HT: sportTranslations?.ht,
    FT: sportTranslations?.ft,
    ET: sportTranslations?.et,
    AET: sportTranslations?.afterExtraTime,
    PENS: sportTranslations?.penaltyAbbreviation,
  };

  const lookupResult =
    periodLabelLookup[label as keyof typeof periodLabelLookup];

  const shouldTranslateMinutes = numerals !== WesternArabic && !lookupResult;

  const translatedMinutes =
    extraTimeLabel && shouldTranslateMinutes
      ? translateMinutes(extraTimeLabel, numerals)
      : shouldTranslateMinutes && translateMinutes(label, numerals);

  return lookupResult || translatedMinutes || extraTimeLabel;
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

const translateScore = (score: string, numerals: string[]) => {
  return score?.replace(/\d/g, digit => numerals[Number(digit)] ?? digit);
};

const translateRunningScores = (
  runningScores: Record<string, string>,
  numerals: string[],
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

const translateTeamName = (
  urn: string | undefined,
  sportTranslations: Translations['sport'],
) => {
  const teamIdentifier = urn?.split(':').pop();
  return teamIdentifier
    ? sportTranslations?.worldCupTeamNames?.[teamIdentifier]
    : undefined;
};

const transformTeam = (
  team: Team,
  teamNameTranslation: string | undefined,
  numerals: string[],
) => {
  const shouldTranslateMinutes = numerals !== WesternArabic;

  return {
    ...team,
    fullName: teamNameTranslation || team.fullName,
    shortName: teamNameTranslation || team.shortName,
    ...(shouldTranslateMinutes && {
      ...(team.score && {
        score: translateScore(team.score, numerals),
      }),
      ...(team.scoreUnconfirmed && {
        scoreUnconfirmed: translateScore(team.scoreUnconfirmed, numerals),
      }),
      ...(team.runningScores && {
        runningScores: translateRunningScores(team.runningScores, numerals),
      }),

      ...(team.actions && {
        actions: team.actions.map(playerAction => ({
          ...playerAction,
          actions: playerAction.actions.map(action => ({
            ...action,
            timeLabel: {
              ...action.timeLabel,
              translated: translateMinutes(action.timeLabel.value, numerals),
            },
          })),
        })),
      }),
    }),
  };
};

const translateSportData = (
  data: HeadToHeadV2Data,
  translations: Translations,
  service: Services,
) => {
  const numerals: string[] = getServiceNumerals(service);
  const shouldTranslateMinutes = numerals !== WesternArabic;
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
    numerals,
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
      ...(shouldTranslateMinutes && {
        homeTeamActions: translateGroupActionMinutes(
          group.homeTeamActions,
          numerals,
        ),
        awayTeamActions: translateGroupActionMinutes(
          group.awayTeamActions,
          numerals,
        ),
      }),
    };
  });

  return {
    ...data,
    home: transformTeam(data.home, homeTeamTranslation, numerals),
    away: transformTeam(data.away, awayTeamTranslation, numerals),
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
