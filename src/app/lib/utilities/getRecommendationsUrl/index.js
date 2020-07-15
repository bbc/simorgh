export default ({ service, variant, assetId }) =>
  variant
    ? `/${service}/${assetId}/recommendations/${variant}`
    : `/${service}/${assetId}/recommendations`;
