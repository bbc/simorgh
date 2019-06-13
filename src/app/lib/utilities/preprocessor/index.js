import nodeLogger from '../../logger.node';
import applyTimestampRules from './rules/timestamp';
import applyBlockPositioning from './rules/blockPositioning';

const defaultRules = [applyBlockPositioning, applyTimestampRules];

const Preprocessor = (jsonRaw = {}, rules = defaultRules) => {
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
