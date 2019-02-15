import fs from 'fs';
import nodeLogger from '../../app/helpers/logger.node';

const logger = nodeLogger(__filename);

const getAssetsArray = () => {
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
      `Error parsing assets manifest. ${assetsManifestEnv} = ${
        process.env[assetsManifestEnv]
      }`,
    );
  }
  return assets;
};

export default getAssetsArray;
