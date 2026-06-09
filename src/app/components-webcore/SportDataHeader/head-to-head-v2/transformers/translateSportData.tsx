import { Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';
import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { WesternArabic } from '#app/legacy/psammead/psammead-locales/src/numerals';
import { GroupedActions, HeadToHeadV2Data, Team } from '../types';

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

// translates Minutes in period label (e.g. 45', 45'+2, 98' ET) and player actions (e.g. 9')
const translateMinutes = (label: string | undefined, numerals: string[]) => {
  if (!label) {
    return label;
  }

  // E.g. 30', 90'+4, 98' ET
  const isMinutesOnlyOrPlusMinutesOrWithExtraTime =
    /^(\d+)(?:'(\+\d+)?)?(?:\s*(.*))?$/;

  const match = label.trim().match(isMinutesOnlyOrPlusMinutesOrWithExtraTime);

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

// E.g. translates "ET" part of "10' ET"
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

// Stage of the game: HT, FT, ET, AET, PENS or minute labels like 45', 45'+2, 98' ET
// returns text (e.g. PEN), else minutes (e.g. 45' or 45'+2), else minutes with ET label (e.g. 98' ET)
const translatePeriodLabel = (
  periodLabel: { value: string; accessible: string },
  sportTranslations: Translations['sport'],
  numerals: string[],
  shouldTranslateMinutes: boolean,
) => {
  if (!periodLabel) return null;

  const extraTimeLabel = handleExtraTimeLabel(
    periodLabel.value,
    sportTranslations,
  );

  const periodLabelLookup = {
    HT: sportTranslations?.ht,
    FT: sportTranslations?.ft,
    ET: sportTranslations?.et,
    AET: sportTranslations?.afterExtraTime,
    PENS: sportTranslations?.penaltyAbbreviation,
  };

  const lookupResult =
    periodLabelLookup[periodLabel.value as keyof typeof periodLabelLookup];

  const translatedMinutes =
    extraTimeLabel && shouldTranslateMinutes
      ? translateMinutes(extraTimeLabel, numerals)
      : shouldTranslateMinutes && translateMinutes(periodLabel.value, numerals);

  const translatedValue = lookupResult || translatedMinutes || extraTimeLabel;

  return {
    ...periodLabel,
    ...(translatedValue && { translation: translatedValue }),
  };
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
  worldCupTeamNames: Record<string, string> | undefined,
) => {
  const teamIdentifier = urn?.split(':').pop();
  return teamIdentifier ? worldCupTeamNames?.[teamIdentifier] : undefined;
};

const transformTeam = (
  team: Team,
  teamNameTranslation: string | undefined,
  numerals: string[],
  shouldTranslateMinutes: boolean,
) => {
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

// e.g. Penalties or Assists
const translateGroupedActionsName = ({
  groupedActionName,
  penaltyTranslation,
  assistsTranslation,
}: {
  groupedActionName: string;
  penaltyTranslation?: string;
  assistsTranslation?: string;
}) => {
  const groupedActionsLookup: Record<string, string | undefined> = {
    Assists: assistsTranslation,
    Penalties: penaltyTranslation,
  };

  return groupedActionsLookup[groupedActionName] || groupedActionName;
};

// E.g. grouped actions by type (Assists, Penalties) with translated group names and translated minute labels within the actions
const translateGroupedActions = (
  groupedActions: GroupedActions[] | undefined,
  penaltyTranslation: string | undefined,
  assistsTranslation: string | undefined,
  numerals: string[],
  shouldTranslateMinutes: boolean,
) => {
  return groupedActions?.map(group => {
    const translatedGroupName = translateGroupedActionsName({
      groupedActionName: group.groupName.fullName,
      penaltyTranslation,
      assistsTranslation,
    });

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
};

const translateSportData = (
  data: HeadToHeadV2Data,
  translations: Translations,
  service: Services,
) => {
  const numerals: string[] = getServiceNumerals(service);
  const sportTranslations = translations?.sport;
  const shouldTranslateMinutes = numerals !== WesternArabic;

  if (!sportTranslations) {
    return data;
  }

  const homeTeamTranslation = translateTeamName(
    data.home?.urn,
    sportTranslations.worldCupTeamNames,
  );

  const awayTeamTranslation = translateTeamName(
    data.away?.urn,
    sportTranslations.worldCupTeamNames,
  );

  return {
    ...data,
    home: transformTeam(
      data.home,
      homeTeamTranslation,
      numerals,
      shouldTranslateMinutes,
    ),
    away: transformTeam(
      data.away,
      awayTeamTranslation,
      numerals,
      shouldTranslateMinutes,
    ),
    ...(data.periodLabel && {
      periodLabel: translatePeriodLabel(
        data.periodLabel,
        sportTranslations,
        numerals,
        shouldTranslateMinutes,
      ),
    }),
    ...(data.groupedActions && {
      groupedActions: translateGroupedActions(
        data.groupedActions,
        sportTranslations.penalties,
        sportTranslations.assists,
        numerals,
        shouldTranslateMinutes,
      ),
    }),
  };
};

export default translateSportData;
