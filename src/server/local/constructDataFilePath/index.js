import path from 'path';

export default ({
  pageType,
  service,
  id,
  variant = '',
  assetUri,
  episodeId,
  masterBrand,
}) => {
  let dataPath;

  switch (pageType) {
    case 'homePage':
    case 'mostRead':
    case 'secondaryColumn':
    case 'recommendations':
      dataPath = `${variant || 'index'}.json`;
      break;
    case 'cpsAssets':
    case 'legacyAssets':
      dataPath = `${variant}/${assetUri}.json`;
      break;
    case 'africa_eye':
      return path.join(
        process.cwd(),
        'data',
        'worldservice',
        'tv',
        pageType,
        `${episodeId}.json`,
      );
    case 'liveRadio':
      return path.join(
        process.cwd(),
        'data',
        service,
        masterBrand,
        'liveradio.json',
      );
    default:
      dataPath = `${id}${variant}.json`;
  }

  return path.join(process.cwd(), 'data', service, pageType, dataPath);
};
