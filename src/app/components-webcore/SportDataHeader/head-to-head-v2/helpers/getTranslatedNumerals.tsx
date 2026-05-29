import getServiceNumerals from '#app/components/MostRead/utilities/getServiceNumerals';
import { Services } from '../../../../models/types/global';

// the score will always come back as a single digit in string form, e.g. '1', can you simplify the logic below
const translateScore = ({
  score,
  service,
}: {
  score: string;
  service: Services;
}) => {
  const numerals = getServiceNumerals(service);
  return numerals[score] || score;
};

export default translateScore;
