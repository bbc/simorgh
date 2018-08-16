import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from '../app/routes';
import Document from '../app/containers/Document';

/*
  Safely imports the assets manifest file that the 'RAZZLE_ASSETS_MANIFEST' does not exist.
  Maps through the manifest file and extracts the JavaScript URLs.
*/
const assets = [];
try {
  const assetManifest = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require, global-require
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
    `Error parsing assets manifest. RAZZLE_ASSETS_MANIFEST = ${
      process.env.RAZZLE_ASSETS_MANIFEST
    }`,
  );
  /* eslint-enable no-console */
}

const getPublicDirectory = () =>
  process.env.NODE_ENV === 'production'
    ? process.env.RAZZLE_PUBLIC_DIR
    : process.env.RAZZLE_PUBLIC_DIR_DEV;

const publicDirectory = getPublicDirectory();
const dataFolderToRender =
  process.env.NODE_ENV === 'production' ? 'data/prod' : 'data';

const server = express();
server
  .disable('x-powered-by')
  .use('/data', express.static(dataFolderToRender))
  .use(express.static(publicDirectory))
  .get('/status', (req, res) => {
    res.sendStatus(200);
  })
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        document: Document,
        assets,
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
