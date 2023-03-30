const generatePromoId = ({
  sectionType,
  assetUri,
  canonicalUrl,
  uri,
  contentType,
  index = 0,
}) => {
  const asset = assetUri || uri || canonicalUrl;
  const assetParts = asset
    ? asset.split(/www(.test)?\.bbc\.(co\.uk|com)/)
    : null;
  const assetId = assetParts
    ? assetParts[assetParts.length - 1].replace(/\W/g, '')
    : null;

  return [sectionType, 'promo', assetId, contentType, index + 1]
    .filter(Boolean)
    .join('-')
    .toLowerCase();
};

export default generatePromoId;
