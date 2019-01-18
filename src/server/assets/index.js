import fs from 'fs';

const getAssetsArray = () => {
  const assets = [];
  const assetsManifestEnv = 'SIMORGH_ASSETS_MANIFEST_PATH';
  try {
    const assetManifest = JSON.parse(
      fs.readFileSync(process.env[assetsManifestEnv]),
    );

    Object.keys(assetManifest).forEach(key => assets.push(assetManifest[key]));
  } catch (error) {
    /* eslint-disable no-console */
    console.log(
      `Error parsing assets manifest. ${assetsManifestEnv} = ${
        process.env[assetsManifestEnv]
      }`,
    );
    /* eslint-enable no-console */
  }
  return assets;
};

export default getAssetsArray;
