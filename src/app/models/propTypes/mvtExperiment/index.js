import { oneOf, string, arrayOf, shape } from 'prop-types';

const mvtExperiment = arrayOf(
  shape({
    experimentName: string,
    variation: string,
    type: oneOf(['experiment', 'feature']),
  }),
);

export default mvtExperiment;
