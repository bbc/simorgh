export default ({ assetUri }) =>
  `https://onward-journeys.api.bbci.co.uk/api/recommendations${assetUri}`;

export const portugueseRecommendationsExperimentEndpoint = ({
  assetUri,
  engine,
  engineVariant,
}) =>
  engineVariant
    ? `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}?Engine=${engine}&EngineVariant=${engineVariant}`
    : `${process.env.RECOMMENDATIONS_ENDPOINT}/recommendations${assetUri}?Engine=${engine}`;
