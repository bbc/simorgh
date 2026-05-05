const ftFallback = { value: 'FT', accessible: 'Full time' };
const aetFallback = { value: 'AET', accessible: 'After extra time' };

export const getFallbackFootballPeriodLabel = (
  labels,
  status,
  homeRunningScores,
  awayRunningScores,
  homeName,
  awayName,
) => {
  const isPens = labels?.value?.toLowerCase() === 'pens';

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
      value: `Penalties${scoreText}`,
      accessible: `Penalties ${accessibleText}`,
    };
  }

  if (isPens) {
    const fallback =
      homeRunningScores?.extratime && awayRunningScores?.extratime
        ? aetFallback
        : ftFallback;
    return fallback;
  }

  return labels;
};

export const getConciseFootballEventSummary = ({
  time,
  status,
  periodLabel,
  winner: winnerAlignment,
  seriesWinner,
  home,
  away,
  period,
}) => {
  const summary = [];
  const kickOffTime =
    time.displayTimeUK !== 'TBC'
      ? `kick off ${time.accessibleTime}`
      : time.accessibleTime;

  const homeName =
    home.fullName === 'TBC' ? 'Team to be confirmed' : home.fullName;
  const awayName =
    away.fullName === 'TBC' ? 'Team to be confirmed' : away.fullName;

  if (status === 'PreEvent') {
    summary.push(homeName, 'versus', awayName, kickOffTime);
  }

  if (status === 'MidEvent') {
    summary.push(home.fullName, home.score, ',', away.fullName, away.score);

    if (period === 'et-firsthalf' || period === 'et-secondhalf') {
      summary.push('Extra time in progress');
    }

    if (period === 'pens') {
      const hasRunningScores = home.runningScores && away.runningScores;

      if (hasRunningScores) {
        if (home.runningScores.extratime && away.runningScores.extratime) {
          summary.push('after extra time');
        } else {
          summary.push('after full time');
        }
      }

      if (
        hasRunningScores &&
        home.runningScores.penaltyShootout &&
        away.runningScores.penaltyShootout
      ) {
        summary.push('penalties in progress');
      } else {
        summary.push('going to penalties');
      }
    }
  }

  if (status === 'PostEvent') {
    summary.push(home.fullName, home.score, ',', away.fullName, away.score);

    if (periodLabel?.labelType === 'date') {
      summary.push('on the');
    } else if (
      !home.runningScores?.extratime &&
      !away.runningScores?.extratime
    ) {
      summary.push('at');
    }

    const fallbackPeriod = getFallbackFootballPeriodLabel(
      periodLabel,
      status,
      home.runningScores,
      away.runningScores,
    );

    summary.push(fallbackPeriod.accessible);

    if (
      home.runningScores?.penaltyShootout &&
      away.runningScores?.penaltyShootout
    ) {
      if (home.runningScores.aggregate && away.runningScores.aggregate) {
        const aggText = `, ${home.fullName} ${home.runningScores.aggregate} , ${away.fullName} ${away.runningScores.aggregate} on aggregate`;
        summary.push(aggText);
      }
      const { winner, loser } =
        winnerAlignment.toLowerCase() === 'home'
          ? { winner: home, loser: away }
          : { winner: away, loser: home };
      const text = `, ${winner.fullName} win ${winner.runningScores.penaltyShootout} - ${loser.runningScores.penaltyShootout} on penalties`;

      summary.push(text);
    }

    if (seriesWinner) {
      const { winner, loser } =
        seriesWinner.toLowerCase() === 'home'
          ? { winner: home, loser: away }
          : { winner: away, loser: home };

      const text = `, ${winner.fullName} win ${winner.runningScores.aggregate} - ${loser.runningScores.aggregate} on aggregate`;
      summary.push(text);
    }
  }

  return summary.join(' ');
};
