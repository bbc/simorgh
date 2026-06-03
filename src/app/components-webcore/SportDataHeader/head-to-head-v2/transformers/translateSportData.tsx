import { Services } from '#app/models/types/global';
import { Translations } from '#app/models/types/translations';
import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { HeadToHeadV2Data, Team } from '../types';

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

// //
// // I want to handle
// // 114' ET
// // 98' ET
// // 45'+2
// const translateMinutes = (label: string | undefined, numerals: [string]) => {
//   // regex check for minutes that assigns 114' ET to minutes and any value afterwards to labelSuffix that doesn;t have to be ET, so it can handle both 114' ET and 45'+2
//   const minutesMatch = label?.trim().match(/^(\d+'(?:\+\d+)?)(?:\s*(ET))?$/);

//   const minutes = minutesMatch ? minutesMatch[1] : undefined;

//   const addedMinutes = minutes?.includes('+')
//     ? minutes.split('+')[1]
//     : undefined;

//   if (!minutes && !addedMinutes) {
//     return label;
//   }

//   const translatedMinutes = minutes?.replace(
//     /\d/g,
//     digit => numerals[Number(digit)] ?? digit,
//   );
//   const translatedAddedMinutes = addedMinutes?.replace(
//     /\d/g,
//     digit => numerals[Number(digit)] ?? digit,
//   );

//   return label
//     ?.replace(minutes, translatedMinutes || minutes)
//     .replace(addedMinutes || '', translatedAddedMinutes || addedMinutes || '');
// };

// // I want to handle
// // 114' ET
// // 98' ET
// // 45'+2
const translateMinutes = (label: string | undefined, numerals: string[]) => {
  if (!label) return label; // hmm?

  const match = label.trim().match(/^(\d+)(?:'(\+\d+)?)?(?:\s*(.*))?$/);

  if (!match) return label;

  const [_, baseMinutes, addedPart, suffix] = match;

  const translateDigits = (str: string) =>
    str.replace(/\d/g, d => numerals[Number(d)] ?? d);

  let result = translateDigits(baseMinutes);

  if (addedPart) {
    result += `'${translateDigits(addedPart)}`;
  } else {
    result += `'`;
  }

  if (suffix) {
    result += ` ${suffix}`;
  }

  return result;
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
  numerals: [string],
) => {
  const labelMinutesTranslation = translateMinutes(label, numerals);

  console.log('labelMinutesTranslation', labelMinutesTranslation);

  const extraTimePeriodLabel = handleExtraTime(
    labelMinutesTranslation,
    sportTranslations,
  );

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

  return periodLabelLookup[
    labelMinutesTranslation as keyof typeof periodLabelLookup
  ];
  // rename
  //   const lookupResult =
  //     periodLabelLookup[label as keyof typeof periodLabelLookup];

  //   const translatedMinutes = translateMinutes(label, numerals);

  //   const translatedExtraTimeMinutes = translateMinutes(
  //     extraTimePeriodLabel,
  //     numerals,
  //   );

  //   return lookupResult || translatedMinutes || translatedExtraTimeMinutes;
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

const transformTeam = (
  team: Team,
  teamNameTranslation: string | undefined,
  numerals: [string],
) => ({
  ...team,
  fullName: teamNameTranslation || team.fullName,
  shortName: teamNameTranslation || team.shortName,
  ...(team.score && {
    score: translateScore(team.score, numerals),
  }),
  ...(team.scoreUnconfirmed && {
    scoreUnconfirmed: translateScore(team.scoreUnconfirmed, numerals),
  }),
  ...(team.runningScores && {
    runningScores: translateRunningScores(team.runningScores, numerals),
  }),
});

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
