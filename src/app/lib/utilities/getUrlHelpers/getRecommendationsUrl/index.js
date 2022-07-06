export default ({ assetUri, variant }) =>
  variant
    ? `${assetUri}/recommendations/${variant}`
    : `${assetUri}/recommendations`;

export const portugueseRecommendationsExperimentEndpoint = ({
  assetUri,
  engine,
  engineVariant,
}) =>
  engineVariant
    ? `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}?Engine=${engine}&EngineVariant=${engineVariant}`
    : `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}?Engine=${engine}`;
