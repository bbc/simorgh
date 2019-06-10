import nodeLogger from '../../../helpers/logger.node';
import applyTimestampRules from './rules/timestamp';

const Preprocessor = (jsonRaw = {}, rules = []) => {
  const defaultRules = [applyTimestampRules];

  try {
    return [...defaultRules, ...rules].reduce(
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
