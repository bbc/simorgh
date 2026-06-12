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

// Grouped actions like Assists (e.g. "Y. Tielemans (44', 90'+4)", "E. Buendía (51')")
const translateGroupActionMinutes = (
  actions: string[] | undefined,
  numerals: string[],
) => actions?.map(action => translateDigits(action, numerals));

// Period label is stage of the game: HT, FT, ET, AET, PENS or minute labels like 45', 45'+2, 98' ET
const translatePeriodLabel = (
  periodLabel: { value: string; translation?: string; accessible: string },
  sportTranslations: Translations['sport'],
  numerals: string[],
  shouldTranslateMinutes: boolean,
) => {
  if (!periodLabel.value) return undefined;

  const value = periodLabel.value.trim();

  const periodLabelTextLookup: Record<string, string | undefined> = {
    HT: sportTranslations?.ht,
    FT: sportTranslations?.ft,
    ET: sportTranslations?.et,
    AET: sportTranslations?.afterExtraTime,
    PENS: sportTranslations?.penaltyAbbreviation,
  };

  const periodLabelText = periodLabelTextLookup[value];
  if (periodLabelText) {
    // Returns translated text (e.g. FT)
    return {
      ...periodLabel,
      translation: periodLabelText,
    };
  }

  if (value.endsWith('ET')) {
    // Returns translated minutes with ET (e.g. "98' ET" "114' ET")
    const minuteLabel = value.slice(0, -3).trim();
    const translatedMinuteLabel = shouldTranslateMinutes
      ? translateDigits(minuteLabel, numerals)
      : minuteLabel;

    return {
      ...periodLabel,
      translation: `${translatedMinuteLabel} ${sportTranslations?.et || 'ET'}`,
    };
  }

  if (!shouldTranslateMinutes) {
    // Returns original minute label (e.g. "45'", "45'+2")
    return periodLabel;
  }

  const translatedMinuteLabel = translateDigits(value, numerals);

  // Returns translated minute label (e.g. "45'", "45'+2")
  return {
    ...periodLabel,
    translation: translatedMinuteLabel,
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

  const { worldCupTeamNames, assists, penalties, tournaments, stages } =
    sportTranslations;

  const groupedActionsLookup: Record<string, string | undefined> = {
    Assists: assists,
    Penalties: penalties,
  };

  const tournamentLookup: Record<string, string | undefined> = {
    'FIFA World Cup': tournaments?.fifaWorldCup,
  };

  const stageLookup: Record<string, string | undefined> = {
    'Group Stage': stages?.groupStage,
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
    tournament: {
      ...data.tournament,
      name: tournamentLookup[data.tournament.name] || data.tournament.name,
    },
    stage: {
      ...data.stage,
      name: stageLookup[data.stage.name] || data.stage.name,
    },
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
