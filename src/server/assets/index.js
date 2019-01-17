import fs from 'fs';

const getAssetsArray = () => {
  const assets = { js: [] };
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
        assets.js.push(assetManifest[key].js);
      }
    }

    /**
     * Gets the asset manifest.json filename
     * This is gross
     */
    if (
      assetManifest[''] &&
      assetManifest[''].json &&
      assetManifest[''].json.includes('manifest')
    ) {
      assets.manifest = assetManifest[''].json;
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
