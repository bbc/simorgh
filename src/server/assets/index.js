import fs from 'fs';
/*
  Safely imports the assets manifest file that the 'ASSETS_MANIFEST' does not exist.
  Maps through the manifest file and extracts the JavaScript URLs.
*/

const getAssetsArray = () => {
  const assets = [];
  const assetsManifestEnv = 'ASSETS_MANIFEST_PATH';
  try {
    const assetManifest = JSON.parse(
      fs.readFileSync(process.env[assetsManifestEnv]),
    );
    const assetsManifestKeys = Object.keys(assetManifest);

    /*
        Loops through the asset manifest, extracts the JS URL out of each entry and injects them into the assets array, which is passed to render.
        Loops backwards as the client bundle is output first, but needs to be last
      */
    for (let i = assetsManifestKeys.length - 1; i >= 0; i -= 1) {
      const key = assetsManifestKeys[i];
      assets.push(assetManifest[key].js);
    }
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
