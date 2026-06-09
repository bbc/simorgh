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

  // 30'
  // 90' +2
  // 10' ET
  // 9' pen
  const regexCheckWithMeaningfulName = /^(\d+)(?:'(\+\d+)?)?(?:\s*(.*))?$/; // to do

  const match = label.trim().match(regexCheckWithMeaningfulName);

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

// Stage of the game: HT, FT, ET, AET, PENS or minute labels like 45', 90' +2, 10' ET, 9' pen
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

  return lookupResult || translatedMinutes || extraTimeLabel;
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

// e.g. Assists or Passes Décisives
//         "groupedActions": [
//   {
//     "groupName": { "fullName": "Assists", "shortName": "Assists" },
//     "homeTeamActions": ["J. Lucumí (90')"],
//     "awayTeamActions": ["Y. Tielemans (44', 90'+4)", "E. Buendía (51')"]
//   }
// ],
const translateGroupedActions = (
  groupedActions,
  penaltyTranslation,
  assistsTranslation,
  numerals,
  shouldTranslateMinutes,
) => {
  groupedActions?.map(group => {
    // const translatedGroupName = translateGroupedActionsName(
    //   group.groupName.fullName,
    //   penaltyTranslation,
    //   assistsTranslation,
    // );

    // const translateGroupedActionsName = (
    //   groupedActionName: string,
    //   sportTranslations: Translations['sport'],
    // ) => {
    //   const groupedActionsLookup = {
    //     Assists: assistsTranslation,
    //     Penalties: penaltyTranslation,
    //   };
    //   return (
    //     groupedActionsLookup[
    //       groupedActionName as keyof typeof groupedActionsLookup
    //     ] || groupedActionName
    //   );
    // };

    return {
      ...group,
      groupName: {
        // fullName: translatedGroupName,
        // shortName: translatedGroupName,
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
