import path from 'path';

export default ({ pageType, service, id, variant = '', assetUri }) => {
  let dataPath;

  switch (pageType) {
    case 'frontpage':
    case 'mostRead':
    case 'secondaryColumn':
    case 'recommendations':
      dataPath = `${variant || 'index'}.json`;
      break;
    case 'cpsAssets':
    case 'legacyAssets':
      dataPath = `${variant}/${assetUri}.json`;
      break;
    default:
      dataPath = `${id}${variant}.json`;
  }

  return path.join(process.cwd(), 'data', service, pageType, dataPath);
};
