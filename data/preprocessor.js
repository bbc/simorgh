import nodeLogger from '../src/app/helpers/logger.node';
import applyTimestampRules from './rules/timestamp';

const Preprocessor = (jsonRaw = {}, rules = [applyTimestampRules]) => {
  try {
    return rules.reduce(
      (transformedJson, ruleset) => ruleset(transformedJson),
      jsonRaw,
    );
  } catch (e) {
    // if our block manipulation fails for whatever reason, fall back to jsonRaw & log the error
    const logger = nodeLogger(__filename);
    logger.error(`JSON preprocessing failed: "${e}"`);
  }
  return jsonRaw;
};

export default Preprocessor;

// taken from https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
export const deepGet = (path, object) =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), object);

export const deepClone = originalObj => JSON.parse(JSON.stringify(originalObj));
