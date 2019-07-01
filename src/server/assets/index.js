import fs from 'fs';
import nodeLogger from '../../app/lib/logger.node';
import assetsFilter from './assetsFilter';

const logger = nodeLogger(__filename);

const IMAGES_ORIGIN = 'https://ichef.bbci.co.uk';
const FONTS_ORIGIN = 'https://gel.files.bbci.co.uk';

const getAssetsArray = service => {
  const assets = [];
  const assetsManifestEnv = 'SIMORGH_ASSETS_MANIFEST_PATH';
  try {
    const assetManifest = JSON.parse(
      fs.readFileSync(process.env[assetsManifestEnv]),
    );
    const assetsManifestKeys = Object.keys(assetManifest);

    /**
     * Loops through the asset manifest, extracts the JS URL out of each entry and
     * injects them into the assets array, which is passed to render.
     * Loops backwards as the client bundle is output first, but needs to be last.
     */
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

  return assets;
};

const getAssetOrigins = () => {
  const assetOrigins = [
    IMAGES_ORIGIN,
    FONTS_ORIGIN,
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  ];

  return assetOrigins;
};

export { getAssetsArray, getAssetOrigins };
