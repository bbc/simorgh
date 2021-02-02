const getAssetUri = assetUri => {
  if (assetUri.includes('newyddion')) {
    return assetUri.replace('newyddion', 'cymrufyw');
  }

  return assetUri;
};

export default getAssetUri;
