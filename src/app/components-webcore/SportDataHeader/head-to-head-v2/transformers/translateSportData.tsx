import { Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';
import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { WesternArabic } from '#app/legacy/psammead/psammead-locales/src/numerals';
import { HeadToHeadV2Data, Team } from '../types';

const minutesLabelPattern = /^(\d+)(?:'(\+\d+)?)?(?:\s*(.*))?$/;
const extraTimeLabelPattern = /^(\d+'(?:\+\d+)?)\s*ET$/;
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

// Translates Minutes in period label (e.g. 45', 45'+2, 98' ET) and player actions (e.g. 9')
const translateMinutes = (label: string | undefined, numerals: string[]) => {
  if (!label) {
    return label;
  }

  // Matches recognised minutes pattern (e.g. 30', 90'+4, 98' ET) and returns parsed array
  // E.g. splits 90'+4 into [90', +4']. Or splits "98' ET" into [98', undefined, 'ET']
  const parsedMinutesLabel = label.trim().match(minutesLabelPattern);

  if (!parsedMinutesLabel) {
    return label;
  }

  const [, minutes, addedMinutes, suffix] = parsedMinutesLabel;

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
  // Matches recognised ET minutes pattern (e.g. 98' ET) and returns parsed array
  // Splits "98' ET" into [98' ET, 98', ET]
  const parsedExtraTimeLabel = label?.trim().match(extraTimeLabelPattern);

  if (!parsedExtraTimeLabel) {
    return undefined;
  }

  const [, minuteLabel] = parsedExtraTimeLabel;
  return `${minuteLabel} ${sportTranslations?.et || 'ET'}`;
};

// Stage of the game: HT, FT, ET, AET, PENS or minute labels like 45', 45'+2, 98' ET
// returns text (e.g. FT), else minutes (e.g. 45' or 45'+2), else minutes with ET label (e.g. 98' ET)
const translatePeriodLabel = (
  periodLabel: { value: string; translation?: string; accessible: string },
  sportTranslations: Translations['sport'],
  numerals: string[],
  shouldTranslateMinutes: boolean,
) => {
  if (!periodLabel.value) return undefined;

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
  return Object.fromEntries(
    Object.entries(runningScores).map(([key, value]) => [
      key,
      runningScoreFields.has(key) ? translateScore(value, numerals) : value,
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
