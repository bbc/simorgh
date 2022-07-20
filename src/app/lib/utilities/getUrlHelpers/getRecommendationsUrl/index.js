export default ({ assetUri, engine, engineVariant }) => {
  if (engineVariant) {
    return `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}?Engine=${engine}&EngineVariant=${engineVariant}`;
  }
  if (engine) {
    return `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}?Engine=${engine}`;
  }
  return `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}`;
};
