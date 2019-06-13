import nodeLogger from '../../logger.node';

const Preprocessor = (jsonRaw = {}, rules = []) => {
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
