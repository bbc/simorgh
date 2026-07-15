import { Translations } from '#app/models/types/translations';
import { EventStatus, HeadToHeadV2Data } from '../types';

const ftFallback = { value: 'FT', accessible: 'Full time' };
const aetFallback = { value: 'AET', accessible: 'After extra time' };

type PeriodLabel = { value: string; accessible: string; translation?: string };

type RunningScores = {
  halftime?: string;
  fulltime?: string;
  extratime?: string;
  penaltyShootout?: string;
  aggregate?: string;
};

type TeamSummary = {
  fullName: string;
  score?: string;
  runningScores?: RunningScores;
};

type EventSummaryParams = {
  time: HeadToHeadV2Data['time'];
  status: string;
  periodLabel?: PeriodLabel & { labelType?: string };
  winner?: string;
  seriesWinner?: string;
  home: TeamSummary;
  away: TeamSummary;
  period?: string;
};

type FallbackPeriodLabelParams = {
  labels: PeriodLabel;
  status: EventStatus | string;
  homeRunningScores?: RunningScores;
  awayRunningScores?: RunningScores;
  homeName?: string;
  awayName?: string;
  translations?: Translations['sport'];
};

export default ({
  labels,
  status,
  homeRunningScores,
  awayRunningScores,
  homeName,
  awayName,
  translations,
}: FallbackPeriodLabelParams): PeriodLabel => {
  const isPens = labels?.value?.toLowerCase() === 'pens';

  const {
    penalties: penaltiesTranslation = 'Penalties',
    afterExtraTime: aetTranslation,
    ft: ftTranslation,
  } = translations || {};

  if (status?.toLowerCase() === 'midevent' && isPens) {
    const accessibleText = [
      homeName,
      ...(homeRunningScores ? [homeRunningScores.penaltyShootout] : []),
      ',',
      awayName,
      ...(awayRunningScores ? [awayRunningScores.penaltyShootout] : []),
    ].join(' ');

    const hasScore =
      homeRunningScores?.penaltyShootout && awayRunningScores?.penaltyShootout;
    const scoreText = hasScore
      ? ` ${homeRunningScores?.penaltyShootout}-${awayRunningScores?.penaltyShootout}`
      : '';

    return {
      value: `${penaltiesTranslation}${scoreText}`,
      accessible: `${penaltiesTranslation} ${accessibleText}`,
    };
  }

  if (isPens) {
    const aetTranslatedFallback = {
      ...aetFallback,
      ...(aetTranslation && {
        translation: aetTranslation,
      }),
    };
    const ftTranslatedFallback = {
      ...ftFallback,
      ...(ftTranslation && {
        translation: ftTranslation,
      }),
    };

    return homeRunningScores?.extratime && awayRunningScores?.extratime
      ? aetTranslatedFallback
      : ftTranslatedFallback;
  }

  return labels;
};
