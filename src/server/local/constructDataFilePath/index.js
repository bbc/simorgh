import path from 'path';

export default ({
  pageType,
  service,
  id,
  variant = '',
  assetUri,
  episodeId,
}) => {
  let dataPath;

  switch (pageType) {
    case 'frontpage':
    case 'mostRead':
    case 'mostWatched':
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
    default:
      dataPath = `${id}${variant}.json`;
  }

  return path.join(process.cwd(), 'data', service, pageType, dataPath);
};
