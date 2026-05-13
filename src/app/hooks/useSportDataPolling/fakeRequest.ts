import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import fixtureData from './fixtureData';

type SportDataEventContent = NonNullable<
  ComponentProps['pageData']['sportDataEventContent']
>;
type SportDataEvent =
  SportDataEventContent['content']['data']['sportDataEvent'];

const initialHomeScore = Number(fixtureData.home.score) || 0;
let pollCount = 0;

// This is a placeholder function, this will be replaced by a proper fetch statement to the BFF in due time.
export default () => {
  pollCount += 1;

  const scoreIncrease = Math.floor(pollCount / 3);
  const incrementedHomeScore = String(initialHomeScore + scoreIncrease);

  return {
    ...fixtureData,
    home: {
      ...fixtureData.home,
      score: incrementedHomeScore,
      scoreUnconfirmed: incrementedHomeScore,
      runningScores: {
        ...fixtureData.home.runningScores,
        fulltime: incrementedHomeScore,
        aggregate: incrementedHomeScore,
      },
    },
  } as unknown as SportDataEvent;
};
