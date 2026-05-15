import fixtureSportData from './fixture/fixtureSportData';

const initialHomeScore = Number(fixtureSportData.home.score) || 0;
let pollCount = 0;

// This is a placeholder function, this will be replaced by a proper fetch statement to the BFF in due time.
export default () => {
  pollCount += 1;

  const scoreIncrease = Math.floor(pollCount / 3);
  const incrementedHomeScore = String(initialHomeScore + scoreIncrease);

  return {
    ...fixtureSportData,
    home: {
      ...fixtureSportData.home,
      score: incrementedHomeScore,
      scoreUnconfirmed: incrementedHomeScore,
      runningScores: {
        ...fixtureSportData.home.runningScores,
        fulltime: incrementedHomeScore,
        aggregate: incrementedHomeScore,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
};
