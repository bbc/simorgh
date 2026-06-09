import { Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';
import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { WesternArabic } from '#app/legacy/psammead/psammead-locales/src/numerals';
import { HeadToHeadV2Data, Team } from '../types';

const runningScoreFields = new Set([
  'halftime',
  'fulltime',
  'aggregate',
  'extratime',
  'penaltyShootout',
]);

const translateDigits = (value: string, numerals: string[]) =>
  value.replace(/\d/g, digit => numerals[Number(digit)] ?? digit);

// Translates digits within grouped actions strings (e.g. "Y. Tielemans (44', 90'+4)", "E. Buendía (51')")
const translateGroupActionMinutes = (
  actions: string[] | undefined,
  numerals: string[],
) => actions?.map(action => translateDigits(action, numerals));

const translatePeriodLabel = (
  periodLabel: { value: string; translation?: string; accessible: string },
  sportTranslations: Translations['sport'],
  numerals: string[],
  shouldTranslateMinutes: boolean,
) => {
  if (!periodLabel.value) return undefined;

  const periodLabelLookup: Record<string, string | undefined> = {
    HT: sportTranslations?.ht,
    FT: sportTranslations?.ft,
    ET: sportTranslations?.et,
    AET: sportTranslations?.afterExtraTime,
    PENS: sportTranslations?.penaltyAbbreviation,
  };

  const lookupResult = periodLabelLookup[periodLabel.value];
  if (lookupResult) {
    return {
      ...periodLabel,
      translation: lookupResult,
    };
  }

  if (!shouldTranslateMinutes) {
    return periodLabel;
  }

  const value = periodLabel.value.trim();

  if (value.endsWith(' ET')) {
    const minuteLabel = value.slice(0, -3);
    return {
      ...periodLabel,
      translation: `${translateDigits(minuteLabel, numerals)} ${sportTranslations?.et || 'ET'}`,
    };
  }

  const [minutesPart, suffixPart] = value.split(/\s+/, 2);
  const [minutes, addedMinutes] = minutesPart.split("'", 2);

  if (!minutes) {
    return periodLabel;
  }

  const translatedMinutes = translateDigits(minutes, numerals);
  const translatedAddedMinutes = addedMinutes
    ? `'${translateDigits(addedMinutes.replace('+', ''), numerals)}`
    : '';

  return {
    ...periodLabel,
    translation: suffixPart
      ? `${translatedMinutes}'${translatedAddedMinutes} ${suffixPart}`
      : `${translatedMinutes}'${translatedAddedMinutes}`,
  };
};

const translateRunningScores = (
  runningScores: Record<string, string>,
  numerals: string[],
) => {
  return Object.fromEntries(
    Object.entries(runningScores).map(([key, value]) => [
      key,
      runningScoreFields.has(key) ? translateDigits(value, numerals) : value,
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
  worldCupTeamNames: Record<string, string> | undefined,
  numerals: string[],
  shouldTranslateMinutes: boolean,
) => {
  const teamNameTranslation = translateTeamName(team.urn, worldCupTeamNames);

  return {
    ...team,
    fullName: teamNameTranslation || team.fullName,
    shortName: teamNameTranslation || team.shortName,
    ...(shouldTranslateMinutes && {
      ...(team.score && {
        score: translateDigits(team.score, numerals),
      }),
      ...(team.scoreUnconfirmed && {
        scoreUnconfirmed: translateDigits(team.scoreUnconfirmed, numerals),
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
              translated: translateDigits(action.timeLabel.value, numerals),
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
  const sportTranslations = translations?.sport;
  const shouldTranslateMinutes = numerals !== WesternArabic;

  if (!sportTranslations) {
    return data;
  }

  const { worldCupTeamNames, assists, penalties } = sportTranslations;
  const groupedActionsLookup: Record<string, string | undefined> = {
    Assists: assists,
    Penalties: penalties,
  };

  return {
    ...data,
    home: transformTeam(
      data.home,
      worldCupTeamNames,
      numerals,
      shouldTranslateMinutes,
    ),
    away: transformTeam(
      data.away,
      worldCupTeamNames,
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
      groupedActions: data.groupedActions.map(group => {
        const translatedGroupName =
          groupedActionsLookup[group.groupName.fullName] ||
          group.groupName.fullName;

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
      }),
    }),
  };
};

export default translateSportData;
