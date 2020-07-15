export default ({ assetUri, variant }) =>
  variant
    ? `${assetUri}/recommendations/${variant}`
    : `${assetUri}/recommendations`;
