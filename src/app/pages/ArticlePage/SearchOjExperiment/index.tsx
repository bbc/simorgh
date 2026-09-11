import Recommendations from '#app/components/Recommendations';
import { ComponentExperimentProps } from '#app/models/types/global';
import { Recommendation } from '#app/models/types/onwardJourney';
import { MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID } from './config';

type SearchOjExperimentProps = {
  data: Recommendation[];
  experimentProps?: ComponentExperimentProps;
};

const SearchOjExperiment = ({
  data,
  experimentProps,
}: SearchOjExperimentProps) => {
  return (
    <Recommendations
      data={data}
      experimentProps={experimentProps}
      id={MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID}
    />
  );
};

export default SearchOjExperiment;
