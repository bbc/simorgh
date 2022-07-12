export default (sectionType, assetUri, uri, contentType, promoIndex = 0) => {
  const asset = assetUri || uri;
  const assetParts = asset.split(/www\.bbc\.(co\.uk|com)/);
  const assetId = assetParts[assetParts.length - 1].replace(/\W/g, '');

  return [sectionType, 'promo', assetId, contentType, promoIndex + 1]
    .filter(Boolean)
    .join('-')
    .toLowerCase();
};
