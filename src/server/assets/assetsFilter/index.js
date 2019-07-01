const assetRegex = type =>
  new RegExp(`(\\/static\\/js\\/(${type})-\\w+\\.\\w+\\.js)`, 'g');

const assetsFilter = (assets, service) => {
  const serviceAssets = assets.filter(asset =>
    asset.match(assetRegex(service)),
  );
  const vendorAssets = assets.filter(asset =>
    asset.match(assetRegex('vendor')),
  );
  const mainAssets = assets.filter(asset => asset.match(assetRegex('main')));

  /*
   * Service bundles must appear first in the page so react-loadable
   * knows to ensure theyre preloaded before hydration is done.
   */
  const orderedAssets = [...serviceAssets, ...vendorAssets, ...mainAssets];

  // Filter out duplicates just incase
  return [...new Set(orderedAssets)];
};

export default assetsFilter;
