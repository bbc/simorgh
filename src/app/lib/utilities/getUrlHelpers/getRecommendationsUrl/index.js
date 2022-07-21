export default ({ assetUri, engine, engineVariant }) => {
  let queryParams = '';

  if (engine) {
    queryParams += `?Engine=${engine}`;
    if (engineVariant) {
      queryParams += `&EngineVariant=${engineVariant}`;
    }
  }

  return `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}${queryParams}`;
};
