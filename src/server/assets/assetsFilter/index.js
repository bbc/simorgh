const assetRegex = type => {
  if (process.env.NODE_ENV === 'development') {
    return new RegExp(`\\/static\\/js\\/${type}[\\w.~-]*.js$`);
  }

  return new RegExp(`\\/static\\/js\\/${type}-\\w+\\.\\w+\\.js$`);
};

const assetsFilter = (assets, service) => {
  const serviceAssets = assets.filter(asset => assetRegex(service).test(asset));
  const vendorAssets = assets.filter(asset => assetRegex('vendor').test(asset));
  const mainAssets = assets.filter(asset => assetRegex('main').test(asset));

  /*
   * Service bundles must appear first in the page so react-loadable
   * knows to ensure theyre preloaded before hydration is done.
   */
  const orderedAssets = [...serviceAssets, ...vendorAssets, ...mainAssets];

  // Filter out duplicates just incase
  return [...new Set(orderedAssets)];
};

export default assetsFilter;
