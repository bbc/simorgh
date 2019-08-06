import fs from 'fs';
import nodeLogger from '../../app/lib/logger.node';
import assetsFilter from './assetsFilter';

const logger = nodeLogger(__filename);

const IMAGES_ORIGIN = 'https://ichef.bbci.co.uk';
const FONTS_ORIGIN = 'https://gel.files.bbci.co.uk';

const getAssetsArray = (service, serviceVariant) => {
  const assets = [];
  const assetsManifestEnv = 'SIMORGH_ASSETS_MANIFEST_PATH';
  try {
    const assetManifest = JSON.parse(
      fs.readFileSync(process.env[assetsManifestEnv]),
    );
    const assetsManifestKeys = Object.keys(assetManifest);

    for (let i = assetsManifestKeys.length - 1; i >= 0; i -= 1) {
      const key = assetsManifestKeys[i];
      if (key.length > 0) {
        assets.push(assetManifest[key].js);
      }
    }
  } catch (error) {
    logger.error(
      `Error parsing assets manifest. ${assetsManifestEnv} = ${process.env[assetsManifestEnv]}`,
    );
  }

  return assetsFilter(assets, service, serviceVariant);
};

const getAssetOrigins = () => {
  const assetOrigins = [
    IMAGES_ORIGIN,
    FONTS_ORIGIN,
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    process.env.SIMORGH_ATI_BASE_URL,
  ];

  return assetOrigins;
};

export { getAssetsArray, getAssetOrigins };
